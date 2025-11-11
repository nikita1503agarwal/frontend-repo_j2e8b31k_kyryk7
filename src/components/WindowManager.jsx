import React, { createContext, useContext, useMemo, useRef, useState, useEffect } from 'react';

// WindowManager provides z-index ordering, active window tracking, and global actions
const WindowManagerContext = createContext(null);

let zCounterStart = 10; // base z for windows

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState([]); // {id, appId, title, minimized, bounds}
  const [activeId, setActiveId] = useState(null);
  const zCounterRef = useRef(zCounterStart);

  // Bring a window to front and mark active
  const focusWindow = (id) => {
    setWindows((prev) => {
      const maxZ = ++zCounterRef.current;
      return prev.map((w) => (w.id === id ? { ...w, z: maxZ, minimized: false } : w));
    });
    setActiveId(id);
  };

  const openWindow = (app) => {
    // if exists minimized/hidden, just focus it
    const existing = windows.find((w) => w.appId === app.id);
    if (existing) {
      focusWindow(existing.id);
      return existing.id;
    }
    const id = `${app.id}-${Date.now()}`;
    const z = ++zCounterRef.current;
    const bounds = { x: 80 + windows.length * 24, y: 80 + windows.length * 24, w: 520, h: 360 };
    const win = { id, appId: app.id, title: app.title, z, minimized: false, bounds };
    setWindows((prev) => [...prev, win]);
    setActiveId(id);
    return id;
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((a) => (a === id ? null : a));
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  };

  const setBounds = (id, bounds) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, bounds } : w)));
  };

  const value = useMemo(
    () => ({
      windows,
      activeId,
      openWindow,
      closeWindow,
      minimizeWindow,
      setBounds,
      focusWindow,
    }),
    [windows, activeId]
  );

  // global Esc to close active window
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && activeId) {
        closeWindow(activeId);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId]);

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within provider');
  return ctx;
}
