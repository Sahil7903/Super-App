import React from 'react';
import useStore from '../store/useStore';

const NotesWidget = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h2 className="text-[32px] font-bold mb-4 font-serif">All notes</h2>
      <textarea 
        value={notes}
        onChange={handleChange}
        placeholder="Type something..."
        className="w-full flex-1 bg-transparent resize-none outline-none font-medium text-xl placeholder-black/30 text-black overflow-y-auto leading-relaxed custom-scrollbar"
      />
    </div>
  );
};

export default NotesWidget;
