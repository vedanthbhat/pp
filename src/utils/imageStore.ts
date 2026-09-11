/**
 * Client-side persistence for project exhibit images using IndexedDB
 * with localStorage fallback. Prevents 5MB quota crashes on large base64 uploads.
 */

const DB_NAME = 'VedanthPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'artifact_images';

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

  return dbPromise;
}

export async function saveArtifactImage(id: string, dataUrl: string, fileName?: string): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put({ id, dataUrl, fileName, updatedAt: Date.now() });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    // Fallback to localStorage if IndexedDB fails
    try {
      localStorage.setItem(`artifact_img_${id}`, dataUrl);
    } catch {
      console.warn('Storage quota exceeded on fallback localStorage', err);
    }
  }
}

export async function getArtifactImage(id: string): Promise<string | null> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result && request.result.dataUrl) {
          resolve(request.result.dataUrl);
        } else {
          // Fallback to localStorage
          const local = localStorage.getItem(`artifact_img_${id}`);
          resolve(local || null);
        }
      };

      request.onerror = () => {
        const local = localStorage.getItem(`artifact_img_${id}`);
        resolve(local || null);
      };
    });
  } catch {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`artifact_img_${id}`) || null;
    }
    return null;
  }
}

export async function removeArtifactImage(id: string): Promise<void> {
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem(`artifact_img_${id}`);
  } catch {
    // ignore
  }
}

export async function getAllArtifactImages(): Promise<Record<string, string>> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const results: Record<string, string> = {};
        if (request.result && Array.isArray(request.result)) {
          for (const item of request.result) {
            if (item.id && item.dataUrl) {
              results[item.id] = item.dataUrl;
            }
          }
        }
        resolve(results);
      };

      request.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

/**
 * Intelligent file-to-artifact mapping dictionary.
 * Matches file names like 'Screenshot (163).png' or 'WhatsApp Image 2026-09-10 at 6.51.11 PM.jpeg'
 * to the corresponding artifact ID in the portfolio.
 */
export interface MappingTarget {
  id: string;
  title: string;
  project: string;
  patterns: RegExp[];
  sampleFilename: string;
}

