const searchRouter = require("express").Router()
const axios = require("axios")
const config = require("../utils/config/tmdb")

searchRouter.get("/", async (request, response) => {
  console.log(request.query.title)

  const url = `${config.TMDB_API_PREFIX}${config.MULTI_SEARCH_ENDPOINT}`
  const params = {query: request.query.title, api_key: config.TMDB_API_KEY}

  console.log(url)
  console.log(params)
  try
  {

    const result = await axios.get(url, { params })
    const pageNum = result.data.page
    const totalResults = result.data.total_results
    const totalPages = result.data.total_pages
    const results = result.data.results.map(convertSearchResult)
    
    response.json(results)
  
  }catch(error){
    console.log(error)

  }
})


const convertSearchResult = (searchResult) => {
  let result = {
    type: searchResult.media_type,
    poster_path: searchResult.poster_path ? config.THUMBNAIL_PATH_PREFIX + searchResult.poster_path : null
  }

  if(searchResult.media_type === "movie") {
    result.title = searchResult.title
    result.length = searchResult.runtime
    result.plot = searchResult.overview
    result.released = searchResult.release_date
  }
  else if(searchResult.media_type === "tv") {
    result.title = searchResult.name
    result.released = searchResult.first_air_date
  }
  else{
    console.log("unknown media type", searchResult.media_type)
  }

  result.orig = searchResult

  return result;
}

module.exports = searchRouter