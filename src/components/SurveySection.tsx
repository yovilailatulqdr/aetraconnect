import React, { useState, useMemo } from 'react';
import { SurveySubmission, SurveyType } from '../types';
import { AETRA_SERVICE_AREAS } from '../data/serviceAreas';
import { 
  Star, 
  Smile, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare, 
  AlertCircle, 
  MapPin, 
  Droplets, 
  Layers, 
  Wrench, 
  Headphones, 
  Gauge, 
  Receipt,
  ClipboardCheck,
  Sparkles,
  ShieldCheck,
  Check,
  User
} from 'lucide-react';

interface SurveySectionProps {
  submissions: SurveySubmission[];
  onSubmitSurvey: (survey: SurveySubmission) => void;
  currentUser?: {
    idPelanggan?: string;
    nama?: string;
    role?: string;
    email?: string;
  } | null;
}

interface QuestionDef {
  id: number;
  key: string;
  text: string;
}

interface CategoryDef {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
  questions: QuestionDef[];
}

// 8 Pertanyaan Relevan untuk Survey Kepuasan Pemasangan Sambungan Baru
const NEW_CONNECTION_QUESTIONS: QuestionDef[] = [
  { id: 1, key: 'q1_kemudahan_daftar', text: 'Kemudahan dan kejelasan pengisian formulir pendaftaran online sambungan baru' },
  { id: 2, key: 'q2_kejelasan_biaya', text: 'Kejelasan informasi persyaratan berkas serta transparansi rincian biaya sambungan' },
  { id: 3, key: 'q3_kecepatan_verifikasi', text: 'Kecepatan respon petugas dalam memverifikasi data dan penerbitan nomor pembayaran' },
  { id: 4, key: 'q4_petugas_survey', text: 'Sikap, keramahan, dan penjelasan teknis oleh petugas surveyor saat survey lokasi' },
  { id: 5, key: 'q5_waktu_tunggu', text: 'Ketepatan waktu dan kecepatan dari proses mendaftar hingga pemasangan fisik pipa & meter air' },
  { id: 6, key: 'q6_kualitas_pekerjaan', text: 'Kerapian pekerjaan penggalian, penyambungan pipa dinas, dan penutupan kembali oleh teknisi' },
  { id: 7, key: 'q7_kualitas_instalasi', text: 'Kualitas instalasi water meter, segel resmi, serta kelancaran air bersih pertama kali mengalir' },
  { id: 8, key: 'q8_kepuasan_keseluruhan', text: 'Tingkat kepuasan menyeluruh terhadap alur dan pelayanan pemasangan sambungan baru Aetra Connect' },
];

