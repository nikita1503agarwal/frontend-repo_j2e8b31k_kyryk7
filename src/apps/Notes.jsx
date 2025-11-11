import React, { useEffect, useState } from 'react';

export default function Notes() {
  const [text, setText] = useState(() => localStorage.getItem('retro.notes') || '');
  useEffect(() => { localStorage.setItem('retro.notes', text); }, [text]);

  return (
    <div className="w-full h-full">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-full bg-white text-black p-2 border border-black/40 resize-none"
        placeholder="Type notes here..."
      />
    </div>
  );
}
