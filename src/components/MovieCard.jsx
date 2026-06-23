import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80'; // fallback

  return (
    <div 
      onClick={onClick}
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-zinc-900 group relative"
    >
      <img src={posterUrl} alt={movie.title} className="w-full h-[200px] md:h-[280px] object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h4 className="text-lg font-bold text-white leading-tight">{movie.title}</h4>
        <p className="text-xs text-zinc-300 mt-1">{movie.release_date?.substring(0, 4) || 'Unknown'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