// 18 Pertanyaan Survey Kepuasan Pelanggan Rutin (7 Kategori)
const REGULAR_SURVEY_CATEGORIES: CategoryDef[] = [
  {
    name: 'Kualitas',
    icon: Droplets,
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    questions: [
      { id: 1, key: 'q1_kualitas_syarat', text: 'Kualitas air minum yang didistribusikan memenuhi syarat yang dibutuhkan' },
      { id: 2, key: 'q2_kualitas_warna', text: 'Warna/kejernihan air sesuai dengan syarat yang dibutuhkan' },
      { id: 3, key: 'q3_kualitas_bau', text: 'Tidak ada bau selain klorin/kaporit dalam air' },
    ],
  },
  {
    name: 'Kuantitas',
    icon: Layers,
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    questions: [
      { id: 4, key: 'q4_kuantitas_24jam', text: 'Air mengalir 24 jam atau air lancar sepanjang hari' },
      { id: 5, key: 'q5_kuantitas_volume', text: 'Jumlah/volume air yang diterima sesuai dengan kebutuhan' },
    ],
  },
  {
    name: 'Kontinuitas',
    icon: TrendingUp,
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    questions: [
      { id: 6, key: 'q6_kontinuitas_tekanan', text: 'Tekanan air yang diterima sesuai dengan yang diharapkan' },
      { id: 7, key: 'q7_kontinuitas_penurunan', text: 'Penurunan tekanan air akibat gangguan masih dapat ditoleransi' },
    ],
  },
  {
    name: 'Pelayanan Teknis',
    icon: Wrench,
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    questions: [
      { id: 8, key: 'q8_teknis_kecepatan', text: 'Kecepatan Aetra Connect dalam merespon jika terjadi gangguan' },
      { id: 9, key: 'q9_teknis_sikap', text: 'Sikap dan perilaku petugas dalam berkoordinasi di lapangan' },
    ],
  },
  {
    name: 'Pelayanan Keluhan Pelanggan',
    icon: Headphones,
    badgeColor: 'bg-violet-50 text-violet-800 border-violet-200',
    questions: [
      { id: 10, key: 'q10_keluhan_ramah', text: 'Petugas menjelaskan layanan dengan ramah, baik, benar' },
      { id: 11, key: 'q11_keluhan_cepat', text: 'Petugas merespon keluhan pelanggan dengan cepat, baik, benar' },
      { id: 12, key: 'q12_keluhan_komunikasi', text: 'Petugas berkomunikasi dengan pelanggan secara baik dan benar' },
    ],
  },
  {
    name: 'Meter Reading',
    icon: Gauge,
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    questions: [
      { id: 13, key: 'q13_meter_ramah', text: 'Petugas Pembaca Meter ramah dan sopan' },
      { id: 14, key: 'q14_meter_tanggap', text: 'Petugas Pembaca Meter tanggap terhadap informasi yang diminta pelanggan' },
      { id: 15, key: 'q15_meter_akurat', text: 'Hasil pembacaan meter akurat' },
    ],
  },
  {
    name: 'Tagihan',
    icon: Receipt,
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    questions: [
      { id: 16, key: 'q16_tagihan_alamat', text: 'Alamat pelanggan di rekening tagihan tepat' },
      { id: 17, key: 'q17_tagihan_m3', text: 'Tagihan dengan pemakaian air (m3) sesuai' },
      { id: 18, key: 'q18_tagihan_pilihan', text: 'Tersedia pilihan cara pembayaran' },
    ],
  },
];

