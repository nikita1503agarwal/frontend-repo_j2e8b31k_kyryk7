import React, { useEffect, useRef, useState } from 'react';

export default function DesktopIcon({ icon, label, onOpen }) {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    let t;
    if (clicks === 1) {
      t = setTimeout(() => setClicks(0), 300);
    }
    if (clicks === 2) {
      onOpen();
      setClicks(0);
    }
    return () => t && clearTimeout(t);
  }, [clicks, onOpen]);

  useEffect(() => {
    const el = ref.current;
    const onKey = (e) => {
      if (focused && (e.key === 'Enter' || e.key === 'Return')) {
        onOpen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused, onOpen]);

  return (
    <button
      ref={ref}
      className={`w-24 focus:outline-none text-white text-xs flex flex-col items-center gap-1 p-2 bg-transparent ${
        focused ? 'ring-1 ring-white/70' : ''
      }`}
      onClick={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onDoubleClick={onOpen}
      onMouseDown={() => setClicks((c) => c + 1)}
    >
      <img src={icon} alt="" className="w-12 h-12 image-render-pixel" />
      <span className="bg-[#000080]/80 px-1">{label}</span>
    </button>
  );
}
