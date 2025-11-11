import React, { useEffect, useRef, useState } from 'react';

const canned = {
  help: 'Commands: help, ls, about',
  ls: 'bin  etc  home  usr  retro.txt',
  about: 'RetroScreen Terminal v0.1 — all pretend, all vibes.'
};

export default function Terminal() {
  const [lines, setLines] = useState(['Welcome to RetroScreen. Type "help".']);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);

  const onSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    setLines((l) => [...l, `> ${cmd}`, canned[cmd] || 'Unknown command']);
    setInput('');
  };

  return (
    <div className="w-full h-full bg-black text-green-400 font-mono text-sm p-2">
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">{l}</div>
      ))}
      <div ref={endRef} />
      <form onSubmit={onSubmit} className="flex items-center gap-2 mt-2">
        <span>&gt;</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black text-green-400 outline-none"
        />
      </form>
    </div>
  );
}
