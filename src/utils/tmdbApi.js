import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
export const PLACEHOLDER = 'https://placehold.co/500x750?text=No+Image';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

// Search movies by query
export const searchMovies = async (query, page = 1) => {
  const res = await tmdb.get('/search/movie', {
    params: { query, page },
  });
  return res.data;
};

// Get trending movies (shown on load)
export const getTrending = async () => {
  const res = await tmdb.get('/trending/movie/week');
  return res.data;
};

// Get full movie details + credits + videos
export const getMovieDetails = async (id) => {
  const [details, credits, videos] = await Promise.all([
    tmdb.get(`/movie/${id}`),
    tmdb.get(`/movie/${id}/credits`),
    tmdb.get(`/movie/${id}/videos`),
  ]);
  return {
    ...details.data,
    cast: credits.data.cast.slice(0, 8),
    trailer: videos.data.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    ),
  };
};

export const getPosterUrl = (path) =>
  path ? `${IMAGE_BASE}${path}` : PLACEHOLDER;
