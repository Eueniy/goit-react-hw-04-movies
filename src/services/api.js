import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "391b2d1db9dbdb9389706b677b0d9f31";

export const getMoviesTrend = () =>
  axios.get(BASE_URL + `trending/all/day?api_key=${API_KEY}`);

export const getMovieWithId = (id) =>
  axios.get(BASE_URL + `movie/${id}?api_key=${API_KEY}`);

export const getMovieCast = (id) =>
  axios.get(BASE_URL + `movie/${id}/credits?api_key=${API_KEY}`);

export const getMovieReviews = (id) =>
  axios.get(BASE_URL + `movie/${id}/reviews?api_key=${API_KEY}`);

export const getMovieByQuery = (query) =>
  axios.get(BASE_URL + `search/movie?api_key=${API_KEY}&query=${query}`);
