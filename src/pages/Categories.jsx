import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import CategoryCard from '../components/CategoryCard';

const CATEGORIES = [
  { id: 'Action', color: '#FF5209', image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&h=300&fit=crop' },
  { id: 'Drama', color: '#D7A4FF', image: 'https://images.unsplash.com/photo-1574267432553-4b40560c57c4?w=400&h=300&fit=crop' },
  { id: 'Romance', color: '#11B800', image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=300&fit=crop' },
  { id: 'Thriller', color: '#84C2FF', image: 'https://images.unsplash.com/photo-1560943588-ac0d5a3ec208?w=400&h=300&fit=crop' },
  { id: 'Western', color: '#902500', image: 'https://images.unsplash.com/photo-1533144865768-45add65ba99a?w=400&h=300&fit=crop' },
  { id: 'Horror', color: '#7358FF', image: 'https://images.unsplash.com/photo-1541019685327-0466dfc5cbcc?w=400&h=300&fit=crop' },
  { id: 'Fantasy', color: '#FF4ADE', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop' },
  { id: 'Music', color: '#E61E32', image: 'https://images.unsplash.com/photo-1470229722913-7c090be5c520?w=400&h=300&fit=crop' },
  { id: 'Fiction', color: '#6CD061', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop' }
];

const Categories = () => {
  const navigate = useNavigate();
  const selectedCategories = useStore((state) => state.selectedCategories);
  const setSelectedCategories = useStore((state) => state.setSelectedCategories);

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleNext = () => {
    if (selectedCategories.length >= 3) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white flex flex-col md:flex-row">
      {/* Left side */}
      <div className="w-full md:w-1/3 flex flex-col md:pr-8 mb-12 md:mb-0">
        <h2 className="text-green-500 text-4xl font-extrabold mb-8 font-serif mt-4">Super app</h2>
        <h1 className="text-5xl font-bold mb-10 leading-tight">Choose your entertainment category</h1>
        
        <div className="flex flex-wrap gap-4 mt-4">
          {selectedCategories.map(cat => (
            <div key={cat} className="bg-green-500 px-4 py-2 rounded-full flex items-center justify-between text-white text-sm font-medium">
              <span>{cat}</span>
              <button onClick={() => toggleCategory(cat)} className="ml-3 text-black font-extrabold">X</button>
            </div>
          ))}
        </div>
        
        {selectedCategories.length < 3 && (
          <p className="text-red-500 mt-8 font-medium flex items-center">
            <span className="mr-2">⚠️</span> Minimum 3 category required
          </p>
        )}
      </div>

      {/* Right side Grid */}
      <div className="w-full md:w-2/3 flex flex-col h-full">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map(category => (
            <CategoryCard 
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.id)}
              onClick={() => toggleCategory(category.id)}
            />
          ))}
        </div>
        
        <div className="flex justify-end mt-10">
          <button 
            onClick={handleNext}
            disabled={selectedCategories.length < 3}
            className={`rounded-full px-10 py-3 font-bold transition-all ${selectedCategories.length >= 3 ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 opacity-50 cursor-not-allowed'}`}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
