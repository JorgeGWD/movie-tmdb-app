import React, { useEffect, useState } from "react"
import axios from 'axios'
import './card.css'
import { API_URL, IMAGE_URL } from "@/services/api_info"

function Card(props) {

    const [movies, setMovies] = useState([])
  
    useEffect(() => {
      axios.get(API_URL)
      .then((response) => {
        setMovies(response.data.results)
        // console.log(response.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [API_URL])

  return (
    <>
      {movies && movies.length > 0 && movies.map((movie, key) => (
        <div className="movie-card" key={movie.id}>
          <img src={`${IMAGE_URL}${movie.poster_path}`}/>
          <small>{movie.release_date}</small>
          <h3>{movie.title}</h3>
          <small>{movie.vote_average}</small>
        </div>
      ))}
    </>
  )
}

export default Card