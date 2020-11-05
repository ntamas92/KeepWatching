const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const userRouter = require("./routers/userRouter")

const app = express();

let dbUri = process.env.MONGODB_URI;
console.log("mongodb_uri:", dbUri);

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("error happened during MongoDB connection:", err));

app.use(cors())
app.use(express.json())

app.use("/user", userRouter)

app.get("/ping", (req, res) => {
  res.json("poing")
})

module.exports = app