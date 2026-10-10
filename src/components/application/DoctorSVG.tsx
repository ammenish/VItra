import React from 'react';

interface DoctorSVGProps {
  isSpeaking: boolean;
  className?: string;
}

export const DoctorSVG: React.FC<DoctorSVGProps> = ({ isSpeaking, className = '' }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients to give it a slight 3D/soft feel similar to the reference */}
        <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d2996c" />
          <stop offset="100%" stopColor="#b87a4c" />
        </linearGradient>
        <linearGradient id="hair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c1f1a" />
          <stop offset="100%" stopColor="#1a120f" />
        </linearGradient>
        <linearGradient id="coat" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
        <linearGradient id="saree" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d32f2f" />
          <stop offset="100%" stopColor="#b71c1c" />
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd54f" />
          <stop offset="100%" stopColor="#ffb300" />
        </linearGradient>
        <linearGradient id="steth" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#616161" />
          <stop offset="100%" stopColor="#212121" />
        </linearGradient>
      </defs>

      {/* Body / Coat Base */}
      <path d="M40,200 C40,160 60,130 100,130 C140,130 160,160 160,200 Z" fill="url(#coat)" />
      
      {/* Saree Blouse (Red) instead of V-Neck Shirt */}
      <path d="M75,130 L100,170 L125,130 Z" fill="url(#saree)" />
      {/* Saree Gold Border */}
      <path d="M75,130 L100,160 L125,130 Z" fill="url(#gold)" opacity="0.8" />

      {/* Coat Lapels */}
      <path d="M75,130 L60,200 L100,200 L100,170 Z" fill="#f5f5f5" opacity="0.8" />
      <path d="M125,130 L140,200 L100,200 L100,170 Z" fill="#f5f5f5" opacity="0.8" />

      {/* Stethoscope */}
      <path d="M70,130 C60,180 90,190 100,190 C110,190 140,180 130,130" fill="none" stroke="url(#steth)" strokeWidth="8" strokeLinecap="round" />
      <circle cx="115" cy="180" r="14" fill="url(#steth)" />
      <circle cx="115" cy="180" r="8" fill="#9e9e9e" />

      {/* Neck */}
      <rect x="85" y="110" width="30" height="30" fill="url(#skin)" />
      <path d="M85,110 Q100,125 115,110 Z" fill="#a06030" /> {/* shadow */}

      {/* Gold Chain (Mangalsutra / Thali / Chain) */}
      <path d="M85,125 C90,140 110,140 115,125" fill="none" stroke="url(#gold)" strokeWidth="2.5" />
      <circle cx="100" cy="136" r="3" fill="url(#gold)" />

      {/* Ears */}
      <circle cx="55" cy="90" r="15" fill="url(#skin)" />
      <circle cx="145" cy="90" r="15" fill="url(#skin)" />
      
      {/* Gold Earrings */}
      <circle cx="55" cy="98" r="4" fill="url(#gold)" />
      <circle cx="145" cy="98" r="4" fill="url(#gold)" />

      {/* Head */}
      <rect x="60" y="40" width="80" height="85" rx="40" fill="url(#skin)" />

      {/* Hair Back/Base (Traditional Bun) */}
      <circle cx="140" cy="50" r="20" fill="url(#hair)" /> {/* Bun on the side/back */}
      <path d="M55,60 C55,30 145,30 145,60 L140,45 C140,15 60,15 60,45 Z" fill="url(#hair)" />
      
      {/* Hair Front/Bangs */}
      <path d="M55,65 C60,20 140,20 145,65 C130,40 100,45 80,65 C75,50 65,55 55,65 Z" fill="url(#hair)" />

      {/* Red Bindi */}
      <circle cx="100" cy="72" r="3.5" fill="#d32f2f" />

      {/* Glasses */}
      <circle cx="75" cy="85" r="18" fill="none" stroke="#212121" strokeWidth="4" />
      <circle cx="125" cy="85" r="18" fill="none" stroke="#212121" strokeWidth="4" />
      <path d="M93,85 Q100,80 107,85" fill="none" stroke="#212121" strokeWidth="4" />
      <path d="M57,85 L45,80" fill="none" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
      <path d="M143,85 L155,80" fill="none" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
      
      {/* Eyes */}
      <circle cx="75" cy="85" r="4.5" fill="#111" />
      <circle cx="125" cy="85" r="4.5" fill="#111" />
      <circle cx="76.5" cy="83.5" r="1.5" fill="#fff" />
      <circle cx="126.5" cy="83.5" r="1.5" fill="#fff" />

      {/* Nose */}
      <circle cx="100" cy="100" r="5" fill="#b87a4c" />

      {/* Mouth (Animated when speaking) */}
      <g transform="translate(100, 115)">
        {isSpeaking ? (
          <path 
            d="M -10 0 C -5 8, 5 8, 10 0 C 5 12, -5 12, -10 0 Z" 
            fill="#4a2c22"
            className="animate-pulse"
          >
            <animate 
               attributeName="d" 
               values="M -10 0 C -5 8, 5 8, 10 0 C 5 12, -5 12, -10 0 Z;
                       M -8 2 C -4 15, 4 15, 8 2 C 4 18, -4 18, -8 2 Z;
                       M -10 0 C -5 8, 5 8, 10 0 C 5 12, -5 12, -10 0 Z" 
               dur="0.3s" 
               repeatCount="indefinite" 
            />
          </path>
        ) : (
          <path 
            d="M -10 -2 Q 0 6 10 -2" 
            fill="none" 
            stroke="#4a2c22" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
        )}
      </g>
    </svg>
  );
};
