const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL);
const cryptojs = require("crypto-js");
const express = require("express")


const app = express()
app.use(express.json())

function getrand() {
	return Math.floor(Math.random() * 16);
}

async function setgame(gameid) {
	conn = await client.connect();
	mines = conn.db("mines");
	games = mines.collection("games");
	games.insertOne({ gameid: gameid, status: "active" });
}

async function removegame(gameid) {
	connection = await client.connect();
	mines = connection.db("mines");
	games = mines.collection("games");
	games.deleteOne({ gameid: gameid });
}

async function findgame(gameid) {
	connection = await client.connect();
	mines = connection.db("mines");
	games = mines.collection("games");
	return await games.findOne({ gameid: gameid });
}

async function creategame(req, res) {
	let gameid = Math.floor(Math.random() * 9000) + 1000;
	while ((await findgame(gameid)) !== null) {
		gameid = Math.floor(Math.random() * 9000) + 1000;
	}
	let rands = [];
	let nb = parseInt(req.body.bombs);
	if (!nb || nb > 4) {
		res.json({ msg: "Invalid Request" });
		return;
	}
	let i = 0;
	while (i < nb) {
		let rand = getrand();
		let found = false;
		rands.forEach((value) => {
			if (value === rand) found = true;
		});
		if (!found) {
			rands.push(rand);
			i++;
		}
	}
	let l = [];
	for (let i = 0; i < 16; i++) {
		let found = false;
		rands.forEach((value) => {
			if (value === i) found = true;
		});
		if (found) l.push(1);
		else l.push(0);
	}
	let jtoken = cryptojs.AES.encrypt(
		JSON.stringify({
			game: l,
			ct: Date.now(),
			mt: Date.now() + 600000,
			bomb: rands,
			gameid: gameid,
			mines: nb,
		}),
		process.env.MINES_API_KEY
	).toString();
	setgame(gameid);
	res.json({ token: jtoken, bombs: req.body.bombs, gameid: gameid });
}

app.post("/mines/creategame", creategame);

async function getdata(req, res) {
	let token = req.body.token;
	let move = req.body.move;
	let data = JSON.parse(cryptojs.AES.decrypt(token, process.env.MINES_API_KEY).toString(cryptojs.enc.Utf8));
	if (!data || !data.game || !data.ct || !data.mt || !data.bomb || !data.gameid) {
		res.json({ msg: "Invalid Token" });
		return;
	}
	let ct = Date.now();
	if (ct > data.mt) {
		res.json({ msg: "Time Out" });
		return;
	}
	gamestatus = await findgame(data.gameid);
	if (gamestatus === null) {
		res.json({ msg: "Game Not Found" });
		return;
	}
	let bombs = data.bomb;
	if (gamestatus.status !== "active") {
		res.json({ msg: "already game over", bombs: bombs });
		return;
	}
	let out = false;
	bombs.forEach((value) => {
		if (value === parseInt(move)) {
			out = true;
			removegame(data.gameid);
			res.json({ msg: "Out", bombs: bombs });
			return;
		}
	});
	if (!out) {
		res.json({ msg: "Safe", mines: data.mines });
	}
}

app.post("/mines/getdata", getdata);

async function pushfeedback(body) {
	let conn = await client.connect();
	let mines = conn.db("mines");
	let feedbacks = mines.collection("feedbacks");
	await feedbacks.insertOne(body);
}

async function getfeedbacks() {
	let conn = await client.connect();
	let mines = conn.db("mines");
	let feedbacks = mines.collection("feedbacks");
	let res = await feedbacks.find({}, { "projection": { _id: 0 } }).toArray();
	return res
}

app.post("/mines/feedback", (req, res) => {
	req.body.time = new Date();
	pushfeedback(req.body)
	res.json({ msg: "Success" });
});

app.get("/mines/feedback", (req, res) => {
	getfeedbacks().then((data) => res.json(data))
});

app.listen(5000,()=>{
	console.log("server started on 5000");
})