export const SurveySection: React.FC<SurveySectionProps> = ({ submissions, onSubmitSurvey, currentUser }) => {
  // Active Survey Type Option: 'new_connection' | 'regular_customer'
  const [selectedSurveyType, setSelectedSurveyType] = useState<SurveyType>('new_connection');

  // Form State
  const [formState, setFormState] = useState({
    komentar: '',
    ratings: {} as Record<number, number>,
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [filterWilayah, setFilterWilayah] = useState<string>('Semua');

  // Customer identity resolution from account
  const customerAccountName = currentUser?.nama || 'Pelanggan Terdaftar Aetra';
  const customerAccountId = currentUser?.idPelanggan || '10842918';
  const customerKecamatan = (currentUser as any)?.kecamatan || (currentUser as any)?.kecamatanPasang || 'Cikupa';
  const customerDesa = (currentUser as any)?.desa || (currentUser as any)?.kelurahan || (currentUser as any)?.kelurahanPasang || 'Cikupa';

  // One-time only submission state for Sambungan Baru
  const [hasSubmittedNewConnectionLocal, setHasSubmittedNewConnectionLocal] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('aetra_has_submitted_new_conn_survey');
      return stored === 'true';
    } catch {
      return false;
    }
  });

  // Check if current user or submission has already recorded new connection survey
  const alreadyFilledNewConnection = useMemo(() => {
    if (hasSubmittedNewConnectionLocal) return true;
    const userIdentifier = (currentUser?.idPelanggan || customerAccountId || '').trim().toLowerCase();
    if (userIdentifier) {
      return submissions.some(
        (s) =>
          s.surveyType === 'new_connection' &&
          s.noPelangganOrSr &&
          s.noPelangganOrSr.trim().toLowerCase() === userIdentifier
      );
    }
    return false;
  }, [hasSubmittedNewConnectionLocal, submissions, currentUser, customerAccountId]);

  // Handle star rating click
  const handleRatingChange = (questionId: number, value: number) => {
    setFormState((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [questionId]: value,
      },
    }));
  };

  // Selected kecamatan for Desa dropdown
  const currentArea = AETRA_SERVICE_AREAS.find((a) => a.kecamatan === customerKecamatan) || AETRA_SERVICE_AREAS[0];

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const totalQuestions = selectedSurveyType === 'new_connection' ? 8 : 18;

    // Check all questions for active survey type
    const missingQuestions: number[] = [];
    for (let i = 1; i <= totalQuestions; i++) {
      if (!formState.ratings[i] || formState.ratings[i] < 1) {
        missingQuestions.push(i);
      }
    }

    if (missingQuestions.length > 0) {
      setValidationError(
        `Mohon berikan penilaian bintang (1 - 5) untuk seluruh ${totalQuestions} butir pertanyaan. Pertanyaan belum diisi: No. ${missingQuestions.join(', ')}`
      );
      return;
    }

    // Calculate averages
    const allVals = Object.values(formState.ratings);
    const overallAvg = allVals.length > 0 ? Number((allVals.reduce((a, b) => a + b, 0) / allVals.length).toFixed(1)) : 5;
    const r = formState.ratings;

    let newSurvey: SurveySubmission;

    if (selectedSurveyType === 'new_connection') {
      newSurvey = {
        id: 'srv-nc-' + Date.now(),
        surveyType: 'new_connection',
        tipeSurveyLabel: 'Survey Kepuasan Pemasangan Sambungan Baru',
        nama: customerAccountName,
        noPelangganOrSr: customerAccountId,
        kelurahan: customerDesa,
        kecamatan: customerKecamatan,
        desa: customerDesa,
        newConnectionRatings: {
          q1_kemudahan_daftar: r[1],
          q2_kejelasan_biaya: r[2],
          q3_kecepatan_verifikasi: r[3],
          q4_petugas_survey: r[4],
          q5_waktu_tunggu: r[5],
          q6_kualitas_pekerjaan: r[6],
          q7_kualitas_instalasi: r[7],
          q8_kepuasan_keseluruhan: r[8],
        },
        csatOverall: overallAvg,
        npsScore: overallAvg >= 4.5 ? 10 : overallAvg >= 3.5 ? 8 : 6,
        komentar: formState.komentar.trim() || 'Proses pendaftaran dan pemasangan pipa dinas sangat cepat dan memuaskan.',
        kategoriMasukan: overallAvg >= 4 ? 'Puas' : overallAvg >= 3 ? 'Apresiasi Petugas' : 'Perlu Perbaikan Air',
        createdAt: new Date().toISOString(),
      };

      // Mark that new connection survey has been submitted (1x only)
      setHasSubmittedNewConnectionLocal(true);
      try {
        localStorage.setItem('aetra_has_submitted_new_conn_survey', 'true');
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }
    } else {
      newSurvey = {
        id: 'srv-reg-' + Date.now(),
        surveyType: 'regular_customer',
        tipeSurveyLabel: 'Survey Kepuasan Pelanggan Rutin',
        nama: customerAccountName,
        noPelangganOrSr: customerAccountId,
        kelurahan: customerDesa,
        kecamatan: customerKecamatan,
        desa: customerDesa,
        q1_kualitas_syarat: r[1],
        q2_kualitas_warna: r[2],
        q3_kualitas_bau: r[3],
        q4_kuantitas_24jam: r[4],
        q5_kuantitas_volume: r[5],
        q6_kontinuitas_tekanan: r[6],
        q7_kontinuitas_penurunan: r[7],
        q8_teknis_kecepatan: r[8],
        q9_teknis_sikap: r[9],
        q10_keluhan_ramah: r[10],
        q11_keluhan_cepat: r[11],
        q12_keluhan_komunikasi: r[12],
        q13_meter_ramah: r[13],
        q14_meter_tanggap: r[14],
        q15_meter_akurat: r[15],
        q16_tagihan_alamat: r[16],
        q17_tagihan_m3: r[17],
        q18_tagihan_pilihan: r[18],
        kualitasAir: Math.round(((r[1] + r[2] + r[3]) / 3)),
        kontinuitasAliran: Math.round(((r[6] + r[7]) / 2)),
        kecepatanPelayanan: Math.round(((r[8] + r[11]) / 2)),
        kemudahanTagihan: Math.round(((r[16] + r[17] + r[18]) / 3)),
        profesionalismePetugas: Math.round(((r[9] + r[10] + r[12] + r[13] + r[14]) / 5)),
        csatOverall: overallAvg,
        npsScore: overallAvg >= 4 ? 9 : 7,
        komentar: formState.komentar.trim() || 'Pelayanan memuaskan dan air lancar.',
        kategoriMasukan: overallAvg >= 4 ? 'Puas' : overallAvg >= 3 ? 'Perlu Perbaikan Air' : 'Keluhan Tekanan',
        createdAt: new Date().toISOString(),
      };
    }

    onSubmitSurvey(newSurvey);
    setSubmittedSuccess(true);
    setValidationError(null);

    // Reset ratings & comments
    setFormState((prev) => ({
      ...prev,
      komentar: '',
      ratings: {},
    }));

    setTimeout(() => setSubmittedSuccess(false), 5000);
  };

  // Filtered submissions for display in Verified Customer Feed
  const filteredSubmissions = submissions.filter((sub) => {
    if (filterWilayah === 'Semua') return true;
    return (
      sub.kelurahan.toLowerCase().includes(filterWilayah.toLowerCase()) ||
      (sub.kecamatan && sub.kecamatan.toLowerCase().includes(filterWilayah.toLowerCase())) ||
      (sub.desa && sub.desa.toLowerCase().includes(filterWilayah.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner (Cleaned - stats & index cards removed) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#005DAA] text-xs font-bold border border-blue-200 mb-1">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Kuesioner Mutu Layanan Aetra Connect</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Survey Kepuasan Pelanggan &amp; Pemasangan Baru
          </h2>
          <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
            Pilih jenis kuesioner evaluasi di bawah ini untuk memberikan penilaian pengalaman layanan Anda secara langsung dan terpercaya.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PILIHAN OPSI SURVEY: SAMBUNGAN BARU VS PELANGGAN RUTIN    */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Option 1: Survey Kepuasan Pemasangan Sambungan Baru */}
        <div
          onClick={() => {
            setSelectedSurveyType('new_connection');
            setFormState((prev) => ({ ...prev, ratings: {} }));
            setValidationError(null);
          }}
          className={`p-5 rounded-3xl border-2 transition cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            selectedSurveyType === 'new_connection'
              ? 'bg-blue-50/70 border-[#005DAA] shadow-md ring-2 ring-blue-500/20'
              : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/60 shadow-xs'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#005DAA] text-white flex items-center justify-center shadow-xs">
                <Wrench className="w-5 h-5" />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                alreadyFilledNewConnection
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {alreadyFilledNewConnection ? '✓ Sudah Diisi (1x)' : 'Khusus Pemasangan Baru (1x)'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">
                Survey Kepuasan Pemasangan Sambungan Baru
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Evaluasi tahapan pendaftaran online, respon verifikasi berkas, keramahan surveyor, ketepatan waktu pasang, hingga kelancaran meter air terpasang (8 butir pertanyaan).
              </p>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-blue-200/60 flex items-center justify-between text-xs">
            <span className="font-bold text-[#005DAA]">8 Pertanyaan Relevan</span>
            <span className={`font-bold ${selectedSurveyType === 'new_connection' ? 'text-[#005DAA]' : 'text-slate-400'}`}>
              {selectedSurveyType === 'new_connection' ? '● Sedang Aktif' : 'Pilih Opsi Ini →'}
            </span>
          </div>
        </div>

        {/* Option 2: Survey Kepuasan Pelanggan (Rutin) */}
        <div
          onClick={() => {
            setSelectedSurveyType('regular_customer');
            setFormState((prev) => ({ ...prev, ratings: {} }));
            setValidationError(null);
          }}
          className={`p-5 rounded-3xl border-2 transition cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            selectedSurveyType === 'regular_customer'
              ? 'bg-teal-50/70 border-teal-600 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-slate-50/60 shadow-xs'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-300">
                Pelanggan Aktif / Rutin
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">
                Survey Kepuasan Pelanggan (Layanan Air Bersih)
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Kuesioner evaluasi mutu air (kualitas, kuantitas 24 jam, kontinuitas tekanan), petugas pembaca meter, penanganan keluhan, serta kemudahan pembayaran tagihan (18 butir pertanyaan).
              </p>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-teal-200/60 flex items-center justify-between text-xs">
            <span className="font-bold text-teal-700">18 Pertanyaan (7 Kategori)</span>
            <span className={`font-bold ${selectedSurveyType === 'regular_customer' ? 'text-teal-700' : 'text-slate-400'}`}>
              {selectedSurveyType === 'regular_customer' ? '● Sedang Aktif' : 'Pilih Opsi Ini →'}
            </span>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {submittedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4.5 flex items-center gap-3 text-xs text-emerald-900 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong>Terima kasih atas penilaian Anda!</strong> Seluruh jawaban survey kepuasan Anda telah berhasil tersimpan dan disinkronkan ke database portal admin untuk evaluasi peningkatan mutu layanan Aetra Connect.
          </div>
        </div>
      )}

      {/* Validation Error Message */}
      {validationError && (
        <div className="bg-red-50 border border-red-300 rounded-2xl p-4.5 flex items-center gap-3 text-xs text-red-900 animate-in fade-in shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <strong>Mohon Perhatian:</strong> {validationError}
          </div>
        </div>
      )}

      {/* Main Grid: Form on Left (8 cols), Verified Reviews Feed on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* FORM CONTAINER                                            */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          {/* Header of Active Form */}
          <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${selectedSurveyType === 'new_connection' ? 'bg-[#005DAA]' : 'bg-teal-600'}`}></span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
                  {selectedSurveyType === 'new_connection'
                    ? 'Formulir Survey Kepuasan Pemasangan Sambungan Baru (8 Butir)'
                    : 'Formulir Survey Kepuasan Pelanggan Rutin (18 Butir)'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Berikan penilaian bintang 1 sampai 5 (1 = Sangat Tidak Puas / Sangat Lambat, 5 = Sangat Puas / Sangat Baik)
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
              Skala 1 - 5 Bintang
            </span>
          </div>

          {/* IF Sambungan Baru is already submitted by user (1x limit) */}
          {selectedSurveyType === 'new_connection' && alreadyFilledNewConnection ? (
            <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-3xl p-6 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="font-black text-base text-emerald-950">
                  Anda Telah Mengisi Survey Pemasangan Sambungan Baru
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Terima kasih atas partisipasi Anda! Data kuesioner kepuasan pemasangan sambungan baru Anda telah tercatat rapi di sistem kami.
                </p>
                <div className="pt-2 text-[11px] text-emerald-700 font-semibold">
                  *Sesuai ketentuan, survey kepuasan pemasangan sambungan baru hanya perlu diisi 1 kali per sambungan.
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSurveyType('regular_customer')}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Droplets className="w-4 h-4" />
                  <span>Isi Survey Kepuasan Pelanggan Rutin (Layanan Air)</span>
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Identitas Akun Pelanggan (Otomatis Melekat) */}
              <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#005DAA] flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{customerAccountName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Identitas Otomatis Terhubung
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      No. ID Pelanggan / SR: <span className="font-mono font-bold text-slate-800">{customerAccountId}</span> &bull; Wilayah: <span className="font-semibold text-slate-700">Kec. {customerKecamatan}, Desa {customerDesa}</span>
                    </p>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 italic bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  Data survei otomatis tersimpan ke akun Anda
                </div>
              </div>

              {/* QUESTIONS RENDER: SAMBUNGAN BARU (8 BUTIR) vs REGULAR (18 BUTIR) */}
              {selectedSurveyType === 'new_connection' ? (
                /* 8 Pertanyaan Sambungan Baru */
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <div className="bg-blue-50/70 px-4 py-3 border-b border-blue-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#005DAA]" />
                      <span className="font-black text-slate-900 text-xs uppercase tracking-wide">
                        8 Butir Evaluasi Proses Pendaftaran &amp; Pemasangan Baru
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                      8 Pertanyaan
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 bg-white">
                    {NEW_CONNECTION_QUESTIONS.map((q) => {
                      const currentRating = formState.ratings[q.id] || 0;
                      return (
                        <div key={q.id} className="p-4 sm:p-4.5 hover:bg-slate-50/50 transition">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-start gap-2.5 max-w-xl">
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#005DAA] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                {q.id}
                              </span>
                              <span className="text-xs font-semibold text-slate-800 leading-snug">
                                {q.text} <span className="text-red-500">*</span>
                              </span>
                            </div>

                            {/* Star Buttons 1 - 5 */}
                            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 pl-7 md:pl-0">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => handleRatingChange(q.id, star)}
                                  className="p-1 hover:scale-110 transition focus:outline-hidden cursor-pointer"
                                  title={`Nilai ${star} dari 5`}
                                >
                                  <Star
                                    className={`w-6 h-6 transition ${
                                      currentRating > 0 && star <= currentRating
                                        ? 'text-amber-400 fill-amber-400'
                                        : 'text-slate-300 hover:text-amber-300'
                                    }`}
                                  />
                                </button>
                              ))}
                              <span className="text-xs font-bold font-mono ml-2 min-w-[50px] text-right">
                                {currentRating > 0 ? (
                                  <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                    {currentRating} / 5
                                  </span>
                                ) : (
                                  <span className="text-slate-400 font-normal italic text-[10px]">
                                    Pilih
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* 18 Pertanyaan Survey Pelanggan Rutin (7 Kategori) */
                <div className="space-y-5">
                  {REGULAR_SURVEY_CATEGORIES.map((cat) => (
                    <div key={cat.name} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                            <cat.icon className="w-4 h-4 text-[#0055A5]" />
                          </span>
                          <span className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                            {cat.name}
                          </span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cat.badgeColor}`}>
                          {cat.questions.length} Pertanyaan
                        </span>
                      </div>

                      <div className="divide-y divide-slate-100 bg-white">
                        {cat.questions.map((q) => {
                          const currentRating = formState.ratings[q.id] || 0;
                          return (
                            <div key={q.id} className="p-4 sm:p-4.5 hover:bg-slate-50/50 transition">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="flex items-start gap-2.5 max-w-xl">
                                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                                    {q.text} <span className="text-red-500">*</span>
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 pl-7 md:pl-0">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      type="button"
                                      key={star}
                                      onClick={() => handleRatingChange(q.id, star)}
                                      className="p-1 hover:scale-110 transition focus:outline-hidden cursor-pointer"
                                      title={`Nilai ${star} dari 5`}
                                    >
                                      <Star
                                        className={`w-6 h-6 transition ${
                                          currentRating > 0 && star <= currentRating
                                            ? 'text-amber-400 fill-amber-400'
                                            : 'text-slate-300 hover:text-amber-300'
                                        }`}
                                      />
                                    </button>
                                  ))}
                                  <span className="text-xs font-bold font-mono ml-2 min-w-[50px] text-right">
                                    {currentRating > 0 ? (
                                      <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                        {currentRating} / 5
                                      </span>
                                    ) : (
                                      <span className="text-slate-400 font-normal italic text-[10px]">
                                        Pilih
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Komentar & Saran */}
              <div className="space-y-1.5 text-xs">
                <label className="block font-semibold text-slate-700">
                  {selectedSurveyType === 'new_connection'
                    ? 'Komentar & Saran Terkait Pelayanan Pemasangan Baru'
                    : 'Komentar & Saran Terkait Mutu Air / Pelayanan Rutin'}
                </label>
                <textarea
                  rows={3}
                  value={formState.komentar}
                  onChange={(e) => setFormState({ ...formState, komentar: e.target.value })}
                  placeholder={
                    selectedSurveyType === 'new_connection'
                      ? 'Tuliskan pengalaman Anda saat proses pendaftaran, keramahan petugas survey, dan pemasangan meteran...'
                      : 'Tuliskan pengalaman atau saran Anda untuk perbaikan mutu air atau petugas di lingkungan Anda...'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition cursor-pointer ${
                  selectedSurveyType === 'new_connection'
                    ? 'bg-[#005DAA] hover:bg-[#004A88] shadow-blue-500/20'
                    : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {selectedSurveyType === 'new_connection'
                    ? 'Kirim Penilaian Survey Pemasangan Sambungan Baru'
                    : 'Kirim Penilaian Survey Kepuasan Pelanggan (18 Pertanyaan)'}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* ========================================================= */}
        {/* LIVE CUSTOMER FEEDBACK & REVIEWS (RIGHT COLUMN)           */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#005DAA]" />
                <h4 className="text-xs font-bold text-slate-900 uppercase">
                  Ulasan Pelanggan Terverifikasi
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {filteredSubmissions.length} Ulasan
              </span>
            </div>

            {/* Filter Wilayah */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Filter Wilayah Kecamatan / Desa:
              </label>
              <select
                value={filterWilayah}
                onChange={(e) => setFilterWilayah(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden"
              >
                <option value="Semua">Semua Wilayah Pelayanan</option>
                {AETRA_SERVICE_AREAS.map((a) => (
                  <optgroup key={`feed-group-${a.kecamatan}`} label={`KECAMATAN ${a.kecamatan}`}>
                    <option key={`feed-kec-${a.kecamatan}`} value={a.kecamatan}>Kecamatan {a.kecamatan} (Semua Desa)</option>
                    {a.desaList.map((d, dIdx) => (
                      <option key={`feed-desa-${a.kecamatan}-${d}-${dIdx}`} value={d}>
                        &nbsp;&nbsp;Desa {d}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Feed List */}
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {filteredSubmissions.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                  Belum ada ulasan untuk wilayah yang dipilih.
                </div>
              ) : (
                filteredSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{sub.nama}</span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-xs">{sub.csatOverall || 5}/5</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                      <span>Desa {sub.desa || sub.kelurahan}</span>
                      {sub.kecamatan && <span>&bull; Kec. {sub.kecamatan}</span>}
                    </div>

                    {/* Survey Type Tag */}
                    <div>
                      {sub.surveyType === 'new_connection' ? (
                        <span className="inline-block text-[9px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full border border-blue-200">
                          Sambungan Baru
                        </span>
                      ) : (
                        <span className="inline-block text-[9px] font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full border border-teal-200">
                          Pelanggan Rutin
                        </span>
                      )}
                    </div>

                    {sub.komentar && (
                      <p className="text-[11px] text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                        &ldquo;{sub.komentar}&rdquo;
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>{sub.kategoriMasukan || 'Puas'}</span>
                      <span>{new Date(sub.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
