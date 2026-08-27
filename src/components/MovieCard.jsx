import { getPosterUrl } from '../utils/tmdbApi';

const MovieCard = ({ movie, onClick }) => {
  const { title, poster_path, release_date, vote_average } = movie;
  const year = release_date ? release_date.split('-')[0] : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  const ratingColor =
    vote_average >= 7 ? 'text-green-400' :
    vote_average >= 5 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div
      onClick={() => onClick(movie.id)}
      className="group cursor-pointer bg-white/5 rounded-2xl overflow-hidden
                 border border-white/10 hover:border-yellow-400/50
                 hover:bg-white/10 hover:-translate-y-1
                 transition-all duration-200"
    >
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={getPosterUrl(poster_path)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black/70 rounded-lg px-2 py-1 flex items-center gap-1">
          <span className="text-yellow-400 text-xs">⭐</span>
          <span className={`text-xs font-bold ${ratingColor}`}>{rating}</span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-white font-semibold text-sm line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-400 text-xs mt-1">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
