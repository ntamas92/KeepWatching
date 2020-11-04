const express = require("express")

const tvRouter = (repository) => {
  const router = express.Router()

  router.get("/:id", async (request, response) => {
    const tvId = request.params.id

    const tvDetails = await repository.getTvDetails(tvId)

    response.json(tvDetails)
  })

  return router
}


module.exports = tvRouter