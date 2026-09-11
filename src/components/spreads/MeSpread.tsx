import React from 'react';
import { motion } from 'motion/react';
import { 
  EDUCATION_ENTRIES, 
  SKILL_CATEGORIES, 
  CERTIFICATIONS, 
  PERSONAL_PHOTOS 
} from '../../data/portfolioData';
import { HandwrittenNote } from '../ui/HandwrittenNote';
import { ArtifactExhibit } from '../ui/ArtifactExhibit';
import { 
  ArrowLeft, 
  Mail, 
  Linkedin, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Camera
} from 'lucide-react';

interface MeSpreadProps {
  onBackToKnife: () => void;
}

export const MeSpread: React.FC<MeSpreadProps> = ({ onBackToKnife }) => {
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
            SPREAD 07 · TOOL: KEY RING
          </span>
          <span className="bg-[#1C1B18] text-[#F7F4EB] text-[10px] font-mono-code px-2 py-0.5 rounded font-bold uppercase">
            ME
          </span>
        </div>
      </div>

      {/* Hero Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-[#DDD8CB] pb-10">
        {/* Left 2 Cols: Statement & Identity */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono-code text-xs font-bold text-[#B93829] tracking-widest uppercase">
              DOSSIER // THE PERSON BEHIND ALL THIS
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#1C1B18] mb-4">
            VEDANTH BHAT
          </h1>

          <div className="space-y-4 text-sm sm:text-base text-[#3E3C35] leading-relaxed">
            <p>
              I get curious about how things work — whether that’s an institutional lending value chain, an ill-fitting pair of trousers, the statistical reliability of nutrition papers, or why online hotel ratings fail to predict service reality.
            </p>
            <p>
              Then, I usually make the mistake of trying to build something about it.
            </p>
            <p className="text-xs sm:text-sm text-[#5C584E]">
              I move between business, technology, research, and creative storytelling — not because I want to be a generalist for the sake of a buzzword, but because the problems I find interesting don’t stop at disciplinary borders.
            </p>
          </div>

          <div className="mt-6">
            <HandwrittenNote rotation={-1.5} color="red">
              “Follow the curiosity. Build the thing. Learn from what breaks.”
            </HandwrittenNote>
          </div>
        </div>

        {/* Right Col: Portrait Polaroid Exhibit with photo/specimen support */}
        <div className="flex flex-col items-center justify-center">
          <ArtifactExhibit
            artifact={PERSONAL_PHOTOS[0]}
            figNum="PORTRAIT · 2026"
            className="w-full"
          />
        </div>
      </div>

      {/* =================================================== */}
      {/* EDUCATION TIMELINE                                 */}
      {/* =================================================== */}
      <section className="mb-12">
        <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#B93829] mb-4 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          <span>EDUCATION & INSTITUTIONAL FOUNDATION</span>
        </div>

        <div className="space-y-4">
          {EDUCATION_ENTRIES.map((edu, idx) => (
            <div key={idx} className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {edu.institution}
                </h3>
                <div className="text-xs sm:text-sm font-medium text-[#4A473E] mt-0.5">
                  {edu.degree}
                </div>
                {edu.details && (
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                    {edu.details}
                  </p>
                )}
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="font-mono-code text-[11px] font-bold text-gray-900 bg-[#E8E4D8] px-2 py-0.5 rounded block sm:inline-block">
                  {edu.period}
                </span>
                <span className="font-mono-code text-[10px] text-gray-500 block mt-1">
                  {edu.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* SKILLS & TECHNICAL CAPABILITIES                    */}
      {/* =================================================== */}
      <section className="mb-12 border-t border-[#DDD8CB] pt-8">
        <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#1C1B18] mb-4">
          SKILLS & ARSENAL
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-5">
              <h3 className="font-display text-base font-bold text-gray-900 mb-1">
                {cat.category}
              </h3>
              <p className="text-xs text-[#6B685F] mb-4">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="bg-white border border-[#DDD8CB] text-[#2E2B25] px-2.5 py-1 rounded text-xs font-mono-code font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* CERTIFICATIONS & ACCREDITATIONS                    */}
      {/* =================================================== */}
      <section className="mb-14 border-t border-[#DDD8CB] pt-8">
        <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#B93829] mb-4 flex items-center gap-2">
          <Award className="w-4 h-4" />
          <span>CERTIFICATIONS & SPECIALIZATIONS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div key={idx} className="bg-[#FAF8F3] border border-[#DDD8CB] rounded-lg p-4">
              <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                {cert.title}
              </h4>
              <div className="text-[11px] font-mono-code text-[#B93829] mt-0.5">
                {cert.issuer}
              </div>
              {cert.note && (
                <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                  {cert.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* PERSONAL PHOTO ARCHIVE                              */}
      {/* =================================================== */}
      <section className="mb-14 border-t border-[#DDD8CB] pt-8">
        <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#B93829] mb-4 flex items-center gap-2">
          <Camera className="w-4 h-4" />
          <span>PERSONAL ARCHIVE & COHORT LIFE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArtifactExhibit
            artifact={PERSONAL_PHOTOS[1]}
            figNum="FIG. 12 · MENTORSHIP"
          />
          <ArtifactExhibit
            artifact={PERSONAL_PHOTOS[2]}
            figNum="FIG. 13 · SPEAKER"
          />
        </div>
      </section>

      {/* =================================================== */}
      {/* BACK COVER / CONTACT SECTION                        */}
      {/* =================================================== */}
      <section className="bg-[#1C1B18] text-[#F7F4EB] rounded-xl p-6 sm:p-10 text-center relative overflow-hidden shadow-lg">
        {/* Subtle background grain / circle */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />

        <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#B93829] font-bold">
          END OF SKETCHBOOK SPREAD · ONGOING ARCHIVE
        </span>

        <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight mt-2 mb-3">
          LET’S MAKE SOMETHING INTERESTING.
        </h2>

        <p className="text-xs sm:text-sm text-[#CDC8BC] max-w-lg mx-auto leading-relaxed mb-6 font-normal">
          If you’re working on hard problems, building products, structuring partnerships, or simply want to debate why something broken exists — let’s talk.
        </p>

        {/* Contact links */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:vedanth.bhat2028@mastersunion.org"
            className="inline-flex items-center gap-2 bg-[#F7F4EB] text-[#1C1B18] px-3.5 py-2.5 rounded text-xs font-mono-code font-bold hover:bg-white transition-colors max-w-full"
          >
            <Mail className="w-3.5 h-3.5 text-[#B93829] shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-none">vedanth.bhat2028@mastersunion.org</span>
          </a>

          <a
            href="https://linkedin.com/in/vedanthbhat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white px-3.5 py-2.5 rounded text-xs font-mono-code font-bold hover:border-white transition-colors max-w-full"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate max-w-[220px] sm:max-w-none">linkedin.com/in/vedanthbhat</span>
            <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono-code text-gray-400 gap-2">
          <span>VEDANTH BHAT · PORTFOLIO SPECIFICATION 2026</span>
          <span className="font-handwriting text-base text-gray-300">
            handcrafted with SVG geometry & curiosity
          </span>
        </div>
      </section>

      {/* Bottom Spread Transition */}
      <div className="mt-8 flex items-center justify-between border-t border-[#D8D2C2] pt-6">
        <button
          onClick={onBackToKnife}
          className="text-xs font-mono-code uppercase tracking-wider text-[#6B685F] hover:text-black"
        >
          ← CLOSE SPREAD & RETURN TO KNIFE
        </button>

        <span className="text-xs font-mono-code text-[#999487]">
          SKETCHBOOK SPREAD COMPLETE
        </span>
      </div>
    </motion.div>
  );
};
