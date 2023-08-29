"use client"

import React, { useEffect, useState } from "react"
import axios from 'axios'
import './page.css'

export default function Home() {

  const [movies, setMovies] = useState([])

  const [currentCard, setCurrentCard] = useState(0)

  const API_KEY = '70b4fae10e1f2ae4e4fb74fc69dcbd73'
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original/'

  useEffect(() => {
    axios.get(API_URL)
    .then((response) => {
      setMovies(response.data.results)
      console.log(response.data.results)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [API_URL])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        setCurrentCard((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (event.key === 'ArrowRight') {
        setCurrentCard((prevIndex) =>
          Math.min(prevIndex + 1, movies.length - 1)
        );
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentCard]);

  const cardWidth = 235;
  const cardMargin = 0;
  const sliderOffset = currentCard * (cardWidth + cardMargin);

  return (
    <>
    <div className="movie-carousel" style={{ transform: `translateX(-${sliderOffset}px)` }}>
      {movies && movies.length > 0 && movies.map((movie, key) => (
        <div className="movie-card" key={movie.id}>
          <img src={`${IMAGE_URL}${movie.poster_path}`}/>
          <small>{movie.release_date}</small>
          <h3>{movie.title}</h3>
          <small>{movie.vote_average}</small>
        </div>
      ))}
    </div>
    </>
  )
}
