import React from 'react';
import { motion } from 'motion/react';
import { NBFC_ENGINE_PROJECT } from '../../data/portfolioData';
import { ArtifactExhibit } from '../ui/ArtifactExhibit';
import { HandwrittenNote } from '../ui/HandwrittenNote';
import { ArrowLeft, Cpu, ShieldCheck, Database, GitBranch, Terminal } from 'lucide-react';

interface BuildSpreadProps {
  onBackToKnife: () => void;
  onSelectNext: () => void;
}

export const BuildSpread: React.FC<BuildSpreadProps> = ({ onBackToKnife, onSelectNext }) => {
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
            SPREAD 03 · TOOL: SCREWDRIVER
          </span>
          <span className="bg-[#1C1B18] text-[#F7F4EB] text-[10px] font-mono-code px-2 py-0.5 rounded font-bold uppercase">
            BUILD
          </span>
        </div>
      </div>

      {/* Header Title Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#1C1B18] leading-tight">
            THINGS I’VE ENGINEERED
          </h1>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#B93829] font-bold leading-normal">
            (automations, decision engines & pipelines)
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#57534A] leading-relaxed max-w-2xl font-normal">
          Workflow architectures and algorithmic gatekeepers engineered to turn complex institutional policies into autonomous, auditable pipelines.
        </p>
      </div>

      {/* =================================================== */}
      {/* CASE STUDY: NBFC LOAN ORIGINATION ENGINE           */}
      {/* =================================================== */}
      <section className="mb-14 border-t-2 border-[#1C1B18] pt-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#B93829] tracking-widest">
              DECISION ENGINE ARCHITECTURE
            </span>
            <span className="text-[#8F8A7D]">·</span>
            <span className="text-xs font-semibold text-[#5A574D]">
              Autonomous Underwriting Pipeline (Make.com + JavaScript)
            </span>
          </div>
          <span className="font-mono-code text-[11px] text-[#787468]">2026 · DEMONSTRATION ENGINE</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1C1B18] tracking-tight">
          {NBFC_ENGINE_PROJECT.title}
        </h2>
        <div className="font-serif-display text-lg sm:text-xl text-[#5C584E] italic mt-1 mb-6">
          “{NBFC_ENGINE_PROJECT.tagline}”
        </div>

        {/* Framing & Question */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5 mb-8">
          <p className="text-sm text-[#2E2B24] leading-relaxed">
            {NBFC_ENGINE_PROJECT.question}
          </p>
          <div className="mt-3 pt-3 border-t border-[#E8E4D8]">
            <HandwrittenNote rotation={-1.5} color="graphite">
              “I wanted to see how far a loan decision could be turned into a workflow.”
            </HandwrittenNote>
          </div>
        </div>

        {/* Blueprint Exhibit */}
        <div className="mb-8">
          <ArtifactExhibit 
            artifact={NBFC_ENGINE_PROJECT.artifacts[0]} 
            figNum="FIG. 04 · SCENARIO 7146849" 
          />
        </div>

        {/* Technical Decomposition: The Decision Engine Modules */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-6 mb-8">
          <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#1C1B18] mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#B93829]" />
            <span>HOW THE JAVASCRIPT UNDERWRITING GATEKEEPER WORKS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-3.5 rounded border border-[#E0DBCF]">
              <span className="font-mono-code text-[10px] text-[#B93829] font-bold block mb-1">
                STAGE 01 · KNOCKOUT GATES
              </span>
              <p className="text-gray-700 leading-relaxed text-[11px]">
                Instant programmatic rejection rules: Bureau CIBIL score &lt; 700, any 30+ DPD delinquency in prior 6 months, or unsupported state jurisdictions.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded border border-[#E0DBCF]">
              <span className="font-mono-code text-[10px] text-[#2E5A88] font-bold block mb-1">
                STAGE 02 · CAPACITY & FOIR
              </span>
              <p className="text-gray-700 leading-relaxed text-[11px]">
                Fixed Obligation to Income Ratio calculation capped at 50% net disposable income, debt-to-income stress testing, and tenure adjustment.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded border border-[#E0DBCF]">
              <span className="font-mono-code text-[10px] text-emerald-700 font-bold block mb-1">
                STAGE 03 · RISK-BASED PRICING
              </span>
              <p className="text-gray-700 leading-relaxed text-[11px]">
                Dynamic APR allocation (13.5% to 19.5%) based on credit tier, auto-generating legal sanction letters with complete EMI amortization tables.
              </p>
            </div>
          </div>
        </div>

        {/* Realization & Guardrail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
            <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#1C1B18] mb-2">
              THE UNDERWRITING REALIZATION
            </div>
            <p className="text-xs sm:text-sm text-[#3E3B33] leading-relaxed">
              {NBFC_ENGINE_PROJECT.realization}
            </p>
          </div>

          <div className="bg-[#FAF8F3] border border-blue-200 rounded-lg p-5">
            <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#2E5A88] mb-2">
              AUTHENTIC SCOPE GUARDRAIL
            </div>
            <p className="text-xs sm:text-sm text-[#3E3B33] leading-relaxed">
              {NBFC_ENGINE_PROJECT.roleExplanation}
            </p>
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
          <span>NEXT: AWL (INVESTIGATE)</span>
          <span>→</span>
        </button>
      </div>
    </motion.div>
  );
};
