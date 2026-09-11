import React from 'react';
import { motion } from 'motion/react';
import { SQI_PROJECT, SPECULATE_PROJECT } from '../../data/portfolioData';
import { ArtifactExhibit } from '../ui/ArtifactExhibit';
import { HandwrittenNote } from '../ui/HandwrittenNote';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Lightbulb, 
  Target, 
  HelpCircle, 
  Wrench, 
  Activity, 
  TrendingDown,
  Sparkles
} from 'lucide-react';

interface MakeSpreadProps {
  onBackToKnife: () => void;
  onSelectNext: () => void;
}

export const MakeSpread: React.FC<MakeSpreadProps> = ({ onBackToKnife, onSelectNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10"
    >
      {/* Top Sketchbook Navigation & Breadcrumb */}
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
            SPREAD 01 · TOOL: MAIN BLADE
          </span>
          <span className="bg-[#1C1B18] text-[#F7F4EB] text-[10px] font-mono-code px-2 py-0.5 rounded font-bold uppercase">
            MAKE
          </span>
        </div>
      </div>

      {/* Header Title Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#1C1B18] leading-tight">
            THINGS I’VE BUILT
          </h1>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#B93829] font-bold leading-normal">
            (from scratch, because curiosity demanded it)
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#57534A] leading-relaxed max-w-2xl font-normal">
          Software architectures, deterministic measurement models, and browser extensions built to turn ambiguous real-world problems into structured systems.
        </p>
      </div>

      {/* =================================================== */}
      {/* FLAGSHIP CASE STUDY: SERVICE QUALITY INTELLIGENCE   */}
      {/* =================================================== */}
      <section className="mb-16 border-t-2 border-[#1C1B18] pt-8">
        {/* Project Header Tag & Fig */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#B93829] tracking-widest">
              CASE STUDY 01 // FLAGSHIP
            </span>
            <span className="text-[#8F8A7D]">·</span>
            <span className="text-xs font-semibold text-[#5A574D]">
              Deterministic AI Measurement System + Browser Extension
            </span>
          </div>
          <span className="font-mono-code text-[11px] text-[#787468]">2026 · MUMBAI REGISTRY</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1C1B18] tracking-tight">
          {SQI_PROJECT.title}
        </h2>
        <div className="font-serif-display text-lg sm:text-xl text-[#5C584E] italic mt-1 mb-6">
          “{SQI_PROJECT.tagline}”
        </div>

        {/* Narrative Grid: The Question & The Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Box 1: The Question */}
          <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2 text-[#B93829]">
              <HelpCircle className="w-4 h-4" />
              <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider">
                THE QUESTION
              </span>
            </div>
            <p className="text-sm text-[#2E2B24] leading-relaxed">
              {SQI_PROJECT.question}
            </p>
            <div className="mt-3 pt-3 border-t border-[#E8E4D8]">
              <HandwrittenNote rotation={-1} color="graphite">
                “I was told services are hard to quantify. So I tried to quantify them.”
              </HandwrittenNote>
            </div>
          </div>

          {/* Box 2: The Problem */}
          <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2 text-[#B93829]">
              <Target className="w-4 h-4" />
              <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider">
                THE STRUCTURAL FAILURE OF STAR RATINGS
              </span>
            </div>
            <p className="text-sm text-[#2E2B24] leading-relaxed">
              {SQI_PROJECT.problem}
            </p>
            <div className="mt-3 pt-3 border-t border-[#E8E4D8] flex flex-wrap gap-2 text-[10px] font-mono-code">
              <span className="bg-[#EFECE3] px-2 py-0.5 rounded text-[#4A473F]">Volume Conflation</span>
              <span className="bg-[#EFECE3] px-2 py-0.5 rounded text-[#4A473F]">Dimensional Invisibility</span>
              <span className="bg-[#EFECE3] px-2 py-0.5 rounded text-[#4A473F]">Recency Blindness</span>
            </div>
          </div>
        </div>

        {/* Exhibits Grid: Home, Methodology, Compare, Extension */}
        <div className="space-y-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArtifactExhibit 
              artifact={SQI_PROJECT.artifacts[0]} 
              figNum="FIG. 01A" 
            />
            <ArtifactExhibit 
              artifact={SQI_PROJECT.artifacts[1]} 
              figNum="FIG. 01B" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArtifactExhibit 
              artifact={SQI_PROJECT.artifacts[2]} 
              figNum="FIG. 01C" 
            />
            <ArtifactExhibit 
              artifact={SQI_PROJECT.artifacts[3]} 
              figNum="FIG. 01D" 
            />
          </div>
        </div>

        {/* The Build & Technical Architecture */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-3 text-[#1C1B18]">
            <Wrench className="w-4 h-4 text-[#B93829]" />
            <span className="font-mono-code text-xs font-bold uppercase tracking-wider">
              THE BUILD & TECHNICAL EXECUTION
            </span>
          </div>
          <p className="text-sm text-[#3E3C34] leading-relaxed">
            {SQI_PROJECT.build}
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono-code">
            <div className="p-2.5 bg-white border border-[#E0DBCF] rounded">
              <span className="text-[10px] text-gray-500 block">BENCHMARK SET</span>
              <span className="font-bold text-gray-900">50 Mumbai Properties</span>
            </div>
            <div className="p-2.5 bg-white border border-[#E0DBCF] rounded">
              <span className="text-[10px] text-gray-500 block">SERVICE DIMENSIONS</span>
              <span className="font-bold text-gray-900">6 Disaggregated Scores</span>
            </div>
            <div className="p-2.5 bg-white border border-[#E0DBCF] rounded">
              <span className="text-[10px] text-gray-500 block">UNCERTAINTY BOUNDS</span>
              <span className="font-bold text-gray-900">±1 to ±4 Confidence</span>
            </div>
          </div>
        </div>

        {/* What Worked vs What Didn't Work & Commercial Realization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What Worked */}
          <div className="bg-[#FAF8F3] border border-emerald-200/80 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2 text-emerald-800">
              <Check className="w-4 h-4" />
              <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider">
                THE OUTCOME
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#2E2B24] leading-relaxed">
              {SQI_PROJECT.outcome}
            </p>
          </div>

          {/* What Failed & The Realization */}
          <div className="bg-[#FFFDF8] border border-amber-300 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2 text-[#B93829]">
              <TrendingDown className="w-4 h-4" />
              <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider">
                THE COMMERCIAL REALIZATION
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#2E2B24] leading-relaxed">
              {SQI_PROJECT.whatFailed}
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200">
              <HandwrittenNote color="red" rotation={-1.5}>
                “The extension worked better than the business model.”
              </HandwrittenNote>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* SECOND CASE STUDY: SPECULATE                       */}
      {/* =================================================== */}
      <section className="mb-16 border-t border-[#DDD8CB] pt-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#2E5A88] tracking-widest">
              CASE STUDY 02 // RESEARCH APPRAISAL
            </span>
            <span className="text-[#8F8A7D]">·</span>
            <span className="text-xs font-semibold text-[#5A574D]">
              Scientific Evidence Quality Appraisal Experiment
            </span>
          </div>
          <span className="font-mono-code text-[11px] text-[#787468]">2026 · EXERCISE & NUTRITION SCIENCE</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
          {SPECULATE_PROJECT.title}
        </h2>
        <div className="font-serif-display text-lg text-[#5C584E] italic mt-1 mb-6">
          “{SPECULATE_PROJECT.tagline}”
        </div>

        {/* Question & Premise */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5 mb-6">
          <p className="text-sm text-[#38352D] leading-relaxed">
            {SPECULATE_PROJECT.problem}
          </p>
          <div className="mt-3">
            <HandwrittenNote rotation={1} color="blue">
              “Everyone reads the abstract. I wanted to know what happened underneath it.”
            </HandwrittenNote>
          </div>
        </div>

        {/* Speculate Exhibits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ArtifactExhibit 
            artifact={SPECULATE_PROJECT.artifacts[0]} 
            figNum="FIG. 02A" 
          />
          <ArtifactExhibit 
            artifact={SPECULATE_PROJECT.artifacts[1]} 
            figNum="FIG. 02B" 
          />
        </div>

        {/* Outcome & Honest Reflection */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
          <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#1C1B18] mb-2">
            METHODOLOGICAL REALIZATION
          </div>
          <p className="text-xs sm:text-sm text-[#4A473E] leading-relaxed">
            {SPECULATE_PROJECT.realization}
          </p>
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
          <span>NEXT: SCISSORS (CREATE)</span>
          <span>→</span>
        </button>
      </div>
    </motion.div>
  );
};
