import React, { useState, useEffect, useMemo } from 'react';
import { CustomerTrackingRecord, RegistrationFormData, UserAccount, TrackingTimelineEvent } from '../types';
import { 
  Check, 
  Clock, 
  MapPin, 
  Phone, 
  AlertCircle, 
  Sparkles, 
  Package, 
  Droplets, 
  CreditCard, 
  Compass, 
  Calendar, 
  ShieldCheck,
  ChevronRight,
  User,
  Wrench,
  History,
  Activity,
  CheckCircle2,
  Lock,
  Layers,
  FileCheck2,
  Radio,
  FileSpreadsheet
} from 'lucide-react';

interface TrackingSectionProps {
  trackingRecords: CustomerTrackingRecord[];
  registrations?: RegistrationFormData[];
  activeFormNumber?: string;
  currentUser?: UserAccount | null;
  onSelectCustomer?: (noForm: string) => void;
  onUpdateTrackingStep?: (noForm: string, nextStep: 1 | 2 | 3 | 4) => void;
  onNavigateToRegister?: () => void;
  onQuickDemoRegister?: () => void;
  onNavigateToAdmin?: (noForm?: string) => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  trackingRecords,
  registrations = [],
  activeFormNumber = '',
  currentUser,
  onSelectCustomer,
  onUpdateTrackingStep,
  onNavigateToRegister,
  onQuickDemoRegister,
  onNavigateToAdmin,
}) => {
  // Filter tracking records strictly for current customer account
  // Note: trackingRecords is already strictly scoped to current user account by App.tsx
  const customerScopedRecords = useMemo(() => {
    return trackingRecords || [];
  }, [trackingRecords]);

  // Selected record state
  const [selectedRecord, setSelectedRecord] = useState<CustomerTrackingRecord | null>(() => {
    if (!customerScopedRecords || customerScopedRecords.length === 0) return null;
    if (activeFormNumber) {
      const match = customerScopedRecords.find((r) => r.noForm === activeFormNumber || r.noSr === activeFormNumber);
      if (match) return match;
    }
    return customerScopedRecords[0];
  });

  // Keep selected record strictly in sync with incoming live updates
  useEffect(() => {
    if (!customerScopedRecords || customerScopedRecords.length === 0) {
      setSelectedRecord(null);
      return;
    }

    if (activeFormNumber) {
      const match = customerScopedRecords.find((r) => r.noForm === activeFormNumber || r.noSr === activeFormNumber);
      if (match) {
        setSelectedRecord(match);
        return;
      }
    }

    setSelectedRecord((prev) => {
      if (prev) {
        const updated = customerScopedRecords.find((r) => r.noForm === prev.noForm || r.noSr === prev.noSr);
        if (updated) return updated;
      }
      return customerScopedRecords[0];
    });
  }, [activeFormNumber, customerScopedRecords]);

  const handleSelectCustomerRecord = (record: CustomerTrackingRecord) => {
    setSelectedRecord(record);
    if (onSelectCustomer) {
      onSelectCustomer(record.noForm);
    }
  };

  // 5 Standardized Stages
  const trackingStages = [
    {
      step: 1,
      title: '1. Verifikasi Berkas',
      subtitle: 'Pemeriksaan Identitas & KTP',
      desc: 'Pengecekan kelengkapan berkas administrasi oleh petugas Aetra',
    },
    {
      step: 2,
      title: '2. Pembayaran Biaya',
      subtitle: 'Pelunasan Biaya Sambungan',
      desc: 'Pelunasan biaya sambungan melalui 9 kanal pembayaran resmi',
    },
    {
      step: 3,
      title: '3. SPKO & Pipa Dinas',
      subtitle: 'Penarikan Jaringan Pipa',
      desc: 'Penerbitan surat tugas & penarikan pipa dinas ke persil pelanggan',
    },
    {
      step: 4,
      title: '4. Proses Pemasangan Meteran',
      subtitle: 'Instalasi Water Meter SNI',
      desc: 'Pemasangan meteran air dan penguncian segel resmi di lokasi',
    },
    {
      step: 5,
      title: '5. Air Mengalir',
      subtitle: 'Sambungan Aktif & Selesai',
      desc: 'Uji pengaliran air bersih rampung dan sambungan siap digunakan',
    },
  ];

  // Construct strictly synchronized chronological timeline history (1-to-1 with progress stages above, no duplicates)
  const timelineHistoryList = useMemo(() => {
    if (!selectedRecord) return [];

    const currentStep = selectedRecord.currentStep || 1;
    const regDate = selectedRecord.tanggalDaftar || 'Hari Ini';
    const cleanDate = regDate.split(',')[0] || 'Hari Ini';

    const events: TrackingTimelineEvent[] = [];

    // Stage 1: Verifikasi Berkas
    events.push({
      id: 'step-1-event',
      step: 1,
      date: cleanDate,
      time: '09:00 WIB',
      title: '1. Verifikasi Berkas Administrasi & Identitas',
      description: currentStep === 1
        ? (selectedRecord.adminNotes || `Formulir permohonan sambungan baru SR-${selectedRecord.noSr} berhasil didaftarkan. Tim Administrasi Aetra sedang memeriksa kelengkapan dokumen KTP, KK, dan data persil.`)
        : 'Berkas identitas pemohon dan persyaratan administrasi telah diverifikasi dan dinyatakan lengkap oleh Tim Administrasi Aetra.',
      status: currentStep > 1 ? 'completed' : 'in_progress',
      actor: currentStep > 1 ? 'Petugas Administrasi Aetra' : 'Tim Administrasi Aetra',
      badge: currentStep > 1 ? 'Selesai & Disetujui' : 'Sedang Berjalan',
    });

    // Stage 2: Pembayaran Biaya
    if (currentStep >= 2) {
      const isPaid = currentStep > 2 || selectedRecord.statusPembayaran === 'Lunas';
      events.push({
        id: 'step-2-event',
        step: 2,
        date: cleanDate,
        time: '13:30 WIB',
        title: '2. Pembayaran Biaya Sambungan Baru',
        description: isPaid
          ? `Pembayaran biaya sambungan baru sebesar Rp ${(selectedRecord.biayaSambungan || 1371545).toLocaleString('id-ID')} terverifikasi Lunas. ID Pelanggan resmi: ${selectedRecord.idPelanggan || '10842918'}.`
          : (selectedRecord.adminNotes || `Nomor Pembayaran resmi telah diterbitkan: ${selectedRecord.nomorPembayaran || ('88290' + selectedRecord.noSr)}. Silakan lakukan pelunasan sebesar Rp ${(selectedRecord.biayaSambungan || 1371545).toLocaleString('id-ID')} melalui kanal pembayaran resmi Aetra.`),
        status: isPaid ? 'completed' : 'in_progress',
        actor: isPaid ? 'Kasir & Billing Aetra' : 'Kanal Pembayaran Resmi',
        badge: isPaid ? 'Lunas & Terverifikasi' : 'Menunggu Pembayaran',
      });
    }

    // Stage 3: SPKO & Pipa Dinas
    if (currentStep >= 3) {
      const isSpkoDone = currentStep > 3;
      events.push({
        id: 'step-3-event',
        step: 3,
        date: 'Hari Ini',
        time: '10:00 WIB',
        title: '3. SPKO & Penarikan Pipa Dinas',
        description: isSpkoDone
          ? `Surat Perintah Kerja Operasional (SPKO) selesai. Pipa dinas sepanjang ${selectedRecord.panjangPipaDinas || '4.5 Meter'} berhasil ditarik ke persil rumah.`
          : (selectedRecord.adminNotes || `Surat Perintah Kerja Operasional (SPKO) telah diterbitkan. Tim kontraktor jaringan pipa mitra Aetra sedang melakukan penarikan pipa dinas (${selectedRecord.panjangPipaDinas || '4.5 Meter'}) dan galian jalur.`),
        status: isSpkoDone ? 'completed' : 'in_progress',
        actor: 'Tim Kontraktor Jaringan Aetra',
        badge: isSpkoDone ? 'Pipa Dinas Terpasang' : 'Sedang Dikerjakan',
      });
    }

    // Stage 4: Pemasangan Meteran Air
    if (currentStep >= 4) {
      const isMeterDone = currentStep > 4;
      events.push({
        id: 'step-4-event',
        step: 4,
        date: 'Hari Ini',
        time: '14:00 WIB',
        title: '4. Pemasangan Meteran Air & Segel Resmi',
        description: isMeterDone
          ? `Water meter SNI No. Seri: ${selectedRecord.nomorMeter || 'AET-2609-8472'} dan segel resmi ${selectedRecord.nomorSegel || 'SGL-AAT-99120'} telah selesai dipasang dan terkunci di persil pelanggan.`
          : (selectedRecord.adminNotes || `Teknisi lapangan (${selectedRecord.petugasTeknisi?.nama || 'Petugas Teknisi Aetra'}) sedang memasang unit meter air No. Seri ${selectedRecord.nomorMeter || 'AET-2609-8472'} dan penguncian segel resmi ${selectedRecord.nomorSegel || 'SGL-AAT-99120'}.`),
        status: isMeterDone ? 'completed' : 'in_progress',
        actor: selectedRecord.petugasTeknisi?.nama || 'Teknisi Lapangan Aetra',
        badge: isMeterDone ? 'Meteran Terpasang' : 'Sedang Dipasang',
      });
    }

    // Stage 5: Air Mengalir
    if (currentStep >= 5) {
      events.push({
        id: 'step-5-event',
        step: 5,
        date: 'Hari Ini',
        time: '16:00 WIB',
        title: '5. Air Bersih Mengalir & Sambungan Aktif',
        description: 'Uji pengaliran dan debit air bersih telah rampung sesuai standar Permenkes No. 2 Tahun 2023. Air bersih resmi mengalir lancar ke persil pelanggan!',
        status: 'completed',
        actor: 'Tim Pengendalian Mutu & Distribusi Aetra',
        badge: 'Selesai',
      });
    }

    return events;
  }, [selectedRecord]);

  // EMPTY STATE
  if (customerScopedRecords.length === 0 || !selectedRecord) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#005DAA] border border-blue-100 flex items-center justify-center mx-auto shadow-xs">
            <Package className="w-8 h-8" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">
              Belum Ada Data Tracking Sambungan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentUser
                ? `Akun Anda (${currentUser.nama}) belum memiliki permohonan sambungan baru yang sedang aktif.`
                : 'Silakan isi Formulir Pendaftaran Sambungan Baru terlebih dahulu untuk memulai pelacakan.'}
            </p>
          </div>

          {onNavigateToRegister && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="px-6 py-2.5 rounded-xl bg-[#005DAA] hover:bg-[#004A88] text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Daftar Sambungan Baru Sekarang
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Active state calculations
  const progressPercent = Math.round((selectedRecord.currentStep / 5) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner - Symmetrical & Creative Layout with Large SR Badge */}
      <div className="bg-linear-to-r from-[#005DAA] via-[#004B8A] to-[#003868] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border-b-4 border-[#F37021]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-xs font-semibold border border-white/20">
              <Compass className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Tracking Real-Time Sambungan Baru</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Status Pelacakan Permohonan Sambungan Air
            </h1>

            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Pantau tahapan pemasangan sambungan air bersih Anda secara transparan dari verifikasi berkas hingga air bersih mengalir ke persil.
            </p>
          </div>

          {/* Compact & Clean Nomor SR Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xs shrink-0 self-start md:self-center">
            <span className="text-xs sm:text-sm font-black text-amber-300 tracking-wider">
              NO SR :
            </span>
            <span className="font-mono text-sm sm:text-base font-black text-white">
              {selectedRecord.noSr}
            </span>
          </div>
        </div>
      </div>

      {/* Switcher if user has multiple connections */}
      {customerScopedRecords.length > 1 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-500 uppercase shrink-0">
            Pilih Permohonan Anda:
          </span>
          {customerScopedRecords.map((rec) => {
            const isSelected = selectedRecord.noForm === rec.noForm || selectedRecord.noSr === rec.noSr;
            return (
              <button
                key={rec.noForm}
                type="button"
                onClick={() => handleSelectCustomerRecord(rec)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border shrink-0 transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>No. SR: {rec.noSr}</span>
                <span className="text-slate-300">&bull;</span>
                <span className="max-w-[130px] truncate">{rec.alamat.split(',')[0]}</span>
                <span className={`w-2 h-2 rounded-full ${rec.currentStep === 5 ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`} />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Tracking Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        {/* Top Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#005DAA] text-white font-mono font-black text-sm px-3.5 py-1 rounded-xl shadow-xs">
                SR - {selectedRecord.noSr}
              </span>
              {selectedRecord.idPelanggan ? (
                <span className="bg-emerald-100 text-emerald-900 font-mono font-black text-sm px-3.5 py-1 rounded-xl border border-emerald-300 shadow-xs">
                  ID PELANGGAN: {selectedRecord.idPelanggan}
                </span>
              ) : (
                <span className="bg-slate-100 text-slate-600 font-semibold text-xs px-3 py-1 rounded-xl border border-slate-200">
                  ID Pelanggan: Diterbitkan setelah bayar
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-slate-900 pt-0.5">
              {selectedRecord.nama}
            </h3>

            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F37021] shrink-0" />
              <span>{selectedRecord.alamat}</span>
            </p>
          </div>

          {/* Estimasi Air Mengalir: 14 - 1 Bulan Hari Kerja */}
          <div className="bg-linear-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200 p-4 rounded-2xl sm:text-right shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">
              Estimasi Air Mengalir
            </span>
            <div className="text-sm sm:text-base font-black text-[#005DAA] mt-0.5">
              14 - 1 Bulan Hari Kerja
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Terhitung sejak berkas &amp; pembayaran terverifikasi
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className="text-slate-900 font-bold">Progres Pemasangan</span>
            <span className="font-mono text-[#005DAA] font-black">
              {progressPercent}% (Tahap {selectedRecord.currentStep} dari 5)
            </span>
          </div>

          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div 
              className="bg-linear-to-r from-[#005DAA] via-[#0080FF] to-[#F37021] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 5 Simplified Stage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {trackingStages.map((st) => {
            // When admin updates to stage 5 (Air Mengalir), mark stage 5 as 'Selesai' (completed)
            const isCompleted = st.step === 5 ? selectedRecord.currentStep >= 5 : selectedRecord.currentStep > st.step;
            const isCurrent = st.step === 5 ? false : selectedRecord.currentStep === st.step;

            return (
              <div
                key={st.step}
                className={`p-4 rounded-2xl border transition ${
                  isCompleted
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : isCurrent
                    ? 'bg-blue-50/90 border-blue-400 shadow-sm ring-2 ring-blue-300/40'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-[#005DAA] text-white animate-pulse shadow-xs'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : st.step}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : isCurrent
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? 'Selesai' : isCurrent ? 'Berjalan' : 'Menunggu'}
                  </span>
                </div>

                <div className={`text-xs font-bold ${isCurrent ? 'text-blue-950' : isCompleted ? 'text-emerald-950' : 'text-slate-700'}`}>
                  {st.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {st.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIWAYAT HISTORI & AKTIVITAS PELACAKAN (TIMELINE LOG SINKRON DENGAN PROGRESS) */}
        <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#005DAA]" />
              <h4 className="text-sm font-black text-slate-900 tracking-wide uppercase">
                Riwayat Histori &amp; Aktivitas Pelacakan
              </h4>
            </div>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
              <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              Sinkron dengan Progres Tahapan ({timelineHistoryList.length} Aktivitas)
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-5 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
            {timelineHistoryList.map((evt, idx) => {
              const isLatest = idx === timelineHistoryList.length - 1;
              const isCompleted = evt.status === 'completed';

              return (
                <div key={evt.id || idx} className="relative group">
                  {/* Timeline Dot Icon */}
                  <div className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#005DAA] text-white animate-pulse ring-2 ring-blue-300'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>

                  {/* Timeline Content Card */}
                  <div className={`p-4 rounded-xl border transition ${
                    isLatest && !isCompleted
                      ? 'bg-blue-50/90 border-blue-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-xs font-black text-slate-900">
                          {evt.title}
                        </strong>
                        {evt.badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-[#005DAA]'
                          }`}>
                            {evt.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono font-semibold text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{evt.date} &bull; {evt.time}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {evt.description}
                    </p>

                    {evt.actor && (
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Petugas / Aktor: <strong className="text-slate-600 font-medium">{evt.actor}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admin/Field Officer Note if available */}
        {selectedRecord.adminNotes && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="block text-amber-950">Catatan Petugas Lapangan:</strong>
              <p className="text-slate-700">{selectedRecord.adminNotes}</p>
            </div>
          </div>
        )}

        {/* Technical Data Overview */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
              Nomor Seri Meter Air
            </span>
            <strong className="font-mono text-slate-900 text-xs block mt-0.5">
              {selectedRecord.nomorMeter || (selectedRecord.currentStep >= 4 ? 'AET-2609-8472' : 'Dalam Proses')}
            </strong>
          </div>

          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
              Nomor Segel Kran Resmi
            </span>
            <strong className="font-mono text-slate-900 text-xs block mt-0.5">
              {selectedRecord.nomorSegel || (selectedRecord.currentStep >= 4 ? 'SGL-AAT-99120' : 'Dalam Proses')}
            </strong>
          </div>

          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
              Status Pelunasan Biaya
            </span>
            <span className={`inline-block mt-0.5 font-bold ${selectedRecord.currentStep >= 3 || selectedRecord.statusPembayaran === 'Lunas' ? 'text-emerald-700' : 'text-amber-700'}`}>
              {selectedRecord.currentStep >= 3 || selectedRecord.statusPembayaran === 'Lunas' ? '✓ Berhasil / Lunas' : '⏳ Menunggu Pelunasan'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
