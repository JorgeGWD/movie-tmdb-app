import React, { useEffect, useState } from "react";
import './card.css';
import { getCardDetails, IMAGE_URL } from "@/services/api_info";
import Link from "next/link";

function Card({requestData, title}) {
    const [cards, setCards] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    useEffect(() => {
        const fetchCardDetails = async () => {
            const data = await getCardDetails(requestData);
            setCards(data.results);
            // console.log(data.results)
        };
      
        fetchCardDetails();
    }, [requestData]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();
            if (key === 'arrowright' && selectedCardIndex < cards.length - 1) {
                setSelectedCardIndex((prevIndex) => prevIndex + 1);
            } else if (key === 'arrowleft' && selectedCardIndex > 0) {
                setSelectedCardIndex((prevIndex) => prevIndex - 1);
            } else if (key === 'enter') {
                // Simulate a click event on the selected card's link
                const selectedCardLink = document.querySelector(`.cards-content.selected a`);
                if (selectedCardLink) {
                    selectedCardLink.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedCardIndex, cards]);

    return (
        <div className="cards">
            <h1>{title}</h1>
            <div className="cards-content">
                {cards && cards.length > 0 && cards.map((card, index) => (
                    <div className={`cards-content__container ${selectedCardIndex === index ? 'selected' : ''}`} key={index}>
                        <Link href={`https://api.themoviedb.org/3/movie/${card.id}`}>
                            <div>
                                <img src={`${IMAGE_URL}${card.poster_path}`} alt={card.title}/>
                                <div className="cards-content__container-description">
                                    <small>{card.release_date || card.first_air_date}</small>
                                    <h3>{card.title || card.name}</h3>
                                    <small>{card.vote_average}</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Card;