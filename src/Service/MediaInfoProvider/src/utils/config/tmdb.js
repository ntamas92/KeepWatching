const API_PREFIX = "https://api.themoviedb.org/3"

const MULTI_SEARCH_ENDPOINT = "search/multi"

const MOVIE_DETAILS_ENDPOINT = "movie"

const TV_DETAILS_ENDPOINT = "tv"

const PERSON_DETAILS_ENDPOINT = "person"

const API_KEY = process.env.TMDB_API_KEY

const THUMBNAIL_PATH_PREFIX = "https://image.tmdb.org/t/p/w92"

const BACKDROP_PATH_PREFIX = "https://image.tmdb.org/t/p/original"


module.exports = { API_KEY, API_PREFIX, MULTI_SEARCH_ENDPOINT, MOVIE_DETAILS_ENDPOINT, TV_DETAILS_ENDPOINT, PERSON_DETAILS_ENDPOINT, 
  THUMBNAIL_PATH_PREFIX, BACKDROP_PATH_PREFIX }