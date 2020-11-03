import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./movieDetails.css"

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const uri = `http://localhost:5000/api/movie/${id}`

    axios.get(uri).then(x => setMovie(x.data))

  }, [id])

  return (
    <div>
      {movie &&
        <div className="backdropContainer" >
          <img src={movie.backdrop_path} className="img-fluid" style={{ width: "100%" }} alt="backdrop"></img>
          <div className="backdropContent">
            <div className="row" style={{ marginLeft: 15, marginTop: 30 }}>
              <div className="col-sm-3">
                <img src={movie.poster_path} className="img-thumbnail img-fluid float-left" alt="poster" />
              </div>
              <div className="col-sm-6">
                <div className="d-flex flex-row-reverse justify-content-center">

                  <h1 className="text-secondary">{movie.title}</h1>
                  <div className="star text-dark">{movie.vote_average} </div>

                </div>

                <div className="d-flex flex-column">
                  <p>Length: {movie.runtime} minutes</p>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>

        </div>}
    </div>
  )
}

export default MovieDetails