import React from 'react';

interface ConstructionLinesProps {
  isOpen: boolean;
}

export const ConstructionLines: React.FC<ConstructionLinesProps> = ({ isOpen }) => {
  return (
    <g id="knife-construction-lines" className="pointer-events-none select-none">
      {/* Centerline ℄ running vertically through pivots */}
      <line
        x1="380"
        y1="50"
        x2="380"
        y2="710"
        stroke="#1C1B18"
        strokeWidth="0.8"
        strokeDasharray="8 4 2 4"
        opacity="0.2"
      />
      
      {/* ℄ Symbol */}
      <text
        x="376"
        y="42"
        className="font-mono-code text-[9px] fill-[#1C1B18] opacity-35"
      >
        ℄
      </text>

      {/* Top Pivot Centerlines */}
      <line
        x1="330"
        y1="140"
        x2="430"
        y2="140"
        stroke="#1C1B18"
        strokeWidth="0.8"
        strokeDasharray="6 3"
        opacity="0.22"
      />
      <circle
        cx="380"
        cy="140"
        r="28"
        fill="none"
        stroke="#1C1B18"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        opacity="0.18"
      />

      {/* Bottom Pivot Centerlines */}
      <line
        x1="330"
        y1="620"
        x2="430"
        y2="620"
        stroke="#1C1B18"
        strokeWidth="0.8"
        strokeDasharray="6 3"
        opacity="0.22"
      />
      <circle
        cx="380"
        cy="620"
        r="28"
        fill="none"
        stroke="#1C1B18"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        opacity="0.18"
      />

      {/* Dynamic Rotation Arc for Main Blade when open */}
      <path
        d="M 380,-85 A 225 225 0 0 1 500,20"
        fill="none"
        stroke="#B93829"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity={isOpen ? 0.35 : 0.12}
      />
      
      {/* Dimension arrow: Overall Height 91mm */}
      <g opacity="0.28">
        <line x1="310" y1="140" x2="310" y2="620" stroke="#1C1B18" strokeWidth="0.8" />
        <line x1="304" y1="140" x2="316" y2="140" stroke="#1C1B18" strokeWidth="0.8" />
        <line x1="304" y1="620" x2="316" y2="620" stroke="#1C1B18" strokeWidth="0.8" />
        <text
          x="298"
          y="385"
          textAnchor="middle"
          transform="rotate(-90, 298, 385)"
          className="font-mono-code text-[8px] fill-[#1C1B18] tracking-widest"
        >
          91.0 mm (SCALE 1:1)
        </text>
      </g>

      {/* Width dimension: 27mm */}
      <g opacity="0.25">
        <line x1="338" y1="655" x2="422" y2="655" stroke="#1C1B18" strokeWidth="0.8" />
        <line x1="338" y1="650" x2="338" y2="660" stroke="#1C1B18" strokeWidth="0.8" />
        <line x1="422" y1="650" x2="422" y2="660" stroke="#1C1B18" strokeWidth="0.8" />
        <text
          x="380"
          y="668"
          textAnchor="middle"
          className="font-mono-code text-[8px] fill-[#1C1B18]"
        >
          27.0 mm
        </text>
      </g>

      {/* Engineering Drawing Registration Crosshairs */}
      <g opacity="0.3" stroke="#1C1B18" strokeWidth="0.8">
        {/* Top-Left */}
        <line x1="40" y1="35" x2="40" y2="55" />
        <line x1="30" y1="45" x2="50" y2="45" />

        {/* Top-Right */}
        <line x1="720" y1="35" x2="720" y2="55" />
        <line x1="710" y1="45" x2="730" y2="45" />

        {/* Bottom-Left */}
        <line x1="40" y1="715" x2="40" y2="735" />
        <line x1="30" y1="725" x2="50" y2="725" />

        {/* Bottom-Right */}
        <line x1="720" y1="715" x2="720" y2="735" />
        <line x1="710" y1="725" x2="730" y2="725" />
      </g>

      {/* Technical pencil drafting notes */}
      <text
        x="60"
        y="60"
        className="font-mono-code text-[9px] fill-[#5E5A50] tracking-wider opacity-60"
      >
        DWG NO. VB-2026-SKETCH // SHEET 01 OF 07
      </text>

      <text
        x="60"
        y="75"
        className="font-mono-code text-[8px] fill-[#8F8A7D] tracking-wider opacity-60"
      >
        TOLERANCE: ±0.05mm // MATERIAL: INOX 1.4110 / CELLIDOR
      </text>
    </g>
  );
};
