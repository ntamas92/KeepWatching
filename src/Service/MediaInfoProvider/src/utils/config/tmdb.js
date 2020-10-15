const TMDB_API_PREFIX = "https://api.themoviedb.org/3"

const MULTI_SEARCH_ENDPOINT = "/search/multi"

const TMDB_API_KEY = process.env.TMDB_API_KEY

const THUMBNAIL_PATH_PREFIX = "https://image.tmdb.org/t/p/w92"


module.exports = { TMDB_API_KEY, TMDB_API_PREFIX, MULTI_SEARCH_ENDPOINT, THUMBNAIL_PATH_PREFIX }