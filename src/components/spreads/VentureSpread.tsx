import React from 'react';
import { motion } from 'motion/react';
import { TONERSCART_PROJECT } from '../../data/portfolioData';
import { ArtifactExhibit } from '../ui/ArtifactExhibit';
import { HandwrittenNote } from '../ui/HandwrittenNote';
import { ArrowLeft, Building2, Landmark, Truck, FileCheck2, AlertCircle } from 'lucide-react';

interface VentureSpreadProps {
  onBackToKnife: () => void;
  onSelectNext: () => void;
}

export const VentureSpread: React.FC<VentureSpreadProps> = ({ onBackToKnife, onSelectNext }) => {
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
            SPREAD 05 · TOOL: BOTTLE OPENER
          </span>
          <span className="bg-[#1C1B18] text-[#F7F4EB] text-[10px] font-mono-code px-2 py-0.5 rounded font-bold uppercase">
            VENTURE
          </span>
        </div>
      </div>

      {/* Header Title Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#1C1B18] leading-tight">
            THINGS I’VE TURNED INTO BUSINESSES
          </h1>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#B93829] font-bold leading-normal">
            (partnerships, B2B marketplaces & procurement)
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#57534A] leading-relaxed max-w-2xl font-normal">
          Building commercial distribution, structuring multi-party institutional contracts, and organizing fragmented industrial supply chains.
        </p>
      </div>

      {/* =================================================== */}
      {/* CASE STUDY: TONERSCART                              */}
      {/* =================================================== */}
      <section className="mb-14 border-t-2 border-[#1C1B18] pt-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#B93829] tracking-widest">
              COMMERCIAL B2B PLATFORM
            </span>
            <span className="text-[#8F8A7D]">·</span>
            <span className="text-xs font-semibold text-[#5A574D]">
              Director of Strategic Partnerships
            </span>
          </div>
          <span className="font-mono-code text-[11px] text-[#787468]">2024–2025 · PAN-INDIA</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1C1B18] tracking-tight">
          {TONERSCART_PROJECT.title}
        </h2>
        <div className="font-serif-display text-lg sm:text-xl text-[#5C584E] italic mt-1 mb-6">
          “{TONERSCART_PROJECT.tagline}”
        </div>

        {/* Narrative Framing */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5 mb-8">
          <p className="text-sm text-[#2E2B24] leading-relaxed">
            {TONERSCART_PROJECT.question}
          </p>
          <div className="mt-4 pt-3 border-t border-[#E8E4D8]">
            <HandwrittenNote rotation={-1.5} color="graphite">
              “...then there was the procurement side. And the dealer ecosystem.”
            </HandwrittenNote>
          </div>
        </div>

        {/* Artifacts Grid */}
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArtifactExhibit 
              artifact={TONERSCART_PROJECT.artifacts[0]} 
              figNum="FIG. 06A" 
            />
            <ArtifactExhibit 
              artifact={TONERSCART_PROJECT.artifacts[1]} 
              figNum="FIG. 06B" 
            />
          </div>
          <ArtifactExhibit 
            artifact={TONERSCART_PROJECT.artifacts[2]} 
            figNum="FIG. 06C" 
          />
        </div>

        {/* Key Commercial Milestones & Partnerships */}
        <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-6 mb-8">
          <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#1C1B18] mb-4">
            COMMERCIAL IMPACT & FIELD OPERATIONS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-white border border-[#E0DBCF] rounded">
              <span className="font-mono-code text-[10px] text-[#B93829] font-bold block mb-1">
                INSTITUTIONAL PARTNERSHIP
              </span>
              <span className="font-bold text-gray-900 block text-sm mb-1">Karnataka High Court</span>
              <p className="text-gray-600 text-[11px]">
                Structured verified institutional supply lines for specialized high-volume legal printing and documentation hardware.
              </p>
            </div>

            <div className="p-3.5 bg-white border border-[#E0DBCF] rounded">
              <span className="font-mono-code text-[10px] text-[#2E5A88] font-bold block mb-1">
                SUPPLIER ONBOARDING
              </span>
              <span className="font-bold text-gray-900 block text-sm mb-1">20+ Verified Dealers</span>
              <p className="text-gray-600 text-[11px]">
                Onboarded major hardware dealers across Delhi NCR and Mumbai, aggregating authentic multi-brand stock.
              </p>
            </div>

            <div className="p-3.5 bg-white border border-[#E0DBCF] rounded">
              <span className="font-mono-code text-[10px] text-emerald-700 font-bold block mb-1">
                PROCUREMENT AUTOMATION
              </span>
              <span className="font-bold text-gray-900 block text-sm mb-1">L1/L2/L3 PDF Quotes</span>
              <p className="text-gray-600 text-[11px]">
                Built automated formal quotation generation compliant with government and institutional audit mandates.
              </p>
            </div>
          </div>
        </div>

        {/* Commercial Realization & Role Guardrail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FAF8F3] border border-amber-200 rounded-lg p-5">
            <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#B93829] mb-2">
              THE HARD WORKING-CAPITAL TRUTH
            </div>
            <p className="text-xs sm:text-sm text-[#3E3B33] leading-relaxed">
              {TONERSCART_PROJECT.whatFailed}
            </p>
            <div className="mt-3 pt-2 border-t border-amber-200">
              <HandwrittenNote rotation={1} color="red">
                “Marketplace software is secondary to trust and localized distribution.”
              </HandwrittenNote>
            </div>
          </div>

          <div className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
            <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#2E5A88] mb-2">
              MY ROLE IN THE VENTURE
            </div>
            <p className="text-xs sm:text-sm text-[#3E3B33] leading-relaxed">
              {TONERSCART_PROJECT.roleExplanation}
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
          <span>NEXT: SMALL TOOL (LIVE)</span>
          <span>→</span>
        </button>
      </div>
    </motion.div>
  );
};
