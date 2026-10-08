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
  // Dimensions calibrated to preserve the 4:3 authentic Aetra brand lockup
  const lockupDimensions = {
    sm: { w: 148, h: 76 },
    md: { w: 188, h: 96 },
    lg: { w: 240, h: 124 },
    xl: { w: 320, h: 164 },
  }[size];

  const iconDimensions = {
    sm: { w: 36, h: 36 },
    md: { w: 48, h: 48 },
    lg: { w: 64, h: 64 },
    xl: { w: 88, h: 88 },
  }[size];

  // Modern, Simple & Authentic Aetra Emblem:
  // Clean modern water droplet + fluid wave cradle in signature Aetra Blue (#005DAA) and Vibrant Orange (#F15A24)
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
          <stop offset="100%" stopColor="#00529B" />
        </linearGradient>
        <linearGradient id="aetraOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FA7921" />
          <stop offset="100%" stopColor="#E24A00" />
        </linearGradient>
      </defs>

      {/* Modern fluid water droplet */}
      <path
        d="M50 8C50 8 36 28 36 41C36 49 42 55 50 55C58 55 64 49 64 41C64 28 50 8 50 8Z"
        fill="url(#aetraBlueGrad)"
      />
      {/* Inner droplet negative cut */}
      <path
        d="M50 18C50 18 42 32 42 41C42 45.5 45.5 49 50 49C54.5 49 58 45.5 58 41C58 32 50 18 50 18Z"
        fill="#FFFFFF"
      />
      <circle cx="50" cy="41" r="4.5" fill="#00529B" />

      {/* Modern stylized cradle hands / wave base */}
      <path
        d="M26 48C20 54 18 64 22 72C27 82 38 90 50 92C41 85 34 78 32 68C30.5 61 33 54 37 49C38 47.5 36.5 46 35 46.5C31.5 48 28.5 50.5 26 53.5L26 48Z"
        fill="url(#aetraOrangeGrad)"
      />
      <path
        d="M74 48C80 54 82 64 78 72C73 82 62 90 50 92C59 85 66 78 68 68C69.5 61 67 54 63 49C62 47.5 63.5 46 65 46.5C68.5 48 71.5 50.5 74 53.5L74 48Z"
        fill="url(#aetraOrangeGrad)"
      />
      {/* Bottom connecting support arch */}
      <path
        d="M32 72C38 84 44 89 50 92C56 89 62 84 68 72C64 79 57 85 50 87C43 85 36 79 32 72Z"
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

  // Official & Horizontal Lockup: Exactly matching the uploaded photo "lambang aetra.png"
  // - Wordmark "aetra" on the lower left (custom rounded typography)
  // - Subtitle "tangerang" directly below "aetra", indented under the 'e'
  // - Official emblem sitting at the upper right directly above "tra"
  return (
    <div
      className={`inline-flex items-center justify-start shrink-0 select-none ${className}`}
      style={{ width: lockupDimensions.w, height: lockupDimensions.h }}
      title="PT Aetra Air Tangerang"
    >
      <svg
        viewBox="0 0 310 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="aetraOrangeLockup" x1="50" y1="20" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F7721A" />
            <stop offset="55%" stopColor="#F15A24" />
            <stop offset="100%" stopColor="#DE4B0D" />
          </linearGradient>
          <linearGradient id="aetraBlueLockup" x1="50" y1="4" x2="50" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0066B8" />
            <stop offset="100%" stopColor="#005399" />
          </linearGradient>
        </defs>

        {/* 1. Official Emblem positioned at Top-Right above 't', 'r', 'a' */}
        <g transform="translate(172, 2) scale(1.18)">
          {/* Top Blue Water Droplet */}
          <path
            d="M50 4C50 4 60 13.2 60 21.2C60 26.8 55.5 30.8 50 30.8C44.5 30.8 40 26.8 40 21.2C40 13.2 50 4 50 4Z"
            fill="url(#aetraBlueLockup)"
          />
          {/* White Flame Cutout */}
          <path
            d="M50 8.8C50.8 11.6 54.8 16 54.8 20.8C54.8 23.8 52.8 26.2 50 26.2C47.2 26.2 45.2 23.8 45.2 20.8C45.2 17.2 47.8 13.2 49 10.8L50 8.8Z"
            fill="#FFFFFF"
          />
          {/* Blue Droplet Spark Detail */}
          <path
            d="M50 15.5C50 15.5 52.2 18 52.2 20.5C52.2 21.8 51.2 22.8 50 22.8C48.8 22.8 47.8 21.8 47.8 20.5C47.8 18 50 15.5 50 15.5Z"
            fill="#005DAA"
          />

          {/* Blue Upraised Arms */}
          <path
            d="M50 44C47.2 44 43.8 41.2 38.8 36.8C33.8 32.4 27.5 25.5 23.5 20.5C21.5 18 23.8 15.5 26.8 17.5C32.2 21.5 39 29.5 44.5 33.8C47 35.8 48.8 36.8 50 36.8C51.2 36.8 53 35.8 55.5 33.8C61 29.5 67.8 21.5 73.2 17.5C76.2 15.5 78.5 18 76.5 20.5C72.5 25.5 66.2 32.4 61.2 36.8C56.2 41.2 52.8 44 50 44Z"
            fill="url(#aetraBlueLockup)"
          />
          {/* Blue Trunk Stem */}
          <path
            d="M47.2 43.8L47.8 77C48.4 82.5 49.3 86.5 50 88.5C50.7 86.5 51.6 82.5 52.2 77L52.8 43.8Z"
            fill="url(#aetraBlueLockup)"
          />

          {/* Left Orange Hand */}
          <path
            d="M50 93.5C44 87 34 75 25 62C16.8 50 11.2 37.5 11.5 27C11.6 24 14.2 23 16 24.8C19.8 28.8 25.2 38 29.8 45C32.4 49 36.2 50.5 38.6 47.8C41 45 42.5 39.8 44 38C45.2 36.5 46.5 37.8 46 40C44.5 46 40 52.5 35.5 55.5C31 58.5 26.5 55 22 47C17 38.2 12.2 28 13.5 26C12.5 31 16 43 22.5 53.5C29.2 64.5 39.2 78 50 93.5Z"
            fill="url(#aetraOrangeLockup)"
          />
          <path
            d="M50 93.5C47 88 40.5 77 36 66C32 57.5 32.2 51 35 46.5C37.5 42.5 41.5 39 43 40.5C44.5 42 43 46.5 40 50.5C37 54.5 37.2 61.5 41 69.5C44.5 77 48.2 86 50 93.5Z"
            fill="url(#aetraOrangeLockup)"
          />

          {/* Right Orange Hand */}
          <path
            d="M50 93.5C56 87 66 75 75 62C83.2 50 88.8 37.5 88.5 27C88.4 24 85.8 23 84 24.8C80.2 28.8 74.8 38 70.2 45C67.6 49 63.8 50.5 61.4 47.8C59 45 57.5 39.8 56 38C54.8 36.5 53.5 37.8 54 40C55.5 46 60 52.5 64.5 55.5C69 58.5 73.5 55 78 47C83 38.2 87.8 28 86.5 26C87.5 31 84 43 77.5 53.5C70.8 64.5 60.8 78 50 93.5Z"
            fill="url(#aetraOrangeLockup)"
          />
          <path
            d="M50 93.5C53 88 59.5 77 64 66C68 57.5 67.8 51 65 46.5C62.5 42.5 58.5 39 57 40.5C55.5 42 57 46.5 60 50.5C63 54.5 62.8 61.5 59 69.5C55.5 77 51.8 86 50 93.5Z"
            fill="url(#aetraOrangeLockup)"
          />
        </g>

        {/* 2. Authentic Typography "aetra" (Bold Rounded Sans-serif) */}
        <text
          x="10"
          y="118"
          fill="#005DAA"
          fontSize="92"
          fontWeight="900"
          fontFamily="'Nunito', 'Arial Rounded MT Bold', 'VAG Rounded', -apple-system, sans-serif"
          letterSpacing="-0.038em"
        >
          aetra
        </text>

        {/* 3. Subtitle "tangerang" (Directly below "aetra", indented under the 'e') */}
        <text
          x="50"
          y="152"
          fill="#005DAA"
          fontSize="31"
          fontWeight="700"
          fontFamily="'Nunito', 'Plus Jakarta Sans', -apple-system, sans-serif"
          letterSpacing="0.045em"
        >
          tangerang
        </text>
      </svg>
    </div>
  );
};
