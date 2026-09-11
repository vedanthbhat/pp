import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ToolId } from '../../types';
import { KNIFE_TOOLS } from '../../data/portfolioData';
import { 
  MainBladeSVG, 
  ScissorsSVG, 
  LargeScrewdriverSVG, 
  AwlSVG, 
  BottleOpenerSVG, 
  SmallToolSVG, 
  KeyRingSVG, 
  KnifeBodySVG 
} from './KnifeTools';
import { ConstructionLines } from './ConstructionLines';

interface SwissArmyKnifeProps {
  isOpen: boolean;
  activeTool: ToolId | null;
  onToggleOpen: () => void;
  onSelectTool: (toolId: ToolId) => void;
}

export const SwissArmyKnife: React.FC<SwissArmyKnifeProps> = ({
  isOpen,
  activeTool,
  onToggleOpen,
  onSelectTool
}) => {
  const [hoveredTool, setHoveredTool] = useState<ToolId | null>(null);

  // Helper to compute dynamic rotation for each tool
  const getToolRotation = (toolId: ToolId) => {
    const config = KNIFE_TOOLS.find(t => t.id === toolId);
    if (!config) return 0;
    
    // When knife is closed: all blades folded in at 180 (or key ring at 0)
    if (!isOpen) {
      if (hoveredTool === toolId) {
        if (toolId === 'key-ring') return 12;
        return config.closedAngle - 15;
      }
      return config.closedAngle;
    }

    // When knife is open: fan out to assigned angle, or lift slightly on hover
    let angle = config.openAngle;
    if (hoveredTool === toolId) {
      if (config.side === 'top') {
        angle -= config.hoverLift;
      } else if (toolId === 'small-tool') {
        angle -= config.hoverLift;
      } else {
        angle += config.hoverLift;
      }
    }
    return angle;
  };

  return (
    <div className="relative w-full max-w-[720px] mx-auto flex items-center justify-center select-none py-2">
      {/* SVG Container with ViewBox covering tools and labels */}
      <svg
        id="swiss-army-knife-svg"
        viewBox="-110 -90 940 860"
        className="w-full h-auto drop-shadow-xl overflow-visible"
        role="img"
        aria-label="Interactive Swiss Army Knife navigation representing Vedanth Bhat's projects and experiences"
      >
        <defs>
          {/* Steel gradient for main blade */}
          <linearGradient id="steel-gradient-blade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EDEAE2" />
            <stop offset="25%" stopColor="#FAF8F3" />
            <stop offset="55%" stopColor="#D2CDC0" />
            <stop offset="85%" stopColor="#B3AEA0" />
            <stop offset="100%" stopColor="#8C887C" />
          </linearGradient>

          {/* Steel gradient 1 */}
          <linearGradient id="steel-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F3ED" />
            <stop offset="50%" stopColor="#DDD8CB" />
            <stop offset="100%" stopColor="#9C988B" />
          </linearGradient>

          {/* Steel gradient 2 */}
          <linearGradient id="steel-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A39F92" />
            <stop offset="60%" stopColor="#E2DED3" />
            <stop offset="100%" stopColor="#FAF8F3" />
          </linearGradient>

          {/* Authentic Swiss Red Handle Scale gradient */}
          <linearGradient id="knife-red-scale" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8E1F15" />
            <stop offset="12%" stopColor="#B6281B" />
            <stop offset="38%" stopColor="#CF3426" />
            <stop offset="65%" stopColor="#B6281B" />
            <stop offset="90%" stopColor="#8E1F15" />
            <stop offset="100%" stopColor="#6E160E" />
          </linearGradient>

          {/* Soft graphite paper shadow */}
          <filter id="graphite-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="6" dy="12" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Background Construction Lines and Draft Markings */}
        <ConstructionLines isOpen={isOpen} />

        {/* 2. Physical Tools (Layered beneath knife body) */}

        {/* TOOL 01: MAIN BLADE (MAKE) */}
        <g
          id="tool-group-blade"
          tabIndex={0}
          role="button"
          aria-label="Main Blade: things i’ve built"
          className="cursor-pointer outline-none focus-visible:ring-2"
          onMouseEnter={() => setHoveredTool('blade')}
          onMouseLeave={() => setHoveredTool(null)}
          onClick={() => onSelectTool('blade')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectTool('blade');
            }
          }}
          style={{
            transformBox: 'view-box',
            transformOrigin: '380px 140px',
            transform: `rotate(${getToolRotation('blade')}deg)`,
            transition: 'transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1)'
          }}
        >
          <MainBladeSVG
            id="blade"
            isHovered={hoveredTool === 'blade'}
            isSelected={activeTool === 'blade'}
            isOpen={isOpen}
          />
        </g>

        {/* TOOL 02: SCISSORS (CREATE) */}
        <g
          id="tool-group-scissors"
          tabIndex={0}
          role="button"
          aria-label="Scissors: things i’ve made"
          className="cursor-pointer outline-none"
          onMouseEnter={() => setHoveredTool('scissors')}
          onMouseLeave={() => setHoveredTool(null)}
          onClick={() => onSelectTool('scissors')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectTool('scissors');
            }
          }}
          style={{
            transformBox: 'view-box',
            transformOrigin: '380px 140px',
            transform: `rotate(${getToolRotation('scissors')}deg)`,
            transition: 'transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1)'
          }}
        >
          <ScissorsSVG
            id="scissors"
            isHovered={hoveredTool === 'scissors'}
            isSelected={activeTool === 'scissors'}
            isOpen={isOpen}
          />
        </g>

        {/* TOOL 03: SCREWDRIVER (BUILD) */}
        <g
          id="tool-group-screwdriver"
          tabIndex={0}
          role="button"
          aria-label="Screwdriver: things i’ve engineered"
          className="cursor-pointer outline-none"
          onMouseEnter={() => setHoveredTool('screwdriver')}
          onMouseLeave={() => setHoveredTool(null)}
          onClick={() => onSelectTool('screwdriver')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectTool('screwdriver');
            }
          }}
          style={{
            transformBox: 'view-box',
            transformOrigin: '380px 140px',
            transform: `rotate(${getToolRotation('screwdriver')}deg)`,
            transition: 'transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1)'
          }}
        >
          <LargeScrewdriverSVG
            id="screwdriver"
            isHovered={hoveredTool === 'screwdriver'}
            isSelected={activeTool === 'screwdriver'}
            isOpen={isOpen}
          />
        </g>

        {/* TOOL 04: AWL / REAMER (INVESTIGATE) */}
        <g
          id="tool-group-awl"
          tabIndex={0}
          role="button"
          aria-label="Awl: things i’ve investigated"
          className="cursor-pointer outline-none"
          onMouseEnter={() => setHoveredTool('awl')}
          onMouseLeave={() => setHoveredTool(null)}
          onClick={() => onSelectTool('awl')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectTool('awl');
            }
          }}
          style={{
            transformBox: 'view-box',
            transformOrigin: '380px 620px',
            transform: `rotate(${getToolRotation('awl')}deg)`,
            transition: 'transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1)'
          }}
        >
          <AwlSVG
            id="awl"
            isHovered={hoveredTool === 'awl'}
            isSelected={activeTool === 'awl'}
            isOpen={isOpen}
          />
        </g>

        {/* TOOL 05: BOTTLE OPENER (VENTURE) */}
        <g
          id="tool-group-bottle-opener"
          tabIndex={0}
          role="button"
          aria-label="Bottle Opener: things i’ve tried to turn into businesses"
          className="cursor-pointer outline-none"
          onMouseEnter={() => setHoveredTool('bottle-opener')}
          onMouseLeave={() => setHoveredTool(null)}
          onClick={() => onSelectTool('bottle-opener')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectTool('bottle-opener');
            }
          }}
          style={{
            transformBox: 'view-box',
            transformOrigin: '380px 620px',
            transform: `rotate(${getToolRotation('bottle-opener')}deg)`,
            transition: 'transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1)'
          }}
        >
          <BottleOpenerSVG
            id="bottle-opener"
            isHovered={hoveredTool === 'bottle-opener'}
            isSelected={activeTool === 'bottle-opener'}
            isOpen={isOpen}
          />
        </g>

        {/* TOOL 06: SMALL TOOL (LIVE) */}
        <g
          id="tool-group-small-tool"
          tabIndex={0}
          role="button"
          aria-label="Small Tool: things i did because they mattered"
          className="cursor-pointer outline-none"
          onMouseEnter={() => setHoveredTool('small-tool')}
          onMouseLeave={() => setHoveredTool(null)}
          onClick={() => onSelectTool('small-tool')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectTool('small-tool');
            }
          }}
          style={{
            transformBox: 'view-box',
            transformOrigin: '380px 620px',
            transform: `rotate(${getToolRotation('small-tool')}deg)`,
            transition: 'transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1)'
          }}
        >
          <SmallToolSVG
            id="small-tool"
            isHovered={hoveredTool === 'small-tool'}
            isSelected={activeTool === 'small-tool'}
            isOpen={isOpen}
          />
        </g>

        {/* TOOL 07: KEY RING & TAG (ME) */}
        <g
          id="tool-group-key-ring"
          tabIndex={0}
          role="button"
          aria-label="Key Ring: the person behind all this"
          className="cursor-pointer outline-none"
          onMouseEnter={() => setHoveredTool('key-ring')}
          onMouseLeave={() => setHoveredTool(null)}
          onClick={() => onSelectTool('key-ring')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectTool('key-ring');
            }
          }}
          style={{
            transformBox: 'view-box',
            transformOrigin: '380px 620px',
            transform: `rotate(${hoveredTool === 'key-ring' ? 12 : 0}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <KeyRingSVG
            id="key-ring"
            isHovered={hoveredTool === 'key-ring'}
            isSelected={activeTool === 'key-ring'}
            isOpen={isOpen}
          />
        </g>

        {/* 3. Red Swiss Army Knife Handle Body (Foreground) */}
        <KnifeBodySVG isOpen={isOpen} onToggleOpen={onToggleOpen} />

        {/* 4. Closed state hint annotation */}
        {!isOpen && (
          <g id="knife-closed-hint" className="pointer-events-none transition-opacity duration-300">
            <path
              d="M 520,330 Q 470,330 435,350"
              fill="none"
              stroke="#B93829"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <path d="M 444,342 L 434,351 L 445,357" fill="none" stroke="#B93829" strokeWidth="1.5" />
            <text x="530" y="326" className="font-handwriting text-[24px] fill-[#B93829] font-bold">
              click knife to open →
            </text>
            <text x="530" y="344" className="font-mono-code text-[10px] fill-[#6B685F] tracking-wider uppercase">
              or select any tool below
            </text>
          </g>
        )}

        {/* 5. Annotations and Handwritten Arrows when tools are open or hovered */}
        {isOpen && (
          <g id="knife-handwritten-annotations" className="pointer-events-none">
            {/* Main Blade Label (Top Right) */}
            <g opacity={hoveredTool === 'blade' ? 1 : 0.65} className="transition-opacity duration-200">
              <path
                d="M 480,90 Q 520,70 560,75"
                fill="none"
                stroke="#1C1B18"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <path d="M 558,70 L 565,75 L 557,80" fill="none" stroke="#1C1B18" strokeWidth="1.2" />
              <text x="575" y="76" className="font-handwriting text-[21px] fill-[#1C1B18] font-semibold">
                things i’ve built
              </text>
              <text x="575" y="93" className="font-mono-code text-[9px] fill-[#6B685F] tracking-wider uppercase">
                MAKE · SQI / Speculate
              </text>
            </g>

            {/* Scissors Label (Mid-Right) */}
            <g opacity={hoveredTool === 'scissors' ? 1 : 0.65} className="transition-opacity duration-200">
              <path
                d="M 520,240 Q 560,240 590,255"
                fill="none"
                stroke="#1C1B18"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <path d="M 586,249 L 595,257 L 585,260" fill="none" stroke="#1C1B18" strokeWidth="1.2" />
              <text x="605" y="258" className="font-handwriting text-[21px] fill-[#1C1B18] font-semibold">
                things i’ve made
              </text>
              <text x="605" y="274" className="font-mono-code text-[9px] fill-[#6B685F] tracking-wider uppercase">
                CREATE · Diary of a Lanky Kid
              </text>
            </g>

            {/* Screwdriver Label (Lower-Right) */}
            <g opacity={hoveredTool === 'screwdriver' ? 1 : 0.65} className="transition-opacity duration-200">
              <path
                d="M 490,360 Q 530,380 570,395"
                fill="none"
                stroke="#1C1B18"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <path d="M 565,389 L 575,397 L 563,401" fill="none" stroke="#1C1B18" strokeWidth="1.2" />
              <text x="585" y="398" className="font-handwriting text-[21px] fill-[#1C1B18] font-semibold">
                things i’ve engineered
              </text>
              <text x="585" y="414" className="font-mono-code text-[9px] fill-[#6B685F] tracking-wider uppercase">
                BUILD · NBFC Automation
              </text>
            </g>

            {/* Awl / Reamer Label (Mid-Left) */}
            <g opacity={hoveredTool === 'awl' ? 1 : 0.65} className="transition-opacity duration-200">
              <path
                d="M 280,480 Q 230,480 190,465"
                fill="none"
                stroke="#1C1B18"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <path d="M 196,460 L 185,464 L 194,472" fill="none" stroke="#1C1B18" strokeWidth="1.2" />
              <text x="175" y="465" textAnchor="end" className="font-handwriting text-[21px] fill-[#1C1B18] font-semibold">
                things i’ve investigated
              </text>
              <text x="175" y="482" textAnchor="end" className="font-mono-code text-[9px] fill-[#6B685F] tracking-wider uppercase">
                INVESTIGATE · NBFC Sector Map
              </text>
            </g>

            {/* Bottle Opener Label (Lower-Left) */}
            <g opacity={hoveredTool === 'bottle-opener' ? 1 : 0.65} className="transition-opacity duration-200">
              <path
                d="M 250,560 Q 200,560 170,580"
                fill="none"
                stroke="#1C1B18"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <path d="M 178,574 L 165,582 L 173,590" fill="none" stroke="#1C1B18" strokeWidth="1.2" />
              <text x="155" y="582" textAnchor="end" className="font-handwriting text-[21px] fill-[#1C1B18] font-semibold">
                things i turned into businesses
              </text>
              <text x="155" y="598" textAnchor="end" className="font-mono-code text-[9px] fill-[#6B685F] tracking-wider uppercase">
                VENTURE · TonersCart
              </text>
            </g>

            {/* Small Tool Label (Bottom-Left) */}
            <g opacity={hoveredTool === 'small-tool' ? 1 : 0.65} className="transition-opacity duration-200">
              <path
                d="M 330,680 Q 270,700 230,715"
                fill="none"
                stroke="#1C1B18"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <path d="M 238,708 L 225,717 L 235,722" fill="none" stroke="#1C1B18" strokeWidth="1.2" />
              <text x="215" y="718" textAnchor="end" className="font-handwriting text-[21px] fill-[#1C1B18] font-semibold">
                things i did because they mattered
              </text>
              <text x="215" y="734" textAnchor="end" className="font-mono-code text-[9px] fill-[#6B685F] tracking-wider uppercase">
                LIVE · Music / Stage / 20k Fest
              </text>
            </g>

            {/* Key Ring Label (Bottom Center) */}
            <g opacity={hoveredTool === 'key-ring' ? 1 : 0.75} className="transition-opacity duration-200">
              <path
                d="M 430,680 Q 480,695 510,720"
                fill="none"
                stroke="#1C1B18"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <path d="M 504,714 L 515,722 L 504,726" fill="none" stroke="#1C1B18" strokeWidth="1.2" />
              <text x="525" y="722" className="font-handwriting text-[22px] fill-[#1C1B18] font-bold">
                the person behind all this
              </text>
              <text x="525" y="738" className="font-mono-code text-[9px] fill-[#6B685F] tracking-wider uppercase">
                ME · Vedanth Bhat · Bio & Links
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
