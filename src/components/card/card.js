import React, { useEffect, useState } from "react";
import axios from 'axios';
import './card.css';
import { API_URL, IMAGE_URL } from "@/services/api_info";
import Link from "next/link";

function Card() {
    const [movies, setMovies] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    useEffect(() => {
        axios.get(API_URL)
        .then((response) => {
            setMovies(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();
            if (key === 'arrowright' && selectedCardIndex < movies.length - 1) {
                setSelectedCardIndex((prevIndex) => prevIndex + 1);
            } else if (key === 'arrowleft' && selectedCardIndex > 0) {
                setSelectedCardIndex((prevIndex) => prevIndex - 1);
            } else if (key === 'enter') {
                // Simulate a click event on the selected card's link
                const selectedCardLink = document.querySelector(`.movie-card.selected a`);
                if (selectedCardLink) {
                    selectedCardLink.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedCardIndex, movies]);

    return (
        <>
            {movies && movies.length > 0 && movies.map((movie, index) => (
                <div className={`movie-card ${selectedCardIndex === index ? 'selected' : ''}`} key={index}>
                    <Link href={`https://api.themoviedb.org/3/movie/${movie.id}`}>
                        <div>
                            <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title}/>
                            <div className="movie-card__description">
                                <small>{movie.release_date}</small>
                                <h3>{movie.title}</h3>
                                <small>{movie.vote_average}</small>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </>
    )
}

export default Card;