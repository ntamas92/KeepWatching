const express = require("express");
const cors = require("cors");
const searchRouter = require("./routers/searchRouter")

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/search", searchRouter)


app.get("/ping", (req, res) => {
  res.json("poing")
})

module.exports = app