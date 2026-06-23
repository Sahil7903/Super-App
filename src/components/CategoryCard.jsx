import React from 'react';

const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative rounded-[24px] overflow-hidden cursor-pointer transition-all hover:scale-105 h-[180px] p-6 flex flex-col ${isSelected ? 'border-4 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'border-4 border-transparent'}`}
      style={{ backgroundColor: category.color }}
    >
      <h3 className="font-bold text-white text-2xl z-10">{category.id}</h3>
      <img 
        src={category.image} 
        alt={category.id}
        className="absolute bottom-0 right-0 w-[80%] h-[70%] object-cover rounded-tl-[16px] drop-shadow-xl"
      />
    </div>
  );
};

export default CategoryCard;
