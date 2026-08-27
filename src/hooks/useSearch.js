import { useState, useEffect, useCallback } from 'react';
import { searchMovies, getTrending } from '../utils/tmdbApi';

// NEW CONCEPT: debounce — waits until user stops typing before calling API
const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup on every keystroke
  }, [value, delay]);

  return debounced;
};

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  // Load trending on first render
  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      try {
        const data = await getTrending();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch {
        setError('Failed to load trending movies.');
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  // Search whenever debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const search = async () => {
      setLoading(true);
      setError(null);
      setPage(1);
      try {
        const data = await searchMovies(debouncedQuery, 1);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch {
        setError('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [debouncedQuery]);

  // Load more pages
  const loadMore = useCallback(async () => {
    if (page >= totalPages || loading) return;
    const nextPage = page + 1;
    setLoading(true);
    try {
      const data = await searchMovies(debouncedQuery, nextPage);
      setMovies((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch {
      setError('Failed to load more results.');
    } finally {
      setLoading(false);
    }
  }, [page, totalPages, loading, debouncedQuery]);

  const clearSearch = () => {
    setQuery('');
    setMovies([]);
    setPage(1);
  };

  return {
    query, setQuery,
    movies, loading, error,
    page, totalPages, loadMore,
    clearSearch,
    isSearching: !!debouncedQuery.trim(),
  };
};

export default useSearch;
