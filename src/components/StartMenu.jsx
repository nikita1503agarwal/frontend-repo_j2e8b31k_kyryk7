import React from 'react';

export default function StartMenu({ open, onClose, onLaunch }) {
  if (!open) return null;
  return (
    <div className="absolute bottom-10 left-1 w-56 bg-[#c0c0c0] border border-black/60 p-1" role="menu" aria-label="Start menu">
      {[
        { id: 'terminal', title: 'Terminal' },
        { id: 'notes', title: 'Notes' },
        { id: 'gallery', title: 'Gallery' },
        { id: 'settings', title: 'Settings' },
        { id: 'about', title: 'About' },
      ].map((item) => (
        <button
          key={item.id}
          role="menuitem"
          className="w-full text-left px-2 py-1 bg-[#dcdcdc] hover:bg-[#e8e8e8] border border-black/40 mb-1"
          onClick={() => {
            onLaunch(item.id);
            onClose();
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
