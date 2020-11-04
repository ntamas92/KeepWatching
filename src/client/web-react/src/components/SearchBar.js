import React, { useState } from "react"
import axios from "axios"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import { Link } from "react-router-dom"

const SearchBar = () => {
  const fetchSearchResult = async (query) => {
    setIsLoading(true)

    if (query === '') {
      return []
    }

    const uri = `http://localhost:5000/api/search/suggestions?title=${query}`

    try {
      const response = await axios.get(uri)
      
      const items = response.data.map(elem => ({ ...elem, id: elem.id.toString() }))

      setSearchResult(items)
    }
    catch (error) {
      //TODO: implement a proper error handler
      console.log(error)
      alert(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const [searchResult, setSearchResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div style={{minWidth:330}}>
      <AsyncTypeahead
        filterBy={() => true}
        id="title"
        isLoading={isLoading}
        onSearch={fetchSearchResult}
        options={searchResult}
        labelKey="id"
        placeholder="Search for a movie, tv, or person..."
        useCache={false}
        renderMenuItemChildren={(element, props) => (
          <>
            <img className="img-thumbnail" src={element.poster_path} alt={element.title} style={{ float: 'left' }} height={100} />
            <Link to={`/${element.type}/${element.id}`}>{element.title}</Link>
          </>
        )}
      />
    </div>
  )
  // return (
  //   <div className="search" style={{ width: '250px' }}>
  //     <form class="form-inline d-flex dropdown">
  //       <input class="form-control form-control-sm" type="text" id="filter" placeholder="Search" data-toggle="dropdown" onChange={event => fetchQuery(event.target.value)} />
  //       <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
  //         {searchResult && searchResult.map(element =>
  //           <li role="presentation">
  //             <div className="result-row" style={{ overflow: 'auto' }}>
  //               
  //             </div>
  //           </li>
  //         )}
  //       </ul>
  //     </form>
  //   </div>
  // )
}

export default SearchBar