export const ARTIFACT_MAPPING_TARGETS: MappingTarget[] = [
  // SQI
  {
    id: 'sqi-1',
    title: 'SQI Intelligence Platform (Mumbai Registry)',
    project: 'SQI (Main Blade)',
    patterns: [/163/, /registry/i, /sqi.*home/i],
    sampleFilename: 'Screenshot (163).png'
  },
  {
    id: 'sqi-2',
    title: 'Mathematical Specification & Premise',
    project: 'SQI (Main Blade)',
    patterns: [/164/, /methodology/i, /sqi.*math/i],
    sampleFilename: 'Screenshot (164).png'
  },
  {
    id: 'sqi-3',
    title: 'Disaggregated Property Benchmark Matrix',
    project: 'SQI (Main Blade)',
    patterns: [/165/, /compare/i, /oberoi/i, /matrix/i],
    sampleFilename: 'Screenshot (165).png'
  },
  {
    id: 'sqi-5',
    title: 'Rankings & Property Explorer (Mumbai 50)',
    project: 'SQI (Main Blade)',
    patterns: [/166/, /ranking/i, /explorer/i],
    sampleFilename: 'Screenshot (166).png'
  },
  {
    id: 'sqi-4',
    title: 'Google Search Live Overlay Extension',
    project: 'SQI (Main Blade)',
    patterns: [/167/, /168/, /169/, /170/, /extension/i, /taj/i, /overlay/i],
    sampleFilename: 'Screenshot (167).png'
  },

  // Speculate
  {
    id: 'speculate-1',
    title: 'Research Paper Appraisal Engine (Ashwagandha)',
    project: 'Speculate (Awl)',
    patterns: [/171/, /172/, /ashwagandha/i, /speculate.*eval/i, /unreliable/i],
    sampleFilename: 'Screenshot (171).png'
  },
  {
    id: 'speculate-2',
    title: 'Creatine Supplementation Meta-Analysis Appraisal',
    project: 'Speculate (Awl)',
    patterns: [/173/, /174/, /creatine/i, /meta/i, /speculate.*compare/i],
    sampleFilename: 'Screenshot (173).png'
  },

  // Diary of a Lanky Kid
  {
    id: 'lanky-1',
    title: 'Diary of a Lanky Kid Homepage & Founder Story',
    project: 'Diary of a Lanky Kid (Scissors)',
    patterns: [/175/, /lanky.*home/i, /ankles/i, /founder/i],
    sampleFilename: 'Screenshot (175).png'
  },
  {
    id: 'lanky-2',
    title: 'The Endless Track Pants Product Page',
    project: 'Diary of a Lanky Kid (Scissors)',
    patterns: [/176/, /endless.*track/i, /pants/i, /lanky.*shop/i],
    sampleFilename: 'Screenshot (176).png'
  },

  // TonersCart
  {
    id: 'tonerscart-1',
    title: 'TonersCart B2B Digital Marketplace Homepage',
    project: 'TonersCart (Bottle Opener)',
    patterns: [/177/, /178/, /tonerscart.*home/i, /marketplace/i],
    sampleFilename: 'Screenshot (177).png'
  },
  {
    id: 'tonerscart-2',
    title: 'Corporate Hardware Catalog (Brother MFDs)',
    project: 'TonersCart (Bottle Opener)',
    patterns: [/179/, /catalog/i, /brother/i, /printers/i],
    sampleFilename: 'Screenshot (179).png'
  },
  {
    id: 'tonerscart-3',
    title: 'Government & Corporate Procurement Portal',
    project: 'TonersCart (Bottle Opener)',
    patterns: [/180/, /procurement/i, /tender/i, /gov/i, /l1/i],
    sampleFilename: 'Screenshot (180).png'
  },

  // NBFC Engine
  {
    id: 'nbfc-1',
    title: 'NBFC Automated Loan Origination Engine (Make.com)',
    project: 'NBFC Engine (Screwdriver)',
    patterns: [/181/, /make/i, /loan/i, /origination/i, /underwriting/i],
    sampleFilename: 'Screenshot (181).png'
  },

  // Personal Photos & Leadership
  {
    id: 'photo-formal',
    title: 'Editorial Portrait in Bespoke Suit',
    project: 'Dossier (Key Ring - Me)',
    patterns: [/6\.51\.11/, /suit/i, /portrait/i, /formal/i],
    sampleFilename: 'WhatsApp Image 2026-09-10 at 6.51.11 PM.jpeg'
  },
  {
    id: 'photo-mentorship',
    title: 'Faculty Mentorship at Masters’ Union',
    project: 'Dossier (Key Ring - Me)',
    patterns: [/6\.51\.23/, /mentor/i, /masters/i, /classroom/i],
    sampleFilename: 'WhatsApp Image 2026-09-10 at 6.51.23 PM.jpeg'
  },
  {
    id: 'photo-presentation',
    title: 'Keynote Presentation: Mind & Strategy',
    project: 'Dossier (Key Ring - Me)',
    patterns: [/6\.53\.13/, /presentation/i, /speak/i, /buddha/i, /stage/i],
    sampleFilename: 'WhatsApp Image 2026-09-10 at 6.53.13 PM.jpeg'
  },
  {
    id: 'photo-theatre-1',
    title: 'Ensemble Theatre & Mime Performance',
    project: 'Off-Duty (Small Tool - Live)',
    patterns: [/7\.07\.30/, /theatre/i, /mime/i, /stage.*perf/i],
    sampleFilename: 'WhatsApp Image 2026-09-10 at 7.07.30 PM.jpeg'
  },
  {
    id: 'photo-theatre-2',
    title: 'Backstage Joker Character Makeup',
    project: 'Off-Duty (Small Tool - Live)',
    patterns: [/7\.07\.45/, /joker/i, /makeup/i, /backstage/i],
    sampleFilename: 'WhatsApp Image 2026-09-10 at 7.07.45 PM.jpeg'
  },
  {
    id: 'photo-music',
    title: 'Hindustani Classical Recital (Tanpura)',
    project: 'Off-Duty (Small Tool - Live)',
    patterns: [/7\.09\.13/, /music/i, /tanpura/i, /classical/i, /raga/i],
    sampleFilename: 'WhatsApp Image 2026-09-10 at 7.09.13 PM.jpeg'
  },
  {
    id: 'photo-fest',
    title: 'Somaiya Cultural Forum Security & Logistics Team',
    project: 'Off-Duty (Small Tool - Live)',
    patterns: [/7\.22\.41/, /fest/i, /forum/i, /sari/i, /traditional/i],
    sampleFilename: 'WhatsApp Image 2026-09-10 at 7.22.41 PM.jpeg'
  },
  {
    id: 'photo-interact-1',
    title: 'Community Arts & Expression Workshop with Children',
    project: 'Off-Duty (Small Tool - Live)',
    patterns: [/7\.23\.17/, /7\.23\.32/, /7\.24\.14/, /interact/i, /children/i, /volunteer/i],
    sampleFilename: 'WhatsApp Image 2026-09-10 at 7.23.17 PM.jpeg'
  }
];

export function findMatchingArtifactId(filename: string): string | null {
  for (const target of ARTIFACT_MAPPING_TARGETS) {
    for (const pattern of target.patterns) {
      if (pattern.test(filename)) {
        return target.id;
      }
    }
  }
  return null;
}
