import React, { useState } from 'react';
import { PropertyPhoto } from '../types';
import { Camera, Upload, Trash2, CheckCircle2, Eye, X, Home, Compass, MapPin } from 'lucide-react';
import { compressImageDataUrl } from '../utils/imageCompressor';

interface PropertyPhotosSectionProps {
  photos: PropertyPhoto[];
  onChange: (photos: PropertyPhoto[]) => void;
  onOpenCamera: (category: 'tampak_depan' | 'tampak_samping' | 'rencana_titik_meter') => void;
  readOnly?: boolean;
}

interface PhotoSlotConfig {
  key: 'tampak_depan' | 'tampak_samping' | 'rencana_titik_meter';
  title: string;
  subtitle: string;
  icon: any;
  badge: string;
}

export const PROPERTY_PHOTO_SLOTS: PhotoSlotConfig[] = [
  {
    key: 'tampak_depan',
    title: '1. Tampak Depan',
    subtitle: 'Foto keseluruhan fasad tampak depan properti / rumah',
    icon: Home,
    badge: 'Wajib',
  },
  {
    key: 'tampak_samping',
    title: '2. Tampak Samping',
    subtitle: 'Foto bagian samping / akses jalan menuju persil',
    icon: Compass,
    badge: 'Wajib',
  },
  {
    key: 'rencana_titik_meter',
    title: '3. Rencana Titik Meter',
    subtitle: 'Foto lokasi dinding / pagar titik rencana pemasangan meter air',
    icon: MapPin,
    badge: 'Wajib',
  },
];

export const PropertyPhotosSection: React.FC<PropertyPhotosSectionProps> = ({
  photos = [],
  onChange,
  onOpenCamera,
  readOnly = false,
}) => {
  const [lightboxPhoto, setLightboxPhoto] = useState<PropertyPhoto | null>(null);

  const getPhotoForSlot = (categoryKey: string): PropertyPhoto | undefined => {
    return photos.find((p) => p.category === categoryKey || p.caption?.toLowerCase().includes(categoryKey.replace('_', ' ')));
  };

  const handleFileUpload = (
    categoryKey: 'tampak_depan' | 'tampak_samping' | 'rencana_titik_meter',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const rawUrl = reader.result as string;
      const compressedUrl = await compressImageDataUrl(rawUrl, 640, 0.5);
      const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const slotTitle = PROPERTY_PHOTO_SLOTS.find((s) => s.key === categoryKey)?.title || categoryKey;

      const newPhoto: PropertyPhoto = {
        id: `photo-${categoryKey}-${Date.now()}`,
        name: file.name,
        dataUrl: compressedUrl,
        source: 'file',
        category: categoryKey,
        caption: slotTitle,
        timestamp: nowStr,
      };

      const updated = photos.filter((p) => p.category !== categoryKey && p.id !== newPhoto.id);
      onChange([...updated, newPhoto]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemove = (categoryKey: string) => {
    const updated = photos.filter((p) => p.category !== categoryKey);
    onChange(updated);
  };

  return (
    <div className="bg-sky-50/70 p-4 sm:p-5 rounded-2xl border-2 border-sky-200 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-sky-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0f766e] text-white flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
              Dokumentasi Foto Properti (3 Foto Wajib)
            </h4>
            <p className="text-[11px] text-slate-600">
              Unggah 3 foto terstruktur: Tampak Depan, Tampak Samping, dan Rencana Titik Meter
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-[#0f766e] border border-teal-200">
          {photos.length} / 3 Foto Terunggah
        </span>
      </div>

      {/* 3 Structured Photo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {PROPERTY_PHOTO_SLOTS.map((slot) => {
          const photo = getPhotoForSlot(slot.key);
          const Icon = slot.icon;

          return (
            <div
              key={slot.key}
              className={`rounded-2xl border p-3.5 flex flex-col justify-between gap-3 transition bg-white ${
                photo
                  ? 'border-emerald-300 ring-1 ring-emerald-400/40 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#0f766e]" />
                    <span>{slot.title}</span>
                  </span>
                  {photo ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Terlampir
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {slot.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {slot.subtitle}
                </p>
              </div>

              {photo ? (
                <div className="space-y-2">
                  <div className="relative group rounded-xl overflow-hidden bg-slate-950 aspect-video border border-slate-200 flex items-center justify-center">
                    <img
                      src={photo.dataUrl}
                      alt={slot.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-200 cursor-pointer"
                      onClick={() => setLightboxPhoto(photo)}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLightboxPhoto(photo)}
                        className="p-1.5 bg-white/90 hover:bg-white text-slate-900 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-md cursor-pointer"
                        title="Lihat ukuran penuh"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Perbesar</span>
                      </button>
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => handleRemove(slot.key)}
                          className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs transition shadow-md cursor-pointer"
                          title="Hapus foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {!readOnly && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{photo.source === 'camera' ? 'Kamera' : 'File'} • {photo.timestamp || 'Tersimpan'}</span>
                      <label className="text-[#0f766e] font-bold hover:underline cursor-pointer">
                        Ganti Foto
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(slot.key, e)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ) : !readOnly ? (
                <div className="space-y-2 pt-1">
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenCamera(slot.key)}
                      className="w-full py-2 px-3 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Ambil Kamera</span>
                    </button>

                    <label className="w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(slot.key, e)}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-400 text-xs italic">
                  Belum ada foto yang diunggah
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox / Enlarged View Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0f766e] text-white p-4 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm">{lightboxPhoto.caption || 'Foto Dokumentasi Properti'}</span>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 bg-slate-950 flex items-center justify-center max-h-[75vh]">
              <img
                src={lightboxPhoto.dataUrl}
                alt="Enlarged"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
