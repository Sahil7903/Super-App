import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80';
    
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-[#111] rounded-[24px] w-full max-w-4xl flex flex-col md:flex-row overflow-hidden relative shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black font-bold text-xl transition-colors backdrop-blur-md"
        >
          ✕
        </button>
        
        <div className="w-full md:w-2/5 md:h-[500px]">
          <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="w-full md:w-3/5 p-8 flex flex-col">
          <h2 className="text-4xl font-bold mb-3 text-white leading-tight">{movie.title}</h2>
          <div className="flex items-center gap-4 mb-8 text-sm font-semibold text-zinc-400">
            <span className="bg-white/10 px-3 py-1 rounded">{movie.release_date || 'Unknown Date'}</span>
            <span className="flex items-center gap-1 text-yellow-500">
              ★ <span className="text-zinc-300">{movie.vote_average || 'N/A'}</span>
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-white">Overview</h3>
          <p className="text-zinc-400 leading-relaxed font-medium text-lg lg:text-base mr-4 overflow-y-auto custom-scrollbar max-h-[150px]">
            {movie.overview || "No overview available for this movie."}
          </p>
          
          <button 
            onClick={onClose}
            className="mt-auto bg-green-500 hover:bg-green-600 text-white py-3 px-10 rounded-full font-bold self-start transition-all transform hover:scale-105 active:scale-95"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
