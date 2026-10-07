import React, { useState, useMemo, useEffect } from 'react';
import { UserAccount, RegistrationFormData, MonthlyBillRecord, PaymentProofData } from '../types';
import { 
  CreditCard, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Receipt, 
  Printer, 
  Download, 
  ExternalLink, 
  Calendar, 
  Building2, 
  MapPin, 
  QrCode, 
  Wallet, 
  Store, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  History, 
  RotateCcw, 
  Copy, 
  Check, 
  Info,
  AlertTriangle,
  Lock,
  Flame,
  PhoneCall,
  ShieldAlert,
  Wrench,
  Ban,
  Timer,
  Upload,
  BarChart3,
  TrendingUp,
  FileText,
  X,
  Eye,
  Droplets
} from 'lucide-react';
import { PaymentPartnersGrid } from './PaymentPartnersGrid';
import { cloudSyncService, INITIAL_BILLS_DATA } from '../services/cloudSyncService';
import { get12MonthsMeterHistory, MonthlyMeterRecord } from '../utils/meterHistoryService';
import { OFFICIAL_PAYMENT_CHANNELS } from '../data/paymentChannels';

interface MonthlyBillSectionProps {
  currentUser?: UserAccount | null;
  registrations?: RegistrationFormData[];
  onNavigateToRegister?: () => void;
  externalBills?: MonthlyBillRecord[];
}

export type DemoBillState = 'NORMAL' | 'WARNING_TEMPORARY_SEAL' | 'DANGER_PERMANENT_DISCONNECT';

