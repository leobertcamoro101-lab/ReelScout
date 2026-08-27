import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onMovieClick, loading, onLoadMore, hasMore, isSearching }) => {
  if (!loading && movies.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-4">🎬</p>
        <p className="text-lg">No movies found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>

      {/* Load More button */}
      {hasMore && isSearching && (
        <div className="text-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold
                       px-8 py-3 rounded-2xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* Skeleton loading cards */}
      {loading && movies.length === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-[2/3] bg-white/10" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
