import React from 'react';
import { ToolId } from '../../types';

interface ToolProps {
  id: ToolId;
  isHovered: boolean;
  isSelected: boolean;
  isOpen: boolean;
}

// Top Pivot is at (380, 140)
// Bottom Pivot is at (380, 620)

export const MainBladeSVG: React.FC<ToolProps> = ({ isHovered, isSelected }) => {
  return (
    <g id="knife-main-blade" className="transition-all duration-300">
      {/* Blade tang and base pivot */}
      <circle cx="380" cy="140" r="14" fill="#D4D0C5" stroke="#1C1B18" strokeWidth="2.5" />
      
      {/* Blade Body - pointing upwards when at 0 deg, rotated around (380, 140) */}
      {/* The blade extends up from y=140 to y=-80 (length ~ 220px) */}
      <path
        d="M 374,140 
           L 374,-10 
           C 374,-45 382,-75 396,-85 
           C 400,-60 404,30 400,125 
           L 392,140 Z"
        fill="url(#steel-gradient-blade)"
        stroke="#1C1B18"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* Cutting edge bevel line */}
      <path
        d="M 378,130 
           L 378,-5 
           C 378,-40 384,-65 396,-85"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Nail Nick (groove to pull open) */}
      <path
        d="M 383,-30 C 384,-15 384,10 383,25"
        fill="none"
        stroke="#1C1B18"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 384,-28 C 385,-15 385,8 384,23"
        fill="none"
        stroke="#8F8B80"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Graphite cross-hatching shading */}
      <g stroke="#2C2A24" strokeWidth="0.8" opacity="0.4">
        <line x1="388" y1="60" x2="397" y2="52" />
        <line x1="388" y1="72" x2="398" y2="64" />
        <line x1="387" y1="84" x2="399" y2="76" />
        <line x1="386" y1="96" x2="399" y2="88" />
        <line x1="385" y1="108" x2="399" y2="100" />
      </g>

      {/* Steel spine highlight */}
      <line x1="375" y1="135" x2="375" y2="-10" stroke="#757268" strokeWidth="1" />
      
      {/* Active / hover pulse ring on pivot */}
      {isHovered && (
        <circle cx="380" cy="140" r="18" fill="none" stroke="#B93829" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
    </g>
  );
};

