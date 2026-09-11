import React from 'react';
import { motion } from 'motion/react';
import { NBFC_SECTOR_MAP, OTHER_RESEARCH } from '../../data/portfolioData';
import { ArtifactExhibit } from '../ui/ArtifactExhibit';
import { HandwrittenNote } from '../ui/HandwrittenNote';
import { ArrowLeft, BookOpen, Layers, TrendingUp, AlertTriangle, FileText } from 'lucide-react';

interface InvestigateSpreadProps {
  onBackToKnife: () => void;
  onSelectNext: () => void;
}

export const InvestigateSpread: React.FC<InvestigateSpreadProps> = ({ onBackToKnife, onSelectNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10"
    >
      {/* Top Sketchbook Navigation */}
      <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-4 mb-8">
        <button
          onClick={onBackToKnife}
          className="group inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#5C584E] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>← BACK TO THE KNIFE</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono-code text-[10px] text-[#7C7769] tracking-widest uppercase">
            SPREAD 04 · TOOL: AWL / PUNCH
          </span>
          <span className="bg-[#1C1B18] text-[#F7F4EB] text-[10px] font-mono-code px-2 py-0.5 rounded font-bold uppercase">
            INVESTIGATE
          </span>
        </div>
      </div>

      {/* Header Title Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#1C1B18] leading-tight">
            THINGS I’VE INVESTIGATED
          </h1>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#B93829] font-bold leading-normal">
            (deconstructive research, sector maps & value chains)
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#57534A] leading-relaxed max-w-2xl font-normal">
          In-depth industry teardowns, structural economic models, and policy forensic research into where margins hide and why conventional explanations fail.
        </p>
      </div>

      {/* =================================================== */}
      {/* FLAGSHIP RESEARCH: NBFC SECTOR MAP (19 SLIDES)      */}
      {/* =================================================== */}
      <section className="mb-14 border-t-2 border-[#1C1B18] pt-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#B93829] tracking-widest">
              FINANCIAL SECTOR RESEARCH
            </span>
            <span className="text-[#8F8A7D]">·</span>
            <span className="text-xs font-semibold text-[#5A574D]">
              Decomposing the Indian Non-Banking Lending Value Chain
            </span>
          </div>
          <span className="font-mono-code text-[11px] text-[#787468]">2026 · 19 SLIDES</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1C1B18] tracking-tight">
          {NBFC_SECTOR_MAP.title}
        </h2>
        <div className="font-serif-display text-lg sm:text-xl text-[#5C584E] italic mt-1 mb-6">
          “{NBFC_SECTOR_MAP.headline}”
        </div>

        {/* Narrative Summary */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5 mb-8">
          <p className="text-sm text-[#2E2B24] leading-relaxed">
            {NBFC_SECTOR_MAP.deckSummary}
          </p>
          <div className="mt-4 pt-3 border-t border-[#E8E4D8]">
            <HandwrittenNote rotation={-1.5} color="red">
              “Where does the margin actually hide?”
            </HandwrittenNote>
          </div>
        </div>

        {/* 19-Slide Deck Exhibit */}
        <div className="mb-8">
          <ArtifactExhibit 
            artifact={NBFC_SECTOR_MAP.artifacts[0]} 
            figNum="FIG. 05 · VALUE CHAIN MAP" 
          />
        </div>

        {/* The 5 Value Chain Stages Detailed */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-6 mb-8">
          <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#1C1B18] mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#B93829]" />
            <span>THE FIVE-STAGE LENDING VALUE CHAIN DECONSTRUCTED</span>
          </div>

          <div className="space-y-3 text-xs">
            {NBFC_SECTOR_MAP.stages?.map((stage, idx) => (
              <div key={idx} className="p-3 bg-white border border-[#E2DDD0] rounded flex items-start gap-3">
                <span className="font-mono-code text-[11px] font-bold text-[#B93829] shrink-0">
                  {stage.split('·')[0]}
                </span>
                <span className="text-gray-800 font-medium leading-relaxed">
                  {stage.split('·')[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Forensic Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
            <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#1C1B18] mb-3">
              CORE THESIS FINDINGS
            </div>
            <ul className="space-y-2 text-xs text-gray-700 leading-relaxed list-disc pl-4">
              {NBFC_SECTOR_MAP.findings.map((finding, idx) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAF8F3] border border-amber-200 rounded-lg p-5">
            <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#B93829] mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>HONEST METHODOLOGICAL BLINDSPOT</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3E3B33] leading-relaxed">
              {NBFC_SECTOR_MAP.honestWeakness}
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200">
              <HandwrittenNote rotation={1} color="graphite">
                “A great research deck is a thesis defended with forensic evidence.”
              </HandwrittenNote>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* SECONDARY INVESTIGATIONS: UREA & CAR BUYING         */}
      {/* =================================================== */}
      <section className="mb-14 border-t border-[#DDD8CB] pt-8">
        <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#7C7769] mb-4">
          OTHER INVESTIGATIVE WORKING PAPERS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OTHER_RESEARCH.map((topic) => (
            <div key={topic.id} className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono-code text-[10px] text-[#B93829] uppercase font-bold">
                    {topic.year} · WORKING PAPER
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 leading-tight mb-1">
                  {topic.title}
                </h3>
                <div className="font-serif-display text-sm text-[#5C584E] italic mb-3">
                  “{topic.headline}”
                </div>
                <p className="text-xs text-gray-700 leading-relaxed mb-4">
                  {topic.deckSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E4D8]">
                <HandwrittenNote rotation={-1} color="blue">
                  “{topic.lesson}”
                </HandwrittenNote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Spread Transition */}
      <div className="flex items-center justify-between border-t border-[#D8D2C2] pt-6">
        <button
          onClick={onBackToKnife}
          className="text-xs font-mono-code uppercase tracking-wider text-[#6B685F] hover:text-black"
        >
          ← CLOSE SPREAD & RETURN TO KNIFE
        </button>

        <button
          onClick={onSelectNext}
          className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider bg-[#1C1B18] text-[#F7F4EB] px-4 py-2 rounded font-semibold hover:bg-black transition-colors"
        >
          <span>NEXT: BOTTLE OPENER (VENTURE)</span>
          <span>→</span>
        </button>
      </div>
    </motion.div>
  );
};
