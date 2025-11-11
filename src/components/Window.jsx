import React, { useEffect, useRef } from 'react';
import { useWindowManager } from './WindowManager.jsx';

// Retro window chrome: flat, 1px borders with subtle bevel
export default function Window({ id, title, children }) {
  const { activeId, focusWindow, minimizeWindow, closeWindow, windows, setBounds } = useWindowManager();
  const win = windows.find((w) => w.id === id);
  const ref = useRef(null);
  const isActive = activeId === id;

  // dragging
  const dragData = useRef({ startX: 0, startY: 0, origX: 0, origY: 0, dragging: false });

  const onMouseDownTitle = (e) => {
    if (!win) return;
    focusWindow(id);
    dragData.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: win.bounds.x,
      origY: win.bounds.y,
      dragging: true,
    };
    document.body.style.cursor = 'move';
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragData.current.dragging) return;
      const dx = e.clientX - dragData.current.startX;
      const dy = e.clientY - dragData.current.startY;
      setBounds(id, { ...win.bounds, x: dragData.current.origX + dx, y: dragData.current.origY + dy });
    };
    const onUp = () => {
      if (dragData.current.dragging) {
        dragData.current.dragging = false;
        document.body.style.cursor = 'default';
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [id, setBounds, win]);

  if (!win || win.minimized) return null;

  const { x, y, w, h } = win.bounds;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={title}
      style={{ left: x, top: y, width: w, height: h, zIndex: win.z, userSelect: 'none' }}
      onMouseDown={() => focusWindow(id)}
      className={`absolute bg-[var(--win-bg)] border border-black/60 shadow-none`}
    >
      <div
        onMouseDown={onMouseDownTitle}
        className={`flex items-center justify-between px-2 h-8 cursor-move ${
          isActive ? 'bg-[var(--title-active)] text-white' : 'bg-[var(--title-inactive)] text-black'
        } border-b border-black/60`}
      >
        <div className="text-[12px] font-bold tracking-tight">{title}</div>
        <div className="flex gap-1">
          <button
            aria-label="Minimize"
            className="w-6 h-6 bg-[var(--btn-bg)] border border-black/60 text-black text-xs"
            onClick={() => minimizeWindow(id)}
          >
            _
          </button>
          <button
            aria-label="Close"
            className="w-6 h-6 bg-[var(--btn-bg)] border border-black/60 text-black text-xs"
            onClick={() => closeWindow(id)}
          >
            X
          </button>
        </div>
      </div>
      <div className="p-2 h-[calc(100%-2rem)] overflow-auto bg-[var(--win-inner)]">
        {children}
      </div>
    </div>
  );
}
