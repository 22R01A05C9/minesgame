const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://192.168.0.100:5173",
  ],
};
app.use(cors(corsOptions));
app.use(express.json());

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
  games.updateOne({ gameid: gameid }, { $set: { status: "not active" } });
}

async function findgame(gameid) {
  connection = await client.connect();
  mines = connection.db("mines");
  games = mines.collection("games");
  return await games.findOne({ gameid: gameid });
}
app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function creategame(req, res) {
  let gameid = Math.floor(Math.random() * 9000) + 1000;
  while ((await findgame(gameid)) !== null) {
    gameid = Math.floor(Math.random() * 9000) + 1000;
  }
  let rands = [];
  let nb = parseInt(req.body.bombs);
  if (!nb) {
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
  let jtoken = jwt.sign(
    {
      game: l,
      ct: Date.now(),
      mt: Date.now() + 600000,
      bomb: rands,
      gameid: gameid,
      mines: nb,
    },
    "sfhafy8r3cnv74rn37ny4tct8v3r"
  );
  setgame(gameid);
  res.json({ token: jtoken, bombs: req.body.bombs, gameid: gameid });
}

app.post("/creategame", creategame);

async function getdata(req, res) {
  let token = req.body.token;
  let move = req.body.move;
  let data = jwt.verify(token, "sfhafy8r3cnv74rn37ny4tct8v3r");
  if (!data.game || !data.ct || !data.mt || !data.bomb || !data.gameid) {
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
  if (gamestatus.status !== "active") {
    res.json({ msg: "already game over" });
    return;
  }
  let bombs = data.bomb;
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

app.post("/getdata", getdata);

app.post("/feedback", (req, res) => {
  fs.readFile("feedback.txt", (err, data) => {
    let arr = JSON.parse(data.toString());
    arr.push(req.body);
    fs.writeFile("feedback.txt", JSON.stringify(arr), (err) => {
      if (err) console.log(err);
    });
  });
  res.json({ msg: "Success" });
});

app.get("/feedback", (req, res) => {
  fs.readFile("feedback.txt", (err, data) => {
    res.json(JSON.parse(data.toString()));
  });
});

app.listen(5050, "0.0.0.0", () => {
  console.log("Server is running on http://localhost:5050");
});
