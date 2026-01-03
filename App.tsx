import React from 'react';
import LiquidGlitchImage from './components/LiquidGlitchImage';

const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-neutral-950">
      
      {/* Background Ambience - slightly dimmed */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="z-10 flex flex-col items-center justify-center p-4">
        <LiquidGlitchImage 
          imgNormal="https://i.ibb.co/G3n9ZDBf/karpathy-normal.png"
          imgGlitch="https://i.ibb.co/kV2D6fGh/karpathy-glitch.png"
          alt="Andrej Karpathy"
          width={500}
        />
      </div>
    </main>
  );
};

export default App;