import React from 'react';

const WALLS = ['/wallpapers/w1.png','/wallpapers/w2.png','/wallpapers/w3.png','/wallpapers/w4.png','/wallpapers/w5.png'];

export default function Gallery({ setWallpaper }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {WALLS.map((w) => (
        <div key={w} className="border border-black/40 bg-white p-1">
          <img src={w} alt="wallpaper" className="w-full h-32 object-cover image-render-pixel" />
          <button className="mt-1 w-full bg-[#dcdcdc] border border-black/60 text-sm" onClick={() => setWallpaper(w)}>
            Set as wallpaper
          </button>
        </div>
      ))}
    </div>
  );
}
