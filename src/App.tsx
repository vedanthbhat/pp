import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ToolId } from './types';
import { KNIFE_TOOLS } from './data/portfolioData';
import { SwissArmyKnife } from './components/knife/SwissArmyKnife';
import { QuickNav } from './components/ui/QuickNav';
import { HandwrittenNote } from './components/ui/HandwrittenNote';
import { MakeSpread } from './components/spreads/MakeSpread';
import { CreateSpread } from './components/spreads/CreateSpread';
import { BuildSpread } from './components/spreads/BuildSpread';
import { InvestigateSpread } from './components/spreads/InvestigateSpread';
import { VentureSpread } from './components/spreads/VentureSpread';
import { LiveSpread } from './components/spreads/LiveSpread';
import { MeSpread } from './components/spreads/MeSpread';
import { BatchImageImporter } from './components/ui/BatchImageImporter';
import { playToolClickSound } from './utils/audio';
import { 
  Volume2, 
  VolumeX, 
  Compass, 
  Layers, 
  Sparkles,
  Command,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [isKnifeOpen, setIsKnifeOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isImporterOpen, setIsImporterOpen] = useState<boolean>(false);

  // Toggle knife open / closed
  const handleToggleKnife = useCallback(() => {
    setIsKnifeOpen((prev) => {
      const next = !prev;
      playToolClickSound(isMuted);
      return next;
    });
  }, [isMuted]);

  // Select a tool to open its spread
  const handleSelectTool = useCallback((toolId: ToolId) => {
    playToolClickSound(isMuted);
    setActiveTool(toolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isMuted]);

  // Back to main knife desk
  const handleBackToKnife = useCallback(() => {
    playToolClickSound(isMuted);
    setActiveTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isMuted]);

  // Navigate to next tool in cycle
  const handleSelectNextTool = useCallback(() => {
    if (!activeTool) return;
    const currentIndex = KNIFE_TOOLS.findIndex((t) => t.id === activeTool);
    const nextIndex = (currentIndex + 1) % KNIFE_TOOLS.length;
    handleSelectTool(KNIFE_TOOLS[nextIndex].id);
  }, [activeTool, handleSelectTool]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Escape returns to desk
      if (e.key === 'Escape') {
        setActiveTool(null);
      }

      // Space toggles knife if on desk
      if (e.key === ' ' && !activeTool) {
        e.preventDefault();
        handleToggleKnife();
      }

      // Number keys 1-7 map to tools
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 7) {
        const targetTool = KNIFE_TOOLS[num - 1];
        if (targetTool) {
          handleSelectTool(targetTool.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTool, handleToggleKnife, handleSelectTool]);

  return (
    <div className="min-h-screen bg-sketchbook-paper text-[#1C1B18] flex flex-col selection:bg-[#E5E0D2] selection:text-black">
      {/* Sticky Navigation when inside a spread */}
      {activeTool && (
        <QuickNav
          activeTool={activeTool}
          onSelectTool={handleSelectTool}
          onBackToKnife={handleBackToKnife}
          onOpenImporter={() => setIsImporterOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          {!activeTool ? (
            /* =================================================== */
            /* DESK VIEW / COVER OF THE SKETCHBOOK                 */
            /* =================================================== */
            <motion.div
              key="desk-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-14 flex flex-col items-center justify-center min-h-[90vh]"
            >
              {/* Top Editorial Metadata & Heading */}
              <div className="w-full text-center mb-6 sm:mb-8">
                {/* Sketchbook Fig and Personal Archive tag */}
                <div className="inline-flex items-center gap-2 font-mono-code text-[10px] sm:text-xs tracking-widest text-[#7C7769] uppercase mb-2 border-b border-[#D8D2C2] pb-1">
                  <span>FIG. 01 · PERSONAL ARCHIVE</span>
                  <span>·</span>
                  <span>SKETCHBOOK SPREAD 01</span>
                  <span>·</span>
                  <span className="text-[#B93829] font-bold">ONGOING</span>
                </div>

                {/* Primary Name Display */}
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#1C1B18] uppercase">
                  VEDANTH BHAT
                </h1>

                {/* Narrative Thesis Tagline */}
                <div className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#3A372F] mt-2 max-w-3xl mx-auto">
                  FOLLOW THE CURIOSITY. BUILD THE THING.
                </div>

                {/* Microcopy line */}
                <div className="text-xs sm:text-sm text-[#6E695D] font-medium mt-1.5 max-w-xl mx-auto">
                  things i’ve made, investigated, started, stopped, and occasionally broken.
                </div>

                {/* Direct Project Photo & Screenshot Importer Trigger */}
                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsImporterOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#FAF8F3] hover:bg-white border border-[#DDD8CB] hover:border-[#B93829] text-[#2C2A24] px-4 py-2 rounded-full text-xs font-mono-code font-bold transition-all shadow-xs group cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#B93829] animate-pulse" />
                    <ImageIcon className="w-4 h-4 text-[#B93829]" />
                    <span>30 Project Photos & Screenshots Attached</span>
                    <span className="bg-[#EDE8DC] text-[#4A473E] group-hover:bg-[#B93829] group-hover:text-white text-[10.5px] px-2 py-0.5 rounded-full transition-colors ml-1 font-semibold">
                      Auto-Match Gallery →
                    </span>
                  </button>
                </div>
              </div>

              {/* Central Interactive Swiss Army Knife Object */}
              <div className="w-full max-w-3xl relative my-2 px-2">
                <SwissArmyKnife
                  isOpen={isKnifeOpen}
                  activeTool={activeTool}
                  onToggleOpen={handleToggleKnife}
                  onSelectTool={handleSelectTool}
                />
              </div>

              {/* Controls and Quick Tool Palette below knife */}
              <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-2xl">
                {/* Knife Open/Close Button + Sound Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    id="toggle-knife-button"
                    onClick={handleToggleKnife}
                    className="inline-flex items-center gap-2 bg-[#1C1B18] text-[#F7F4EB] hover:bg-black px-4 py-2 rounded text-xs font-mono-code font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all"
                  >
                    <span>{isKnifeOpen ? 'CLOSE KNIFE' : 'OPEN ALL TOOLS'}</span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded">SPACE</span>
                  </button>

                  <button
                    onClick={() => setIsMuted((m) => !m)}
                    className="inline-flex items-center gap-1.5 bg-[#EDE8DC] hover:bg-[#E2DDD0] text-[#4A473E] px-3 py-2 rounded text-xs font-mono-code transition-colors"
                    title={isMuted ? 'Unmute mechanical click sounds' : 'Mute sounds'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span className="text-[10px] hidden sm:inline">{isMuted ? 'MUTED' : 'CLICK SFX'}</span>
                  </button>
                </div>

                {/* Direct Numbered Tool Shortcuts */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                  {KNIFE_TOOLS.map((tool, idx) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectTool(tool.id)}
                      className="group inline-flex items-center gap-1.5 bg-[#FAF8F3] hover:bg-[#EDE8DC] border border-[#DDD8CB] px-2.5 py-1.5 rounded text-xs font-mono-code transition-all"
                    >
                      <span className="text-[#B93829] font-bold text-[10px]">[{idx + 1}]</span>
                      <span className="text-[#2A2823] font-semibold text-[11px] group-hover:text-black">
                        {tool.shortAction}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="text-center font-mono-code text-[10px] text-[#8F8A7D]">
                  Tip: Use keys <span className="font-bold text-[#555]">1–7</span> to explore tools directly or click any blade
                </div>
              </div>
            </motion.div>
          ) : (
            /* =================================================== */
            /* DEDICATED SPREAD VIEWS                              */
            /* =================================================== */
            <div key="spread-view" className="py-6">
              {activeTool === 'blade' && (
                <MakeSpread
                  onBackToKnife={handleBackToKnife}
                  onSelectNext={handleSelectNextTool}
                />
              )}
              {activeTool === 'scissors' && (
                <CreateSpread
                  onBackToKnife={handleBackToKnife}
                  onSelectNext={handleSelectNextTool}
                />
              )}
              {activeTool === 'screwdriver' && (
                <BuildSpread
                  onBackToKnife={handleBackToKnife}
                  onSelectNext={handleSelectNextTool}
                />
              )}
              {activeTool === 'awl' && (
                <InvestigateSpread
                  onBackToKnife={handleBackToKnife}
                  onSelectNext={handleSelectNextTool}
                />
              )}
              {activeTool === 'bottle-opener' && (
                <VentureSpread
                  onBackToKnife={handleBackToKnife}
                  onSelectNext={handleSelectNextTool}
                />
              )}
              {activeTool === 'small-tool' && (
                <LiveSpread
                  onBackToKnife={handleBackToKnife}
                  onSelectNext={handleSelectNextTool}
                />
              )}
              {activeTool === 'key-ring' && (
                <MeSpread onBackToKnife={handleBackToKnife} />
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Notebook Rule */}
      <footer className="w-full border-t border-[#DCD6C5] py-4 px-6 text-center font-mono-code text-[10px] text-[#7C7769] flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span>VEDANTH BHAT ARCHIVE</span>
          <span>·</span>
          <span>MASTERS’ UNION PGP TBM ’28</span>
        </div>
        <div className="font-handwriting text-base text-[#4E4A40]">
          “The only mistake is not testing the prototype.”
        </div>
        <div>
          <span>EST. 2026 // ONGOING</span>
        </div>
      </footer>

      {/* 30 Attached Photos & Screenshots Auto-Importer Modal */}
      <BatchImageImporter
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
      />
    </div>
  );
}
