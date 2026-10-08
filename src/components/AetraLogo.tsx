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
  const lockupDimensions = {
    sm: { w: 150, h: 60 },
    md: { w: 195, h: 78 },
    lg: { w: 250, h: 100 },
    xl: { w: 320, h: 128 },
  }[size];

  const iconDimensions = {
    sm: { w: 36, h: 36 },
    md: { w: 48, h: 48 },
    lg: { w: 64, h: 64 },
    xl: { w: 88, h: 88 },
  }[size];

  // Modern, Simple & Authentic Aetra Tangerang Emblem
  // Clean water droplet with inner flame + dual stylized cradling hands/waves in signature Aetra Blue (#005DAA) & Orange (#F15A24)
  const EmblemSvg = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="aetraBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0077D4" />
          <stop offset="100%" stopColor="#005DAA" />
        </linearGradient>
        <linearGradient id="aetraOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FA7921" />
          <stop offset="100%" stopColor="#E24A00" />
        </linearGradient>
      </defs>

      {/* Top Main Blue Water Droplet */}
      <path
        d="M50 6C50 6 36 26 36 39.5C36 47.5 42.2 54 50 54C57.8 54 64 47.5 64 39.5C64 26 50 6 50 6Z"
        fill="url(#aetraBlueGrad)"
      />
      {/* Inner White Cutout Flame */}
      <path
        d="M50 16C50 16 43 30 43 39C43 43.5 46 47 50 47C54 47 57 43.5 57 39C57 30 50 16 50 16Z"
        fill="#FFFFFF"
      />
      {/* Core Blue Droplet Center */}
      <path
        d="M50 25C50 25 46 34 46 39.5C46 42 47.8 44 50 44C52.2 44 54 42 54 39.5C54 34 50 25 50 25Z"
        fill="#005DAA"
      />

      {/* Left Modern Stylized Cupped Wave / Hand */}
      <path
        d="M50 94C42 86 31 73 24 58C19 47 16 38 18 32C19 29.5 21 29 23 31C28 36 33 46 36 53C37.5 56 40 57 42 55C44 53 44 49 43 46C41 40 37 34 33 29C35 28 37 30 39 33C43 39 46 47 47 55C47.5 60 48 78 50 94Z"
        fill="url(#aetraOrangeGrad)"
      />
      {/* Right Modern Stylized Cupped Wave / Hand (Symmetrical Mirror) */}
      <path
        d="M50 94C58 86 69 73 76 58C81 47 84 38 82 32C81 29.5 79 29 77 31C72 36 67 46 64 53C62.5 56 60 57 58 55C56 53 56 49 57 46C59 40 63 34 67 29C65 28 63 30 61 33C57 39 54 47 53 55C52.5 60 52 78 50 94Z"
        fill="url(#aetraOrangeGrad)"
      />
      {/* Base Foundation Arch */}
      <path
        d="M34 76C40 85 45 89 50 92C55 89 60 85 66 76C62 82 56 87 50 88C44 87 38 82 34 76Z"
        fill="#D83E00"
      />
    </svg>
  );

  // Return only the emblem if icon variant requested
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

  // Modern Clean Horizontal Lockup
  return (
    <div
      className={`inline-flex items-center justify-start shrink-0 select-none ${className}`}
      style={{ width: lockupDimensions.w, height: lockupDimensions.h }}
      title="PT Aetra Air Tangerang"
    >
      <svg
        viewBox="0 0 280 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="aetraBlueLockup" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0077D4" />
            <stop offset="100%" stopColor="#005DAA" />
          </linearGradient>
          <linearGradient id="aetraOrangeLockup" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FA7921" />
            <stop offset="100%" stopColor="#E24A00" />
          </linearGradient>
        </defs>

        {/* 1. Modern Emblem at Left */}
        <g transform="translate(4, 8) scale(0.95)">
          {/* Top Blue Droplet */}
          <path
            d="M50 6C50 6 36 26 36 39.5C36 47.5 42.2 54 50 54C57.8 54 64 47.5 64 39.5C64 26 50 6 50 6Z"
            fill="url(#aetraBlueLockup)"
          />
          {/* Inner White Cutout Flame */}
          <path
            d="M50 16C50 16 43 30 43 39C43 43.5 46 47 50 47C54 47 57 43.5 57 39C57 30 50 16 50 16Z"
            fill="#FFFFFF"
          />
          {/* Core Blue Droplet Center */}
          <path
            d="M50 25C50 25 46 34 46 39.5C46 42 47.8 44 50 44C52.2 44 54 42 54 39.5C54 34 50 25 50 25Z"
            fill="#005DAA"
          />

          {/* Left Orange Wave / Hand */}
          <path
            d="M50 94C42 86 31 73 24 58C19 47 16 38 18 32C19 29.5 21 29 23 31C28 36 33 46 36 53C37.5 56 40 57 42 55C44 53 44 49 43 46C41 40 37 34 33 29C35 28 37 30 39 33C43 39 46 47 47 55C47.5 60 48 78 50 94Z"
            fill="url(#aetraOrangeLockup)"
          />
          {/* Right Orange Wave / Hand */}
          <path
            d="M50 94C58 86 69 73 76 58C81 47 84 38 82 32C81 29.5 79 29 77 31C72 36 67 46 64 53C62.5 56 60 57 58 55C56 53 56 49 57 46C59 40 63 34 67 29C65 28 63 30 61 33C57 39 54 47 53 55C52.5 60 52 78 50 94Z"
            fill="url(#aetraOrangeLockup)"
          />
          {/* Base Foundation Arch */}
          <path
            d="M34 76C40 85 45 89 50 92C55 89 60 85 66 76C62 82 56 87 50 88C44 87 38 82 34 76Z"
            fill="#D83E00"
          />
        </g>

        {/* 2. Modern Typography "aetra" */}
        <text
          x="108"
          y="68"
          fill="#005DAA"
          fontSize="58"
          fontWeight="900"
          fontFamily="'Nunito', 'Plus Jakarta Sans', -apple-system, sans-serif"
          letterSpacing="-0.035em"
        >
          aetra
        </text>

        {/* 3. Subtitle "tangerang" */}
        <text
          x="110"
          y="93"
          fill="#F15A24"
          fontSize="20"
          fontWeight="800"
          fontFamily="'Nunito', 'Plus Jakarta Sans', -apple-system, sans-serif"
          letterSpacing="0.08em"
        >
          TANGERANG
        </text>
      </svg>
    </div>
  );
};
