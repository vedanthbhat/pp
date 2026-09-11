import React from 'react';
import { motion } from 'motion/react';
import { LANKY_KID_PROJECT } from '../../data/portfolioData';
import { ArtifactExhibit } from '../ui/ArtifactExhibit';
import { HandwrittenNote } from '../ui/HandwrittenNote';
import { ArrowLeft, Scissors, Ruler, Sparkles, AlertCircle } from 'lucide-react';

interface CreateSpreadProps {
  onBackToKnife: () => void;
  onSelectNext: () => void;
}

export const CreateSpread: React.FC<CreateSpreadProps> = ({ onBackToKnife, onSelectNext }) => {
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
            SPREAD 02 · TOOL: SCISSORS
          </span>
          <span className="bg-[#1C1B18] text-[#F7F4EB] text-[10px] font-mono-code px-2 py-0.5 rounded font-bold uppercase">
            CREATE
          </span>
        </div>
      </div>

      {/* Header Title Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#1C1B18] leading-tight">
            THINGS I’VE MADE
          </h1>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#B93829] font-bold leading-normal">
            (garments, brand identities, and editorial storytelling)
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#57534A] leading-relaxed max-w-2xl font-normal">
          Direct-to-consumer apparel, design craft, and brand voice built around genuine human friction rather than boardroom demographic charts.
        </p>
      </div>

      {/* =================================================== */}
      {/* CASE STUDY: DIARY OF A LANKY KID                   */}
      {/* =================================================== */}
      <section className="mb-14 border-t-2 border-[#1C1B18] pt-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#B93829] tracking-widest">
              DTC BRAND EXPERIMENT
            </span>
            <span className="text-[#8F8A7D]">·</span>
            <span className="text-xs font-semibold text-[#5A574D]">
              Niche Sizing Architecture & Brand Narrative
            </span>
          </div>
          <span className="font-mono-code text-[11px] text-[#787468]">2025 · FOUNDER BRAND</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1C1B18] tracking-tight">
          {LANKY_KID_PROJECT.title}
        </h2>
        <div className="font-serif-display text-lg sm:text-xl text-[#5C584E] italic mt-1 mb-6">
          “{LANKY_KID_PROJECT.tagline}”
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#FFFDF8] notebook-margin-line border border-[#DDD8CB] rounded-lg p-5">
            <div className="font-mono-code text-[11px] font-bold text-[#B93829] uppercase tracking-wider mb-2">
              THE 6’3” FOUNDER PROBLEM
            </div>
            <p className="text-sm text-[#2E2B24] leading-relaxed">
              {LANKY_KID_PROJECT.question}
            </p>
            <div className="mt-4 pt-3 border-t border-[#E8E4D8]">
              <HandwrittenNote rotation={-1.2} color="red">
                “I had the problem, couldn’t find the product, so I started the brand.”
              </HandwrittenNote>
            </div>
          </div>

          <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
            <div className="font-mono-code text-[11px] font-bold text-[#1C1B18] uppercase tracking-wider mb-2">
              THE SIZING ARCHITECTURE
            </div>
            <p className="text-sm text-[#2E2B24] leading-relaxed">
              {LANKY_KID_PROJECT.problem}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-mono-code">
              <span className="bg-[#EFECE3] px-2 py-0.5 rounded text-[#4A473F]">Inseams up to 42”</span>
              <span className="bg-[#EFECE3] px-2 py-0.5 rounded text-[#4A473F]">Independent Waist Scaling</span>
              <span className="bg-[#EFECE3] px-2 py-0.5 rounded text-[#4A473F]">Non-Vanity Fit</span>
            </div>
          </div>
        </div>

        {/* Artifacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ArtifactExhibit 
            artifact={LANKY_KID_PROJECT.artifacts[0]} 
            figNum="FIG. 03A" 
          />
          <ArtifactExhibit 
            artifact={LANKY_KID_PROJECT.artifacts[1]} 
            figNum="FIG. 03B" 
          />
        </div>

        {/* The Commercial Reality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
            <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#1C1B18] mb-2">
              WHAT RESONATED
            </div>
            <p className="text-xs sm:text-sm text-[#3E3B33] leading-relaxed">
              {LANKY_KID_PROJECT.outcome}
            </p>
          </div>

          <div className="bg-[#FAF8F3] border border-amber-200 rounded-lg p-5">
            <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#B93829] mb-2">
              THE MANUFACTURING BOTTLENECK
            </div>
            <p className="text-xs sm:text-sm text-[#3E3B33] leading-relaxed">
              {LANKY_KID_PROJECT.whatFailed}
            </p>
            <div className="mt-3 pt-2 border-t border-amber-200">
              <HandwrittenNote rotation={1} color="graphite">
                “The best brands start when you are genuinely annoyed by a problem.”
              </HandwrittenNote>
            </div>
          </div>
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
          <span>NEXT: SCREWDRIVER (BUILD)</span>
          <span>→</span>
        </button>
      </div>
    </motion.div>
  );
};
