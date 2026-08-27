import { useState, useCallback } from 'react';
import { getMovieDetails } from '../utils/tmdbApi';

const useMovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovie = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch {
      setError('Failed to load movie details.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMovie = () => setMovie(null);

  return { movie, loading, error, fetchMovie, clearMovie };
};

export default useMovieDetail;
