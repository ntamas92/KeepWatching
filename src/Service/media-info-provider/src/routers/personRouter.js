const express = require("express")

const personRouter = (repository) => {
  const router = express.Router()

  router.get("/:id", async (request, response) => {
    const personId = request.params.id

    const personDetails = await repository.getPersonDetails(personId)

    response.json(personDetails)
  })

  return router
}


module.exports = personRouter