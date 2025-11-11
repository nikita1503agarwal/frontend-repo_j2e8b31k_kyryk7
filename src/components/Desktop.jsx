import React, { useEffect, useMemo, useState } from 'react';
import Taskbar from './Taskbar.jsx';
import StartMenu from './StartMenu.jsx';
import DesktopIcon from './DesktopIcon.jsx';
import { useWindowManager } from './WindowManager.jsx';
import Window from './Window.jsx';

import Terminal from '../apps/Terminal.jsx';
import Notes from '../apps/Notes.jsx';
import Gallery from '../apps/Gallery.jsx';
import Settings from '../apps/Settings.jsx';
import About from '../apps/About.jsx';

const APPS = {
  terminal: { id: 'terminal', title: 'Terminal', Component: Terminal },
  notes: { id: 'notes', title: 'Notes', Component: Notes },
  gallery: { id: 'gallery', title: 'Gallery', Component: Gallery },
  settings: { id: 'settings', title: 'Settings', Component: Settings },
  about: { id: 'about', title: 'About', Component: About },
};

export default function Desktop() {
  const { windows, openWindow } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('retro.wallpaper') || '/wallpapers/w1.svg');
  const [theme, setTheme] = useState(() => localStorage.getItem('retro.theme') || 'teal');
  const [scale, setScale] = useState(() => Number(localStorage.getItem('retro.scale') || 100));

  useEffect(() => {
    const onMeta = (e) => {
      if (e.key === 'Meta') setStartOpen((o) => !o);
    };
    window.addEventListener('keydown', onMeta);
    return () => window.removeEventListener('keydown', onMeta);
  }, []);

  const handleLaunch = (id) => openWindow(APPS[id]);

  // Provide theme via CSS vars
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('retro.theme', theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem('retro.wallpaper', wallpaper);
  }, [wallpaper]);
  useEffect(() => {
    localStorage.setItem('retro.scale', String(scale));
  }, [scale]);

  return (
    <div
      className="w-full h-[calc(100%-14rem)] relative overflow-hidden"
      style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center', imageRendering: 'pixelated' }}
    >
      <div className="absolute inset-0" style={{ transform: `scale(${scale/100})`, transformOrigin: 'top left' }}>
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <DesktopIcon icon="/icons/terminal.png" label="Terminal" onOpen={() => handleLaunch('terminal')} />
          <DesktopIcon icon="/icons/notes.png" label="Notes" onOpen={() => handleLaunch('notes')} />
          <DesktopIcon icon="/icons/gallery.png" label="Gallery" onOpen={() => handleLaunch('gallery')} />
          <DesktopIcon icon="/icons/settings.png" label="Settings" onOpen={() => handleLaunch('settings')} />
          <DesktopIcon icon="/icons/about.png" label="About" onOpen={() => handleLaunch('about')} />
        </div>

        {windows.map((w) => {
          const AppC = APPS[w.appId].Component;
          return (
            <Window key={w.id} id={w.id} title={w.title}>
              <AppC setWallpaper={setWallpaper} theme={theme} setTheme={setTheme} scale={scale} setScale={setScale} />
            </Window>
          );
        })}
      </div>

      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} onLaunch={handleLaunch} />
      <Taskbar onToggleStart={() => setStartOpen((o) => !o)} />
    </div>
  );
}
