import React from 'react';
import useStore from '../store/useStore';

const UserProfile = () => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);

  return (
    <div className="flex w-full items-start gap-6">
      <div 
        className="w-[120px] h-[160px] shrink-0 bg-white rounded-xl bg-cover bg-center" 
        style={{ backgroundImage: "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4')" }} 
      />
      <div className="flex flex-col flex-1 py-2">
        <h2 className="text-xl md:text-2xl font-bold mb-1 text-white">{user?.name}</h2>
        <h3 className="text-base text-zinc-300 font-medium mb-1">{user?.email}</h3>
        <h4 className="text-2xl md:text-3xl font-black mb-4 text-white uppercase">{user?.username}</h4>
        
        <div className="flex flex-wrap gap-2 max-h-[80px] overflow-y-auto pr-2 custom-scrollbar">
          {selectedCategories?.map(cat => (
            <span key={cat} className="bg-[#9F94FF] text-black text-sm font-semibold px-4 py-1.5 rounded-full">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
