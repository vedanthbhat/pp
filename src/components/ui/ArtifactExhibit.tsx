import React, { useState, useRef, useEffect } from 'react';
import { Artifact } from '../../types';
import { 
  getArtifactImage, 
  saveArtifactImage, 
  removeArtifactImage 
} from '../../utils/imageStore';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Layers, 
  Search, 
  ShieldCheck, 
  Maximize2,
  TrendingUp,
  Cpu,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  X,
  Eye,
  Code2,
  RotateCcw
} from 'lucide-react';

interface ArtifactExhibitProps {
  artifact: Artifact;
  figNum?: string;
  className?: string;
}

export const ArtifactExhibit: React.FC<ArtifactExhibitProps> = ({
  artifact,
  figNum = 'EXHIBIT',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'image' | 'specimen'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check saved custom image from IndexedDB / localStorage or initial artifact.imageUrl
  const [imageSrc, setImageSrc] = useState<string | null>(artifact.imageUrl || null);

  useEffect(() => {
    let isMounted = true;
    const loadSavedImage = async () => {
      const stored = await getArtifactImage(artifact.id);
      if (isMounted && stored) {
        setImageSrc(stored);
        setViewMode('image');
      } else if (isMounted && artifact.imageUrl) {
        setImageSrc(artifact.imageUrl);
        setViewMode('image');
      } else if (isMounted) {
        // Check if a static file exists in /images/${artifact.id}.png|jpg|jpeg
        const candidateUrls = [
          `/images/${artifact.id}.png`,
          `/images/${artifact.id}.jpg`,
          `/images/${artifact.id}.jpeg`,
          `/images/${artifact.id}.webp`
        ];
        
        for (const url of candidateUrls) {
          try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.ok && isMounted) {
              setImageSrc(url);
              setViewMode('image');
              break;
            }
          } catch {
            // Static file not present
          }
        }
      }
    };

    loadSavedImage();

    const handleUpdate = () => {
      loadSavedImage();
    };

    window.addEventListener('artifact-images-updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('artifact-images-updated', handleUpdate);
    };
  }, [artifact.id, artifact.imageUrl]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImageSrc(result);
        setViewMode('image');
        await saveArtifactImage(artifact.id, result, file.name);
        window.dispatchEvent(new CustomEvent('artifact-images-updated'));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveCustomImage = async () => {
    setImageSrc(null);
    await removeArtifactImage(artifact.id);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    window.dispatchEvent(new CustomEvent('artifact-images-updated'));
  };

  const hasImage = Boolean(imageSrc);

  return (
    <div 
      className={`relative bg-[#FAF8F3] border rounded-lg p-3 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
        isDragging ? 'border-[#B93829] ring-2 ring-[#B93829]/20 bg-[#FDFBF7]' : 'border-[#DDD8CB]'
      } ${className}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Hidden file input for uploading images */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Tape strip at top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 tape-strip rounded-xs transform -rotate-1 pointer-events-none z-10" />

      {/* Header with Fig number and Badge & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-[#E8E4D8] pb-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono-code text-[10px] font-semibold tracking-widest text-[#7C7769] uppercase shrink-0">
            {figNum}
          </span>
          <span className="text-xs font-bold text-[#2A2823] truncate">
            {artifact.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher when Image is Attached */}
          {hasImage && (
            <div className="inline-flex items-center bg-[#EDE8DC] p-0.5 rounded text-[10px] font-mono-code">
              <button
                type="button"
                onClick={() => setViewMode('image')}
                className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${
                  viewMode === 'image' ? 'bg-white text-[#1C1B18] shadow-xs font-bold' : 'text-[#7A7569] hover:text-[#2A2823]'
                }`}
                title="View actual project photo / screenshot"
              >
                <ImageIcon className="w-3 h-3 text-[#B93829]" />
                <span className="hidden sm:inline">Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('specimen')}
                className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${
                  viewMode === 'specimen' ? 'bg-white text-[#1C1B18] shadow-xs font-bold' : 'text-[#7A7569] hover:text-[#2A2823]'
                }`}
                title="View interactive code specimen"
              >
                <Code2 className="w-3 h-3 text-[#7A7569]" />
                <span className="hidden sm:inline">Specimen</span>
              </button>
            </div>
          )}

          {/* Attach / Replace Image Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 bg-[#EDE8DC] hover:bg-[#E2DDD0] text-[#3D3A32] px-2 py-1 rounded text-[10px] font-mono-code font-semibold transition-colors shrink-0"
            title="Attach or replace real project screenshot"
          >
            <Upload className="w-3 h-3 text-[#B93829]" />
            <span>{hasImage ? 'Change' : 'Attach'}</span>
          </button>

          {hasImage && (
            <button
              type="button"
              onClick={handleRemoveCustomImage}
              className="text-[#9A9588] hover:text-[#B93829] p-1 rounded transition-colors"
              title="Remove attached image and revert to specimen"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}

          {artifact.badge && (
            <span className="font-mono-code text-[9px] font-medium tracking-wider bg-[#EDE8DC] text-[#4A473E] px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
              {artifact.badge}
            </span>
          )}
        </div>
      </div>

      {/* Main Artifact Display Frame */}
      <div className="rounded-md border border-[#D5D0C2] overflow-hidden bg-white relative">
        {/* Render Actual Image if active and exists */}
        {hasImage && viewMode === 'image' ? (
          <div className="relative group bg-[#181A1D] flex items-center justify-center overflow-hidden min-h-[240px]">
            <img 
              src={imageSrc!} 
              alt={artifact.title}
              className="w-full h-auto max-h-[520px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
            {/* Overlay buttons */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="p-1.5 bg-black/70 hover:bg-black text-white rounded text-xs flex items-center gap-1 backdrop-blur-xs font-mono-code"
                title="Open fullscreen view"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[10px]">Expand</span>
              </button>
            </div>
            <div className="absolute bottom-2 left-2 pointer-events-none">
              <span className="font-mono-code text-[9px] tracking-wider uppercase bg-black/60 text-emerald-400 px-2 py-0.5 rounded backdrop-blur-xs">
                Authentic Project Asset
              </span>
            </div>
          </div>
        ) : (
          <>
        {/* Render artifact based on mockType */}

        {/* 1. SQI HOME REGISTRY */}
        {artifact.mockType === 'sqi-home' && (
          <div className="bg-[#0B0F14] text-white p-4 sm:p-6 font-sans text-xs">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center font-bold text-black text-[11px]">S</div>
                <span className="font-bold tracking-wider text-sm">SQI</span>
                <span className="text-gray-400 text-[10px] hidden sm:inline">SERVICE QUALITY INTELLIGENCE</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-[11px]">
                <span className="text-white font-medium">Registry</span>
                <span>Methodology</span>
                <span>Compare</span>
                <span>Rankings</span>
              </div>
            </div>

            {/* Hero content */}
            <div className="py-2 max-w-lg">
              <span className="text-emerald-400 font-mono-code text-[10px] tracking-widest uppercase">
                INITIAL PRODUCT: MUMBAI REGISTRY · 50 CALIBRATED PROPERTIES
              </span>
              <h4 className="text-base sm:text-lg font-bold mt-1 text-white leading-tight">
                Know the quality behind the rating that actually matters.
              </h4>
              <p className="text-gray-400 text-[11px] mt-1.5 leading-relaxed">
                SQI turns reviews, business promises and public evidence into a standardized measure of service quality — so you can see what a rating alone misses.
              </p>
              
              {/* Search Bar */}
              <div className="mt-4 bg-gray-900 border border-gray-700 rounded p-2 flex items-center justify-between text-gray-400">
                <span className="text-gray-400 text-[11px] flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" /> Search a restaurant or hotel in Mumbai...
                </span>
                <span className="font-mono-code text-[9px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">⌘K</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. SQI METHODOLOGY */}
        {artifact.mockType === 'sqi-methodology' && (
          <div className="bg-[#0D1117] text-gray-200 p-4 sm:p-5 text-xs font-mono-code leading-relaxed">
            <div className="border-b border-gray-800 pb-2 mb-3 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-bold">SQI Methodology & Mathematical Rules</span>
              <span className="text-gray-400 text-[10px]">SPECIFICATION V1.0</span>
            </div>
            <div className="text-[11px] text-gray-300 mb-2 font-semibold">
              01 · FOUNDATIONAL PREMISE: The Structural Failure of Star Ratings
            </div>
            <div className="space-y-2 text-[10.5px] text-gray-400">
              <div className="bg-gray-900/80 p-2.5 rounded border-l-2 border-emerald-500">
                <span className="text-white font-medium">1. Volume Conflation:</span> A 4.8★ with 30 reviews looks identical to a 4.8★ with 30,000. Platforms confuse statistical confidence with quality.
              </div>
              <div className="bg-gray-900/80 p-2.5 rounded border-l-2 border-emerald-500">
                <span className="text-white font-medium">2. Dimensional Invisibility:</span> A restaurant with Michelin-tier food and abysmal service aggregates to a mediocre 3.8★. Neither reality is visible.
              </div>
              <div className="bg-gray-900/80 p-2.5 rounded border-l-2 border-emerald-500">
                <span className="text-white font-medium">3. Recency Blindness:</span> A hotel that changed management 3 months ago still trades on 5 years of historical reviews.
              </div>
            </div>
          </div>
        )}

        {/* 3. SQI COMPARE MATRIX */}
        {artifact.mockType === 'sqi-compare' && (
          <div className="bg-[#0C1015] text-white p-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
              <span className="font-bold text-gray-200">Compare Properties</span>
              <span className="text-emerald-400 font-mono-code text-[10px]">MUMBAI BENCHMARK</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-sm text-white">The Oberoi Mumbai</div>
                  <div className="text-[11px] text-gray-400">Nariman Point · Luxury Hotel</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-emerald-400 leading-none">96<span className="text-xs font-normal text-gray-400">/100</span></div>
                  <div className="text-[10px] font-mono-code text-emerald-300">GRADE A+</div>
                </div>
              </div>
              
              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-gray-800 text-[10.5px] font-mono-code">
                <div>
                  <span className="text-gray-400 block text-[9px]">UNCERTAINTY</span>
                  <span className="text-gray-200">±1 pts</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px]">CONFIDENCE</span>
                  <span className="text-emerald-400">98/100</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px]">COVERAGE</span>
                  <span className="text-gray-200">97%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3B. SQI RANKINGS & PROPERTY EXPLORER */}
        {artifact.mockType === 'sqi-rankings' && (
          <div className="bg-[#0B0F14] text-white p-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
              <div>
                <span className="font-bold text-gray-200 text-sm">Mumbai Quality Registry</span>
                <span className="text-gray-400 text-[10px] block">50 Calibrated Properties · Real vs Rating Discrepancies</span>
              </div>
              <span className="text-emerald-400 font-mono-code text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                LIVE EXPLORER
              </span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              <div className="bg-gray-900/90 border border-gray-800 rounded p-2 flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-200 text-xs">Fiona</div>
                  <div className="text-[10px] text-gray-400">Juhu · Contemporary Asian Fine Dining</div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="text-[10px] text-gray-400">Platform <span className="text-amber-400">4.9★</span></div>
                  <div className="text-sm font-bold text-emerald-400 font-mono-code">95 <span className="text-[9px] text-emerald-300">SQI</span></div>
                </div>
              </div>

              <div className="bg-amber-950/20 border border-amber-800/60 rounded p-2 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-200 text-xs flex items-center gap-1.5">
                    <span>Fi&apos;lia</span>
                    <span className="bg-red-900/60 text-red-300 text-[9px] px-1 rounded font-mono-code">Discrepancy -23 pts</span>
                  </div>
                  <div className="text-[10px] text-gray-400">Bandra West · Modern Italian Trattoria</div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="text-[10px] text-gray-400">Platform <span className="text-amber-400">4.9★</span></div>
                  <div className="text-sm font-bold text-yellow-400 font-mono-code">76 <span className="text-[9px] text-yellow-300">SQI</span></div>
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-800/60 rounded p-2 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-200 text-xs flex items-center gap-1.5">
                    <span>Trishna</span>
                    <span className="bg-emerald-900/60 text-emerald-300 text-[9px] px-1 rounded font-mono-code">Hidden Gem +49 pts</span>
                  </div>
                  <div className="text-[10px] text-gray-400">Fort · Coastal Mangalorean Seafood</div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="text-[10px] text-gray-400">Platform <span className="text-amber-400">4.3★</span></div>
                  <div className="text-sm font-bold text-emerald-400 font-mono-code">92 <span className="text-[9px] text-emerald-300">SQI</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. SQI CHROME EXTENSION OVERLAY */}
        {artifact.mockType === 'sqi-extension' && (
          <div className="bg-gray-100 p-3 sm:p-4 text-xs font-sans">
            {/* Fake Chrome Address Bar */}
            <div className="bg-white border border-gray-300 rounded px-3 py-1.5 flex items-center gap-2 mb-3 text-gray-600 text-[11px]">
              <span className="text-gray-400">🔒 google.com/search?q=the+taj+mahal+palace+mumbai</span>
            </div>

            {/* Google Search Result with in-page SQI extension card */}
            <div className="bg-white p-3 rounded border border-gray-200 shadow-sm relative">
              <div className="text-blue-700 text-sm font-medium hover:underline">
                The Taj Mahal Palace, Mumbai | Official 5 Star Luxury Hotel
              </div>
              <div className="text-green-700 text-[10.5px]">tajhotels.com/en-in/taj/taj-mahal-palace-mumbai</div>
              <div className="text-gray-600 text-[11px] mt-1">
                Facing the Gateway of India, this iconic 1903 heritage hotel offers legendary luxury, fine dining, and harbor views...
              </div>

              {/* Injected SQI Widget */}
              <div className="mt-3 bg-[#0B0F14] text-white p-3 rounded-md border border-emerald-500/40 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-emerald-500 rounded text-black font-bold flex items-center justify-center text-[10px]">S</div>
                    <span className="font-bold text-[11px] text-gray-200">SQI INTELLIGENCE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-emerald-400">94/100</span>
                    <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded text-[9px] font-mono-code">GRADE A</span>
                  </div>
                </div>

                {/* 6 Dimension Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px] text-gray-300 pt-1 border-t border-gray-800">
                  <div className="flex justify-between"><span>Accommodation</span><span className="text-emerald-400 font-mono-code">95</span></div>
                  <div className="flex justify-between"><span>Guest Exp.</span><span className="text-emerald-400 font-mono-code">96</span></div>
                  <div className="flex justify-between"><span>Operations</span><span className="text-emerald-400 font-mono-code">94</span></div>
                  <div className="flex justify-between"><span>Consistency</span><span className="text-emerald-400 font-mono-code">95</span></div>
                  <div className="flex justify-between"><span>Value</span><span className="text-yellow-400 font-mono-code">88</span></div>
                  <div className="flex justify-between"><span>Trust & Hygiene</span><span className="text-emerald-400 font-mono-code">97</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. SPECULATE RESEARCH APPRAISAL */}
        {artifact.mockType === 'speculate-eval' && (
          <div className="bg-[#FAF9F5] p-4 text-xs font-sans text-gray-800 border-t-2 border-red-500">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
              <span className="font-mono-code text-[10px] text-gray-500 uppercase tracking-wider">RESEARCH APPRAISAL RESULT</span>
              <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-[10px]">13 / 100 · UNRELIABLE</span>
            </div>
            
            <div className="font-serif-display text-base font-bold text-gray-900 leading-snug">
              “Ashwagandha (Withania somnifera) — a herb with versatile medicinal properties empowering human physical and mental health”
            </div>
            
            <div className="mt-3 bg-red-50 border border-red-200 rounded p-2.5 text-[11px] text-red-900">
              <div className="font-bold flex items-center gap-1 mb-1 text-red-700">
                <AlertTriangle className="w-3.5 h-3.5" /> Methodological Red Flags Detected:
              </div>
              <ul className="list-disc pl-4 space-y-1 text-gray-700">
                <li>No systematic review methodology (narrative opinion paper).</li>
                <li>Extrapolates findings from rodent models directly to clinical human conclusions.</li>
                <li>Uses unscientific hyperbolic claims (e.g. “miraculous”, “royal herb”).</li>
                <li>Missing explicit institutional funding or conflict of interest declaration.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 6. SPECULATE COMPARE */}
        {artifact.mockType === 'speculate-compare' && (
          <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-red-50/70 border border-red-200 rounded p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-red-900">Ashwagandha Review</span>
                <span className="font-mono-code font-bold text-red-600">13/100</span>
              </div>
              <span className="text-[10px] text-red-700 font-semibold block mb-2">Unreliable / Insufficient</span>
              <div className="text-[10.5px] text-gray-600 space-y-1">
                <div>• Study Design: 2/25</div>
                <div>• Statistical Rigor: 0/20</div>
                <div>• Real-World Duration: 3/15</div>
                <div>• Generalizability: 2/13</div>
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-emerald-950">Creatine Meta-Analysis</span>
                <span className="font-mono-code font-bold text-emerald-600">76/100</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold block mb-2">Moderate / High Evidence</span>
              <div className="text-[10.5px] text-gray-600 space-y-1">
                <div>• Study Design: 24/25 (14 matched RCTs)</div>
                <div>• Statistical Rigor: 17/20</div>
                <div>• Real-World Duration: 12/15</div>
                <div>• Generalizability: 11/13</div>
              </div>
            </div>
          </div>
        )}

        {/* 7. MAKE.COM NBFC DECISION FLOW */}
        {artifact.mockType === 'nbfc-make-flow' && (
          <div className="bg-[#1E1F29] text-white p-4 text-xs font-sans overflow-x-auto">
            <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                <span className="font-mono-code text-[11px] font-bold text-gray-200">Scenario 7146849: NBFC Retail Underwriting</span>
              </div>
              <span className="text-[10px] font-mono-code bg-gray-800 text-purple-300 px-2 py-0.5 rounded">MAKE.COM BLUEPRINT</span>
            </div>

            {/* Workflow Diagram Nodes */}
            <div className="flex items-center gap-2 py-3 min-w-[500px]">
              {/* Node 1 */}
              <div className="bg-[#2A2B3D] border border-blue-500/50 rounded-lg p-2 text-center w-28">
                <div className="font-mono-code text-[9px] text-blue-400">01 DRIVE</div>
                <div className="text-[10px] font-semibold mt-1">Watch Folder</div>
                <div className="text-[8px] text-gray-400 mt-0.5">New loan application</div>
              </div>
              <span className="text-gray-500">→</span>

              {/* Node 2 */}
              <div className="bg-[#2A2B3D] border border-blue-500/50 rounded-lg p-2 text-center w-28">
                <div className="font-mono-code text-[9px] text-blue-400">02 DRIVE</div>
                <div className="text-[10px] font-semibold mt-1">Extract & Parse</div>
                <div className="text-[8px] text-gray-400 mt-0.5">OCR borrower docs</div>
              </div>
              <span className="text-gray-500">→</span>

              {/* Node 3 */}
              <div className="bg-[#2A2B3D] border border-amber-500/50 rounded-lg p-2 text-center w-32">
                <div className="font-mono-code text-[9px] text-amber-400">05 MAKE CODE</div>
                <div className="text-[10px] font-semibold mt-1">JS Decision Engine</div>
                <div className="text-[8px] text-gray-400 mt-0.5">FOIR, Knockout, Risk</div>
              </div>
              <span className="text-gray-500">→</span>

              {/* Node 4 */}
              <div className="bg-[#2A2B3D] border border-purple-500/50 rounded-lg p-2 text-center w-28">
                <div className="font-mono-code text-[9px] text-purple-400">07 ROUTER</div>
                <div className="text-[10px] font-semibold mt-1">Risk Gate Route</div>
                <div className="text-[8px] text-gray-400 mt-0.5">Approved vs Rejected</div>
              </div>
            </div>
            
            <div className="mt-2 text-[10px] text-gray-400 font-mono-code flex items-center justify-between border-t border-gray-800 pt-2">
              <span>Route 1: Gmail Approval + Sanction Letter</span>
              <span>Route 2: Gmail Itemized Rejection Reasons</span>
            </div>
          </div>
        )}

        {/* 8. TONERSCART B2B MARKETPLACE */}
        {artifact.mockType === 'tonerscart-home' && (
          <div className="bg-white p-4 text-xs font-sans text-gray-800">
            <div className="flex items-center justify-between border-b pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-blue-900 tracking-tight">TonersCart</span>
                <span className="bg-blue-100 text-blue-800 text-[9px] font-bold px-1.5 py-0.5 rounded">B2B MARKETPLACE</span>
              </div>
              <div className="text-[10px] text-gray-500">Karnataka High Court Verified Supplier</div>
            </div>
            <div className="font-bold text-sm text-gray-900">
              India’s digital marketplace for printers, toners & MFDs
            </div>
            <div className="text-[11px] text-gray-600 mt-0.5">
              Compare verified suppliers, real stock, and institutional GST billing.
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {['Toners', 'Printers', 'MPS / Rentals', 'Inks & Consumables', 'Scanners', 'Govt Portal'].map(t => (
                <span key={t} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-[10px] font-medium border border-gray-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 9. TONERSCART PROCUREMENT PORTAL */}
        {artifact.mockType === 'tonerscart-procurement' && (
          <div className="bg-[#F4F6F9] p-4 text-xs font-sans text-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
              <span className="font-bold text-gray-900">Government & Corporate Procurement Portal</span>
              <span className="font-mono-code text-[10px] text-blue-700 font-semibold">L1 / L2 / L3 COMPLIANCE</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-2.5 rounded border border-gray-200">
                <span className="font-mono-code text-[9px] text-gray-400 block font-bold">STEP 01</span>
                <span className="font-bold text-[11px] text-gray-900 block mt-0.5">Register & Verify</span>
                <span className="text-[10px] text-gray-500 block mt-0.5">GST verification, institutional KYC, and credit limit sanctioning.</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-gray-200">
                <span className="font-mono-code text-[9px] text-gray-400 block font-bold">STEP 02</span>
                <span className="font-bold text-[11px] text-gray-900 block mt-0.5">Compare & Quote</span>
                <span className="text-[10px] text-gray-500 block mt-0.5">Lowest dealer price (L1), formal PDF quotations valid 7 days.</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-gray-200">
                <span className="font-mono-code text-[9px] text-gray-400 block font-bold">STEP 03</span>
                <span className="font-bold text-[11px] text-gray-900 block mt-0.5">Order on Credit</span>
                <span className="text-[10px] text-gray-500 block mt-0.5">30-day credit accounts, NEFT/RTGS payments, and dispatch tracking.</span>
              </div>
            </div>
          </div>
        )}

        {/* 10. TONERSCART PRINTERS CATALOG */}
        {artifact.mockType === 'tonerscart-catalog' && (
          <div className="bg-white p-4 text-xs font-sans">
            <div className="text-[11px] font-bold text-gray-700 mb-2">Verified Institutional Inventory (Bangalore Warehouse)</div>
            <div className="space-y-1.5 font-mono-code text-[10.5px]">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200">
                <div><span className="font-bold text-gray-900 font-sans">Brother MFC-B7810DW</span> <span className="text-[9px] text-gray-400">MFD Duplex</span></div>
                <div className="font-bold text-blue-900">₹34,937</div>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200">
                <div><span className="font-bold text-gray-900 font-sans">Brother DCP-B7640DW</span> <span className="text-[9px] text-gray-400">Wireless Laser</span></div>
                <div className="font-bold text-blue-900">₹23,300</div>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200">
                <div><span className="font-bold text-gray-900 font-sans">Brother DCP-B7620DW</span> <span className="text-[9px] text-gray-400">Multi-Function</span></div>
                <div className="font-bold text-blue-900">₹20,650</div>
              </div>
            </div>
          </div>
        )}

        {/* 11. DIARY OF A LANKY KID */}
        {artifact.mockType === 'lanky-home' && (
          <div className="bg-[#FFFDF8] notebook-margin-line p-5 text-xs font-sans text-gray-900 border-l-4 border-red-300">
            <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
              <span className="font-handwriting text-lg text-gray-700 font-bold">diary of a lanky kid.</span>
              <span className="font-mono-code text-[9px] text-gray-400">since chapter 1 / est. when jeans flooded</span>
            </div>
            
            <div className="font-serif-display text-2xl font-bold text-gray-900 leading-tight">
              Pants that actually reach my ankles.
            </div>

            <p className="mt-2 text-gray-700 leading-relaxed font-sans text-[11.5px] max-w-md">
              Hi. I’m 6’3”. For 20 years every pair of pants I owned betrayed me at the bottom of an escalator. So I started Diary of a Lanky Kid — trousers, jeans and joggers cut for humans built like noodles.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 bg-[#1C1B18] text-white px-3 py-1.5 rounded font-sans text-xs font-semibold">
              Shop the 3 originals →
            </div>
          </div>
        )}

        {/* 12. DIARY OF A LANKY KID SHOP */}
        {artifact.mockType === 'lanky-shop' && (
          <div className="bg-[#FFFDF8] p-4 text-xs font-sans">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-bold text-sm text-gray-900">The Endless Track</div>
                <div className="text-[11px] text-gray-500">Track pants that don’t quit at your ankles.</div>
              </div>
              <div className="font-mono-code font-bold text-xs">₹2,499</div>
            </div>

            <div className="mt-3 bg-amber-50/50 p-2.5 rounded border border-amber-200">
              <div className="text-[10px] font-mono-code text-gray-700 font-bold uppercase mb-1">Custom Inseam Selection (Inches):</div>
              <div className="flex flex-wrap gap-1.5 font-mono-code text-[10px]">
                {['32"', '34"', '36" (Tall)', '38" (Extra Tall)', '40" (Stretched)', '42" (Noodle)'].map(s => (
                  <span key={s} className="bg-white border border-gray-300 px-2 py-1 rounded text-gray-800 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-2 font-handwriting text-sm text-[#B93829] font-medium">
              *note: actual pants will be less squiggly than the drawings.
            </div>
          </div>
        )}

        {/* 13. NBFC 19-SLIDE DECK */}
        {artifact.mockType === 'nbfc-deck' && (
          <div className="bg-[#0F1117] text-white p-4 sm:p-5 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
              <span className="font-mono-code text-[10px] text-purple-400">RESEARCH THESIS · 19 SLIDES</span>
              <span className="text-gray-400 text-[10px]">LENDING VALUE CHAIN</span>
            </div>

            <div className="font-display text-base font-bold leading-snug text-gray-100">
              Where does economic profit and risk actually concentrate across the Indian NBFC value chain?
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-5 gap-1.5 text-[10px] font-mono-code pt-2 border-t border-gray-800">
              <div className="bg-gray-900 p-2 rounded border border-gray-700">
                <span className="text-purple-400 block font-bold">01 RAISE</span>
                <span className="text-gray-300 block mt-1">Cost of funds & bank credit ratings</span>
              </div>
              <div className="bg-gray-900 p-2 rounded border border-gray-700">
                <span className="text-purple-400 block font-bold">02 FIND</span>
                <span className="text-gray-300 block mt-1">DSA origination & CAC commoditization</span>
              </div>
              <div className="bg-gray-900 p-2 rounded border border-gray-700">
                <span className="text-purple-400 block font-bold">03 DECIDE</span>
                <span className="text-gray-300 block mt-1">Underwriting scorecards & policy gates</span>
              </div>
              <div className="bg-gray-900 p-2 rounded border border-gray-700">
                <span className="text-purple-400 block font-bold">04 COLLECT</span>
                <span className="text-purple-300 font-bold block mt-1">Primary moat: On-ground field recovery</span>
              </div>
              <div className="bg-gray-900 p-2 rounded border border-gray-700">
                <span className="text-purple-400 block font-bold">05 RECOVER</span>
                <span className="text-gray-300 block mt-1">SARFAESI, arbitration & hair-cuts</span>
              </div>
            </div>
          </div>
        )}

        {/* 14. PERSONAL PHOTOS */}
        {artifact.mockType?.startsWith('photo-') && (
          <div className="p-4 bg-[#EDE8DC] flex flex-col items-center justify-center text-center">
            {/* Visual Polaroid Frame */}
            <div className="bg-white p-3 pb-8 rounded-sm shadow-md max-w-sm w-full border border-gray-300 transform -rotate-0.5">
              <div className="w-full aspect-[4/3] bg-[#22252C] rounded-xs flex items-center justify-center relative overflow-hidden">
                {/* Visual badge and details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 text-left">
                  <span className="font-mono-code text-[9px] uppercase tracking-widest text-emerald-400">
                    {artifact.badge || 'AUTHENTIC RECORD'}
                  </span>
                  <span className="font-serif-display text-white text-base font-bold leading-tight mt-0.5">
                    {artifact.title}
                  </span>
                  <span className="font-mono-code text-[10px] text-gray-300 mt-1">
                    {artifact.mockType === 'photo-formal' && 'Bespoke Suited Editorial Portrait · Architecture'}
                    {artifact.mockType === 'photo-mentorship' && 'Academic Dialogue · Masters’ Union Gurugram'}
                    {artifact.mockType === 'photo-presentation' && '“Our life is shaped by our mind” · Cohort Address'}
                    {artifact.mockType === 'photo-theatre' && 'Ensemble Mime & Physical Theatre Production'}
                    {artifact.mockType === 'photo-theatre-joker' && 'Experimental Backstage Joker Greasepaint'}
                    {artifact.mockType === 'photo-music' && 'Tanpura Vocal Accompaniment · Hindustani Classical'}
                    {artifact.mockType === 'photo-fest' && 'Somaiya Cultural Forum 20,000+ Attendee Organizing'}
                    {artifact.mockType === 'photo-interact' && 'Art & Community Sessions with School Children'}
                  </span>
                </div>
              </div>
              <div className="mt-3 font-handwriting text-base text-[#2E2B25] font-semibold text-center leading-snug">
                {artifact.caption}
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>

      {/* Caption & Handwritten Note */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-[#EAE5D8] pt-2">
        <p className="text-xs text-[#5C584E] leading-relaxed flex-1">
          {artifact.caption}
        </p>
        {artifact.annotation && (
          <span className="font-handwriting text-lg text-[#B93829] font-medium shrink-0 max-w-full leading-snug">
            {artifact.annotation}
          </span>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsExpanded(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#1A1916] border border-gray-700 rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 text-white shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono-code text-[11px] text-[#A69F8E] uppercase">{figNum}</span>
                <span className="text-sm font-bold truncate">{artifact.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                title="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-2 sm:p-4 flex items-center justify-center flex-1 overflow-auto bg-black/80 min-h-[300px]">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={artifact.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded"
                />
              ) : (
                <div className="text-gray-400 font-mono-code text-xs">No image attached</div>
              )}
            </div>

            <div className="p-3.5 bg-[#141311] border-t border-gray-800 text-xs text-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
              <span className="leading-relaxed">{artifact.caption}</span>
              {artifact.annotation && (
                <span className="font-handwriting text-lg text-[#E25C4D] shrink-0">
                  {artifact.annotation}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
