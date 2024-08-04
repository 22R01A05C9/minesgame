const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/creategame", (req, res) => {
  let gameid = Math.floor(Math.random() * 9000) + 1000;
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
  res.json({ token: jtoken, bombs: req.body.bombs, gameid: gameid });
});

app.get("/creategame", (req, res) => {
  res.json({ msg: "Hello" });
});

app.post("/getdata", (req, res) => {
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
  let bombs = data.bomb;
  let out = false;
  bombs.forEach((value) => {
    if (value === parseInt(move)) {
      out = true;
      res.json({ msg: "Out", bombs: bombs });
      return;
    }
  });
  if (!out) {
    res.json({ msg: "Safe", mines: data.mines });
  }
});

app.listen(5050, "0.0.0.0", () => {
  console.log("Server is running on http://localhost:5050");
});
