import React from 'react';
import Desktop from './components/Desktop.jsx';
import { WindowManagerProvider } from './components/WindowManager.jsx';

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#008080] text-[13px] font-mono">
      <WindowManagerProvider>
        <Desktop />
      </WindowManagerProvider>
    </div>
  );
}

export default App;