export const MonthlyBillSection: React.FC<MonthlyBillSectionProps> = ({
  currentUser,
  registrations = [],
  onNavigateToRegister,
  externalBills,
}) => {
  // Load bills from cloudSyncService / local storage
  const [bills, setBills] = useState<MonthlyBillRecord[]>(() => {
    if (externalBills && externalBills.length > 0) return externalBills;
    const local = cloudSyncService.getLocalSnapshot().bills;
    return local.length > 0 ? local : INITIAL_BILLS_DATA;
  });

  // Demo state switcher for simulation
  const [demoState, setDemoState] = useState<DemoBillState>('NORMAL');

  // Active view tab: 'tagihan' | 'histori'
  const [activeTab, setActiveTab] = useState<'tagihan' | 'histori'>('tagihan');

  // Upload Payment Proof modal state
  const [isUploadProofModalOpen, setIsUploadProofModalOpen] = useState(false);
  const [proofFile, setProofFile] = useState<{ name: string; dataUrl: string; size?: string } | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string>('BCA');
  const [proofNotes, setProofNotes] = useState<string>('');
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);
  const [proofSuccessToast, setProofSuccessToast] = useState(false);

  // Zoom receipt modal
  const [viewingReceiptImage, setViewingReceiptImage] = useState<string | null>(null);

  // Listen to cloud updates
  useEffect(() => {
    const unsub = cloudSyncService.addListener(() => {
      const updated = cloudSyncService.getLocalSnapshot().bills;
      if (updated && updated.length > 0) {
        setBills(updated);
      }
    });
    return unsub;
  }, []);

  // Update when externalBills prop changes
  useEffect(() => {
    if (externalBills && externalBills.length > 0) {
      setBills(externalBills);
    }
  }, [externalBills]);

  // Default query to current logged-in customer's ID Pelanggan if available
  const [searchId, setSearchId] = useState<string>(() => {
    return currentUser?.idPelanggan || '10842918';
  });

  const [activeQuery, setActiveQuery] = useState<string>(() => {
    return currentUser?.idPelanggan || '10842918';
  });

  const [copiedCode, setCopiedCode] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Search result calculated
  const currentBill = useMemo(() => {
    if (!activeQuery.trim()) return null;
    const cleanQuery = activeQuery.trim().toLowerCase();

    // 1. Direct match in bills database by ID Pelanggan or No SR
    let found = bills.find(
      (b) =>
        b.idPelanggan.toLowerCase() === cleanQuery ||
        (b.noSr && b.noSr.toLowerCase() === cleanQuery)
    );

    if (!found) {
      // 2. Fallback match in registrations (create virtual bill if registered)
      const regMatch = registrations.find(
        (r) =>
          (r.idPelanggan && r.idPelanggan.toLowerCase() === cleanQuery) ||
          (r.noForm && r.noForm.toLowerCase() === cleanQuery) ||
          (r.noSr && r.noSr.toLowerCase() === cleanQuery)
      );
      if (regMatch) {
        found = {
          id: `bill-reg-${regMatch.noForm}`,
          idPelanggan: regMatch.idPelanggan || '10842918',
          noSr: regMatch.noSr || '165050',
          nama: regMatch.namaKtp,
          alamat: `${regMatch.alamatPasang || regMatch.alamatKtp} RT/RW ${regMatch.rtRwPasang || regMatch.rtRwKtp}`,
          golonganTarif: regMatch.golonganTarif || '2A1 - Rumah Tangga Standard (R2)',
          nomorMeter: regMatch.dataPasang?.noSeriMeter || 'AET-2609-001',
          periodeBulan: 'Maret 2026',
          tanggalJatuhTempo: '20 Maret 2026',
          standLalu: 1420,
          standKini: 1442,
          pemakaianM3: 22,
          rincianBlok: { blok1M3: 10, blok1Tarif: 5500, blok1Total: 55000, blok2M3: 10, blok2Tarif: 7000, blok2Total: 70000, blok3M3: 2, blok3Tarif: 8800, blok3Total: 17600 },
          biayaAir: 142600,
          biayaPemeliharaanMeter: 12500,
          biayaAdministrasi: 5000,
          retribusi: 0,
          denda: 0,
          biayaPembukaanSegel: 0,
          biayaLainnya: 0,
          totalTagihan: 142600,
          status: 'BELUM LUNAS',
        };
      }
    }

    if (!found) return null;

    // Apply Demo Variations based on demoState
    if (demoState === 'WARNING_TEMPORARY_SEAL') {
      const pemakaianAir = found.biayaAir || 142600;
      const denda = 25000;
      const segel = 0;
      const lainnya = 0;
      return {
        ...found,
        status: 'BELUM LUNAS' as const,
        periodeBulan: 'Februari & Maret 2026 (Tunggakan 1 Bulan)',
        biayaAir: pemakaianAir,
        denda: denda,
        biayaPembukaanSegel: segel,
        biayaLainnya: lainnya,
        totalTagihan: pemakaianAir + denda + segel + lainnya,
        tanggalJatuhTempo: '20 Februari 2026 (Lewat Jatuh Tempo)',
      };
    }

    if (demoState === 'DANGER_PERMANENT_DISCONNECT') {
      const pemakaianAir = 714200;
      const denda = 150000;
      const segel = 75000;
      const lainnya = 25000;
      return {
        ...found,
        status: 'BELUM LUNAS' as const,
        periodeBulan: 'Akumulasi 5 Bulan (November 2025 - Maret 2026)',
        biayaAir: pemakaianAir,
        denda: denda,
        biayaPembukaanSegel: segel,
        biayaLainnya: lainnya,
        totalTagihan: pemakaianAir + denda + segel + lainnya,
        tanggalJatuhTempo: '20 November 2025 (Menunggak 5 Bulan)',
      };
    }

    // Normal calculate total from mandatory components
    const pemakaianAir = found.biayaAir || (found.totalTagihan - (found.denda || 0) - (found.biayaPembukaanSegel || 0) - (found.biayaLainnya || 0)) || 142600;
    const denda = found.denda || 0;
    const segel = found.biayaPembukaanSegel || 0;
    const lainnya = found.biayaLainnya || 0;
    const calculatedTotal = pemakaianAir + denda + segel + lainnya;

    return {
      ...found,
      biayaAir: pemakaianAir,
      denda,
      biayaPembukaanSegel: segel,
      biayaLainnya: lainnya,
      totalTagihan: calculatedTotal > 0 ? calculatedTotal : found.totalTagihan,
    };
  }, [activeQuery, bills, registrations, demoState]);

  // 12 Months Stand Meter Readings and Usage Trend
  const meterHistory = useMemo(() => {
    if (!currentBill) return [];
    return get12MonthsMeterHistory(currentBill.idPelanggan);
  }, [currentBill]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setActiveQuery(searchId.trim());
    setTimeout(() => setIsSearching(false), 200);
  };

  const handleCopyPaymentCode = () => {
    if (!currentBill) return;
    navigator.clipboard.writeText(currentBill.idPelanggan);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  // Handle Proof File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setProofFile({
        name: file.name,
        dataUrl: event.target?.result as string,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBill || !proofFile) return;

    setIsSubmittingProof(true);

    const newProof: PaymentProofData = {
      fileUrl: proofFile.dataUrl,
      fileName: proofFile.name,
      uploadedAt: new Date().toISOString(),
      bankPengirim: selectedChannel,
      nominal: currentBill.totalTagihan,
      catatan: proofNotes,
      status: 'pending',
    };

    const updatedBills = bills.map((b) => {
      if (b.id === currentBill.id || b.idPelanggan === currentBill.idPelanggan) {
        return {
          ...b,
          status: 'MENUNGGU VERIFIKASI' as const,
          paymentProof: newProof,
          metodeBayar: selectedChannel,
        };
      }
      return b;
    });

    cloudSyncService.saveBills(updatedBills);
    setBills(updatedBills);

    setTimeout(() => {
      setIsSubmittingProof(false);
      setIsUploadProofModalOpen(false);
      setProofFile(null);
      setProofNotes('');
      setProofSuccessToast(true);
      setTimeout(() => setProofSuccessToast(false), 4500);
    }, 600);
  };

  // Max usage calculation for SVG Trend Chart
  const maxUsage = useMemo(() => {
    if (!meterHistory || meterHistory.length === 0) return 30;
    return Math.max(...meterHistory.map((m) => m.pemakaianM3), 30);
  }, [meterHistory]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {proofSuccessToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
          <div className="text-xs">
            <strong className="block text-emerald-200 font-bold">Bukti Pembayaran Berhasil Diunggah!</strong>
            <span>Status tagihan kini berubah menjadi Menunggu Verifikasi oleh Admin / Kasir Aetra.</span>
          </div>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="bg-linear-to-r from-[#005DAA] via-[#004B8A] to-[#003868] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border-b-4 border-[#F37021]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-xs font-semibold border border-white/20">
            <CreditCard className="w-3.5 h-3.5 text-[#F37021]" />
            <span>Layanan Mandiri Pelanggan Aetra</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Cek Tagihan &amp; Histori Pemakaian Air
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Masukkan <strong>ID Pelanggan</strong> Anda untuk mengecek rincian tagihan rekening air, upload bukti bayar, simulasi status penertiban, dan grafik histori pemakaian 12 bulan terakhir.
          </p>
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSearchSubmit} className="mt-6 relative z-10">
          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
            <div className="flex-1 flex items-center gap-3 px-3 w-full">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Nomor ID Pelanggan
                </label>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value.replace(/\s+/g, ''))}
                  placeholder="Masukkan 8 Digit ID Pelanggan (contoh: 10842918)"
                  className="w-full text-slate-900 font-mono font-bold text-base sm:text-lg focus:outline-hidden placeholder:font-sans placeholder:text-xs placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!searchId.trim() || isSearching}
              className="w-full sm:w-auto px-6 py-3 bg-[#005DAA] hover:bg-[#004A88] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>Cek Tagihan</span>
            </button>
          </div>
        </form>

        {/* Quick Sample IDs for Testing */}
        <div className="mt-3 flex items-center gap-2 flex-wrap text-[11px] text-blue-100">
          <span className="font-semibold text-blue-200">Contoh ID Pelanggan:</span>
          {['10842918', '10928371', '10739182', '10567890'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setSearchId(id);
                setActiveQuery(id);
              }}
              className={`px-2.5 py-0.5 rounded-lg border font-mono transition text-xs cursor-pointer ${
                activeQuery === id
                  ? 'bg-[#F37021] text-white border-transparent font-bold shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              #{id}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Switcher: Tagihan Saat Ini vs Histori Stand Meter 1 Tahun */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('tagihan')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'tagihan'
              ? 'bg-[#005DAA] text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Rincian Tagihan &amp; Pembayaran</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('histori')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'histori'
              ? 'bg-[#005DAA] text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Histori Stand Meter &amp; Trend Pemakaian (1 Tahun)</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE DEMO SCENARIO SWITCHER (SIMULASI SANKSI AMAN)  */}
      {/* ========================================================= */}
      <div className="bg-slate-900 text-white p-4 rounded-3xl border border-slate-800 shadow-md space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
              Simulasi Penertiban Rekening (Edukasi Pelanggan):
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Pilih status untuk melihat penjelasan prosedur penertiban dan langkah solusi:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Normal State */}
          <button
            type="button"
            onClick={() => setDemoState('NORMAL')}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-2.5 ${
              demoState === 'NORMAL'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/40 shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-xs block font-bold">1. Status Normal / Lancar</strong>
              <span className="text-[10px] text-slate-400">Tagihan berjalan tanpa tunggakan</span>
            </div>
          </button>

          {/* Demo 1: Belum Bayar Bulan Lalu (Peringatan Segel Sementara) */}
          <button
            type="button"
            onClick={() => setDemoState('WARNING_TEMPORARY_SEAL')}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-2.5 ${
              demoState === 'WARNING_TEMPORARY_SEAL'
                ? 'bg-amber-950/90 border-amber-400 text-amber-200 ring-2 ring-amber-500/40 shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <strong className="text-xs block font-bold text-amber-300">2. Penyegelan Sementara</strong>
              <span className="text-[10px] text-slate-400">Keterlambatan 1 bulan berjalan</span>
            </div>
          </button>

          {/* Demo 2: Menunggak 5 Bulan (Pemutusan Permanen) */}
          <button
            type="button"
            onClick={() => setDemoState('DANGER_PERMANENT_DISCONNECT')}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-2.5 ${
              demoState === 'DANGER_PERMANENT_DISCONNECT'
                ? 'bg-rose-950/90 border-rose-400 text-rose-200 ring-2 ring-rose-500/40 shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Ban className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <strong className="text-xs block font-bold text-rose-300">3. Penyegelan Permanen</strong>
              <span className="text-[10px] text-slate-400">Tunggakan berturut-turut &gt;3 bulan</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {currentBill ? (
        <div className="space-y-6">
          {/* ========================================================= */}
          {/* SANKSI BANNER 1: PENYEGELAN SEMENTARA (EDUKATIF & JELAS)   */}
          {/* ========================================================= */}
          {demoState === 'WARNING_TEMPORARY_SEAL' && (
            <div className="bg-amber-50/90 border-2 border-amber-300 text-slate-900 p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
                      Informasi Penertiban Sambungan
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Penyegelan Sementara (Temporary Disconnection)
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Jatuh Tempo: 20 Februari 2026</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-2xl border border-amber-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Alasan</span>
                  <p className="text-slate-700">Terdapat tagihan rekening air yang belum dilunasi hingga melewati batas tanggal 20.</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Status Meter</span>
                  <p className="text-slate-700">Pemasangan gembok/segel sementara pada kran meteran pelanggan.</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Dampak</span>
                  <p className="text-slate-700">Pasokan air bersih terhenti sementara waktu hingga pelunasan diselesaikan.</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Langkah Pelanggan</span>
                  <p className="text-slate-700 font-semibold text-amber-950">Lakukan pelunasan melalui 9 kanal pembayaran resmi Aetra untuk pembukaan segel.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SANKSI BANNER 2: PENYEGELAN PERMANEN (EDUKATIF & JELAS)   */}
          {/* ========================================================= */}
          {demoState === 'DANGER_PERMANENT_DISCONNECT' && (
            <div className="bg-rose-50/90 border-2 border-rose-300 text-slate-900 p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Ban className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-200 text-rose-900 px-2.5 py-0.5 rounded-full">
                      Informasi Penertiban Lanjutan
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Penyegelan Permanen (Permanent Disconnection)
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-900 px-3 py-1.5 rounded-xl text-xs font-semibold border border-rose-300">
                  <ShieldAlert className="w-4 h-4 text-rose-700" />
                  <span>Tunggakan Kumulatif &gt; 3 Bulan</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-2xl border border-rose-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-800 block">Alasan</span>
                  <p className="text-slate-700">Tunggakan tagihan rekening air tidak diselesaikan lebih dari 3 bulan berturut-turut.</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-rose-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-800 block">Status Meter</span>
                  <p className="text-slate-700">Pipa dinas diputus dari pipa distribusi dan water meter ditarik oleh petugas.</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-rose-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-800 block">Dampak</span>
                  <p className="text-slate-700">Sambungan air non-aktif permanen dan ID Pelanggan dibekukan dari sistem.</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-rose-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-800 block">Langkah Pelanggan</span>
                  <p className="text-slate-700 font-semibold text-rose-950">Kunjungi Kantor Pelayanan Aetra terdekat untuk pelunasan seluruh tunggakan &amp; permohonan re-aktivasi.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: TAGIHAN SAAT INI & RINCIAN BIAYA */}
          {activeTab === 'tagihan' && (
            <div className="space-y-6 printable-slip">
              {/* Main Bill Summary Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#005DAA] flex items-center justify-center shrink-0 border border-blue-100">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Informasi Tagihan Resmi PT Aetra Air Tangerang
                      </span>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        Rekening Periode: {currentBill.periodeBulan}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {currentBill.status === 'LUNAS' && demoState === 'NORMAL' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        LUNAS
                      </span>
                    ) : currentBill.status === 'MENUNGGU VERIFIKASI' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black border border-blue-300 shadow-xs">
                        <Clock className="w-4 h-4 text-blue-700 animate-spin" />
                        MENUNGGU VERIFIKASI
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300 shadow-xs">
                        <Clock className="w-4 h-4 text-amber-700" />
                        BELUM LUNAS
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Highlight Amount Banner */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-r from-blue-50 via-sky-50 to-indigo-50/60 border-2 border-blue-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Total Tagihan Rekening Air
                      </span>
                      <div className="font-mono text-3xl sm:text-4xl font-black text-[#005DAA] tracking-tight">
                        Rp {currentBill.totalTagihan.toLocaleString('id-ID')},-
                      </div>
                      <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Jatuh Tempo: <strong>{currentBill.tanggalJatuhTempo}</strong></span>
                      </div>
                    </div>

                    {/* ID Pelanggan / Payment Code Box */}
                    <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs space-y-1.5 shrink-0 min-w-[220px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Kode Bayar (ID Pelanggan):
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyPaymentCode}
                          className="text-xs text-[#005DAA] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                          title="Salin ID Pelanggan"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? 'Disalin' : 'Salin'}</span>
                        </button>
                      </div>
                      <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
                        {currentBill.idPelanggan}
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        Gunakan nomor ini di kasir / ATM / mobile banking
                      </span>
                    </div>
                  </div>

                  {/* Customer Info Grid */}
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                        Nama Pelanggan
                      </span>
                      <strong className="text-slate-900 text-sm block mt-0.5">
                        {currentBill.nama}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                        No. Sambungan (SR)
                      </span>
                      <span className="font-mono font-bold text-slate-800 text-sm block mt-0.5">
                        {currentBill.noSr || '-'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                        Golongan Tarif
                      </span>
                      <span className="text-slate-800 font-medium block mt-0.5">
                        {currentBill.golonganTarif || 'Rumah Tangga'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                        Stand Meter
                      </span>
                      <span className="font-mono font-bold text-slate-800 text-sm block mt-0.5">
                        {currentBill.standLalu} &rarr; {currentBill.standKini} ({currentBill.pemakaianM3} m³)
                      </span>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-4 pt-2 border-t border-slate-200">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                        Alamat Pemasangan
                      </span>
                      <span className="text-slate-700 font-medium block mt-0.5 leading-relaxed">
                        {currentBill.alamat || 'Wilayah Pelayanan PT Aetra Air Tangerang'}
                      </span>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* K.2 RINCIAN KOMPONEN TAGIHAN RESMI                        */}
                  {/* ========================================================= */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden space-y-3 p-5 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <FileText className="w-4 h-4 text-[#005DAA]" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                        Rincian Komponen Tagihan Air
                      </h4>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                      <div className="flex justify-between py-2">
                        <span>Pemakaian Air</span>
                        <span className="font-mono font-bold text-slate-900">
                          Rp {(currentBill.biayaAir || 0).toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="flex justify-between py-2">
                        <span>Denda Tunggakan</span>
                        <span className={`font-mono font-bold ${(currentBill.denda || 0) > 0 ? 'text-amber-700' : 'text-slate-900'}`}>
                          Rp {(currentBill.denda || 0).toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="flex justify-between py-2">
                        <span>Biaya Pembukaan Segel</span>
                        <span className={`font-mono font-bold ${(currentBill.biayaPembukaanSegel || 0) > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
                          Rp {(currentBill.biayaPembukaanSegel || 0).toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="flex justify-between py-2">
                        <span>Biaya Lainnya</span>
                        <span className="font-mono font-bold text-slate-900">
                          Rp {(currentBill.biayaLainnya || 0).toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="flex justify-between py-3 bg-blue-50/60 px-3 rounded-xl border border-blue-100 font-bold text-sm text-[#005DAA]">
                        <span>Total Tagihan</span>
                        <span className="font-mono font-black text-base">
                          Rp {currentBill.totalTagihan.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* K.1 UPLOAD BUKTI PEMBAYARAN TAGIHAN BULANAN               */}
                  {/* ========================================================= */}
                  {currentBill.status !== 'LUNAS' && (
                    <div className="bg-linear-to-r from-blue-50 to-sky-50 border-2 border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#005DAA]" />
                          <h4 className="font-bold text-sm text-slate-900">
                            Sudah Melakukan Pembayaran Tagihan?
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                          Unggah foto resi atau struk transfer pembayaran Anda agar tim kasir Aetra dapat memverifikasi tagihan Anda secara instan.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsUploadProofModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-[#005DAA] hover:bg-[#004B8A] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Bukti Pembayaran</span>
                      </button>
                    </div>
                  )}

                  {/* Proof Details if Uploaded */}
                  {currentBill.paymentProof && (
                    <div className="bg-white border border-blue-200 rounded-2xl p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-xs text-slate-900">Bukti Pembayaran Terunggah</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                            {currentBill.paymentProof.bankPengirim || 'Transfer Bank'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {currentBill.paymentProof.uploadedAt ? currentBill.paymentProof.uploadedAt.slice(0, 10) : 'Hari Ini'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setViewingReceiptImage(currentBill.paymentProof?.fileUrl || null)}
                          className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden relative group cursor-pointer shrink-0"
                        >
                          <img
                            src={currentBill.paymentProof.fileUrl}
                            alt="Bukti Bayar"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                            <Eye className="w-4 h-4" />
                          </div>
                        </button>

                        <div className="text-xs space-y-1">
                          <div className="font-bold text-slate-800">{currentBill.paymentProof.fileName}</div>
                          <div className="text-slate-500 text-[11px]">
                            Nominal: <strong>Rp {(currentBill.paymentProof.nominal || currentBill.totalTagihan).toLocaleString('id-ID')}</strong>
                          </div>
                          {currentBill.paymentProof.catatan && (
                            <p className="text-slate-600 text-[11px] italic">"{currentBill.paymentProof.catatan}"</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 9 Official Payment Channels */}
                  <div className="pt-2">
                    <PaymentPartnersGrid
                      paymentCode={currentBill.idPelanggan}
                      totalAmount={currentBill.totalTagihan}
                      title="9 Kanal Pembayaran Resmi PT Aetra Air Tangerang"
                      subtitle={`Gunakan ID Pelanggan (${currentBill.idPelanggan}) untuk pelunasan tagihan melalui gerai, ATM, atau mobile banking mitra berikut:`}
                    />
                  </div>
                </div>

                {/* Footer Slip Actions */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
                  <span className="text-xs text-slate-500">
                    Simpan nomor ID Pelanggan Anda untuk pengecekan berkala setiap bulan.
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrintSlip}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Cetak Bukti Tagihan</span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePrintSlip}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#005DAA] hover:bg-[#004A88] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: HISTORI STAND METER & TREND PEMAKAIAN 1 TAHUN      */}
          {/* ========================================================= */}
          {activeTab === 'histori' && (
            <div className="space-y-6">
              {/* Card Trend Grafik Pemakaian 12 Bulan */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#005DAA]" />
                      <h3 className="font-bold text-base text-slate-900">
                        Grafik Trend Pemakaian Air (12 Bulan Terakhir)
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Pantau pola konsumsi air bersih bulanan rumah tangga Anda dalam meter kubik (m³).
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">ID Pelanggan:</span>
                    <span className="font-mono font-bold text-xs text-[#005DAA] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {currentBill.idPelanggan}
                    </span>
                  </div>
                </div>

                {/* SVG Visual Trend Chart */}
                {meterHistory && meterHistory.length >= 2 ? (
                  <div className="space-y-3">
                    <div className="h-64 w-full relative pt-6 pb-2">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="border-b border-slate-400 w-full"></div>
                        <div className="border-b border-slate-400 w-full"></div>
                        <div className="border-b border-slate-400 w-full"></div>
                        <div className="border-b border-slate-400 w-full"></div>
                      </div>

                      {/* Bar and Line Columns */}
                      <div className="h-full flex items-end justify-between gap-1 sm:gap-2 relative z-10 px-2">
                        {meterHistory.map((m, idx) => {
                          const heightPercent = Math.min(100, Math.max(10, (m.pemakaianM3 / maxUsage) * 100));
                          const isLatest = idx === meterHistory.length - 1;
                          return (
                            <div key={m.bulan} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                              {/* Tooltip on hover */}
                              <div className="opacity-0 group-hover:opacity-100 transition duration-150 absolute -top-8 bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap shadow-lg pointer-events-none z-20">
                                {m.bulan}: {m.pemakaianM3} m³ (Rp {m.biayaPemakaianAir.toLocaleString('id-ID')})
                              </div>

                              <span className="text-[10px] font-mono font-bold text-slate-600 group-hover:text-[#005DAA]">
                                {m.pemakaianM3}
                              </span>

                              <div
                                style={{ height: `${heightPercent}%` }}
                                className={`w-full max-w-[32px] rounded-t-lg transition-all duration-300 ${
                                  isLatest
                                    ? 'bg-linear-to-t from-[#005DAA] to-[#F37021] shadow-xs'
                                    : 'bg-linear-to-t from-blue-400 to-sky-300 group-hover:from-blue-600 group-hover:to-blue-400'
                                }`}
                              />

                              <span className="text-[9px] font-medium text-slate-500 truncate max-w-[36px] sm:max-w-none text-center">
                                {m.bulan.split(' ')[0].slice(0, 3)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-blue-400"></span>
                        <span>Pemakaian Air Bulanan (m³)</span>
                        <span className="w-3 h-3 rounded bg-[#F37021] ml-2"></span>
                        <span>Bulan Berjalan ({currentBill.periodeBulan})</span>
                      </div>
                      <span className="font-mono font-semibold text-slate-700">
                        Rata-rata: {(meterHistory.reduce((s, c) => s + c.pemakaianM3, 0) / meterHistory.length).toFixed(1)} m³/bulan
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                    <BarChart3 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">Belum tersedia data pemakaian yang cukup untuk menampilkan grafik.</p>
                    <p className="text-xs text-slate-400 mt-1">Data historis pemakaian air akan terbentuk seiring berjalannya pembacaan stand meter bulanan.</p>
                  </div>
                )}
              </div>

              {/* Table Stand Meter Histori (12 Bulan) */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Droplets className="w-5 h-5 text-[#005DAA]" />
                  <h3 className="font-bold text-base text-slate-900">
                    Tabel Histori Stand Meter 1 Tahun Terakhir
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Periode Bulan</th>
                        <th className="py-3 px-4">Stand Meter Lalu</th>
                        <th className="py-3 px-4">Stand Meter Kini</th>
                        <th className="py-3 px-4 text-center">Pemakaian Air</th>
                        <th className="py-3 px-4 text-right">Biaya Pemakaian</th>
                        <th className="py-3 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {meterHistory.map((row) => (
                        <tr key={row.bulan} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {row.bulan}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600">
                            {row.standLalu.toLocaleString('id-ID')} m³
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                            {row.standKini.toLocaleString('id-ID')} m³
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="font-mono font-black text-[#005DAA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {row.pemakaianM3} m³
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                            Rp {row.biayaPemakaianAir.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                row.status === 'LUNAS'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty / Not Found State */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <Search className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Data Tagihan Tidak Ditemukan
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tidak ada data tagihan untuk ID Pelanggan <strong className="font-mono text-slate-800">"{activeQuery}"</strong>. Pastikan nomor ID Pelanggan yang Anda masukkan sudah benar.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchId('10842918');
                setActiveQuery('10842918');
              }}
              className="px-4 py-2 bg-blue-50 text-[#005DAA] rounded-xl text-xs font-bold hover:bg-blue-100 transition cursor-pointer"
            >
              Coba ID Demo #10842918
            </button>

            {onNavigateToRegister && (
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="px-4 py-2 bg-[#005DAA] text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition cursor-pointer"
              >
                Daftar Sambungan Baru
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* UPLOAD PAYMENT PROOF MODAL (TAGIHAN BULANAN)              */}
      {/* ========================================================= */}
      {isUploadProofModalOpen && currentBill && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-blue-100 overflow-hidden my-auto animate-in zoom-in-95 duration-150">
            <div className="bg-[#005DAA] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Upload className="w-5 h-5 text-blue-200" />
                <div>
                  <h3 className="font-bold text-sm">Upload Bukti Pembayaran Tagihan</h3>
                  <p className="text-[11px] text-blue-100">
                    ID Pelanggan: {currentBill.idPelanggan} &bull; Periode {currentBill.periodeBulan}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadProofModalOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProof} className="p-6 space-y-4 text-xs">
              <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Tagihan Yang Dibayar</span>
                <div className="font-mono text-xl font-black text-[#005DAA]">
                  Rp {currentBill.totalTagihan.toLocaleString('id-ID')}
                </div>
                <span className="text-[11px] text-slate-600 block">
                  Nama Pelanggan: <strong>{currentBill.nama}</strong>
                </span>
              </div>

              {/* Channel Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kanal Pembayaran Resmi Yang Digunakan
                </label>
                <select
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#005DAA]"
                >
                  {OFFICIAL_PAYMENT_CHANNELS.map((ch) => (
                    <option key={ch.id} value={ch.name}>
                      {ch.name} ({ch.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload File Input */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Foto / Dokumen Bukti Transaksi (Struk / Screenshot M-Banking) <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:bg-slate-50 transition cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    required={!proofFile}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {proofFile ? (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-xl border border-slate-200 mx-auto overflow-hidden bg-white shadow-xs">
                        <img src={proofFile.dataUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{proofFile.name} ({proofFile.size})</span>
                      </div>
                      <span className="text-[10px] text-blue-600 underline">Klik untuk ganti file</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="font-bold text-slate-700">Klik atau seret foto bukti pembayaran ke sini</div>
                      <div className="text-[10px] text-slate-400">Mendukung format JPG, PNG, atau PDF (Maks. 5MB)</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  value={proofNotes}
                  onChange={(e) => setProofNotes(e.target.value)}
                  placeholder="Contoh: Dibayar via m-BCA jam 10.30 WIB"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#005DAA]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadProofModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!proofFile || isSubmittingProof}
                  className="px-5 py-2 rounded-xl bg-[#005DAA] hover:bg-[#004B8A] text-white font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingProof ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {viewingReceiptImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setViewingReceiptImage(null)}
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden p-2">
            <button
              onClick={() => setViewingReceiptImage(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={viewingReceiptImage} alt="Bukti Pembayaran Penuh" className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
