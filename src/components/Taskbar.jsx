import React, { useEffect, useMemo, useState } from 'react';
import { useWindowManager } from './WindowManager.jsx';

export default function Taskbar({ onToggleStart }) {
  const { windows, activeId, focusWindow } = useWindowManager();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const timeStr = useMemo(() => now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), [now]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t border-black/60 flex items-center px-1 gap-1">
      <button
        aria-label="Start"
        className="px-3 h-8 bg-[#dcdcdc] border border-black/60 text-black text-sm"
        onClick={onToggleStart}
      >
        Start
      </button>
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {windows.map((w) => (
          <button
            key={w.id}
            className={`px-2 h-8 min-w-[100px] text-left text-xs border border-black/60 ${
              activeId === w.id && !w.minimized ? 'bg-[#000080] text-white' : 'bg-[#dcdcdc] text-black'
            }`}
            onClick={() => focusWindow(w.id)}
          >
            {w.title}
          </button>
        ))}
      </div>
      <div className="w-24 h-8 bg-[#dcdcdc] border border-black/60 text-right px-2 py-1 text-xs">{timeStr}</div>
    </div>
  );
}
