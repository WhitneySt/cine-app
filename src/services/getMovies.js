import axios from "axios";

const URL_API = "https://api.themoviedb.org/3/movie/now_playing";
const API_KEY ="912ecfda069342c00301ac1533087681"

export const getMovies = async() => {
    try {
        const { data } = await axios.get(
          `${URL_API}?api_key=${API_KEY}&language=es-ES`
        );

        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}