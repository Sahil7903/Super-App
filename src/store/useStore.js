import { create } from 'zustand';

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  selectedCategories: JSON.parse(localStorage.getItem('selectedCategories')) || [],
  notes: localStorage.getItem('notes') || '',

  setUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },
  
  setSelectedCategories: (categories) => {
    localStorage.setItem('selectedCategories', JSON.stringify(categories));
    set({ selectedCategories: categories });
  },

  setNotes: (newNotes) => {
    localStorage.setItem('notes', newNotes);
    set({ notes: newNotes });
  },

  clearData: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('selectedCategories');
    localStorage.removeItem('notes');
    set({ user: null, selectedCategories: [], notes: '' });
  }
}));

export default useStore;