export const ScissorsSVG: React.FC<ToolProps> = ({ isHovered }) => {
  return (
    <g id="knife-scissors" className="transition-all duration-300">
      {/* Scissors base pivot */}
      <circle cx="380" cy="140" r="14" fill="#D4D0C5" stroke="#1C1B18" strokeWidth="2.5" />
      
      {/* First Blade */}
      <path
        d="M 376,140 
           L 376,0 
           C 376,-30 386,-65 390,-75 
           L 396,-70 
           C 392,-55 388,10 388,140 Z"
        fill="url(#steel-gradient-1)"
        stroke="#1C1B18"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Scissors center hinge screw */}
      <circle cx="383" cy="15" r="4.5" fill="#B0ACA0" stroke="#1C1B18" strokeWidth="1.8" />
      <line x1="380" y1="15" x2="386" y2="15" stroke="#1C1B18" strokeWidth="1.2" />

      {/* Second Moving Blade / Handle arm with spring */}
      <path
        d="M 383,15 
           C 388,-10 398,-40 404,-70 
           L 410,-67 
           C 404,-40 394,-5 388,15 Z"
        fill="url(#steel-gradient-2)"
        stroke="#1C1B18"
        strokeWidth="2"
      />

      {/* Lever / Leaf Spring */}
      <path
        d="M 383,30 
           C 400,60 405,100 394,130"
        fill="none"
        stroke="#1C1B18"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 383,30 
           C 398,60 403,98 393,128"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Serration / Cutting edge lines */}
      <line x1="377" y1="-5" x2="377" y2="-55" stroke="#FFFFFF" strokeWidth="1.2" />

      {isHovered && (
        <circle cx="380" cy="140" r="18" fill="none" stroke="#B93829" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
    </g>
  );
};

export const LargeScrewdriverSVG: React.FC<ToolProps> = ({ isHovered }) => {
  return (
    <g id="knife-screwdriver" className="transition-all duration-300">
      {/* Base pivot */}
      <circle cx="380" cy="140" r="14" fill="#D4D0C5" stroke="#1C1B18" strokeWidth="2.5" />

      {/* Screwdriver / Bottle Opener arm */}
      <path
        d="M 374,140 
           L 374,20 
           L 370,10 
           L 370,-50 
           L 376,-52 
           L 376,-60 
           L 392,-60 
           L 392,-52 
           L 398,-50 
           L 398,10 
           L 394,20 
           L 394,140 Z"
        fill="url(#steel-gradient-blade)"
        stroke="#1C1B18"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Flathead screwdriver tip */}
      <line x1="376" y1="-60" x2="392" y2="-60" stroke="#FFFFFF" strokeWidth="2" />

      {/* Wire stripper curve notch */}
      <path
        d="M 370,-10 C 374,-10 376,-6 376,0 C 376,6 374,10 370,10"
        fill="#D4D0C5"
        stroke="#1C1B18"
        strokeWidth="2"
      />

      {/* Nail groove */}
      <line x1="384" y1="-25" x2="384" y2="15" stroke="#1C1B18" strokeWidth="2" strokeLinecap="round" />
      <line x1="385" y1="-24" x2="385" y2="14" stroke="#FAF8F3" strokeWidth="1" strokeLinecap="round" />

      {/* Graphite technical hatching */}
      <g stroke="#3A3831" strokeWidth="0.8" opacity="0.35">
        <line x1="378" y1="40" x2="390" y2="40" />
        <line x1="378" y1="55" x2="390" y2="55" />
        <line x1="378" y1="70" x2="390" y2="70" />
        <line x1="378" y1="85" x2="390" y2="85" />
      </g>

      {isHovered && (
        <circle cx="380" cy="140" r="18" fill="none" stroke="#B93829" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
    </g>
  );
};

export const AwlSVG: React.FC<ToolProps> = ({ isHovered }) => {
  return (
    <g id="knife-awl" className="transition-all duration-300">
      {/* Bottom Pivot at (380, 620) */}
      <circle cx="380" cy="620" r="14" fill="#D4D0C5" stroke="#1C1B18" strokeWidth="2.5" />

      {/* Awl / Reamer body (points downwards from 620 to 760) */}
      <path
        d="M 374,620 
           L 374,700 
           L 380,755 
           L 386,700 
           L 386,620 Z"
        fill="url(#steel-gradient-2)"
        stroke="#1C1B18"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Sewing eyelet hole */}
      <ellipse cx="380" cy="732" rx="2.5" ry="5.5" fill="#F7F4EB" stroke="#1C1B18" strokeWidth="1.8" />

      {/* Scraper / Reamer sharp edge bevel */}
      <path
        d="M 375,640 L 375,700 L 380,750"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Nail groove */}
      <line x1="382" y1="650" x2="382" y2="690" stroke="#1C1B18" strokeWidth="2" strokeLinecap="round" />

      {isHovered && (
        <circle cx="380" cy="620" r="18" fill="none" stroke="#B93829" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
    </g>
  );
};

export const BottleOpenerSVG: React.FC<ToolProps> = ({ isHovered }) => {
  return (
    <g id="knife-bottle-opener" className="transition-all duration-300">
      {/* Bottom Pivot at (380, 620) */}
      <circle cx="380" cy="620" r="14" fill="#D4D0C5" stroke="#1C1B18" strokeWidth="2.5" />

      {/* Bottle opener & can opener arm */}
      <path
        d="M 374,620 
           L 374,710 
           C 374,720 370,725 365,728 
           L 365,738 
           C 375,735 382,725 384,715 
           L 388,715 
           L 392,735 
           L 398,735 
           L 394,620 Z"
        fill="url(#steel-gradient-blade)"
        stroke="#1C1B18"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Opener hook lip */}
      <path
        d="M 368,733 C 374,732 378,726 380,720"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Center nail pull slot */}
      <line x1="384" y1="645" x2="384" y2="685" stroke="#1C1B18" strokeWidth="2" strokeLinecap="round" />
      <line x1="385" y1="646" x2="385" y2="684" stroke="#FAF8F3" strokeWidth="1" strokeLinecap="round" />

      {isHovered && (
        <circle cx="380" cy="620" r="18" fill="none" stroke="#B93829" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
    </g>
  );
};

export const SmallToolSVG: React.FC<ToolProps> = ({ isHovered }) => {
  return (
    <g id="knife-small-tool" className="transition-all duration-300">
      {/* Bottom Pivot at (380, 620) */}
      <circle cx="380" cy="620" r="14" fill="#D4D0C5" stroke="#1C1B18" strokeWidth="2.5" />

      {/* Small blade / nail file profile */}
      <path
        d="M 376,620 
           L 376,695 
           C 376,715 382,730 388,735 
           C 392,725 394,690 394,620 Z"
        fill="url(#steel-gradient-1)"
        stroke="#1C1B18"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* File cross-hatch texture */}
      <g stroke="#55524A" strokeWidth="0.8" opacity="0.5">
        <line x1="379" y1="650" x2="391" y2="656" />
        <line x1="379" y1="660" x2="391" y2="666" />
        <line x1="379" y1="670" x2="391" y2="676" />
        <line x1="379" y1="680" x2="391" y2="686" />
        <line x1="379" y1="690" x2="391" y2="696" />
        <line x1="379" y1="700" x2="389" y2="705" />
      </g>

      {/* Nail cleaner tip */}
      <line x1="384" y1="730" x2="388" y2="735" stroke="#FFFFFF" strokeWidth="1.5" />

      {isHovered && (
        <circle cx="380" cy="620" r="18" fill="none" stroke="#B93829" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
    </g>
  );
};

export const KeyRingSVG: React.FC<ToolProps> = ({ isHovered }) => {
  return (
    <g id="knife-key-ring" className="transition-all duration-300">
      {/* Anchor lug at bottom of knife body */}
      <rect x="375" y="625" width="10" height="24" rx="3" fill="#A8A499" stroke="#1C1B18" strokeWidth="2.2" />
      
      {/* Split Ring */}
      <circle cx="380" cy="660" r="18" fill="none" stroke="#1C1B18" strokeWidth="3.5" />
      <circle cx="380" cy="660" r="14" fill="none" stroke="#E5E1D5" strokeWidth="1.8" />
      <circle cx="380" cy="660" r="18" fill="none" stroke="#FAF8F3" strokeWidth="0.8" strokeDasharray="12 4" />

      {/* Brass ID Tag hanging off ring */}
      <g transform="translate(380, 678) rotate(-15)">
        <rect x="-14" y="0" width="28" height="42" rx="4" fill="#E8C372" stroke="#1C1B18" strokeWidth="2" />
        <circle cx="0" cy="8" r="3.5" fill="#FAF8F3" stroke="#1C1B18" strokeWidth="1.5" />
        <line x1="-8" y1="18" x2="8" y2="18" stroke="#1C1B18" strokeWidth="1.5" />
        <line x1="-10" y1="25" x2="10" y2="25" stroke="#1C1B18" strokeWidth="1" />
        <line x1="-7" y1="31" x2="7" y2="31" stroke="#1C1B18" strokeWidth="1" />
      </g>

      {isHovered && (
        <circle cx="380" cy="660" r="24" fill="none" stroke="#B93829" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
    </g>
  );
};

export const KnifeBodySVG: React.FC<{
  isOpen: boolean;
  onToggleOpen: () => void;
}> = ({ isOpen, onToggleOpen }) => {
  return (
    <g id="knife-body-housing" className="cursor-pointer select-none" onClick={onToggleOpen}>
      {/* Outer graphite shadow */}
      <path
        d="M 334,160 
           C 334,130 354,115 380,115 
           C 406,115 426,130 426,160 
           L 426,600 
           C 426,630 406,645 380,645 
           C 354,645 334,630 334,600 Z"
        fill="rgba(28, 27, 24, 0.12)"
        transform="translate(10, 16)"
        filter="blur(5px)"
      />

      {/* Main Red Swiss Army Knife Handle Scale */}
      <path
        d="M 338,160 
           C 338,130 356,116 380,116 
           C 404,116 422,130 422,160 
           L 422,600 
           C 422,630 404,644 380,644 
           C 356,644 338,630 338,600 Z"
        fill="url(#knife-red-scale)"
        stroke="#1C1B18"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* Plastic shell bevel highlight curve */}
      <path
        d="M 346,165 
           C 346,140 360,126 380,126 
           C 400,126 414,140 414,165 
           L 414,595 
           C 414,620 400,634 380,634 
           C 360,634 346,620 346,595 Z"
        fill="none"
        stroke="rgba(255, 255, 255, 0.28)"
        strokeWidth="2"
      />

      {/* Left side ambient highlight reflection */}
      <path
        d="M 342,180 L 342,580"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Right side graphite shadow contour */}
      <path
        d="M 418,180 L 418,580"
        stroke="rgba(28, 27, 24, 0.45)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Top Metallic Bolster / Pivot Pin */}
      <circle cx="380" cy="140" r="12" fill="#D5D0C3" stroke="#1C1B18" strokeWidth="2.5" />
      <circle cx="380" cy="140" r="6" fill="#FAF8F3" stroke="#1C1B18" strokeWidth="1.2" />
      <line x1="376" y1="140" x2="384" y2="140" stroke="#1C1B18" strokeWidth="1.2" />

      {/* Center Rivet Pin */}
      <circle cx="380" cy="380" r="7.5" fill="#D5D0C3" stroke="#1C1B18" strokeWidth="2" />
      <circle cx="380" cy="380" r="3" fill="#FAF8F3" stroke="#1C1B18" strokeWidth="1" />

      {/* Bottom Bolster / Pivot Pin */}
      <circle cx="380" cy="620" r="12" fill="#D5D0C3" stroke="#1C1B18" strokeWidth="2.5" />
      <circle cx="380" cy="620" r="6" fill="#FAF8F3" stroke="#1C1B18" strokeWidth="1.2" />
      <line x1="376" y1="620" x2="384" y2="620" stroke="#1C1B18" strokeWidth="1.2" />

      {/* Swiss Cross Emblem in Silver & Shield */}
      <g id="knife-emblem" transform="translate(380, 240)">
        {/* Emblem Shield outline */}
        <path
          d="M -16,-12 
             C -16,-12 0,-14 0,-14 
             C 0,-14 16,-12 16,-12 
             C 16,5 12,20 0,26 
             C -12,20 -16,5 -16,-12 Z"
          fill="#1C1B18"
          stroke="#1C1B18"
          strokeWidth="1.5"
        />
        <path
          d="M -14,-10 
             C -14,-10 0,-12 0,-12 
             C 0,-12 14,-10 14,-10 
             C 14,4 10,18 0,23 
             C -10,18 -14,4 -14,-10 Z"
          fill="#B52C1F"
        />
        {/* Silver Cross */}
        <path
          d="M -3,-6 L 3,-6 L 3,-1 L 8,-1 L 8,5 L 3,5 L 3,10 L -3,10 L -3,5 L -8,5 L -8,-1 L -3,-1 Z"
          fill="#FAF8F3"
          stroke="#1C1B18"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>

      {/* Engraved Model / Date Text along the spine */}
      <text
        x="380"
        y="450"
        textAnchor="middle"
        transform="rotate(90, 380, 450)"
        className="font-mono-code text-[8.5px] font-medium tracking-[0.28em] fill-[#6A1A14]"
      >
        VEDANTH BHAT · SPEC 2026
      </text>

      {/* Graphite cross-hatching texture on bottom shoulder */}
      <g stroke="#1C1B18" strokeWidth="0.8" opacity="0.3">
        <line x1="350" y1="570" x2="370" y2="585" />
        <line x1="350" y1="580" x2="375" y2="598" />
        <line x1="354" y1="590" x2="380" y2="610" />
      </g>
    </g>
  );
};
