import React, { useState, useEffect } from 'react';
import { getNews } from '../services/newsApi';

const NewsWidget = () => {
  const [newsList, setNewsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const articles = await getNews();
        setNewsList(articles);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (newsList.length === 0) return;
    
    // Changing news article every 2 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsList.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [newsList]);

  if (loading) return <div className="p-8 w-full h-full bg-white text-black text-center pt-20">Loading news...</div>;
  if (newsList.length === 0) return <div className="p-8 w-full h-full bg-white text-black text-center pt-20">No news found</div>;

  const currentArticle = newsList[currentIndex];
  
  const dateObject = new Date();
  const dateStr = dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).replace(/ AM| PM/g, (m) => m.toUpperCase());

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Image area */}
      <div className="h-3/5 w-full relative group">
        <img 
          src={currentArticle.urlToImage || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80'} 
          alt="news" 
          className="w-full h-full object-cover transition-all duration-700 ease-in-out" 
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-16">
          <h2 className="text-white text-2xl font-bold leading-tight">{currentArticle.title}</h2>
        </div>
        <div className="absolute top-4 right-4 bg-white text-black p-3 rounded-md flex flex-col items-center">
           <span className="text-xl font-bold">{timeStr}</span>
           <span className="text-xs font-semibold">{dateStr}</span>
        </div>
      </div>
      
      {/* Text area */}
      <div className="flex-1 bg-white p-6 overflow-hidden">
        <p className="text-black text-[17px] leading-relaxed transition-all duration-500 ease-in-out">
           {currentArticle.description || "Read full article to know more about this news item."}
        </p>
      </div>
    </div>
  );
};

export default NewsWidget;
