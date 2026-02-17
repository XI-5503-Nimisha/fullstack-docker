const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/testdb");

const Msg = mongoose.model("Msg", { text: String });

app.get("/", async (req, res) => {
  const msgs = await Msg.find();
  res.json(msgs);
});

app.post("/", async (req, res) => {
  const msg = new Msg({ text: req.body.text });
  await msg.save();
  res.json(msg);
});

app.listen(5000, () => console.log("Backend running"));
