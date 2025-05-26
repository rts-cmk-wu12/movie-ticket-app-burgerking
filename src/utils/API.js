import axios from "axios";

const API_KEY = "d53faa548947914998a2cd2461c8ae72";
const BASE_URL = "https://api.themoviedb.org/3";

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
