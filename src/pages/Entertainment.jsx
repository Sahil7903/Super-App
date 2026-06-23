import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { getMoviesByCategory } from '../services/movieApi';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const Entertainment = () => {
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const selectedCategories = useStore(state => state.selectedCategories);
  
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      const results = [];
      for (const category of selectedCategories) {
        const categoryMovies = await getMoviesByCategory(category);
        results.push({
          category,
          movies: categoryMovies
        });
      }
      setMoviesData(results);
      setLoading(false);
    };
    
    if (selectedCategories.length > 0) {
      fetchAllMovies();
    }
  }, [selectedCategories]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-green-500 text-3xl font-extrabold font-serif">Super app</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="bg-transparent text-sm md:text-base border-2 border-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold hover:bg-white hover:text-black transition-colors">
            Dashboard
          </button>
          <div className="w-[50px] h-[50px] rounded-full bg-white bg-cover bg-center shrink-0 cursor-pointer" style={{ backgroundImage: "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4')" }} />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-10 text-white/90">Entertainment according to your choices</h2>
      
      {loading ? (
        <div className="text-center py-20 text-2xl font-bold text-zinc-500">Loading entertainment...</div>
      ) : (
        <div className="flex flex-col gap-12">
          {moviesData.map((data) => (
            <div key={data.category}>
              <h3 className="text-2xl font-bold mb-6 text-zinc-400">{data.category}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {data.movies.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onClick={() => setSelectedMovie(movie)} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default Entertainment;
