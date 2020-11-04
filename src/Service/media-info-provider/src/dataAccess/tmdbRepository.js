const axios = require("axios")
const config = require("../utils/config/tmdb")

const defaultParams = { api_key: config.API_KEY }

const appendImageResponseToParams = (params) => {
  return { ...params, append_to_response: "images" }
}

//TODO: Define interface for repository
class tmdbRepository {
  getSuggestions = async (title) => {
    const searchResult = await fetchSearchResult(title)

    const suggestions = searchResult.results.slice(0, 10).map(x => {
      const { title, released, id, type, poster_path } = x

      return { title, released, id, type, poster_path }
    })

    return suggestions
  }

  getSearchResultsByTitle = async (title, page) => {
    return fetchSearchResult(title, page)
  }

  getMovieDetails = async (id) => {
    const url = `${config.API_PREFIX}/${config.MOVIE_DETAILS_ENDPOINT}/${id}`

    const result = await axios.get(url, { params: appendImageResponseToParams(defaultParams) })

    const movieDetails = result.data

    convertImagePaths(movieDetails)
    return movieDetails
  }

  getTvDetails = async (id) => {
    const url = `${config.API_PREFIX}/${config.TV_DETAILS_ENDPOINT}/${id}`

    const result = await axios.get(url, { params: appendImageResponseToParams(defaultParams) })

    const tvDetails = result.data

    convertImagePaths(tvDetails)
    return result.data
  }

  getPersonDetails = async (id) => {
    const url = `${config.API_PREFIX}/${config.PERSON_DETAILS_ENDPOINT}/${id}`

    const result = await axios.get(url, { params: appendImageResponseToParams(defaultParams) })
    const personDetails = result.data

    convertImagePaths(personDetails)
    return result.data
  }
}

const convertImagePaths = (item) => {
  if (item.images && item.images.backdrops && item.images.posters) {
    item.images = item.images.backdrops.concat(item.images.posters)
  }

  for (let propertyName in item) {
    let propertyValue = item[propertyName]

    if (propertyName.endsWith("_path") && propertyValue && propertyValue.startsWith("/")) {
      item[propertyName] = config.BACKDROP_PATH_PREFIX + propertyValue
    }
    else if (Array.isArray(propertyValue) && propertyValue.length > 0 &&
      typeof propertyValue[0] === "object" && propertyValue[0]) {
      propertyValue.forEach(convertImagePaths)
    }
  }

  return item
}

const fetchSearchResult = async (title, page) => {
  if (!title) {
    throw new Error("Title is empty.")
  }

  const url = `${config.API_PREFIX}/${config.MULTI_SEARCH_ENDPOINT}`
  const params = { ...defaultParams, query: title }

  if (page) {
    params.page = page
  }

  const result = await axios.get(url, { params })

  return ({
    pageNum: result.data.page,
    totalResults: result.data.total_results,
    totalPages: result.data.total_pages,
    results: result.data.results.map(convertSearchResult).filter(x => x !== null)
  })
}

const convertSearchResult = (searchResult) => {
  let result = {
    id: searchResult.id,
    type: searchResult.media_type,
    overview: searchResult.overview,
    vote_average: searchResult.vote_average,
  }

  let posterPath = null

  if (searchResult.media_type === "movie") {
    result.title = searchResult.title
    result.length = searchResult.runtime
    result.released = searchResult.release_date
    posterPath = searchResult.poster_path
  }
  else if (searchResult.media_type === "tv") {
    result.title = searchResult.name
    result.released = searchResult.first_air_date
    posterPath = searchResult.poster_path
  }
  else if (searchResult.media_type === "person") {
    result.title = searchResult.name
    posterPath = searchResult.profile_path
  }
  else {
    console.log("unknown media type:", searchResult)
    return null;
  }

  result.poster_path = posterPath ? config.THUMBNAIL_PATH_PREFIX + posterPath : null

  result.orig = searchResult
  return result;
}

const createRepository = () => new tmdbRepository()

module.exports = createRepository