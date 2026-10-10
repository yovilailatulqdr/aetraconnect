import React, { useState, useMemo } from 'react';
import { RegistrationFormData, CustomerTrackingRecord, PropertyPhoto } from '../types';
import { 
  Wrench, 
  Camera, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Clock, 
  Upload, 
  Trash2, 
  Eye, 
  FileText, 
  User, 
  Phone, 
  Compass, 
  Gauge, 
  ShieldCheck, 
  Save, 
  Check, 
  Sparkles,
  Layers,
  ArrowRight,
  RotateCw,
  Maximize2
} from 'lucide-react';
import { CameraCaptureModal } from './CameraCaptureModal';
import { InteractiveMapPicker } from './InteractiveMapPicker';
import { DocumentImageViewerModal } from './DocumentImageViewerModal';
import { cloudSyncService } from '../services/cloudSyncService';
import { saveRegistrationToDb, saveTrackingRecordToDb } from '../services/supabaseService';

interface FieldOfficerPortalProps {
  registrations: RegistrationFormData[];
  trackingRecords: CustomerTrackingRecord[];
  onUpdateRegistration?: (updated: RegistrationFormData) => void;
  onUpdateTracking?: (updated: CustomerTrackingRecord) => void;
}

export const FieldOfficerPortal: React.FC<FieldOfficerPortalProps> = ({
  registrations,
  trackingRecords,
  onUpdateRegistration,
  onUpdateTracking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNoForm, setSelectedNoForm] = useState<string>(() => {
    return registrations[0]?.noForm || '';
  });

  const selectedRegistration = useMemo(() => {
    return registrations.find((r) => r.noForm === selectedNoForm) || registrations[0] || null;
  }, [registrations, selectedNoForm]);

  const selectedTracking = useMemo(() => {
    if (!selectedRegistration) return null;
    return trackingRecords.find((t) => t.noForm === selectedRegistration.noForm) || null;
  }, [trackingRecords, selectedRegistration]);

  // Form states for Field Survey & Meter Installation
  const [formData, setFormData] = useState({
    namaPetugasSurveyor: 'Bpk. Hendra Gunawan (Surveyor Aetra)',
    idPetugasSurveyor: 'SRV-AET-042',
    telpPetugas: '0812-8899-1122',
    namaTeknisi: 'Bpk. Agus Santoso (Teknisi Meter)',
    idTeknisi: 'TKN-AET-018',
    noWorkOrder: 'SPKO-2026-8819',
    tanggalSurvey: new Date().toISOString().split('T')[0],
    gpsLat: '-6.236600',
    gpsLong: '106.562100',
    dataJaringan: 'Pipa Distribusi HDPE Ø 63mm Tersedia di Muka Persil',
    diameterPipa: '1/2 inch (13 mm)',
    panjangPipa: '4.5',
    panjangPipaTipe: 'Standard (s/d 6 meter)',
    materialTambahan: 'Tee Reducer + Stop Kran Kuningan + Box Meter Aetra',
    noSeriMeter: 'AET-2609-8472',
    noSegel: 'SGL-AAT-88192',
    catatanPetugas: 'Persil siap dipasang meteran. Akses mudah dijangkau dari batas pagar depan.',
    dataGalian: ['Tanah Biasa', 'Paving Block'],
  });

  // Photo slots
  const [propertyPhotos, setPropertyPhotos] = useState<PropertyPhoto[]>([]);
  const [activeSlot, setActiveSlot] = useState<'depan' | 'samping' | 'meter' | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Lightbox Viewer
  const [activeViewer, setActiveViewer] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    description?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  // Sync state when selectedRegistration changes
  React.useEffect(() => {
    if (selectedRegistration) {
      const dp = selectedRegistration.dataPasang;
      setFormData({
        namaPetugasSurveyor: dp?.namaSales || 'Bpk. Hendra Gunawan (Surveyor Aetra)',
        idPetugasSurveyor: dp?.idPetugasSurveyor || 'SRV-AET-042',
        telpPetugas: dp?.telpPetugas || '0812-8899-1122',
        namaTeknisi: dp?.namaTeknisi || 'Bpk. Agus Santoso (Teknisi Meter)',
        idTeknisi: dp?.idPetugasTeknisi || 'TKN-AET-018',
        noWorkOrder: dp?.noWorkOrder || 'SPKO-2026-8819',
        tanggalSurvey: dp?.tanggalSurvey || new Date().toISOString().split('T')[0],
        gpsLat: dp?.gpsLat || '-6.236600',
        gpsLong: dp?.gpsLong || '106.562100',
        dataJaringan: dp?.dataJaringan || 'Pipa Distribusi HDPE Ø 63mm Tersedia di Muka Persil',
        diameterPipa: dp?.diameterPipa || '1/2 inch (13 mm)',
        panjangPipa: dp?.panjangPipa || '4.5',
        panjangPipaTipe: dp?.panjangPipaTipe || 'Standard (s/d 6 meter)',
        materialTambahan: dp?.materialTambahan || 'Tee Reducer + Stop Kran Kuningan + Box Meter Aetra',
        noSeriMeter: dp?.noSeriMeter || 'AET-2609-8472',
        noSegel: dp?.noSegel || 'SGL-AAT-88192',
        catatanPetugas: dp?.catatanPetugas || 'Persil siap dipasang meteran. Akses mudah dijangkau dari batas pagar depan.',
        dataGalian: dp?.dataGalian || ['Tanah Biasa', 'Paving Block'],
      });

      if (selectedRegistration.fotoPropertiFiles && selectedRegistration.fotoPropertiFiles.length > 0) {
        setPropertyPhotos(selectedRegistration.fotoPropertiFiles);
      } else {
        setPropertyPhotos([]);
      }
    }
  }, [selectedRegistration]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const getSlotPhoto = (slot: 'depan' | 'samping' | 'meter') => {
    const captionMap = {
      depan: 'Foto Tampak Depan Bangunan',
      samping: 'Foto Tampak Samping Bangunan',
      meter: 'Foto Rencana Titik Meter Air',
    };
    return propertyPhotos.find(
      (p) => p.caption === captionMap[slot] || p.name?.toLowerCase().includes(slot)
    );
  };

  const handleSetSlotPhoto = (slot: 'depan' | 'samping' | 'meter', dataUrl: string) => {
    const captionMap = {
      depan: 'Foto Tampak Depan Bangunan',
      samping: 'Foto Tampak Samping Bangunan',
      meter: 'Foto Rencana Titik Meter Air',
    };
    const newPhoto: PropertyPhoto = {
      id: `photo-${slot}-${Date.now()}`,
      name: `${captionMap[slot]}.jpg`,
      dataUrl,
      source: 'camera',
      caption: captionMap[slot],
      timestamp: new Date().toLocaleString('id-ID'),
    };

    setPropertyPhotos((prev) => {
      const filtered = prev.filter(
        (p) => p.caption !== captionMap[slot] && !p.name?.toLowerCase().includes(slot)
      );
      return [...filtered, newPhoto];
    });
  };

  const handleRemoveSlotPhoto = (slot: 'depan' | 'samping' | 'meter') => {
    const captionMap = {
      depan: 'Foto Tampak Depan Bangunan',
      samping: 'Foto Tampak Samping Bangunan',
      meter: 'Foto Rencana Titik Meter Air',
    };
    setPropertyPhotos((prev) =>
      prev.filter((p) => p.caption !== captionMap[slot] && !p.name?.toLowerCase().includes(slot))
    );
  };

  const handleFileUpload = (slot: 'depan' | 'samping' | 'meter', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        handleSetSlotPhoto(slot, reader.result as string);
        showToast(`Foto ${slot} berhasil diunggah.`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveFieldData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegistration) return;

    setIsSaving(true);
    const updatedReg: RegistrationFormData = {
      ...selectedRegistration,
      dataPasang: {
        ...selectedRegistration.dataPasang,
        namaSales: formData.namaPetugasSurveyor,
        idPetugasSurveyor: formData.idPetugasSurveyor,
        telpPetugas: formData.telpPetugas,
        namaTeknisi: formData.namaTeknisi,
        idPetugasTeknisi: formData.idTeknisi,
        noWorkOrder: formData.noWorkOrder,
        tanggalSurvey: formData.tanggalSurvey,
        gpsLat: formData.gpsLat,
        gpsLong: formData.gpsLong,
        dataJaringan: formData.dataJaringan,
        diameterPipa: formData.diameterPipa,
        panjangPipa: formData.panjangPipa,
        panjangPipaTipe: formData.panjangPipaTipe,
        materialTambahan: formData.materialTambahan,
        noSeriMeter: formData.noSeriMeter,
        noSegel: formData.noSegel,
        catatanPetugas: formData.catatanPetugas,
        dataGalian: formData.dataGalian,
        fotoProperti: propertyPhotos[0]?.dataUrl || '',
      },
      fotoPropertiFiles: propertyPhotos,
    };

    onUpdateRegistration?.(updatedReg);
    cloudSyncService.saveRegistration(updatedReg);
    saveRegistrationToDb(updatedReg).catch((err) => console.warn(err));

    // Update tracking record with surveyor/technician details & meter info
    if (selectedTracking) {
      const updatedTracking: CustomerTrackingRecord = {
        ...selectedTracking,
        nomorMeter: formData.noSeriMeter,
        nomorSegel: formData.noSegel,
        petugasSurveyor: {
          nama: formData.namaPetugasSurveyor,
          id: formData.idPetugasSurveyor,
          telp: formData.telpPetugas,
          role: 'Surveyor Wilayah',
        },
        petugasTeknisi: {
          nama: formData.namaTeknisi,
          id: formData.idTeknisi,
          telp: formData.telpPetugas,
          role: 'Teknisi Water Meter',
        },
      };
      onUpdateTracking?.(updatedTracking);
      cloudSyncService.saveTracking(updatedTracking);
      saveTrackingRecordToDb(updatedTracking).catch((err) => console.warn(err));
    }

    setIsSaving(false);
    showToast(`Dokumentasi properti lapangan & data teknis untuk No. Form #${selectedRegistration.noForm} (${selectedRegistration.namaKtp}) berhasil disimpan!`);
  };

  const filteredRegistrations = useMemo(() => {
    return registrations.filter(
      (r) =>
        !searchTerm.trim() ||
        r.namaKtp?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.noForm?.includes(searchTerm) ||
        r.noSr?.includes(searchTerm) ||
        r.idPelanggan?.includes(searchTerm) ||
        r.kelurahanPasang?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [registrations, searchTerm]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span className="text-xs sm:text-sm font-bold">{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-white/80 hover:text-white text-xs font-bold"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Wrench className="w-3.5 h-3.5" />
            <span>MODUL PETUGAS LAPANGAN &amp; SURVEYOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Portal Dokumentasi Teknis &amp; Pemasangan Meter
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Ambil 3 dokumentasi foto properti (Tampak Depan, Tampak Samping, Rencana Titik Meter), tentukan titik koordinat GPS presisi, dan catat hasil verifikasi fisik sambungan air.
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-right shrink-0">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Permohonan Tersedia</span>
          <span className="text-2xl font-black text-amber-400 font-mono">{registrations.length} Berkas</span>
        </div>
      </div>

      {/* Main Grid: Selection Left (4 cols), Form Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customer Selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Pilih Berkas Pemohon</span>
              </h3>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                {filteredRegistrations.length} Pemohon
              </span>
            </div>

            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Nama / No. Form / No. SR..."
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filteredRegistrations.map((reg) => {
                const isSelected = selectedRegistration?.noForm === reg.noForm;
                const photosCount = reg.fotoPropertiFiles?.length || (reg.dataPasang?.fotoProperti ? 1 : 0);
                return (
                  <button
                    key={reg.noForm}
                    type="button"
                    onClick={() => setSelectedNoForm(reg.noForm)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-black text-amber-400">
                        #{reg.noForm} {reg.noSr ? `• SR: ${reg.noSr}` : ''}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        photosCount >= 3
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : photosCount > 0
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        📷 {photosCount}/3 Foto
                      </span>
                    </div>

                    <div className="font-bold text-xs text-white truncate">
                      {reg.namaKtp}
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{reg.alamatPasang}, {reg.kelurahanPasang}</span>
                    </div>

                    {reg.idPelanggan && (
                      <div className="text-[10px] text-emerald-400 font-mono font-bold">
                        ID: {reg.idPelanggan}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Field Survey & Property Documentation Form */}
        <div className="lg:col-span-8">
          {selectedRegistration ? (
            <form onSubmit={handleSaveFieldData} className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-xl space-y-6 text-white">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Formulir Input Dokumentasi Lapangan
                  </span>
                  <h3 className="text-lg font-black text-white">
                    {selectedRegistration.namaKtp} (No. Form #{selectedRegistration.noForm})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Alamat: {selectedRegistration.alamatPasang}, Kel. {selectedRegistration.kelurahanPasang}, Kab. Tangerang
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition cursor-pointer shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Data Lapangan'}</span>
                </button>
              </div>

              {/* 1. THREE PROPERTY PHOTOS (REQUIREMENT D.1) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-amber-400" />
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                      1. Dokumentasi Foto Properti Lapangan (3 Titik)
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Wajib dilengkapi oleh petugas lapangan
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Slot 1: Tampak Depan */}
                  {(['depan', 'samping', 'meter'] as const).map((slot) => {
                    const titles = {
                      depan: 'Tampak Depan Bangunan',
                      samping: 'Tampak Samping Bangunan',
                      meter: 'Rencana Titik Meter Air',
                    };
                    const descs = {
                      depan: 'Foto fasad depan rumah & nomor persil',
                      samping: 'Foto batas persil & sisi samping',
                      meter: 'Foto titik kran/pipa dinas yang dipasang',
                    };
                    const photo = getSlotPhoto(slot);
                    const hasPhotoData = Boolean(photo && photo.dataUrl && typeof photo.dataUrl === 'string' && photo.dataUrl.trim());

                    return (
                      <div
                        key={slot}
                        className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-400 text-[11px] uppercase">
                              {titles[slot]}
                            </span>
                            {hasPhotoData ? (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                                ✓ Terunggah
                              </span>
                            ) : (
                              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                                Kosong
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight">
                            {descs[slot]}
                          </p>
                        </div>

                        {hasPhotoData ? (
                          <div className="relative group rounded-xl overflow-hidden border border-slate-700 aspect-4/3 bg-slate-900">
                            <img
                              src={photo!.dataUrl || undefined}
                              alt={titles[slot]}
                              className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition duration-300"
                              onClick={() =>
                                setActiveViewer({
                                  isOpen: true,
                                  imageUrl: photo!.dataUrl,
                                  title: titles[slot],
                                  description: `Unggahan dokumentasi lapangan untuk No. Form #${selectedRegistration.noForm}`,
                                })
                              }
                            />
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveViewer({
                                    isOpen: true,
                                    imageUrl: photo!.dataUrl,
                                    title: titles[slot],
                                    description: `Unggahan dokumentasi lapangan untuk No. Form #${selectedRegistration.noForm}`,
                                  })
                                }
                                className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-950 transition"
                                title="Perbesar Foto"
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveSlotPhoto(slot)}
                                className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition"
                                title="Hapus Foto"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-4/3 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center p-3 text-center gap-2">
                            <Camera className="w-6 h-6 text-slate-600" />
                            <span className="text-[10px] text-slate-500 font-medium">Belum ada foto</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSlot(slot);
                              setIsCameraOpen(true);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold border border-slate-700 transition cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>Kamera</span>
                          </button>

                          <label className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700 transition cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(slot, e)}
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. KOORDINAT GPS & PETA INTERAKTIF */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                      2. Titik Koordinat GPS Meter Air (Peta Interaktif)
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    {formData.gpsLat}, {formData.gpsLong}
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-700">
                  <InteractiveMapPicker
                    initialLat={formData.gpsLat}
                    initialLng={formData.gpsLong}
                    onLocationChange={(lat, lng) => {
                      setFormData((prev) => ({
                        ...prev,
                        gpsLat: lat,
                        gpsLong: lng,
                      }));
                    }}
                  />
                </div>
              </div>

              {/* 3. DATA TEKNIS & PETUGAS */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-amber-400" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    3. Spesifikasi Teknis Meteran &amp; Petugas Lapangan
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Nama Petugas Surveyor Lapangan
                    </label>
                    <input
                      type="text"
                      value={formData.namaPetugasSurveyor}
                      onChange={(e) => setFormData({ ...formData, namaPetugasSurveyor: e.target.value.toUpperCase() })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white uppercase focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Nama Teknisi Pemasangan Meter
                    </label>
                    <input
                      type="text"
                      value={formData.namaTeknisi}
                      onChange={(e) => setFormData({ ...formData, namaTeknisi: e.target.value.toUpperCase() })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white uppercase focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Nomor Seri Water Meter (SNI)
                    </label>
                    <input
                      type="text"
                      value={formData.noSeriMeter}
                      onChange={(e) => setFormData({ ...formData, noSeriMeter: e.target.value.toUpperCase() })}
                      placeholder="Contoh: AET-2609-8472"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono font-bold text-amber-400 uppercase focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Nomor Segel Resmi Kran Aetra
                    </label>
                    <input
                      type="text"
                      value={formData.noSegel}
                      onChange={(e) => setFormData({ ...formData, noSegel: e.target.value.toUpperCase() })}
                      placeholder="Contoh: SGL-AAT-88192"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono font-bold text-amber-400 uppercase focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Panjang Pipa Dinas Lapangan (Meter)
                    </label>
                    <input
                      type="text"
                      value={formData.panjangPipa}
                      onChange={(e) => setFormData({ ...formData, panjangPipa: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      No. Work Order / SPKO Lapangan
                    </label>
                    <input
                      type="text"
                      value={formData.noWorkOrder}
                      onChange={(e) => setFormData({ ...formData, noWorkOrder: e.target.value.toUpperCase() })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white uppercase focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Catatan Kelayakan Teknis Lapangan &amp; Petugas
                  </label>
                  <textarea
                    rows={3}
                    value={formData.catatanPetugas}
                    onChange={(e) => setFormData({ ...formData, catatanPetugas: e.target.value.toUpperCase() })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white uppercase focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-xl shadow-amber-500/25 transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Seluruh Data Lapangan'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-12 text-center text-slate-400 space-y-3">
              <Wrench className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="font-bold text-white text-base">Belum Ada Pemohon Dipilih</h4>
              <p className="text-xs text-slate-400">Silakan pilih salah satu data pemohon pada daftar di sebelah kiri untuk melengkapi foto &amp; data teknis lapangan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => {
          if (activeSlot) {
            handleSetSlotPhoto(activeSlot, dataUrl);
            showToast(`Foto ${activeSlot} berhasil diambil dari kamera!`);
          }
          setIsCameraOpen(false);
        }}
        title={`Ambil Foto: ${activeSlot === 'depan' ? 'Tampak Depan' : activeSlot === 'samping' ? 'Tampak Samping' : 'Rencana Titik Meter'}`}
        guideType="property"
      />

      {/* Lightbox Viewer Modal */}
      <DocumentImageViewerModal
        isOpen={activeViewer.isOpen}
        onClose={() => setActiveViewer((prev) => ({ ...prev, isOpen: false }))}
        imageUrl={activeViewer.imageUrl}
        title={activeViewer.title}
        description={activeViewer.description}
      />
    </div>
  );
};
