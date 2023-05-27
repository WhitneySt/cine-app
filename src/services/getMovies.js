import axios from "axios";

const URL_API = "https://api.themoviedb.org/3/movie/now_playing";
const API_KEY = "912ecfda069342c00301ac1533087681";

export const getMovies = async () => {
  try {
    const { data } = await axios.get(
      `${URL_API}?api_key=${API_KEY}&language=es-ES`
    );

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMovie = async (idMovie) => {
  try {
    const url = `
https://api.themoviedb.org/3/movie/${idMovie}?api_key=${API_KEY}&language=es-ES`;
      const { data } = await axios.get(url);
      console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getVideoMovie = async (idMovie) => {
    try {
        const url = `
https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=${API_KEY}&language=es-ES`;
        
        const { data } = await axios.get(url);
        const video = data.results.find((item) =>
          item.type.toLowerCase().includes("trailer")
        );
        return video;
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}
