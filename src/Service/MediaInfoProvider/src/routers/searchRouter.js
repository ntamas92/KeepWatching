const express = require("express")

const searchRouter = (repository) => {
  const router = express.Router()

  router.get("/suggestions", async (request, response) => {
    const suggestions = await repository.getSuggestions(request.query.title)
   
    response.json(suggestions)
  })
  
  router.get("/", async (request, response) => {
    const title = request.query.title
    const page = request.query.page
  
    const searchResult = await repository.getSearchResultsByTitle(title, page)

    response.json(searchResult)
  })

  return router
}

module.exports = searchRouter