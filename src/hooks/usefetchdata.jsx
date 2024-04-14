import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT = "/discover/movie";

const fetchMovies = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT}`, {
      params: {
        api_key: API_KEY,
        page: page,
      },
    });

    // console.log(response, "api data fetching");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export { fetchMovies };
