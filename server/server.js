const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/creategame", (req, res) => {
  let rand = Math.floor(Math.random() * 16);
  let l = [];
  for (let i = 0; i < 16; i++) {
    l.push(rand === i ? 1 : 0);
  }
  let jtoken = jwt.sign(
    { game: l, ct: Date.now(), mt: Date.now() + 600000, bomb: rand },
    "sfhafy8r3cnv74rn37ny4tct8v3r"
  );
  res.json({ token: jtoken });
});

app.post("/getdata", (req, res) => {
  let token = req.body.token;
  let move = req.body.move;
  let data = jwt.verify(token, "sfhafy8r3cnv74rn37ny4tct8v3r");
  if (!data.game || !data.ct || !data.mt || !data.bomb) {
    res.json({ msg: "Invalid Token" });
    return;
  }
  let ct = Date.now();
  if (ct > data.mt) {
    res.json({ msg: "Time Out" });
    return;
  }
  if (move === parseInt(data.bomb)) {
    res.json({ msg: "Out" });
  } else {
    res.json({ msg: "Safe" });
  }
});

app.listen(5050, () => {
  console.log("Server is running on http://localhost:5050");
});
