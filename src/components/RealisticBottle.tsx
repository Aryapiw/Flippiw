import React from 'react';

interface RealisticBottleProps {
  className?: string;
  isGlowing?: boolean;
}

export const RealisticBottle: React.FC<RealisticBottleProps> = ({
  className = '',
  isGlowing = false,
}) => {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Neobrutalism Graphic Bottle with Heavy Black Outlines, Flat Pop Colors & Crisp Drop Shadow */}
      <svg
        viewBox="0 0 100 240"
        className={`w-20 sm:w-24 md:w-28 h-auto transition-all duration-300 ${
          isGlowing
            ? 'filter drop-shadow-[0_0_16px_#FFE600] drop-shadow-[6px_6px_0px_#000000]'
            : 'filter drop-shadow-[6px_6px_0px_#000000]'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Bottle Cap (Vibrant Yellow with bold black ridges) */}
        <rect
          x="35"
          y="8"
          width="30"
          height="16"
          fill="#FFE600"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Cap Ribs */}
        <line x1="42" y1="8" x2="42" y2="24" stroke="#000000" strokeWidth="2.5" />
        <line x1="50" y1="8" x2="50" y2="24" stroke="#000000" strokeWidth="2.5" />
        <line x1="58" y1="8" x2="58" y2="24" stroke="#000000" strokeWidth="2.5" />

        {/* Cap Base Ring */}
        <rect
          x="33"
          y="24"
          width="34"
          height="6"
          fill="#00F0FF"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 2. Main Bottle Body (Crisp white canvas with 4px black borders) */}
        <path
          d="M38 30 H62 V42 C62 50 76 60 82 72 V208 C82 220 74 228 60 228 H40 C26 228 18 220 18 208 V72 C24 60 38 50 38 42 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* 3. Water / Liquid Level (~35% full for realistic center-of-gravity flip) */}
        <path
          d="M20 148 Q50 144 80 148 V208 C80 219 73 226 60 226 H40 C27 226 20 219 20 208 Z"
          fill="#00F0FF"
          stroke="#000000"
          strokeWidth="3"
        />
        {/* Water Surface Line */}
        <path
          d="M20 148 Q50 142 80 148"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Water Graphic Bubbles */}
        <circle cx="32" cy="178" r="3.5" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
        <circle cx="48" cy="196" r="2.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
        <circle cx="68" cy="168" r="2" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />

        {/* 4. Grip Grooves (Neobrutalist dashed black lines) */}
        <line x1="22" y1="84" x2="78" y2="84" stroke="#000000" strokeWidth="3" strokeDasharray="6 3" />
        <line x1="22" y1="94" x2="78" y2="94" stroke="#000000" strokeWidth="3" strokeDasharray="6 3" />

        {/* 5. Neobrutalist Label Banner */}
        <rect
          x="18"
          y="104"
          width="64"
          height="36"
          fill="#000000"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <rect
          x="21"
          y="107"
          width="58"
          height="30"
          fill="#FFE600"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Label Badge Text */}
        <text
          x="50"
          y="122"
          textAnchor="middle"
          fill="#000000"
          fontSize="11"
          fontWeight="900"
          fontFamily="Space Mono, monospace"
          letterSpacing="0.06em"
        >
          FLIP!
        </text>
        <text
          x="50"
          y="132"
          textAnchor="middle"
          fill="#000000"
          fontSize="5.5"
          fontWeight="900"
          fontFamily="Space Mono, monospace"
        >
          APBN 2026
        </text>

        {/* 6. Bold Graphic Specular Shine Strip */}
        <rect x="25" y="60" width="5" height="152" fill="#FFFFFF" opacity="0.9" />
        <rect x="33" y="68" width="2" height="136" fill="#FFFFFF" opacity="0.7" />

        {/* 7. Bottom Base Reinforcement Line */}
        <line x1="28" y1="218" x2="72" y2="218" stroke="#000000" strokeWidth="3" />
      </svg>

      {/* Neobrutalist Floor Shadow */}
      <div className="w-16 sm:w-20 md:w-22 h-3 bg-black border-2 border-black rounded-full mt-0.5 shadow-[2px_2px_0px_#FFE600]" />
    </div>
  );
};
