import { useEffect } from 'react';
import { getPosterUrl } from '../utils/tmdbApi';

const MovieModal = ({ movie, loading, onClose }) => {
  // Close on Escape key — NEW CONCEPT: keyboard event listeners
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!movie) return null;

  const {
    title, overview, poster_path, backdrop_path,
    release_date, vote_average, runtime, genres,
    cast, trailer,
  } = movie;

  const year = release_date?.split('-')[0];
  const hours = Math.floor(runtime / 60);
  const mins = runtime % 60;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh]
                   overflow-y-auto border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        {backdrop_path && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </div>
        )}

        <div className="p-6 flex gap-6">
          {/* Poster */}
          <img
            src={getPosterUrl(poster_path)}
            alt={title}
            className="w-32 rounded-xl flex-shrink-0 -mt-16 relative shadow-xl border border-white/10"
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-2xl font-bold leading-tight">{title}</h2>
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-400">
              <span>{year}</span>
              {runtime > 0 && <span>· {hours}h {mins}m</span>}
              <span className="text-yellow-400 font-bold">⭐ {vote_average?.toFixed(1)}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-3">
              {genres?.map((g) => (
                <span key={g.id} className="bg-yellow-400/10 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-400/20">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Overview */}
          <p className="text-gray-300 leading-relaxed">{overview}</p>

          {/* Trailer */}
          {trailer && (
            <div>
              <h3 className="text-white font-semibold mb-2">Trailer</h3>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Cast */}
          {cast?.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3">Cast</h3>
              <div className="grid grid-cols-4 gap-2">
                {cast.map((member) => (
                  <div key={member.id} className="text-center">
                    <img
                      src={member.profile_path
                        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                        : 'https://placehold.co/185x278?text=N/A'}
                      alt={member.name}
                      className="w-full rounded-xl aspect-[2/3] object-cover mb-1"
                    />
                    <p className="text-white text-xs font-medium line-clamp-1">{member.name}</p>
                    <p className="text-gray-400 text-xs line-clamp-1">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 text-white
                       py-3 rounded-2xl font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
