import React, { useState, useEffect, useRef } from 'react';
import { 
  ARTIFACT_MAPPING_TARGETS, 
  MappingTarget, 
  findMatchingArtifactId, 
  saveArtifactImage, 
  getAllArtifactImages,
  removeArtifactImage
} from '../../utils/imageStore';
import { 
  Upload, 
  CheckCircle2, 
  X, 
  Image as ImageIcon, 
  Sparkles, 
  Trash2, 
  ExternalLink,
  Layers,
  HelpCircle,
  Eye
} from 'lucide-react';

interface BatchImageImporterProps {
  isOpen: boolean;
  onClose: () => void;
  onImagesUpdated?: () => void;
}

export const BatchImageImporter: React.FC<BatchImageImporterProps> = ({
  isOpen,
  onClose,
  onImagesUpdated
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, string>>({});
  const [processingCount, setProcessingCount] = useState(0);
  const [unmatchedFiles, setUnmatchedFiles] = useState<{ name: string; dataUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshImages = async () => {
    const all = await getAllArtifactImages();
    setLoadedImages(all);
  };

  useEffect(() => {
    if (isOpen) {
      refreshImages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const processFiles = async (files: FileList | File[]) => {
    setProcessingCount(files.length);
    const newUnmatched: { name: string; dataUrl: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string || '');
        reader.readAsDataURL(file);
      });

      if (!dataUrl) continue;

      const matchedId = findMatchingArtifactId(file.name);
      if (matchedId) {
        await saveArtifactImage(matchedId, dataUrl, file.name);
      } else {
        newUnmatched.push({ name: file.name, dataUrl });
      }
    }

    setUnmatchedFiles((prev) => [...prev, ...newUnmatched]);
    setProcessingCount(0);
    await refreshImages();
    if (onImagesUpdated) {
      onImagesUpdated();
      // Broadcast custom event so all open ArtifactExhibits re-render
      window.dispatchEvent(new CustomEvent('artifact-images-updated'));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleManualAssign = async (targetId: string, dataUrl: string, fileName: string) => {
    await saveArtifactImage(targetId, dataUrl, fileName);
    setUnmatchedFiles((prev) => prev.filter((f) => f.dataUrl !== dataUrl));
    await refreshImages();
    if (onImagesUpdated) {
      onImagesUpdated();
      window.dispatchEvent(new CustomEvent('artifact-images-updated'));
    }
  };

  const handleRemoveImage = async (id: string) => {
    await removeArtifactImage(id);
    await refreshImages();
    if (onImagesUpdated) {
      onImagesUpdated();
      window.dispatchEvent(new CustomEvent('artifact-images-updated'));
    }
  };

  const totalSlots = ARTIFACT_MAPPING_TARGETS.length;
  const filledSlots = ARTIFACT_MAPPING_TARGETS.filter((t) => Boolean(loadedImages[t.id])).length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#F8F6F0] border-2 border-[#1C1B18] rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#1C1B18] text-[#F7F4EB] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#B93829] flex items-center justify-center text-white font-bold">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold tracking-tight uppercase">
                Project & Persona Image Importer
              </h2>
              <p className="text-[11px] font-mono-code text-[#CDC8BC]">
                Auto-matches user-uploaded screenshots & photos by filename
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#312F2B] text-emerald-400 font-bold">
              {filledSlots} / {totalSlots} Attached
            </span>
            <button
              onClick={onClose}
              className="text-[#9A9588] hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dropzone Banner */}
        <div className="p-4 sm:p-6 border-b border-[#D8D2C2] bg-white">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                processFiles(e.target.files);
              }
            }}
          />

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
              isDragging 
                ? 'border-[#B93829] bg-[#FAF0EE]' 
                : 'border-[#CDC6B4] bg-[#FAF8F3] hover:border-[#B93829] hover:bg-[#FAF5F2]'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#EBE5D8] flex items-center justify-center text-[#B93829]">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-[#1C1B18]">
                {processingCount > 0 
                  ? `Processing ${processingCount} image(s)...` 
                  : 'Drop your attached images here or click to browse'}
              </div>
              <p className="text-xs text-[#6B665A] max-w-md font-mono-code">
                Select your screenshots (e.g. Screenshot (163) to (181)) and WhatsApp photos all at once. Filenames are automatically detected!
              </p>
            </div>
          </div>
        </div>

        {/* Unmatched Files Alert (if any) */}
        {unmatchedFiles.length > 0 && (
          <div className="p-4 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs">
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>{unmatchedFiles.length} uploaded image(s) need manual assignment:</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {unmatchedFiles.map((file, idx) => (
                <div key={idx} className="bg-white p-2 rounded border border-amber-300 flex items-center gap-2 shadow-xs">
                  <img src={file.dataUrl} alt={file.name} className="w-8 h-8 object-cover rounded" />
                  <span className="truncate max-w-[120px] font-mono-code text-[11px]">{file.name}</span>
                  <select
                    className="text-[10px] bg-amber-100 p-1 rounded font-mono-code border border-amber-400"
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleManualAssign(e.target.value, file.dataUrl, file.name);
                      }
                    }}
                  >
                    <option value="" disabled>Assign to...</option>
                    {ARTIFACT_MAPPING_TARGETS.map((t) => (
                      <option key={t.id} value={t.id}>{t.title} ({t.project})</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exhibit Mapping Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#7C7769]">
              PORTFOLIO EXHIBITS & PHOTO FRAMES DIRECTORY
            </span>
            <span className="font-mono-code text-[10px] text-[#8F8A7D]">
              Click any thumbnail to preview or change
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ARTIFACT_MAPPING_TARGETS.map((target) => {
              const image = loadedImages[target.id];
              return (
                <div
                  key={target.id}
                  className={`bg-white border rounded-lg p-3 flex flex-col justify-between transition-all ${
                    image ? 'border-emerald-400 bg-emerald-50/20' : 'border-[#DDD8CB]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <span className="font-mono-code text-[9px] uppercase tracking-wider font-bold text-[#B93829] block">
                        {target.project}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 leading-snug truncate" title={target.title}>
                        {target.title}
                      </h4>
                    </div>

                    {image ? (
                      <span className="text-emerald-600 shrink-0" title="Active Image Attached">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="font-mono-code text-[9px] text-[#A39E91] shrink-0">
                        Specimen
                      </span>
                    )}
                  </div>

                  {/* Thumbnail / Upload Trigger */}
                  <div className="mt-2">
                    {image ? (
                      <div className="relative group rounded overflow-hidden border border-emerald-300 bg-black aspect-[16/10] flex items-center justify-center">
                        <img 
                          src={image} 
                          alt={target.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(target.id)}
                            className="p-1 bg-red-600 text-white rounded hover:bg-red-700 text-[10px] font-mono-code flex items-center gap-1"
                            title="Remove attached photo"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-[16/10] rounded border border-dashed border-[#CDC6B4] bg-[#FAF8F3] hover:bg-[#F2ECE1] cursor-pointer text-center p-2 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const dataUrl = await new Promise<string>((res) => {
                                const r = new FileReader();
                                r.onload = (ev) => res(ev.target?.result as string);
                                r.readAsDataURL(file);
                              });
                              if (dataUrl) {
                                await saveArtifactImage(target.id, dataUrl, file.name);
                                await refreshImages();
                                window.dispatchEvent(new CustomEvent('artifact-images-updated'));
                              }
                            }
                          }}
                        />
                        <Upload className="w-4 h-4 text-[#8C8677] mb-1" />
                        <span className="font-mono-code text-[10px] text-[#555]">Attach</span>
                        <span className="font-mono-code text-[8.5px] text-[#9E988A] truncate max-w-full">
                          {target.sampleFilename}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#EDE8DC] px-5 py-3 border-t border-[#D8D2C2] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono-code">
          <span className="text-[#656155]">
            Images are saved in browser storage and persist automatically.
          </span>
          <button
            onClick={onClose}
            className="bg-[#1C1B18] text-[#F7F4EB] px-4 py-1.5 rounded font-bold hover:bg-black transition-colors"
          >
            Done & Apply
          </button>
        </div>
      </div>
    </div>
  );
};
