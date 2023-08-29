import React, { useEffect, useState } from "react"
import axios from 'axios'
import './card.css'
import { API_URL, IMAGE_URL } from "@/services/api_info"

function Card() {

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
    }, [])

    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();
            if (key === 'arrowright') {
            setSelectedCardIndex((prevIndex) => (prevIndex + 1) % 20);
            } else if (key === 'arrowleft') {
            setSelectedCardIndex((prevIndex) =>
                (prevIndex - 1 + 20) % 20
            );
            }
        };
    
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    
  return (
        <>
            {movies && movies.length > 0 && movies.map((movie, index) => (
                <div className={`movie-card ${selectedCardIndex === index ? 'selected' : ''}`} key={index} >
                <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-card__description">
                    <small>{movie.release_date}</small>
                    <h3>{movie.title}</h3>
                    <small>{movie.vote_average}</small>
                </div>
                </div>
            ))}
        </>
    )
}

export default Card