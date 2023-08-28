"use client"

import React, { useEffect, useState } from "react"
import axios from 'axios'

export default function Home() {

  const [movies, setMovies] = useState([])

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
  }, [])

  return (
    <>
    <h1>Velope OTT Developer Remote Test</h1>
    </>
  )
}
