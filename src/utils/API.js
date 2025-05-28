import axios from "axios";

const API_KEY = "d53faa548947914998a2cd2461c8ae72";
const BASE_URL = "https://api.themoviedb.org/3";

const CINEMA_URL =
  "https://cdn.jsdelivr.net/gh/Sh3dow-ware/cinema-data@v1.0.1/cinema-data.json";

// Create a pre-configured axios instance
const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// General purpose fetcher
export const fetchFromTMDB = async (endpoint, customParams = {}) => {
  try {
    const response = await tmdb.get(endpoint, {
      params: customParams,
    });
    return response.data;
  } catch (error) {
    console.error("TMDB fetch error:", error);
    return null;
  }
};

export const getMovieWithImages = async (movieId) => {
  return await fetchFromTMDB(`/movie/${movieId}`, {
    append_to_response: "images",
    include_image_language: "en,null",
  });
};

export async function getCinemas() {
  try {
    const res = await axios.get(
      "https://cdn.jsdelivr.net/gh/Sh3dow-ware/cinema-data@v1.0.1/cinema-data.json"
    );
    return res.data;
  } catch (err) {
    console.error("Failed to fetch cinema data:", err);
    return null;
  }
}
