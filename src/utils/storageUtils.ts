/**
 * Robust LocalStorage utility with proactive quota management, automatic sanitization, and fallback.
 * Prevents "Failed to execute 'setItem' on 'Storage': Setting the value of '...' exceeded the quota" error.
 */

import { sanitizeRegistrationForPersistence } from './imageCompressor';

export const safeLocalStorageSetItem = (key: string, value: any): boolean => {
  if (value === undefined || value === null) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  // Pre-process known heavy data keys to guarantee compact size
  let sanitizedValue = value;
  if (key === 'aetra_registrations' || key === 'aetra_tracking') {
    if (Array.isArray(value)) {
      sanitizedValue = value.map(sanitizeRegistrationForPersistence);
    } else if (typeof value === 'object') {
      sanitizedValue = sanitizeRegistrationForPersistence(value);
    }
  }

  let serialized = '';
  try {
    serialized = typeof sanitizedValue === 'string' ? sanitizedValue : JSON.stringify(sanitizedValue);
  } catch (err) {
    console.warn(`JSON stringification failed for key "${key}":`, err);
    return false;
  }

  try {
    localStorage.setItem(key, serialized);
    return true;
  } catch (error: any) {
    console.warn(`LocalStorage quota exceeded when saving key "${key}". Initiating auto-cleanup...`, error);

    // Strategy 1: Clean up old draft keys, temporary cached payloads, and large debug keys
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (
          k &&
          (k.startsWith('aetra_draft_') ||
            k.startsWith('aetra_temp_') ||
            k.startsWith('aetra_cache_') ||
            k.startsWith('debug_'))
        ) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => {
        try {
          localStorage.removeItem(k);
        } catch {
          // ignore
        }
      });
    } catch {
      // ignore
    }

    // Strategy 2: Further downscale any base64 values
    try {
      if (Array.isArray(sanitizedValue)) {
        const ultraCompact = sanitizedValue.map((item) => {
          if (item && typeof item === 'object') {
            const stripped = { ...item };
            if (stripped.persyaratanFiles) {
              const cleanDocs: Record<string, any> = {};
              Object.entries(stripped.persyaratanFiles).forEach(([dk, dv]: [string, any]) => {
                if (dv) cleanDocs[dk] = { id: dv.id, name: dv.name, size: dv.size, type: dv.type };
              });
              stripped.persyaratanFiles = cleanDocs;
            }
            if (stripped.fotoPropertiFiles) {
              stripped.fotoPropertiFiles = stripped.fotoPropertiFiles.map((pf: any) => ({
                id: pf.id,
                name: pf.name,
                category: pf.category,
                caption: pf.caption,
              }));
            }
            if (stripped.paymentProof) {
              stripped.paymentProof = {
                id: stripped.paymentProof.id,
                name: stripped.paymentProof.name,
                status: stripped.paymentProof.status,
              };
            }
            return stripped;
          }
          return item;
        });
        localStorage.setItem(key, JSON.stringify(ultraCompact));
        return true;
      } else if (typeof sanitizedValue === 'object') {
        localStorage.setItem(key, JSON.stringify(sanitizedValue));
        return true;
      }
    } catch {
      // Strategy 3: Trim older items to keep top 10 newest items
      try {
        if (Array.isArray(sanitizedValue) && sanitizedValue.length > 3) {
          const trimmed = sanitizedValue.slice(0, 5);
          localStorage.setItem(key, JSON.stringify(trimmed));
          return true;
        }
      } catch (finalErr) {
        console.warn('Final LocalStorage fallback failed gracefully without crashing app:', finalErr);
      }
    }

    return false;
  }
};

export const safeLocalStorageGetItem = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};
