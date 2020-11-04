const express = require("express")

const movieRouter = (repository) => {
  const movieRouter = express.Router()

  movieRouter.get("/:id", async (request, response) => {
    const movieId = request.params.id

    const movieDetails = await repository.getMovieDetails(movieId)

    response.json(movieDetails)
  })

  return movieRouter
}


module.exports = movieRouter