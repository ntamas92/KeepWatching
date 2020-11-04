const express = require("express");
const cors = require("cors");
const tmdbRepository = require("./dataAccess/tmdbRepository")

const searchRouter = require("./routers/searchRouter")
const movieRouter = require("./routers/movieRouter")
const tvRouter = require("./routers/tvRouter")
const personRouter = require("./routers/personRouter")

const app = express();
const repository = tmdbRepository();

app.use(cors())
app.use(express.json())

app.use("/api/search", searchRouter(repository))
app.use("/api/movie", movieRouter(repository))
app.use("/api/tv", tvRouter(repository))
app.use("/api/person", personRouter(repository))

app.get("/ping", (req, res) => {
  res.json("poing")
})

module.exports = app