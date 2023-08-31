import axios from 'axios'

const API_KEY = '70b4fae10e1f2ae4e4fb74fc69dcbd73'
const API_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original/'

export const getCardDetails = async (requestData) => {
    try {
        const response = await axios.get(
            `${API_URL}/${requestData}?api_key=${API_KEY}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};