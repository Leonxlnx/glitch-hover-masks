import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface LiquidGlitchImageProps {
  imgNormal: string;
  imgGlitch: string;
  alt: string;
  width?: number;
  height?: number;
}

const LiquidGlitchImage: React.FC<LiquidGlitchImageProps> = ({ 
  imgNormal, 
  imgGlitch, 
  alt,
  width = 500, 
  height // optional
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const hoverStrength = useMotionValue(0);
  const smoothHover = useSpring(hoverStrength, { damping: 20, stiffness: 50 });
  
  // -- ORGANIC PHYSICS ENGINE --
  
  // Layer 1: The "Head" - Fast response, main cursor position
  const springHead = { damping: 25, stiffness: 200, mass: 0.5 };
  const headX = useSpring(mouseX, springHead);
  const headY = useSpring(mouseY, springHead);
  
  // Layer 2: The "Body" - Medium lag, creates volume
  const springBody = { damping: 35, stiffness: 120, mass: 0.8 };
  const bodyX = useSpring(mouseX, springBody);
  const bodyY = useSpring(mouseY, springBody);

  // Layer 3: The "Tail" - Heavy lag, creates the "drag" effect
  const springTail = { damping: 50, stiffness: 80, mass: 1.2 };
  const tailX = useSpring(mouseX, springTail);
  const tailY = useSpring(mouseY, springTail);

  // Transforms for SVG
  const headCx = useTransform(headX, v => `${v * 100}%`);
  const headCy = useTransform(headY, v => `${v * 100}%`);
  
  const bodyCx = useTransform(bodyX, v => `${v * 100}%`);
  const bodyCy = useTransform(bodyY, v => `${v * 100}%`);
  
  const tailCx = useTransform(tailX, v => `${v * 100}%`);
  const tailCy = useTransform(tailY, v => `${v * 100}%`);

  // Dynamic Radii - Scaled up for larger image size (approx 2x previous size)
  const rHead = useTransform(smoothHover, [0, 1], [0, 90]);
  const rBody = useTransform(smoothHover, [0, 1], [0, 70]);
  const rTail = useTransform(smoothHover, [0, 1], [0, 50]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      className="relative rounded-lg overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800/50 cursor-crosshair group"
      style={{ 
        maxWidth: '100%', 
        width: width,
        aspectRatio: '4 / 5'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        hoverStrength.set(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        hoverStrength.set(0);
      }}
    >
      <svg 
        className="absolute inset-0 w-full h-full block pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 
            ORGANIC BLOB FILTER
            - High Displacement Scale (60) = Irregular shapes (not circles)
            - Low Frequency Noise = Smooth waviness
            - High Blur + Contrast = Gooey merging (Metaball effect)
          */}
          <filter id="blobFilter" colorInterpolationFilters="sRGB">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.006" 
              numOctaves="2" 
              result="noise" 
            >
              <animate 
                attributeName="baseFrequency" 
                values="0.006;0.01;0.006" 
                dur="6s" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="60" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
            
            {/* Blurring the 3 circles together */}
            <feGaussianBlur stdDeviation="12" />
            
            {/* Hardening the blur into a solid shape */}
            <feColorMatrix 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" 
            />
          </filter>

          <mask id="blobMask">
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            {/* The 3 Blobs Group */}
            <g filter="url(#blobFilter)">
              <motion.circle cx={headCx} cy={headCy} r={rHead} fill="white" />
              <motion.circle cx={bodyCx} cy={bodyCy} r={rBody} fill="white" />
              <motion.circle cx={tailCx} cy={tailCy} r={rTail} fill="white" />
            </g>
          </mask>
        </defs>

        {/* 1. Base Layer */}
        <image 
          href={imgNormal} 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          preserveAspectRatio="xMidYMid slice"
        />

        {/* 2. Top Layer (The Reveal) */}
        <image 
          href={imgGlitch} 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          preserveAspectRatio="xMidYMid slice"
          mask="url(#blobMask)"
        />

        {/* 3. Wet/Glossy Highlight (Subtle Shine, no hard stroke) */}
        {/* We reuse the mask to apply a subtle white overlay for a "wet" look */}
        <rect 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          fill="white"
          mask="url(#blobMask)"
          opacity="0.1"
          style={{ mixBlendMode: 'overlay' }}
        />
      </svg>
    </div>
  );
};

export default LiquidGlitchImage;