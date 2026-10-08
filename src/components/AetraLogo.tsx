import React from 'react';

interface AetraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'official' | 'horizontal' | 'icon' | 'full';
  className?: string;
}

export const AetraLogo: React.FC<AetraLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  className = '',
}) => {
  // Dimensions for modern Aetra Connect lockup
  const lockupDimensions = {
    sm: { w: 156, h: 48 },
    md: { w: 196, h: 58 },
    lg: { w: 248, h: 72 },
    xl: { w: 310, h: 90 },
  }[size];

  const iconDimensions = {
    sm: { w: 36, h: 36 },
    md: { w: 46, h: 46 },
    lg: { w: 60, h: 60 },
    xl: { w: 78, h: 78 },
  }[size];

  // Clean, Simple & Modern Aetra Connect Emblem:
  // Minimalist stylized dual-stream loop symbolizing water flow & digital connectivity
  const EmblemSvg = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="modernBlue" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#007ACC" />
          <stop offset="100%" stopColor="#005DAA" />
        </linearGradient>
        <linearGradient id="modernOrange" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#FF7A38" />
          <stop offset="100%" stopColor="#F15A24" />
        </linearGradient>
      </defs>

      {/* Primary Clean Water Droplet Wave (Blue) */}
      <path
        d="M50 12C36 34 26 50 26 65C26 78.25 36.75 89 50 89C63.25 89 74 78.25 74 65C74 50 64 34 50 12Z"
        fill="url(#modernBlue)"
      />

      {/* Inner Flow Ring / Dynamic Connection Loop */}
      <path
        d="M50 28C41 44 38 54 38 64C38 70.6 43.4 76 50 76C56.6 76 62 70.6 62 64C62 54 59 44 50 28Z"
        fill="#FFFFFF"
      />

      {/* Vibrant Orange Connect Link Arc */}
      <circle cx="50" cy="62" r="9" fill="url(#modernOrange)" />
      
      {/* Dynamic Digital Spark Dot */}
      <circle cx="68" cy="38" r="5" fill="url(#modernOrange)" />
    </svg>
  );

  // Return only the emblem if icon variant is requested
  if (variant === 'icon') {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: iconDimensions.w, height: iconDimensions.h }}
      >
        {EmblemSvg}
      </div>
    );
  }

  // Modern Horizontal Lockup: Simple, Sleek & Professional "aetra connect"
  return (
    <div
      className={`inline-flex items-center gap-3 shrink-0 select-none ${className}`}
      style={{ width: lockupDimensions.w, height: lockupDimensions.h }}
      title="Aetra Connect"
    >
      <div
        className="shrink-0 flex items-center justify-center"
        style={{ width: iconDimensions.w, height: iconDimensions.h }}
      >
        {EmblemSvg}
      </div>

      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className="text-[#005DAA] font-black tracking-tight"
            style={{
              fontSize: size === 'sm' ? '22px' : size === 'md' ? '27px' : size === 'lg' ? '33px' : '40px',
              fontFamily: "'Nunito', 'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.04em',
            }}
          >
            aetra
          </span>
          <span
            className="text-[#F15A24] font-black tracking-tight"
            style={{
              fontSize: size === 'sm' ? '18px' : size === 'md' ? '22px' : size === 'lg' ? '27px' : '33px',
              fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
              letterSpacing: '-0.03em',
            }}
          >
            connect
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span
            className="text-slate-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]"
            style={{ letterSpacing: '0.12em' }}
          >
            PORTAL AIR BERSIH
          </span>
        </div>
      </div>
    </div>
  );
};
