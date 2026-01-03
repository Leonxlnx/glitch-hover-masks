import React from 'react';
import LiquidGlitchImage from './components/LiquidGlitchImage';

const App: React.FC = () => {
  const imgNormal = "https://i.ibb.co/G3n9ZDBf/karpathy-normal.png";
  const imgGlitch = "https://i.ibb.co/kV2D6fGh/karpathy-glitch.png";

  return (
    <main className="w-full min-h-screen flex flex-col items-center relative bg-neutral-950 pb-32">
      
      {/* Global Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-purple-900/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-rose-900/5 rounded-full blur-[100px]" />
      </div>

      <header className="relative z-10 py-24 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          The 10 Effects
        </h1>
        <p className="text-neutral-500 text-lg max-w-lg mx-auto">
          Different configurations of the organic liquid engine.
        </p>
      </header>

      <div className="z-10 flex flex-col gap-32 w-full max-w-xl px-6">
        
        {/* 1. The Original */}
        <ShowcaseItem 
          number="01" 
          title="Standard Liquid" 
          desc="The classic gooey hover effect. Smooth and responsive."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="01"
            mode="hover" physics="standard" intensity="medium"
          />
        </ShowcaseItem>

        {/* 2. The Heavyweight */}
        <ShowcaseItem 
          number="02" 
          title="Heavy Molasses" 
          desc="High mass and damping. The liquid feels thick, oily, and slow."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="02"
            mode="hover" physics="heavy" intensity="medium" baseRadius={0.25}
          />
        </ShowcaseItem>

        {/* 3. The Nervous Glitch */}
        <ShowcaseItem 
          number="03" 
          title="Nervous Energy" 
          desc="Low damping, high frequency noise. A chaotic, jittery reveal."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="03"
            mode="hover" physics="nervous" intensity="extreme" baseRadius={0.18}
          />
        </ShowcaseItem>

        {/* 4. Click Toggle */}
        <ShowcaseItem 
          number="04" 
          title="Click to Freeze" 
          desc="Interaction mode changed to Click. The state persists."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="04"
            mode="click" physics="standard" baseRadius={0.3}
          />
        </ShowcaseItem>

        {/* 5. The Invert */}
        <ShowcaseItem 
          number="05" 
          title="Inverted Reality" 
          desc="The glitch is the reality. Hover to reveal the clean version."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="05"
            mode="hover" physics="elastic" inverted={true}
          />
        </ShowcaseItem>

        {/* 6. Scroll Scanner */}
        <ShowcaseItem 
          number="06" 
          title="Scroll Scanner" 
          desc="No mouse interaction. The reveal is driven by your scroll position."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="06"
            mode="scroll" physics="standard" intensity="subtle" baseRadius={0.25}
          />
        </ShowcaseItem>

        {/* 7. Auto Pilot */}
        <ShowcaseItem 
          number="07" 
          title="Auto Pilot" 
          desc="Autonomous movement using a Lissajous curve."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="07"
            mode="auto" physics="standard" intensity="medium"
          />
        </ShowcaseItem>

        {/* 8. Tiny Torch */}
        <ShowcaseItem 
          number="08" 
          title="Tiny Torch" 
          desc="A very small, precise radius for subtle details."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="08"
            mode="hover" physics="standard" baseRadius={0.1} intensity="subtle"
          />
        </ShowcaseItem>

        {/* 9. Massive Spill */}
        <ShowcaseItem 
          number="09" 
          title="Massive Spill" 
          desc="Huge radius that consumes almost the entire image."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="09"
            mode="hover" physics="heavy" baseRadius={0.5} intensity="extreme"
          />
        </ShowcaseItem>

        {/* 10. Elastic Bounce */}
        <ShowcaseItem 
          number="10" 
          title="Elastic Bounce" 
          desc="Very low damping. The blob acts like a jelly spring."
        >
          <LiquidGlitchImage 
            imgNormal={imgNormal} imgGlitch={imgGlitch} alt="10"
            mode="hover" physics="elastic" baseRadius={0.22}
          />
        </ShowcaseItem>

      </div>
    </main>
  );
};

const ShowcaseItem: React.FC<{
  number: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}> = ({ number, title, desc, children }) => (
  <div className="flex flex-col gap-6">
    <div className="flex items-baseline gap-4 border-b border-white/10 pb-4">
      <span className="text-white/30 font-mono text-xl">{number}</span>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    <div className="w-full">
      {children}
    </div>
    <p className="text-neutral-400 font-light leading-relaxed">
      {desc}
    </p>
  </div>
);

export default App;