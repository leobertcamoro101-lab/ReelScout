const SearchBar = ({ query, onChange, onClear }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
        🔍
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for movies..."
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400
                   rounded-2xl py-4 pl-12 pr-12 text-lg outline-none
                   focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30
                   transition-all duration-200 backdrop-blur-sm"
      />
      {query && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400
                     hover:text-white transition-colors text-xl"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
