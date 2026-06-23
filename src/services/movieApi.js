import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getMoviesByCategory = async (category) => {
  if (!API_KEY) {
    return [
      {
        id: Math.random(),
        title: `Mock ${category} Movie 1`,
        poster_path: null,
        release_date: "2023-01-01",
        overview: "A great mock movie overview that explains nothing yet everything.",
        vote_average: 8.5
      },
      {
        id: Math.random(),
        title: `Mock ${category} Movie 2`,
        poster_path: null,
        release_date: "2022-05-12",
        overview: "Another mock movie that is full of suspense and drama.",
        vote_average: 7.2
      },
      {
        id: Math.random(),
        title: `Mock ${category} Movie 3`,
        poster_path: null,
        release_date: "2021-08-20",
        overview: "A beautiful cinematic experience.",
        vote_average: 6.8
      },
      {
        id: Math.random(),
        title: `Mock ${category} Movie 4`,
        poster_path: null,
        release_date: "2020-11-15",
        overview: "Action packed and thrilling from start to finish.",
        vote_average: 9.1
      }
    ];
  }

  const genres = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Music: 10402,
    Sports: 99,
    Thriller: 53,
    Fantasy: 14,
    Romance: 10749
  };

  const genreId = genres[category] || 28;

  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        page: 1
      }
    });
    return response.data.results.slice(0, 4);
  } catch (error) {
    console.error(`Error fetching movies for ${category}:`, error);
    return [];
  }
};
