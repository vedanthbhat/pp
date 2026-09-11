import React from 'react';
import { motion } from 'motion/react';
import { LIFE_EXPERIENCES, ACHIEVEMENTS } from '../../data/portfolioData';
import { HandwrittenNote } from '../ui/HandwrittenNote';
import { ArtifactExhibit } from '../ui/ArtifactExhibit';
import { 
  ArrowLeft, 
  Users, 
  Heart, 
  Drama, 
  Music, 
  Trophy, 
  Sparkles,
  Award
} from 'lucide-react';

interface LiveSpreadProps {
  onBackToKnife: () => void;
  onSelectNext: () => void;
}

export const LiveSpread: React.FC<LiveSpreadProps> = ({ onBackToKnife, onSelectNext }) => {
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
            SPREAD 06 · TOOL: SMALL TOOL
          </span>
          <span className="bg-[#1C1B18] text-[#F7F4EB] text-[10px] font-mono-code px-2 py-0.5 rounded font-bold uppercase">
            LIVE
          </span>
        </div>
      </div>

      {/* Header Title Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#1C1B18] leading-tight">
            THINGS I DID BECAUSE THEY MATTERED
          </h1>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#B93829] font-bold leading-normal">
            (music, theatre, 20k festivals & community)
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#57534A] leading-relaxed max-w-2xl font-normal">
          The non-academic, non-commercial pursuits that shaped how I communicate, handle crisis, listen under pressure, and connect with people.
        </p>
      </div>

      {/* Grid of 4 Core Pillars */}
      <div className="space-y-12 mb-14">
        {LIFE_EXPERIENCES.map((exp, idx) => (
          <section key={exp.id} className="border-t border-[#DDD8CB] pt-8">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono-code text-xs font-bold text-[#B93829] tracking-widest">
                {exp.fig} // {exp.organization.toUpperCase()}
              </span>
              <span className="font-mono-code text-[11px] text-[#787468]">{exp.period}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1C1B18]">
                {exp.title}
              </h2>
              <span className="text-xs font-semibold text-[#5A574D] bg-[#EAE5D8] px-2 py-0.5 rounded font-mono-code">
                {exp.role}
              </span>
            </div>

            {/* Content & Anecdote Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {/* Highlights (2 Cols) */}
              <div className="md:col-span-2 bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
                <div className="font-mono-code text-[10px] text-gray-500 uppercase tracking-wider mb-3">
                  RESPONSIBILITIES & HIGHLIGHTS
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-800 leading-relaxed list-disc pl-4">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 border-t border-[#E8E4D8]">
                  <HandwrittenNote rotation={idx % 2 === 0 ? -1 : 1.2} color="graphite">
                    “{exp.anecdote}”
                  </HandwrittenNote>
                </div>
              </div>

              {/* Photo / Exhibit representation (1 Col or grid if multiple) */}
              <div className="flex flex-col gap-3">
                {exp.artifacts.map((art, aIdx) => (
                  <ArtifactExhibit
                    key={art.id}
                    artifact={art}
                    figNum={`${exp.fig} · ARCHIVE ${aIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* =================================================== */}
      {/* COMPETITIVE FORENSICS & SCORES                     */}
      {/* =================================================== */}
      <section className="border-t-2 border-[#1C1B18] pt-8 mb-12">
        <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#B93829] mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          <span>COMPETITIVE MERIT & PERFORMANCE BENCHMARKS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map((item, i) => (
            <div key={i} className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-3 text-center flex flex-col justify-between">
              <div>
                <div className="font-display text-lg sm:text-xl font-black text-[#1C1B18] leading-tight break-words flex flex-wrap items-baseline justify-center gap-1">
                  <span>{item.metric}</span>
                  {item.unit && <span className="text-xs font-normal text-[#8A8578]">{item.unit}</span>}
                </div>
                <div className="font-mono-code text-[10px] font-bold text-[#2E2B25] mt-1.5 leading-snug break-words">
                  {item.label}
                </div>
              </div>
              <div className="text-[9px] text-[#787469] mt-1 border-t border-[#ECE8DC] pt-1">
                {item.sub}
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
          <span>NEXT: KEY RING (ME)</span>
          <span>→</span>
        </button>
      </div>
    </motion.div>
  );
};
