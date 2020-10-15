import React, { useState, useEffect } from "react"

const useThrottledQuery = (fetchingFunction, fetchCallback) => {
  const [query, setQuery] = useState(null)
  const [pendingQuery, setPendingQuery] = useState(null)

  useEffect(() => {
    if (query === null && pendingQuery !== null) {
      setPendingQuery(null)
      setQuery(pendingQuery)

      fetchingFunction(pendingQuery)
        .then(fetchCallback)
        .catch(console.error)
        .finally(x => setQuery(null))
    }
  }, [query, pendingQuery, fetchingFunction, fetchCallback])

  return setPendingQuery
}

const SearchBar = () => {
  const fetchSearchResult = (query) => {
    if (query === '') {
      return new Promise((resolve, reject) => resolve([]))
    }
    else {
      return fetch('http://localhost:5000/api/search?title=' + query)
        .then(response => response.json())
        .then(x => { return x.map(fun => ({ 'title': fun.title, 'image': fun.poster_path })) })
    }
  }

  const [searchResult, setSearchResult] = useState([])
  const fetchQuery = useThrottledQuery(fetchSearchResult, setSearchResult)

  return (
    <div className="search" style={{ width: '250px' }}>
      <div className="search-bar">
        <form>
          <input type="text" id="filter" onChange={event => fetchQuery(event.target.value)} />
        </form>
      </div>
      <SearchResults results={searchResult} />
    </div>
  )
}


const SearchResults = ({ results }) => {
  return <div className="search-results">
    {results.map(element =>
      <div className="result-row" style={{ overflow: 'auto' }}>
        <img src={element.image} alt={element.title} style={{ float: 'left' }} height={100} />
        <p>{element.title}</p>
      </div>)}
  </div>
}

export default SearchBar