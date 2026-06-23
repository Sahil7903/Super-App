import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = async () => {
  if (!API_KEY) {
    return [
      {
        title: "Mock News Headline 1: Discover the Universe",
        description: "Astronomers have found a new exoplanet with Earth-like features.",
        urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
      },
      {
        title: "Mock News Headline 2: Tech Innovations",
        description: "New AI model can predict weather patterns with 99% accuracy.",
        urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
      },
      {
        title: "Mock News Headline 3: Global Markets Rally",
        description: "Major stock indices hit new record highs amid positive tech earnings.",
        urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
      }
    ];
  }

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: API_KEY,
        pageSize: 5
      }
    });
    return response.data.articles.filter(article => article.title && article.urlToImage);
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
