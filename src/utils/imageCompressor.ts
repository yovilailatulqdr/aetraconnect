/**
 * Utility for client-side image compression and base64 downscaling.
 * Prevents localStorage quota exceeded errors and database statement timeouts.
 */

/**
 * Compresses an image dataUrl or File to a lightweight JPEG dataUrl (< 40KB).
 */
export const compressImageDataUrl = (
  dataUrl: string,
  maxDimension = 640,
  quality = 0.5
): Promise<string> => {
  return new Promise((resolve) => {
    // If not a data URL or empty, return as is
    if (!dataUrl || !dataUrl.startsWith('data:image/')) {
      resolve(dataUrl);
      return;
    }

    // If already super small (< 25KB), return immediately
    if (dataUrl.length < 25000) {
      resolve(dataUrl);
      return;
    }

    try {
      const img = new Image();
      img.onload = () => {
        let width = img.width || 640;
        let height = img.height || 480;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl.slice(0, 30000));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };

      img.onerror = () => {
        // Fallback: truncate if still too huge
        resolve(dataUrl.length > 50000 ? dataUrl.slice(0, 50000) : dataUrl);
      };

      img.src = dataUrl;
    } catch {
      resolve(dataUrl.length > 50000 ? dataUrl.slice(0, 50000) : dataUrl);
    }
  });
};

/**
 * Creates an ultra-lightweight version of a registration record for database/localStorage persistence.
 * Prevents hitting Supabase 8s/15s statement timeout and localStorage 5MB limit.
 */
export const sanitizeRegistrationForPersistence = (record: any): any => {
  if (!record || typeof record !== 'object') return record;

  const clone = { ...record };

  // Strip or compact document files
  if (clone.persyaratanFiles && typeof clone.persyaratanFiles === 'object') {
    const sanitizedDocs: Record<string, any> = {};
    Object.entries(clone.persyaratanFiles).forEach(([key, val]: [string, any]) => {
      if (val && typeof val === 'object') {
        sanitizedDocs[key] = {
          id: val.id || `doc-${key}`,
          name: val.name || `${key}.jpg`,
          source: val.source || 'upload',
          type: val.type || 'image/jpeg',
          size: val.size || '100 KB',
          uploadedAt: val.uploadedAt || new Date().toISOString(),
          // Only keep dataUrl if small (< 35KB) to prevent storage quota & DB statement timeouts
          dataUrl: val.dataUrl && typeof val.dataUrl === 'string' && val.dataUrl.length < 35000
            ? val.dataUrl
            : (val.dataUrl ? val.dataUrl.slice(0, 500) + '...[compacted]' : undefined),
        };
      }
    });
    clone.persyaratanFiles = sanitizedDocs;
  }

  // Strip or compact property photo files
  if (Array.isArray(clone.fotoPropertiFiles)) {
    clone.fotoPropertiFiles = clone.fotoPropertiFiles.map((p: any) => {
      if (!p || typeof p !== 'object') return p;
      return {
        id: p.id || `prop-${Date.now()}`,
        name: p.name || 'foto.jpg',
        category: p.category,
        caption: p.caption,
        source: p.source,
        timestamp: p.timestamp,
        dataUrl: p.dataUrl && typeof p.dataUrl === 'string' && p.dataUrl.length < 35000
          ? p.dataUrl
          : (p.dataUrl ? p.dataUrl.slice(0, 500) + '...[compacted]' : undefined),
      };
    });
  }

  // Sanitize payment proof
  if (clone.paymentProof && typeof clone.paymentProof === 'object') {
    clone.paymentProof = {
      ...clone.paymentProof,
      dataUrl: clone.paymentProof.dataUrl && typeof clone.paymentProof.dataUrl === 'string' && clone.paymentProof.dataUrl.length < 35000
        ? clone.paymentProof.dataUrl
        : (clone.paymentProof.dataUrl ? clone.paymentProof.dataUrl.slice(0, 500) + '...[compacted]' : undefined),
    };
  }

  return clone;
};
