import React from 'react';
import { ToolId } from '../../types';
import { KNIFE_TOOLS } from '../../data/portfolioData';
import { ArrowLeft, Compass, Image as ImageIcon } from 'lucide-react';

interface QuickNavProps {
  activeTool: ToolId | null;
  onSelectTool: (toolId: ToolId) => void;
  onBackToKnife: () => void;
  onOpenImporter?: () => void;
}

export const QuickNav: React.FC<QuickNavProps> = ({
  activeTool,
  onSelectTool,
  onBackToKnife,
  onOpenImporter
}) => {
  return (
    <nav 
      id="portfolio-quick-nav"
      aria-label="Portfolio sections"
      className="sticky top-0 z-40 bg-[#F7F4EB]/90 backdrop-blur-md border-b border-[#DDD8CB] py-2 px-3 sm:px-6 shadow-xs"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 overflow-x-auto">
        {/* Back to Knife */}
        <button
          onClick={onBackToKnife}
          className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase tracking-wider text-[#1C1B18] bg-[#EDE8DC] hover:bg-[#E2DDD0] px-2.5 py-1.5 rounded shrink-0 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#B93829]" />
          <span className="hidden sm:inline">SKETCHBOOK</span>
          <span>DESK</span>
        </button>

        {/* Tool Pills */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {KNIFE_TOOLS.map((tool) => {
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={`text-[11px] font-mono-code px-2.5 py-1 rounded shrink-0 transition-all font-semibold ${
                  isActive
                    ? 'bg-[#1C1B18] text-[#F7F4EB] shadow-xs'
                    : 'text-[#5C584E] hover:text-black hover:bg-[#EAE5D7]'
                }`}
              >
                <span className="uppercase">{tool.shortAction}</span>
              </button>
            );
          })}
        </div>

        {/* Batch Importer button */}
        {onOpenImporter && (
          <button
            onClick={onOpenImporter}
            className="inline-flex items-center gap-1 text-[11px] font-mono-code bg-[#B93829] hover:bg-[#A32F21] text-white px-2.5 py-1.5 rounded shrink-0 font-bold transition-colors shadow-xs"
            title="Import all attached project screenshots and photos"
          >
            <ImageIcon className="w-3 h-3" />
            <span className="hidden sm:inline">Photos</span>
          </button>
        )}
      </div>
    </nav>
  );
};
