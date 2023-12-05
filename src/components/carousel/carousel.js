import React, { useEffect, useState }  from 'react'
import Card from '../card/card'
import './carousel.css'

function Carousel() {

    const [currentCard, setCurrentCard] = useState(0)
    
    useEffect(() => {
        const handleKeyPress = (event) => {
        if (event.key === 'ArrowLeft') {
            setCurrentCard((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === 'ArrowRight') {
            setCurrentCard((prevIndex) =>
            Math.min(prevIndex + 1, 20 - 1)
            );
        }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
        window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentCard]);

    const cardWidth = 238;
    const cardMargin = 0;
    const sliderOffset = currentCard * (cardWidth + cardMargin);

    return (
        <div className='carousel' style={{ transform: `translateX(-${sliderOffset}px)` }}>
            <Card title='Movies' requestData='discover/movie' />
        </div>
    )
}

export default Carousel