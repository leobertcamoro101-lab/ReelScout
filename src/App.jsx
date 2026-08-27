import useSearch from './hooks/useSearch';
import useMovieDetail from './hooks/useMovieDetail';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';

function App() {
  const {
    query, setQuery,
    movies, loading, error,
    page, totalPages, loadMore,
    clearSearch, isSearching,
  } = useSearch();

  const {
    movie, loading: detailLoading,
    fetchMovie, clearMovie,
  } = useMovieDetail();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-4">
          <h1 className="text-2xl font-bold text-yellow-400 shrink-0">🎬 MovieSearch</h1>
          <SearchBar query={query} onChange={setQuery} onClear={clearSearch} />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Section title */}
        <h2 className="text-gray-400 text-sm uppercase tracking-widest mb-6">
          {isSearching ? `Results for "${query}"` : '🔥 Trending This Week'}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mb-6">
            ⚠️ {error}
          </div>
        )}

        <MovieGrid
          movies={movies}
          onMovieClick={fetchMovie}
          loading={loading}
          onLoadMore={loadMore}
          hasMore={page < totalPages}
          isSearching={isSearching}
        />
      </main>

      {/* Movie Detail Modal */}
      {(movie || detailLoading) && (
        <MovieModal
          movie={movie}
          loading={detailLoading}
          onClose={clearMovie}
        />
      )}
    </div>
  );
}

export default App;
