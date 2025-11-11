import React, { useEffect, useRef, useState } from 'react';

const THEMES = [
  { id: 'gray', name: 'Gray' },
  { id: 'teal', name: 'Teal' },
  { id: 'beige', name: 'Beige' },
];

// Very small chiptune-like beep loop (WAV) embedded as data URI
const LOOP_SRC = "data:audio/wav;base64,UklGRmQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABYAAAACAAACaW5mbyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgAAABAACAgICAgP8AAP//AAAAAP//AAD//wAA//8AAP//AAD//wAA";

export default function Settings({ theme, setTheme, scale, setScale }) {
  const audioRef = useRef(null);
  const [music, setMusic] = useState(() => localStorage.getItem('retro.music') === 'on');

  useEffect(() => {
    localStorage.setItem('retro.music', music ? 'on' : 'off');
    const a = audioRef.current;
    if (!a) return;
    if (music) { a.loop = true; a.play().catch(() => {}); } else { a.pause(); a.currentTime = 0; }
  }, [music]);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm mb-1">Theme</div>
        <div className="flex gap-2">
          {THEMES.map((t) => (
            <button key={t.id} className={`px-2 py-1 border border-black/60 ${theme===t.id?'bg-[#000080] text-white':'bg-[#dcdcdc] text-black'}`} onClick={() => setTheme(t.id)}>{t.name}</button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm mb-1">UI Scale: {scale}%</div>
        <input type="range" min={90} max={110} value={scale} onChange={(e)=>setScale(Number(e.target.value))} />
      </div>
      <div className="flex items-center gap-2">
        <input id="music" type="checkbox" checked={music} onChange={(e)=>setMusic(e.target.checked)} />
        <label htmlFor="music">Background music</label>
      </div>
      <audio ref={audioRef} src={LOOP_SRC} />
    </div>
  );
}
