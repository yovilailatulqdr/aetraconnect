import React, { useState, useEffect, useMemo } from 'react';
import { RegistrationFormData, UploadedDoc, PropertyPhoto, UserAccount, PaymentProofData } from '../types';
import { AetraLogo } from './AetraLogo';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  MapPin, 
  User, 
  Camera, 
  Home, 
  Upload, 
  Trash2, 
  Check, 
  ShieldCheck, 
  Info, 
  ArrowRight, 
  ArrowLeft, 
  CheckCheck, 
  Compass, 
  Clock, 
  Copy,
  Lock,
  CreditCard,
  Send,
  ReceiptText,
  Sparkles,
  ExternalLink,
  Layers,
  FileCheck,
  CheckSquare,
  Square,
  ScrollText,
  Scale,
  BookOpen
} from 'lucide-react';
import { CameraCaptureModal } from './CameraCaptureModal';
import { InteractiveMapPicker } from './InteractiveMapPicker';
import { calculateDomesticTariff } from '../data/domesticTariffs';
import { INDONESIA_PROVINCES_DATA, AETRA_TANGERANG_INSTALLATION_REGIONS } from '../data/indonesiaRegions';
import { BuildingEnvironmentFields } from './BuildingEnvironmentFields';
import { PetugasOfficerFields } from './PetugasOfficerFields';
import { DomesticTariffResultCard } from './DomesticTariffResultCard';
import { PropertyPhotosSection } from './PropertyPhotosSection';
import { saveRegistrationToDb } from '../services/supabaseService';
import { calculateNextSrNumber } from '../utils/srGenerator';
import { AETRA_PAYMENT_CHANNELS } from '../data/paymentChannels';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';
import { compressImageDataUrl } from '../utils/imageCompressor';

export const SOSIAL_OPTIONS = [
  'Tempat Ibadah (Masjid / Gereja / Vihara / Pura)',
  'Asrama Badan Sosial / Panti Asuhan',
  'Rumah Yatim Piatu',
  'Lembaga Sosial Swasta Non-Komersial',
  'Kran Umum / Hidran Umum',
];

export const INSTANSI_OPTIONS = [
  'Kantor Instansi Pemerintah Daerah',
  'Kantor Dinas / Kementerian',
  'Sekolah / Lembaga Pendidikan Negeri',
  'Puskesmas / Fasilitas Kesehatan Daerah',
  'ABRI (TNI / POLRI)',
  'Kantor Perwakilan Lembaga Negara',
];

export const USAHA_OPTIONS = [
  'Kios / Warung Kelontong',
  'Bengkel Motor / Mobil',
  'Usaha Kecil Dalam Rumah Tangga',
  'Rumah Makan / Kafe / Restoran',
  'Ruko / Toko Niaga / Perkantoran Swasta',
  'Salon / Barbershop',
  'Penjahit / Konveksi',
  'RS Swasta / Klinik / Laboratorium',
  'Pergudangan / Industri Kecil',
];

export const getDraftKey = (user?: UserAccount | null) => {
  if (!user) return 'aetra_draft_guest';
  return `aetra_draft_${user.id || user.idPelanggan || user.email}`;
};

export const getEmptyFormData = (
  user?: UserAccount | null,
  existingList: RegistrationFormData[] = []
): RegistrationFormData => {
  const autoSr = calculateNextSrNumber(existingList);

  return {
    id: 'reg-' + Date.now(),
    noSr: autoSr,
    noForm: Math.floor(100000 + Math.random() * 900000).toString(),
    idPelanggan: '',
    tanggal: new Date().toISOString().split('T')[0],
    namaKtp: user?.nama || '',
    noKtp: '',
    alamatKtp: '',
    rtKtp: '',
    rwKtp: '',
    rtRwKtp: '',
    kecamatanKtp: '',
    desaKtp: '',
    kodePosKtp: '',
    kelurahanKtp: '',
    kotaKtp: '',
    provinsiKtp: '',
    telpHp: user?.telp || '',
    email: user?.email || '',
    alamatPasang: '',
    rtPasang: '',
    rwPasang: '',
    rtRwPasang: '',
    kecamatanPasang: '',
    desaPasang: '',
    kodePosPasang: '',
    kelurahanPasang: '',
    kotaPasang: '',
    provinsiPasang: '',
    pekerjaan: '',
    statusKepemilikan: '',
    statusKepemilikanLainnya: '',
    persyaratan: {
      ktp: false,
      kk: false,
      pbb: false,
      suratDomisili: false,
      suratKuasaSewa: false,
      lainnya: false,
      keteranganLainnya: '',
    },
    persyaratanFiles: {},
    luasTanah: '',
    luasBangunan: '',
    totalLuasBangunan: 0,
    fungsiBangunan: '',
    kondisiBangunan: {
      luasBangunan: '',
      totalLuasBangunan: '',
      jumlahLantai: '',
      jumlahPenghuni: '',
    },
    lingkungan: {
      saluranPembuangan: '',
      sanitasi: '',
      halaman: '',
      lebarJalan: '',
      lingkunganTertata: '',
      realEstate: '',
    },
    dataPasang: {
      namaSales: '',
      tanggalSurvey: '',
      noWorkOrder: '',
      gpsLat: '',
      gpsLong: '',
      namaKontraktor: '',
      dataAlamat: '',
      dataAlamatKoreksi: '',
      dataJaringan: '',
      dataGalian: [],
      luasBangunanSurvey: '',
      kualitasBangunan: '',
      fotoProperti: '',
      diameterPipa: '',
      panjangPipa: '',
      panjangPipaTipe: '',
      materialTambahan: '',
      materialStatus: '',
      tanggalPasangMeter: '',
      noSegel: '',
      noSeriMeter: '',
      namaTeknisi: '',
      telpPetugas: '',
    },
    fotoPropertiFiles: [],
    skemaPembayaran: '',
    keteranganSkema: '',
    biayaSambungan: 1371545,
    golonganTarif: '',
    persetujuan: false,
    trackingStep: 1,
    createdAt: new Date().toISOString(),
  };
};

export type KategoriFungsi = 'rumah_tangga' | 'sosial_instansi' | 'usaha';

interface RegistrationFormProps {
  onRegisterSuccess: (record: RegistrationFormData) => void;
  onNavigateTracking: (noForm: string) => void;
  currentUser?: UserAccount | null;
  existingRegistrations?: RegistrationFormData[];
  onViewReceipt?: (record: RegistrationFormData) => void;
  onUpdateRegistration?: (record: RegistrationFormData) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  onRegisterSuccess, 
  onNavigateTracking,
  currentUser,
  existingRegistrations = [],
  onViewReceipt,
  onUpdateRegistration,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [highestStepReached, setHighestStepReached] = useState<number>(1);

  const [formData, setFormData] = useState<RegistrationFormData>(() => {
    const draftKey = getDraftKey(currentUser);
    try {
      const draftStr = localStorage.getItem(draftKey);
      if (draftStr) {
        const parsed = JSON.parse(draftStr);
        if (parsed && typeof parsed === 'object') {
          return {
            ...getEmptyFormData(currentUser, existingRegistrations),
            ...parsed,
            namaKtp: parsed.namaKtp || currentUser?.nama || '',
            email: parsed.email || currentUser?.email || '',
          };
        }
      }
    } catch (e) {
      console.warn('Error reading draft:', e);
    }
    return getEmptyFormData(currentUser, existingRegistrations);
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationFormData | null>(null);
  const [forceShowForm, setForceShowForm] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [errorFields, setErrorFields] = useState<Record<string, boolean>>({});

  // Silent automatic persistence: saves all form inputs to storage so network loss / browser exit never loses data
  useEffect(() => {
    const draftKey = getDraftKey(currentUser);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify(formData));
        localStorage.setItem('aetra_registration_form_draft', JSON.stringify(formData));
      } catch {
        // silent
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [formData, currentUser]);

  // Terms & Conditions Modal State
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [isTermsRead, setIsTermsRead] = useState<boolean>(false);

  // Payment confirmation form state
  const [paymentProofData, setPaymentProofData] = useState<{
    bank: string;
    tanggalBayar: string;
    catatan: string;
    fileUrl: string;
  }>({
    bank: 'Bank Central Asia (BCA)',
    tanggalBayar: new Date().toISOString().split('T')[0],
    catatan: '',
    fileUrl: '',
  });
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [selectedPaymentTab, setSelectedPaymentTab] = useState<string>('bca');

  const [cameraModalConfig, setCameraModalConfig] = useState<{
    isOpen: boolean;
    targetType: 'document' | 'property' | 'payment';
    docKey?: 'ktp' | 'kk' | 'pbb' | 'suratDomisili' | 'suratKuasaSewa' | 'lainnya';
    propertyCategory?: 'tampak_depan' | 'tampak_samping' | 'rencana_titik_meter';
    title: string;
    guideType?: 'document' | 'property' | 'payment';
  }>({
    isOpen: false,
    targetType: 'document',
    title: 'Kamera Pengambilan Foto',
    guideType: 'document',
  });

  // Calculate active existing registration for current customer robustly
  const activeExistingRegistration = useMemo(() => {
    let pool: RegistrationFormData[] = [];
    if (existingRegistrations && existingRegistrations.length > 0) {
      pool = [...existingRegistrations];
    }
    try {
      const saved = localStorage.getItem('aetra_registrations');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            const idx = pool.findIndex((r) => r.noForm === item.noForm || r.noSr === item.noSr);
            if (idx >= 0) {
              // Fresh props always take precedence over localStorage cache
              pool[idx] = { ...item, ...pool[idx] };
            } else {
              pool.push(item);
            }
          });
        }
      }
    } catch {
      // ignore
    }

    if (submittedRecord) {
      const latest = pool.find((r) => r.noForm === submittedRecord.noForm || r.noSr === submittedRecord.noSr);
      return latest || submittedRecord;
    }

    if (pool.length === 0) return null;

    if (currentUser && currentUser.role !== 'admin') {
      const cleanEmail = currentUser.email?.toLowerCase().trim();
      const cleanId = currentUser.idPelanggan?.trim();

      const match = pool.find((r) => {
        // Direct userId ownership
        if (currentUser.id && (r as any).userId === currentUser.id) return true;
        if (currentUser.userId && (r as any).userId === currentUser.userId) return true;

        // Exact non-empty ID Pelanggan match (for users with confirmed customer IDs)
        if (cleanId && cleanId.length > 5 && r.idPelanggan && r.idPelanggan.trim() === cleanId) return true;

        // Exact non-empty email match
        if (cleanEmail && r.email && r.email.toLowerCase().trim() === cleanEmail) return true;

        return false;
      });

      return match || null;
    }

    return null;
  }, [currentUser, submittedRecord, existingRegistrations]);

  // Sync user profile data into form if new
  useEffect(() => {
    setSubmittedRecord(null);
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        namaKtp: currentUser.nama || '',
        email: currentUser.email || '',
        telpHp: currentUser.telp || '',
      }));
    }
  }, [currentUser?.email, currentUser?.idPelanggan]);

  // Ensure SR number is always assigned automatically if empty
  useEffect(() => {
    if (!formData.noSr) {
      const nextSr = calculateNextSrNumber(existingRegistrations);
      setFormData((prev) => ({ ...prev, noSr: nextSr }));
    }
  }, [existingRegistrations, formData.noSr]);

  // 3 Main Customer Categories: Rumah Tangga, Sosial/Instansi, Usaha/Niaga
  const [kategoriFungsi, setKategoriFungsi] = useState<KategoriFungsi>(() => {
    if (formData.fungsiBangunan) {
      const fb = formData.fungsiBangunan.toLowerCase();
      if (
        fb.includes('sosial') || 
        fb.includes('instansi') || 
        SOSIAL_OPTIONS.some((o) => o.toLowerCase().includes(fb)) ||
        INSTANSI_OPTIONS.some((o) => o.toLowerCase().includes(fb))
      ) {
        return 'sosial_instansi';
      }
      if (fb.includes('usaha') || fb.includes('bisnis') || USAHA_OPTIONS.some((o) => o.toLowerCase().includes(fb))) {
        return 'usaha';
      }
    }
    return 'rumah_tangga';
  });

  // Calculate dynamic tariff result for Rumah Tangga, or fixed category classification for others
  const calculatedTariff = useMemo(() => {
    if (kategoriFungsi === 'sosial_instansi') {
      const isInstansi = INSTANSI_OPTIONS.some((o) => o === formData.fungsiBangunan);
      if (isInstansi) {
        return {
          code: '2B - Instansi' as any,
          name: 'Golongan 2B - Instansi Pemerintah & Militer',
          appliedClause: 'Peruntukan kantor kedinasan, fasilitas pendidikan negeri, puskesmas, dan markas TNI/POLRI.',
          allPoints: ['Instansi pemerintah resmi', 'Tarif standar instansi pelayanan umum'],
          color: 'blue',
        };
      }
      return {
        code: '1 - Sosial' as any,
        name: 'Golongan 1 - Sosial (Fasilitas Sosial & Tempat Ibadah)',
        appliedClause: 'Peruntukan tempat ibadah, asrama sosial, panti asuhan, atau fasilitas sosial nirlaba.',
        allPoints: ['Fasilitas sosial murni', 'Tarif subsidi khusus'],
        color: 'emerald',
      };
    }
    if (kategoriFungsi === 'usaha') {
      return {
        code: '3 - Usaha/Bisnis' as any,
        name: 'Golongan 3 - Usaha / Bisnis Komersial',
        appliedClause: 'Peruntukan kegiatan komersial, perdagangan, pertokoan, ruko, kantor swasta, dan industri mikro.',
        allPoints: ['Kegiatan usaha komersil aktif', 'Tarif niaga resmi Aetra'],
        color: 'amber',
      };
    }

    // Rumah Tangga calculation
    const baseLuas = parseFloat(String(formData.luasBangunan || '0'));
    const floorCount = Math.max(1, parseInt(String(formData.kondisiBangunan?.jumlahLantai || '1'), 10) || 1);
    const totalLuas = baseLuas * floorCount;
    const isRealEstate = formData.lingkungan?.realEstate === 'Ya' || formData.lingkungan?.realEstate === 'Real Estate / Cluster / Komplek';
    const hasUsaha = Boolean(formData.hasUsahaKomersil);

    return calculateDomesticTariff(totalLuas, isRealEstate, hasUsaha);
  }, [formData.luasBangunan, formData.kondisiBangunan?.jumlahLantai, formData.lingkungan?.realEstate, formData.hasUsahaKomersil, formData.fungsiBangunan, kategoriFungsi]);

  useEffect(() => {
    if (calculatedTariff) {
      setFormData((prev) => ({
        ...prev,
        golonganTarif: calculatedTariff.name,
        kategoriTarifKlausul: calculatedTariff.appliedClause,
      }));
    }
  }, [calculatedTariff]);

  // Handle Payment Confirmation & Proof Upload
  const handleConfirmPayment = () => {
    if (!activeExistingRegistration) return;
    if (!paymentProofData.fileUrl) {
      alert('Mohon unggah foto bukti struk pembayaran.');
      return;
    }

    setIsSubmittingPayment(true);
    const proof: PaymentProofData = {
      dataUrl: paymentProofData.fileUrl,
      bank: paymentProofData.bank,
      tanggalBayar: paymentProofData.tanggalBayar,
      catatan: paymentProofData.catatan,
      uploadedAt: new Date().toISOString(),
    };

    const updatedRecord: RegistrationFormData = {
      ...activeExistingRegistration,
      status_pendaftaran: 'PAYMENT_CONFIRMED',
      statusPendaftaran: 'PAYMENT_CONFIRMED',
      statusPembayaran: 'Menunggu Verifikasi Kasir',
      paymentProof: proof,
    };

    try {
      const saved = localStorage.getItem('aetra_registrations');
      const list: RegistrationFormData[] = saved ? JSON.parse(saved) : [];
      const updatedList = list.map((r) => r.noForm === updatedRecord.noForm ? updatedRecord : r);
      localStorage.setItem('aetra_registrations', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }

    saveRegistrationToDb(updatedRecord).catch((e) => console.warn(e));
    if (onUpdateRegistration) {
      onUpdateRegistration(updatedRecord);
    }
    setSubmittedRecord(updatedRecord);
    setIsSubmittingPayment(false);
    setNotification('Bukti pembayaran berhasil dikirim! Sedang diverifikasi oleh Petugas Keuangan & Admin Aetra.');
    setTimeout(() => setNotification(null), 5000);
  };

  // Section Definitions
  const SECTIONS = [
    { number: 1, title: 'Data Diri', subtitle: 'Identitas Pemohon' },
    { number: 2, title: 'Alamat KTP', subtitle: 'Domisili Kependudukan' },
    { number: 3, title: 'Alamat Pasang', subtitle: 'Titik Sambungan Baru' },
    { number: 4, title: 'Upload Dokumen', subtitle: 'KTP, KK & PBB' },
    { number: 5, title: 'Kondisi & Tarif', subtitle: 'Kategori & Golongan Tarif' },
    { number: 6, title: 'Petugas & S&K', subtitle: 'Foto Properti & Persetujuan' },
  ];

  const handleDocUpload = (
    docKey: 'ktp' | 'kk' | 'pbb' | 'suratDomisili' | 'suratKuasaSewa' | 'lainnya',
    e: React.ChangeEvent<HTMLInputElement>,
    source: 'file' | 'camera' = 'file'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const rawUrl = reader.result as string;
      const compressedUrl = await compressImageDataUrl(rawUrl, 640, 0.5);

      const uploadedDoc: UploadedDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        dataUrl: compressedUrl,
        source: source,
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadedAt: new Date().toISOString(),
      };

      setFormData((prev) => ({
        ...prev,
        persyaratan: {
          ...prev.persyaratan,
          [docKey]: true,
        },
        persyaratanFiles: {
          ...prev.persyaratanFiles,
          [docKey]: uploadedDoc,
        },
      }));

      setErrorFields((prev) => ({ ...prev, [docKey + 'Doc']: false }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveDoc = (docKey: 'ktp' | 'kk' | 'pbb' | 'suratDomisili' | 'suratKuasaSewa' | 'lainnya') => {
    setFormData((prev) => {
      const newFiles = { ...prev.persyaratanFiles };
      delete newFiles[docKey];
      return {
        ...prev,
        persyaratan: {
          ...prev.persyaratan,
          [docKey]: false,
        },
        persyaratanFiles: newFiles,
      };
    });
  };

  const handleDirectCameraCapture = async (dataUrl: string) => {
    const compressedUrl = await compressImageDataUrl(dataUrl, 640, 0.5);

    if (cameraModalConfig.targetType === 'payment') {
      setPaymentProofData((prev) => ({ ...prev, fileUrl: compressedUrl }));
      setCameraModalConfig((prev) => ({ ...prev, isOpen: false }));
      return;
    }

    if (cameraModalConfig.targetType === 'property' && cameraModalConfig.propertyCategory) {
      const cat = cameraModalConfig.propertyCategory;
      const newPhoto: PropertyPhoto = {
        id: `prop-${Date.now()}`,
        name: `Foto-${cat.toUpperCase()}-${Date.now()}.jpg`,
        dataUrl: compressedUrl,
        source: 'camera',
        category: cat,
        caption: cat === 'tampak_depan' ? 'Tampak Depan Rumah' : cat === 'tampak_samping' ? 'Tampak Samping / Akses' : 'Rencana Titik Water Meter',
        timestamp: new Date().toISOString(),
      };

      const updated = (formData.fotoPropertiFiles || []).filter((p) => p.category !== cat);
      setFormData((prev) => ({
        ...prev,
        fotoPropertiFiles: [...updated, newPhoto],
      }));
      setCameraModalConfig((prev) => ({ ...prev, isOpen: false }));
      return;
    }

    if (cameraModalConfig.docKey) {
      const docKey = cameraModalConfig.docKey;
      const uploadedDoc: UploadedDoc = {
        id: `doc-${Date.now()}`,
        name: `Kamera-${docKey.toUpperCase()}-${Date.now()}.jpg`,
        dataUrl: compressedUrl,
        source: 'camera',
        type: 'image/jpeg',
        size: '1.2 MB',
        uploadedAt: new Date().toISOString(),
      };

      setFormData((prev) => ({
        ...prev,
        persyaratan: {
          ...prev.persyaratan,
          [docKey]: true,
        },
        persyaratanFiles: {
          ...prev.persyaratanFiles,
          [docKey]: uploadedDoc,
        },
      }));
      setErrorFields((prev) => ({ ...prev, [docKey + 'Doc']: false }));
    }
    setCameraModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const validateCurrentSection = (stepNum: number): boolean => {
    const errors: string[] = [];
    const fields: Record<string, boolean> = {};

    if (stepNum === 1) {
      if (!formData.namaKtp?.trim()) {
        errors.push('Nama Lengkap (Sesuai KTP) wajib diisi');
        fields.namaKtp = true;
      }
      if (!formData.noKtp?.trim()) {
        errors.push('Nomor KTP (NIK 16 Digit) wajib diisi');
        fields.noKtp = true;
      }
      if (!formData.pekerjaan?.trim()) {
        errors.push('Pekerjaan Pemohon wajib diisi');
        fields.pekerjaan = true;
      }
      if (!formData.telpHp?.trim()) {
        errors.push('Nomor HP / WhatsApp aktif wajib diisi');
        fields.telpHp = true;
      }
    } else if (stepNum === 2) {
      if (!formData.alamatKtp?.trim()) {
        errors.push('Alamat Lengkap KTP wajib diisi');
        fields.alamatKtp = true;
      }
      if (!formData.rtKtp?.trim() && !formData.rtRwKtp?.trim()) {
        errors.push('RT KTP wajib diisi');
        fields.rtKtp = true;
      }
      if (!formData.rwKtp?.trim() && !formData.rtRwKtp?.trim()) {
        errors.push('RW KTP wajib diisi');
        fields.rwKtp = true;
      }
      if (!formData.provinsiKtp?.trim()) {
        errors.push('Provinsi KTP wajib dipilih');
        fields.provinsiKtp = true;
      }
      if (!formData.kotaKtp?.trim()) {
        errors.push('Kota / Kabupaten KTP wajib dipilih');
        fields.kotaKtp = true;
      }
      if (!formData.kecamatanKtp?.trim()) {
        errors.push('Kecamatan KTP wajib dipilih');
        fields.kecamatanKtp = true;
      }
      if (!formData.kelurahanKtp?.trim() && !formData.desaKtp?.trim()) {
        errors.push('Kelurahan / Desa KTP wajib dipilih');
        fields.kelurahanKtp = true;
      }
      if (!formData.kodePosKtp?.trim()) {
        errors.push('Kode Pos KTP wajib diisi');
        fields.kodePosKtp = true;
      }
    } else if (stepNum === 3) {
      if (!formData.alamatPasang?.trim()) {
        errors.push('Alamat Lengkap Pemasangan wajib diisi');
        fields.alamatPasang = true;
      }
      if (!formData.rtPasang?.trim() && !formData.rtRwPasang?.trim()) {
        errors.push('RT Pemasangan wajib diisi');
        fields.rtPasang = true;
      }
      if (!formData.rwPasang?.trim() && !formData.rtRwPasang?.trim()) {
        errors.push('RW Pemasangan wajib diisi');
        fields.rwPasang = true;
      }
      if (!formData.kecamatanPasang?.trim()) {
        errors.push('Kecamatan Pemasangan wajib dipilih');
        fields.kecamatanPasang = true;
      }
      if (!formData.kelurahanPasang?.trim() && !formData.desaPasang?.trim()) {
        errors.push('Kelurahan / Desa Pemasangan wajib dipilih');
        fields.kelurahanPasang = true;
      }
      if (!formData.kodePosPasang?.trim()) {
        errors.push('Kode Pos Pemasangan wajib diisi');
        fields.kodePosPasang = true;
      }
    } else if (stepNum === 4) {
      if (!formData.persyaratanFiles?.ktp) {
        errors.push('Foto e-KTP wajib diunggah');
        fields.ktpDoc = true;
      }
    } else if (stepNum === 5) {
      if (kategoriFungsi === 'rumah_tangga') {
        if (!formData.luasBangunan || parseFloat(String(formData.luasBangunan)) <= 0) {
          errors.push('Luas Bangunan (m²) wajib diisi dengan angka valid');
          fields.luasBangunan = true;
        }
        if (!formData.luasTanah || parseFloat(String(formData.luasTanah)) <= 0) {
          errors.push('Luas Tanah (m²) wajib diisi dengan angka valid');
          fields.luasTanah = true;
        }
      } else {
        if (!formData.fungsiBangunan?.trim()) {
          errors.push('Pilihan peruntukan bangunan wajib dipilih');
          fields.fungsiBangunan = true;
        }
      }
    } else if (stepNum === 6) {
      // Step 6 technical validation passed. S&K is shown upon clicking submit button.
    }

    setValidationErrors(errors);
    setErrorFields(fields);
    return errors.length === 0;
  };

  const isAllRequiredFieldsFilled = useMemo(() => {
    const hasName = Boolean(formData.namaKtp?.trim());
    const hasKtp = Boolean(formData.noKtp?.trim());
    const hasTelp = Boolean(formData.telpHp?.trim());
    const hasAlamatKtp = Boolean(formData.alamatKtp?.trim() && (formData.kelurahanKtp?.trim() || formData.desaKtp?.trim()));
    const hasAlamatPasang = Boolean(formData.alamatPasang?.trim() && formData.kecamatanPasang?.trim());
    const hasKtpDoc = Boolean(formData.persyaratanFiles?.ktp);

    let hasCategoryValid = true;
    if (kategoriFungsi === 'rumah_tangga') {
      hasCategoryValid = Boolean(parseFloat(String(formData.luasBangunan || '0')) > 0);
    } else {
      hasCategoryValid = Boolean(formData.fungsiBangunan?.trim());
    }

    return hasName && hasKtp && hasTelp && hasAlamatKtp && hasAlamatPasang && hasKtpDoc && hasCategoryValid;
  }, [formData, kategoriFungsi]);

  const handleNextStep = () => {
    if (!validateCurrentSection(currentStep)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const next = currentStep + 1;
    setCurrentStep(next);
    if (next > highestStepReached) {
      setHighestStepReached(next);
    }
    setValidationErrors([]);
    setErrorFields({});

    const draftKey = getDraftKey(currentUser);
    try {
      localStorage.setItem(draftKey, JSON.stringify(formData));
      setLastSavedTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors([]);
      setErrorFields({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (stepNumber: number) => {
    if (stepNumber <= highestStepReached || stepNumber === currentStep + 1) {
      if (stepNumber > currentStep) {
        if (!validateCurrentSection(currentStep)) return;
      }
      setValidationErrors([]);
      setErrorFields({});
      setCurrentStep(stepNumber);
      if (stepNumber > highestStepReached) {
        setHighestStepReached(stepNumber);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const processRegistration = (currentData = formData) => {
    const noFormVal = currentData.noForm || Math.floor(100000 + Math.random() * 900000).toString();
    const noSrVal = currentData.noSr || calculateNextSrNumber(existingRegistrations);

    const finalizedRecord: RegistrationFormData = {
      ...currentData,
      noForm: noFormVal,
      noSr: noSrVal,
      idPelanggan: '', // Akan diisi admin setelah verifikasi dan pembayaran
      statusPendaftaran: 'VERIFYING',
      status_pendaftaran: 'VERIFYING',
      statusPembayaran: 'Belum Ditagihkan',
      isSkAccepted: true,
      is_sk_accepted: true,
      persetujuan: true,
      trackingStep: 1,
      tanggal: currentData.tanggal || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    onRegisterSuccess(finalizedRecord);
    setSubmittedRecord(finalizedRecord);

    const draftKey = getDraftKey(currentUser);
    try {
      localStorage.removeItem(draftKey);
      localStorage.removeItem('aetra_registration_form_draft');
    } catch {
      // ignore
    }

    setNotification('Pendaftaran Sambungan Baru Berhasil Disimpan! Status: Menunggu Verifikasi Admin.');
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFinalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateCurrentSection(6)) return;
    if (!isAllRequiredFieldsFilled) return;

    // Sesuai permintaan pengguna: munculkan S&K dan checkbox pernyataan ketika klik daftarkan sambungan baru
    setIsTermsModalOpen(true);
  };

  const handleReset = () => {
    if (window.confirm('Kosongkan formulir pendaftaran ini? Semua isian yang belum didaftarkan akan dibersihkan.')) {
      const empty = getEmptyFormData(currentUser, existingRegistrations);
      setFormData(empty);
      setCurrentStep(1);
      setHighestStepReached(1);
      setValidationErrors([]);
      setErrorFields({});
      const draftKey = getDraftKey(currentUser);
      localStorage.removeItem(draftKey);
      setNotification('Formulir berhasil dikosongkan.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const isCompletedStage = Boolean(
    activeExistingRegistration && (activeExistingRegistration.trackingStep || 1) >= 5
  );

  const isApprovedPaymentStage = activeExistingRegistration && !isCompletedStage && (
    activeExistingRegistration.status_pendaftaran === 'WAITING_PAYMENT' ||
    activeExistingRegistration.statusPendaftaran === 'WAITING_PAYMENT' ||
    activeExistingRegistration.status_pendaftaran === 'PAYMENT_CONFIRMED' ||
    activeExistingRegistration.statusPendaftaran === 'PAYMENT_CONFIRMED' ||
    Boolean(activeExistingRegistration.nomorPembayaran)
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-[#005DAA] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 border border-blue-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* POST-REGISTRATION & PAYMENT STATUS CARD                  */}
      {/* ======================================================== */}
      {activeExistingRegistration && !forceShowForm ? (
        isCompletedStage ? (
          /* Profil Pelanggan Aktif */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Pelanggan Aktif Resmi
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Profil Pelanggan Anda
                </h2>
                <p className="text-xs text-slate-500">
                  Data identitas sambungan resmi PT Aetra Air Tangerang. Air bersih telah aktif mengalir ke persil Anda.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateTracking(activeExistingRegistration.noForm)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#005DAA] hover:bg-blue-100 text-xs font-bold transition cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Riwayat Tracking</span>
                </button>
              </div>
            </div>

            {/* Top Cards: ID Pelanggan & Nomor SR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID Pelanggan */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 space-y-1.5">
                <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                  1. ID Pelanggan (Nomor Langganan)
                </span>
                <div className="font-mono text-xl sm:text-2xl font-black text-emerald-950 flex items-center justify-between">
                  <span>{activeExistingRegistration.idPelanggan || ('10' + (activeExistingRegistration.noForm || '123456').replace(/\D/g, '').padEnd(6, '0'))}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(activeExistingRegistration.idPelanggan || ('10' + (activeExistingRegistration.noForm || '123456').replace(/\D/g, '').padEnd(6, '0')));
                      setNotification('ID Pelanggan berhasil disalin!');
                      setTimeout(() => setNotification(null), 2500);
                    }}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition inline-flex items-center gap-1 cursor-pointer"
                    title="Salin ID Pelanggan"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </button>
                </div>
                <span className="text-[11px] text-emerald-700 block pt-0.5 leading-relaxed">
                  Gunakan ID ini untuk pembayaran rekening air setiap bulan di ATM, Mobile Banking, Indomaret, &amp; Alfamart.
                </span>
              </div>

              {/* Nomor SR */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  2. Nomor Registrasi Sambungan (SR)
                </span>
                <div className="font-mono text-xl sm:text-2xl font-black text-[#005DAA]">
                  SR - {activeExistingRegistration.noSr}
                </div>
                <span className="text-[11px] text-slate-500 block pt-0.5 leading-relaxed">
                  Nomor arsip sambungan fisik di jaringan perpipaan Aetra.
                </span>
              </div>
            </div>

            {/* Rincian Lengkap Data Pelanggan: Alamat, Telepon, Email, & Teknis */}
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                <User className="w-4 h-4 text-[#005DAA]" />
                <span>Rincian Data Identitas &amp; Kontak Terdaftar</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Nama Pelanggan */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Nama Lengkap Pemohon</span>
                  <strong className="text-slate-900 font-bold block text-sm">{activeExistingRegistration.namaKtp || '-'}</strong>
                  <span className="text-[11px] text-slate-500 block">NIK: {activeExistingRegistration.noKtp || '-'}</span>
                </div>

                {/* Nomor Telepon / WA */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Nomor Telepon / WhatsApp</span>
                  <strong className="text-emerald-700 font-mono font-bold block text-sm">{activeExistingRegistration.telpHp || currentUser?.telp || '-'}</strong>
                  <span className="text-[11px] text-slate-500 block">Terhubung untuk notifikasi billing &amp; perbaikan</span>
                </div>

                {/* Email Terdaftar */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Terdaftar</span>
                  <strong className="text-slate-900 font-semibold block text-sm">{activeExistingRegistration.email || currentUser?.email || '-'}</strong>
                  <span className="text-[11px] text-slate-500 block">Kanal pengiriman e-struk &amp; informasi resmi</span>
                </div>

                {/* Golongan Tarif */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Golongan Tarif Air</span>
                  <strong className="text-[#005DAA] font-bold block text-sm">{activeExistingRegistration.golonganTarif || '2A1 - Rumah Tangga Standard'}</strong>
                  <span className="text-[11px] text-slate-500 block">Kategori Sambungan Rumah Tangga Aetra</span>
                </div>

                {/* Alamat Pemasangan Sambungan */}
                <div className="md:col-span-2 bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                    <MapPin className="w-3.5 h-3.5 text-[#F37021]" />
                    <span>Alamat Lengkap Lokasi Pemasangan Sambungan Air</span>
                  </div>
                  <div className="text-slate-900 font-semibold text-xs leading-relaxed">
                    {activeExistingRegistration.alamatPasang || '-'}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>RT/RW: <strong>{activeExistingRegistration.rtRwPasang || '-'}</strong></span>
                    <span>&bull;</span>
                    <span>Kelurahan/Desa: <strong>{activeExistingRegistration.kelurahanPasang || activeExistingRegistration.desaPasang || '-'}</strong></span>
                    <span>&bull;</span>
                    <span>Kecamatan: <strong>{activeExistingRegistration.kecamatanPasang || '-'}</strong></span>
                    <span>&bull;</span>
                    <span>Kode Pos: <strong>{activeExistingRegistration.kodePosPasang || '-'}</strong></span>
                  </div>
                </div>

                {/* Data Meter & Segel */}
                <div className="md:col-span-2 bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">No. Seri Meter:</span>
                    <strong className="font-mono text-slate-900 font-bold">{activeExistingRegistration.dataPasang?.noSeriMeter || 'AET-2609-8472'}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">No. Segel Kran:</span>
                    <strong className="font-mono text-slate-900 font-bold">{activeExistingRegistration.dataPasang?.noSegel || 'SGL-AAT-99120'}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Kondisi Aliran:</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Normal &amp; Jernih</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Card Pengajuan Sedang Berjalan & Tahap Pembayaran */
          <div className="bg-white rounded-2xl border-2 border-blue-400 shadow-xl p-6 sm:p-8 space-y-6 animate-in fade-in">
            {/* Main Notice Header */}
            <div className="bg-linear-to-r from-blue-50 via-sky-50 to-amber-50 border border-blue-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-[#005DAA] text-white flex items-center justify-center shadow-md shrink-0 mt-0.5">
                  {isApprovedPaymentStage ? (
                    <CreditCard className="w-7 h-7 text-amber-300" />
                  ) : (
                    <Clock className="w-7 h-7 text-amber-300 animate-pulse" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-black tracking-wider text-white bg-[#005DAA] px-3 py-0.5 rounded-full shadow-2xs">
                      Status Permohonan
                    </span>
                    <span className={`text-[10px] uppercase font-black tracking-wider px-3 py-0.5 rounded-full border ${
                      activeExistingRegistration.statusPembayaran === 'Lunas' || activeExistingRegistration.idPelanggan
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                        : activeExistingRegistration.status_pendaftaran === 'WAITING_PAYMENT' || activeExistingRegistration.statusPendaftaran === 'WAITING_PAYMENT'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                        : activeExistingRegistration.status_pendaftaran === 'PAYMENT_CONFIRMED' || activeExistingRegistration.statusPendaftaran === 'PAYMENT_CONFIRMED'
                        ? 'bg-purple-100 text-purple-900 border-purple-300 font-bold'
                        : 'bg-sky-100 text-[#005DAA] border-sky-300 font-bold'
                    }`}>
                      {activeExistingRegistration.statusPembayaran === 'Lunas' || activeExistingRegistration.idPelanggan
                        ? '✓ Pembayaran Lunas & Terverifikasi'
                        : activeExistingRegistration.status_pendaftaran === 'WAITING_PAYMENT' || activeExistingRegistration.statusPendaftaran === 'WAITING_PAYMENT'
                        ? 'Disetujui / Menunggu Pembayaran'
                        : activeExistingRegistration.status_pendaftaran === 'PAYMENT_CONFIRMED' || activeExistingRegistration.statusPendaftaran === 'PAYMENT_CONFIRMED'
                        ? 'Menunggu Verifikasi Pembayaran'
                        : 'Menunggu Verifikasi Admin'}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {activeExistingRegistration.statusPembayaran === 'Lunas' || activeExistingRegistration.idPelanggan
                      ? `Pembayaran Lunas! ID Pelanggan Resmi: ${activeExistingRegistration.idPelanggan || '10842918'}`
                      : isApprovedPaymentStage
                      ? 'Permohonan Disetujui! Silakan Lakukan Pembayaran Sambungan Baru'
                      : 'Permohonan Sambungan Baru Anda Sedang Dalam Verifikasi Admin'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {activeExistingRegistration.statusPembayaran === 'Lunas' || activeExistingRegistration.idPelanggan
                      ? 'Pembayaran biaya sambungan baru telah diverifikasi Lunas. SPKO telah diteruskan ke tim teknisi lapangan.'
                      : isApprovedPaymentStage
                      ? 'Nomor Pembayaran telah diterbitkan oleh sistem/admin. Silakan lakukan pembayaran dan unggah bukti transfer.'
                      : 'Berkas dan lokasi persil sedang diperiksa oleh Tim Administrasi & Surveyor Aetra. Status akan diperbarui otomatis.'}
                  </p>
                </div>
              </div>

              {/* Live Tracking Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigateTracking(activeExistingRegistration.noForm)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#005DAA] hover:bg-[#004A88] text-white text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-sky-200" />
                  <span>Buka Live Tracking &rarr;</span>
                </button>
              </div>
            </div>

            {/* PAYMENT BOX & PROOF UPLOAD */}
            {isApprovedPaymentStage && (
              <div className="space-y-5">
                {/* Payment Header Banner with SR, ID Pelanggan & Nomor Pembayaran */}
                <div className="bg-linear-to-r from-emerald-600 via-teal-700 to-[#005DAA] text-white rounded-2xl p-6 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-black tracking-wider text-emerald-100 bg-white/20 px-3 py-1 rounded-full">
                          Nomor Pembayaran Resmi Aetra
                        </span>
                        <span className="text-[10px] uppercase font-bold text-amber-200 bg-black/20 px-2.5 py-1 rounded-full font-mono">
                          SR: {activeExistingRegistration.noSr}
                        </span>
                        {activeExistingRegistration.idPelanggan && (
                          <span className="text-[10px] uppercase font-black text-emerald-200 bg-emerald-950/50 px-3 py-1 rounded-full font-mono border border-emerald-300/40">
                            ID PELANGGAN: {activeExistingRegistration.idPelanggan}
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-3xl sm:text-4xl font-black tracking-wider text-amber-200 pt-1">
                        {activeExistingRegistration.nomorPembayaran || ('88290' + activeExistingRegistration.noSr)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(activeExistingRegistration.nomorPembayaran || ('88290' + activeExistingRegistration.noSr));
                        setNotification('Nomor Pembayaran berhasil disalin!');
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-black text-xs hover:bg-emerald-50 shadow-md transition flex items-center justify-center gap-2 cursor-pointer self-start sm:self-center"
                    >
                      <Copy className="w-4 h-4 text-emerald-700" />
                      <span>Salin Nomor Pembayaran</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-blue-50">
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-emerald-200 block font-semibold">Total Biaya Sambungan Baru</span>
                      <strong className="text-lg text-white font-mono font-black">
                        Rp {((activeExistingRegistration.biayaSambungan || 1371545)).toLocaleString('id-ID')}
                      </strong>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-emerald-200 block font-semibold">Batas Waktu Pembayaran</span>
                      <strong className="text-xs text-white">7 Hari Kerja Sejak Persetujuan</strong>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-emerald-200 block font-semibold">Status Pembayaran</span>
                      <strong className="text-xs text-amber-300 font-bold">
                        {activeExistingRegistration.statusPembayaran === 'Lunas' || activeExistingRegistration.idPelanggan
                          ? '✓ Berhasil / Lunas'
                          : activeExistingRegistration.status_pendaftaran === 'PAYMENT_CONFIRMED'
                          ? 'Menunggu Verifikasi Pembayaran'
                          : 'Menunggu Pembayaran'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 9 METODE PEMBAYARAN RESMI AETRA */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#005DAA]" />
                      <span>9 Kanal Pembayaran Resmi Aetra Air Tangerang</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pilih kanal di bawah untuk melihat instruksi dan panduan cara pembayaran:
                    </p>
                  </div>

                  {/* Channel Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {AETRA_PAYMENT_CHANNELS.map((ch) => (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => setSelectedPaymentTab(ch.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer border ${
                          selectedPaymentTab === ch.id
                            ? 'bg-[#005DAA] text-white border-[#005DAA] shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span>{ch.shortName}</span>
                      </button>
                    ))}
                  </div>

                  {/* Selected Channel Instructions */}
                  <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                      <strong className="text-xs font-bold text-[#005DAA]">
                        {(AETRA_PAYMENT_CHANNELS.find((c) => c.id === selectedPaymentTab) || AETRA_PAYMENT_CHANNELS[0]).name}
                      </strong>
                      <span className="text-[10px] text-slate-500">
                        {(AETRA_PAYMENT_CHANNELS.find((c) => c.id === selectedPaymentTab) || AETRA_PAYMENT_CHANNELS[0]).keterangan}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <span className="font-bold text-[11px] text-slate-900 block">Cara Pembayaran:</span>
                      <ol className="list-decimal list-inside space-y-1 text-slate-600">
                        {(AETRA_PAYMENT_CHANNELS.find((c) => c.id === selectedPaymentTab) || AETRA_PAYMENT_CHANNELS[0]).instructions.map((inst, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {inst.replace('Nomor Formulir / Nomor Sambungan (No. Form / No. SR)', `Nomor Pembayaran: ${activeExistingRegistration.nomorPembayaran || ('88290' + activeExistingRegistration.noSr)}`)}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Upload Bukti Pembayaran */}
                <div className="bg-sky-50/70 p-5 rounded-2xl border-2 border-sky-200 space-y-4">
                  <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
                    <ReceiptText className="w-5 h-5 text-[#005DAA]" />
                    <span>Upload Bukti Pembayaran Sambungan Baru</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Setelah Anda melakukan transfer atau pembayaran di kanal resmi, unggah foto bukti struk pembayaran untuk diverifikasi oleh Admin.
                  </p>

                  {activeExistingRegistration.paymentProof ? (
                    <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Bukti Pembayaran Berhasil Diunggah
                        </span>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                          Status: {activeExistingRegistration.statusPembayaran === 'Lunas' ? 'Lunas / Berhasil' : 'Menunggu Verifikasi Kasir'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-500 block">Kanal / Bank:</span>
                          <strong className="text-slate-800">{activeExistingRegistration.paymentProof.bank}</strong>
                          <span className="text-slate-500 block mt-1">Tanggal Bayar:</span>
                          <strong className="text-slate-800">{activeExistingRegistration.paymentProof.tanggalBayar}</strong>
                          {activeExistingRegistration.paymentProof.catatan && (
                            <>
                              <span className="text-slate-500 block mt-1">Catatan:</span>
                              <p className="text-slate-700">{activeExistingRegistration.paymentProof.catatan}</p>
                            </>
                          )}
                        </div>

                        {activeExistingRegistration.paymentProof.dataUrl && (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center">
                            <img
                              src={activeExistingRegistration.paymentProof.dataUrl}
                              alt="Bukti Transfer"
                              className="max-h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-4 sm:p-5 rounded-xl border border-sky-200 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Kanal / Metode Pembayaran <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={paymentProofData.bank}
                            onChange={(e) => setPaymentProofData({ ...paymentProofData, bank: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden"
                          >
                            {AETRA_PAYMENT_CHANNELS.map((ch) => (
                              <option key={ch.id} value={ch.name}>
                                {ch.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Tanggal Pembayaran <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={paymentProofData.tanggalBayar}
                            onChange={(e) => setPaymentProofData({ ...paymentProofData, tanggalBayar: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden"
                          />
                        </div>
                      </div>

                      {/* Photo Upload for Proof */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-800">
                          Foto Struk / Tangkapan Layar Bukti Transfer <span className="text-red-500">*</span>
                        </label>

                        {paymentProofData.fileUrl ? (
                          <div className="relative group border rounded-xl overflow-hidden bg-black/5 aspect-video max-w-sm flex items-center justify-center">
                            <img
                              src={paymentProofData.fileUrl}
                              alt="Bukti Transfer"
                              className="max-h-full object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => setPaymentProofData({ ...paymentProofData, fileUrl: '' })}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setCameraModalConfig({
                                isOpen: true,
                                targetType: 'payment',
                                title: 'Ambil Foto Bukti Pembayaran via Kamera',
                                guideType: 'payment'
                              })}
                              className="px-4 py-2 bg-[#005DAA] hover:bg-[#004A88] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <Camera className="w-4 h-4" />
                              Ambil via Kamera
                            </button>

                            <label className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer">
                              <Upload className="w-4 h-4" />
                              Pilih File Foto
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) {
                                    const r = new FileReader();
                                    r.onload = async () => {
                                      const raw = r.result as string;
                                      const compressed = await compressImageDataUrl(raw, 640, 0.5);
                                      setPaymentProofData((p) => ({ ...p, fileUrl: compressed }));
                                    };
                                    r.readAsDataURL(f);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Catatan Tambahan (Opsional)
                        </label>
                        <input
                          type="text"
                          value={paymentProofData.catatan}
                          onChange={(e) => setPaymentProofData({ ...paymentProofData, catatan: e.target.value })}
                          placeholder="Nomor referensi ATM / catatan pembayaran..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          disabled={!paymentProofData.fileUrl || isSubmittingPayment}
                          onClick={handleConfirmPayment}
                          className={`w-full py-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                            paymentProofData.fileUrl && !isSubmittingPayment
                              ? 'bg-[#005DAA] hover:bg-[#004A88] text-white shadow-blue-600/30'
                              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Send className="w-4 h-4" />
                          <span>Kirim Bukti Pembayaran</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Summary Details Grid */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Nomor SR (Otomatis)</span>
                  <span className="font-mono text-sm font-black text-[#005DAA] block">SR - {activeExistingRegistration.noSr || '-'}</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">ID Pelanggan</span>
                  <span className="font-mono text-sm font-black text-slate-900 block">
                    {activeExistingRegistration.idPelanggan ? (
                      <span className="text-emerald-700 font-black">{activeExistingRegistration.idPelanggan}</span>
                    ) : (
                      <span className="text-slate-400 text-xs italic font-normal">Diterbitkan oleh Admin</span>
                    )}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Nomor Pembayaran</span>
                  <span className="font-mono text-sm font-black text-slate-800 block">
                    {activeExistingRegistration.nomorPembayaran ? (
                      <span className="text-emerald-700 font-black">{activeExistingRegistration.nomorPembayaran}</span>
                    ) : (
                      <span className="text-slate-400 text-xs italic font-normal">Diterbitkan setelah verifikasi</span>
                    )}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Golongan Tarif</span>
                  <span className="font-semibold text-xs text-slate-800 block truncate">{activeExistingRegistration.golonganTarif || 'Rumah Tangga'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Nama Pemohon (KTP):</span>
                  <strong className="text-slate-900 text-sm block">{activeExistingRegistration.namaKtp}</strong>
                  <span className="text-[11px] text-slate-500 block">NIK: {activeExistingRegistration.noKtp} &bull; HP/WA: {activeExistingRegistration.telpHp}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Alamat Pemasangan:</span>
                  <p className="text-slate-800 text-xs font-medium leading-relaxed">
                    {activeExistingRegistration.alamatPasang}, RT/RW {activeExistingRegistration.rtRwPasang}, Kel. {activeExistingRegistration.kelurahanPasang || activeExistingRegistration.desaPasang}, Kec. {activeExistingRegistration.kecamatanPasang}, {activeExistingRegistration.kotaPasang || 'Kabupaten Tangerang'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                Data pendaftaran Anda tersimpan aman dan terhubung langsung ke database Supabase.
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {!isApprovedPaymentStage && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(activeExistingRegistration);
                      setForceShowForm(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    Buka / Edit Detail Formulir
                  </button>
                )}

                {onViewReceipt && (
                  <button
                    type="button"
                    onClick={() => onViewReceipt(activeExistingRegistration)}
                    className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-[#005DAA] font-bold text-xs transition cursor-pointer"
                  >
                    Lihat Bukti Tanda Terima / SPK
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        /* ======================================================== */
        /* WIZARD MULTI-SECTION REGISTRATION FORM                   */
        /* ======================================================== */
        <div className="bg-white rounded-3xl border border-slate-300 shadow-md overflow-hidden">
          {/* Symmetrical, Creative, and Modern Header with Small SR Badge */}
          <div className="bg-linear-to-r from-[#005DAA] via-[#004B8A] to-[#003868] text-white p-6 sm:p-8 border-b-4 border-[#F37021]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="bg-white px-3.5 py-1.5 rounded-xl inline-flex items-center shadow-xs">
                  <AetraLogo size="sm" variant="horizontal" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight text-white">
                  Pendaftaran Sambungan Baru
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 font-medium">
                  Surat Permohonan Sambungan Rumah (SR) PT Aetra Air Tangerang
                </p>
              </div>

              {/* Compact & Clean Nomor SR Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xs shrink-0 self-start md:self-center">
                <span className="text-xs sm:text-sm font-black text-amber-300 tracking-wider">
                  NO SR :
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-white">
                  {formData.noSr}
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[620px] max-w-4xl mx-auto gap-2">
              {SECTIONS.map((sec) => {
                const isActive = currentStep === sec.number;
                const isPassed = highestStepReached >= sec.number;
                return (
                  <button
                    key={sec.number}
                    type="button"
                    onClick={() => handleJumpToStep(sec.number)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition cursor-pointer ${
                      isActive
                        ? 'bg-[#005DAA] text-white shadow-xs font-bold'
                        : isPassed
                        ? 'bg-blue-50 text-[#005DAA] hover:bg-blue-100 font-semibold'
                        : 'text-slate-400 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive
                          ? 'bg-white text-[#005DAA]'
                          : isPassed
                          ? 'bg-[#005DAA] text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {sec.number}
                    </span>
                    <div className="text-left hidden sm:block">
                      <span className="text-xs block leading-tight">{sec.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation Errors Box */}
          {validationErrors.length > 0 && (
            <div className="m-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1 animate-in fade-in">
              <div className="font-bold flex items-center gap-2 text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Mohon lengkapi isian berikut sebelum melanjutkan:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] pt-1">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form Body */}
          <form onSubmit={handleFinalSubmit} className="p-6 sm:p-8 space-y-6">
            {/* ======================================================== */}
            {/* SECTION 1: DATA IDENTITAS PEMOHON                        */}
            {/* ======================================================== */}
            {currentStep === 1 && (
              <section className="space-y-6 animate-in fade-in">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#005DAA] border border-blue-200">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">Data Identitas Pemohon</h2>
                    <p className="text-xs text-slate-500">Data diri pemilik persil / pemohon sambungan baru air bersih</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Nama Lengkap Pemohon (Sesuai KTP) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.namaKtp}
                      onChange={(e) => {
                        setFormData({ ...formData, namaKtp: e.target.value });
                        setErrorFields((prev) => ({ ...prev, namaKtp: false }));
                      }}
                      placeholder="Contoh: Budi Santoso"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-hidden transition ${
                        errorFields.namaKtp ? 'border-2 border-red-500 bg-red-50' : 'bg-slate-50 border border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Nomor KTP (NIK 16 Digit) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      required
                      value={formData.noKtp}
                      onChange={(e) => {
                        setFormData({ ...formData, noKtp: e.target.value.replace(/\D/g, '') });
                        setErrorFields((prev) => ({ ...prev, noKtp: false }));
                      }}
                      placeholder="16 digit NIK e-KTP"
                      className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-bold focus:outline-hidden transition ${
                        errorFields.noKtp ? 'border-2 border-red-500 bg-red-50' : 'bg-slate-50 border border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Pekerjaan Pemohon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pekerjaan}
                      onChange={(e) => {
                        setFormData({ ...formData, pekerjaan: e.target.value });
                        setErrorFields((prev) => ({ ...prev, pekerjaan: false }));
                      }}
                      placeholder="Contoh: Karyawan Swasta, Wiraswasta, PNS"
                      className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium focus:outline-hidden transition ${
                        errorFields.pekerjaan ? 'border-2 border-red-500 bg-red-50' : 'bg-slate-50 border border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Nomor HP / WhatsApp Aktif <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telpHp}
                      onChange={(e) => {
                        setFormData({ ...formData, telpHp: e.target.value });
                        setErrorFields((prev) => ({ ...prev, telpHp: false }));
                      }}
                      placeholder="0812-xxxx-xxxx"
                      className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium focus:outline-hidden transition ${
                        errorFields.telpHp ? 'border-2 border-red-500 bg-red-50' : 'bg-slate-50 border border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Email Pemohon (Opsional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@domain.com"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* SECTION 2: ALAMAT KTP LENGKAP (CASCADING DROPDOWNS)      */}
            {/* ======================================================== */}
            {currentStep === 2 && (
              <section className="space-y-6 animate-in fade-in">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#005DAA] border border-blue-200">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">Alamat KTP Pemohon</h2>
                    <p className="text-xs text-slate-500">Pilih wilayah domisili kependudukan bertingkat (Cascading) sesuai e-KTP</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Alamat Lengkap Jalan / No. Rumah (KTP) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.alamatKtp}
                      onChange={(e) => {
                        setFormData({ ...formData, alamatKtp: e.target.value });
                        setErrorFields((prev) => ({ ...prev, alamatKtp: false }));
                      }}
                      placeholder="Nama jalan, nomor rumah, blok / gang"
                      className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium focus:outline-hidden ${
                        errorFields.alamatKtp ? 'border-2 border-red-500 bg-red-50' : 'bg-slate-50 border border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        RT (KTP) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.rtKtp || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const rw = formData.rwKtp || '';
                          const combined = val && rw ? `${val}/${rw}` : val || rw || '';
                          setFormData({ ...formData, rtKtp: val, rtRwKtp: combined });
                          setErrorFields((prev) => ({ ...prev, rtKtp: false, rtRwKtp: false }));
                        }}
                        placeholder="Contoh: 003"
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-hidden ${
                          errorFields.rtKtp ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        RW (KTP) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.rwKtp || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const rt = formData.rtKtp || '';
                          const combined = rt && val ? `${rt}/${val}` : rt || val || '';
                          setFormData({ ...formData, rwKtp: val, rtRwKtp: combined });
                          setErrorFields((prev) => ({ ...prev, rwKtp: false, rtRwKtp: false }));
                        }}
                        placeholder="Contoh: 004"
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-hidden ${
                          errorFields.rwKtp ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                        }`}
                      />
                    </div>

                    {/* 1. Dropdown Provinsi (Cascading) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        1. Provinsi <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.provinsiKtp || ''}
                        onChange={(e) => {
                          const newProv = e.target.value;
                          setFormData({
                            ...formData,
                            provinsiKtp: newProv,
                            kotaKtp: '',
                            kecamatanKtp: '',
                            desaKtp: '',
                            kelurahanKtp: '',
                            kodePosKtp: '',
                          });
                          setErrorFields((prev) => ({ ...prev, provinsiKtp: false }));
                        }}
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-hidden ${
                          errorFields.provinsiKtp ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                        }`}
                      >
                        <option value="">-- Pilih Provinsi --</option>
                        {INDONESIA_PROVINCES_DATA.map((prov) => (
                          <option key={prov.id} value={prov.name}>
                            {prov.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Dropdown Kota / Kabupaten (Cascading) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        2. Kabupaten / Kota <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.kotaKtp || ''}
                        disabled={!formData.provinsiKtp}
                        onChange={(e) => {
                          const newCity = e.target.value;
                          setFormData({
                            ...formData,
                            kotaKtp: newCity,
                            kecamatanKtp: '',
                            desaKtp: '',
                            kelurahanKtp: '',
                            kodePosKtp: '',
                          });
                          setErrorFields((prev) => ({ ...prev, kotaKtp: false }));
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden disabled:opacity-50"
                      >
                        <option value="">-- Pilih Kabupaten / Kota --</option>
                        {INDONESIA_PROVINCES_DATA.find((p) => p.name === formData.provinsiKtp)?.cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 3. Dropdown Kecamatan (Cascading) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        3. Kecamatan <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.kecamatanKtp || ''}
                        disabled={!formData.kotaKtp}
                        onChange={(e) => {
                          const newKec = e.target.value;
                          const districtObj = INDONESIA_PROVINCES_DATA.find((p) => p.name === formData.provinsiKtp)
                            ?.cities.find((c) => c.name === formData.kotaKtp)
                            ?.districts.find((d) => d.name === newKec);

                          setFormData({
                            ...formData,
                            kecamatanKtp: newKec,
                            desaKtp: '',
                            kelurahanKtp: '',
                            kodePosKtp: districtObj?.postalCode || formData.kodePosKtp || '',
                          });
                          setErrorFields((prev) => ({ ...prev, kecamatanKtp: false }));
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden disabled:opacity-50"
                      >
                        <option value="">-- Pilih Kecamatan --</option>
                        {INDONESIA_PROVINCES_DATA.find((p) => p.name === formData.provinsiKtp)
                          ?.cities.find((c) => c.name === formData.kotaKtp)
                          ?.districts.map((dist) => (
                            <option key={dist.name} value={dist.name}>
                              {dist.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* 4. Dropdown Kelurahan / Desa (Cascading) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        4. Kelurahan / Desa <span className="text-red-500">*</span>
                      </label>
                      {(() => {
                        const currentVillages = INDONESIA_PROVINCES_DATA.find((p) => p.name === formData.provinsiKtp)
                          ?.cities.find((c) => c.name === formData.kotaKtp)
                          ?.districts.find((d) => d.name === formData.kecamatanKtp)?.villages || [];
                        const currentVal = formData.kelurahanKtp || formData.desaKtp || '';
                        const isCustom = Boolean(currentVal && currentVillages.length > 0 && !currentVillages.includes(currentVal));

                        return (
                          <div className="space-y-1.5">
                            <select
                              value={isCustom ? '__custom__' : currentVal}
                              disabled={!formData.kecamatanKtp}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === '__custom__') {
                                  setFormData({ ...formData, kelurahanKtp: '', desaKtp: '' });
                                } else {
                                  setFormData({ ...formData, kelurahanKtp: val, desaKtp: val });
                                }
                                setErrorFields((prev) => ({ ...prev, kelurahanKtp: false }));
                              }}
                              className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden disabled:opacity-50 ${
                                errorFields.kelurahanKtp ? 'border-red-500 bg-red-50' : 'border-slate-300'
                              }`}
                            >
                              <option value="">-- Pilih Kelurahan / Desa --</option>
                              {currentVillages.map((v: string) => (
                                <option key={v} value={v}>
                                  {v}
                                </option>
                              ))}
                              {currentVillages.length > 0 && (
                                <option value="__custom__">-- Masukkan Kelurahan/Desa Lainnya --</option>
                              )}
                            </select>

                            {(currentVillages.length === 0 || isCustom) && formData.kecamatanKtp && (
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFormData({ ...formData, kelurahanKtp: val, desaKtp: val });
                                  setErrorFields((prev) => ({ ...prev, kelurahanKtp: false }));
                                }}
                                placeholder="Ketik nama Kelurahan / Desa..."
                                className="w-full px-3 py-2 bg-white border border-blue-400 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden"
                              />
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Kode Pos */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Kode Pos <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.kodePosKtp}
                        onChange={(e) => {
                          setFormData({ ...formData, kodePosKtp: e.target.value });
                          setErrorFields((prev) => ({ ...prev, kodePosKtp: false }));
                        }}
                        placeholder="Contoh: 15710"
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-mono font-bold focus:outline-hidden ${
                          errorFields.kodePosKtp ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* SECTION 3: ALAMAT PEMASANGAN                             */}
            {/* ======================================================== */}
            {currentStep === 3 && (
              <section className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#005DAA] border border-blue-200">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 text-base">Alamat Lengkap Pemasangan</h2>
                      <p className="text-xs text-slate-500">Wilayah Layanan Resmi Sambungan Baru Aetra &bull; Kabupaten Tangerang</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Interactive Map Picker */}
                  <InteractiveMapPicker
                    latitude={formData.dataPasang?.gpsLat}
                    longitude={formData.dataPasang?.gpsLong}
                    onLocationChange={(lat, lng) => {
                      setFormData((prev) => ({
                        ...prev,
                        dataPasang: {
                          ...prev.dataPasang,
                          gpsLat: String(lat),
                          gpsLong: String(lng),
                        },
                      }));
                    }}
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Alamat Lengkap Persil Pasang (Jalan / Blok / No. Rumah) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.alamatPasang}
                      onChange={(e) => {
                        setFormData({ ...formData, alamatPasang: e.target.value });
                        setErrorFields((prev) => ({ ...prev, alamatPasang: false }));
                      }}
                      placeholder="Contoh: Perumahan Citra Raya, Cluster Gardenia Blok E5 No. 12"
                      className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium focus:outline-hidden ${
                        errorFields.alamatPasang ? 'border-2 border-red-500 bg-red-50' : 'bg-slate-50 border border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        RT Pasang <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.rtPasang || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const rw = formData.rwPasang || '';
                          const combined = val && rw ? `${val}/${rw}` : val || rw || '';
                          setFormData({ ...formData, rtPasang: val, rtRwPasang: combined });
                          setErrorFields((prev) => ({ ...prev, rtPasang: false, rtRwPasang: false }));
                        }}
                        placeholder="003"
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-hidden ${
                          errorFields.rtPasang ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        RW Pasang <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.rwPasang || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const rt = formData.rtPasang || '';
                          const combined = rt && val ? `${rt}/${val}` : rt || val || '';
                          setFormData({ ...formData, rwPasang: val, rtRwPasang: combined });
                          setErrorFields((prev) => ({ ...prev, rwPasang: false, rtRwPasang: false }));
                        }}
                        placeholder="004"
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-hidden ${
                          errorFields.rwPasang ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                        }`}
                      />
                    </div>

                    {/* Filter Kecamatan Kabupaten Tangerang */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Kecamatan Pasang <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.kecamatanPasang || ''}
                        onChange={(e) => {
                          const newKec = e.target.value;
                          const found = AETRA_TANGERANG_INSTALLATION_REGIONS.find((k) => k.name === newKec);
                          setFormData({
                            ...formData,
                            kecamatanPasang: newKec,
                            kelurahanPasang: '',
                            desaPasang: '',
                            kodePosPasang: found?.postalCode || formData.kodePosPasang || '',
                          });
                          setErrorFields((prev) => ({ ...prev, kecamatanPasang: false }));
                        }}
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-hidden ${
                          errorFields.kecamatanPasang ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                        }`}
                      >
                        <option value="">-- Pilih Kecamatan --</option>
                        {AETRA_TANGERANG_INSTALLATION_REGIONS.map((k) => (
                          <option key={`inst-kec-${k.name}`} value={k.name}>
                            {k.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Kelurahan / Desa Pasang */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Kelurahan / Desa <span className="text-red-500">*</span>
                      </label>
                      {(() => {
                        const currentVillages = AETRA_TANGERANG_INSTALLATION_REGIONS.find((k) => k.name === formData.kecamatanPasang)?.villages || [];
                        const currentVal = formData.kelurahanPasang || formData.desaPasang || '';
                        const isCustom = Boolean(currentVal && currentVillages.length > 0 && !currentVillages.includes(currentVal));

                        return (
                          <div className="space-y-1.5">
                            <select
                              value={isCustom ? '__custom__' : currentVal}
                              disabled={!formData.kecamatanPasang}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === '__custom__') {
                                  setFormData({ ...formData, kelurahanPasang: '', desaPasang: '' });
                                } else {
                                  setFormData({ ...formData, kelurahanPasang: val, desaPasang: val });
                                }
                                setErrorFields((prev) => ({ ...prev, kelurahanPasang: false }));
                              }}
                              className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden disabled:opacity-50 ${
                                errorFields.kelurahanPasang ? 'border-red-500 bg-red-50' : 'border-slate-300'
                              }`}
                            >
                              <option value="">-- Pilih Kelurahan / Desa --</option>
                              {currentVillages.map((kel: string) => (
                                <option key={`inst-vil-${kel}`} value={kel}>
                                  {kel}
                                </option>
                              ))}
                              {currentVillages.length > 0 && (
                                <option value="__custom__">-- Masukkan Kelurahan/Desa Lainnya --</option>
                              )}
                            </select>

                            {(currentVillages.length === 0 || isCustom) && formData.kecamatanPasang && (
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFormData({ ...formData, kelurahanPasang: val, desaPasang: val });
                                  setErrorFields((prev) => ({ ...prev, kelurahanPasang: false }));
                                }}
                                placeholder="Ketik nama Kelurahan / Desa..."
                                className="w-full px-3 py-2 bg-white border border-blue-400 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden"
                              />
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Kode Pos Pasang */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Kode Pos <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.kodePosPasang}
                        onChange={(e) => {
                          setFormData({ ...formData, kodePosPasang: e.target.value });
                          setErrorFields((prev) => ({ ...prev, kodePosPasang: false }));
                        }}
                        placeholder="15710"
                        className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-mono font-bold focus:outline-hidden ${
                          errorFields.kodePosPasang ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Status Kepemilikan */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Status Kepemilikan Properti <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Milik Sendiri', 'Kontrak / Sewa', 'Dinas', 'Lainnya'].map((opt) => (
                        <label
                          key={opt}
                          onClick={() => {
                            setFormData({ ...formData, statusKepemilikan: opt });
                            setErrorFields((prev) => ({ ...prev, statusKepemilikan: false }));
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold cursor-pointer transition flex items-center gap-2.5 ${
                            formData.statusKepemilikan === opt
                              ? 'bg-blue-50 border-[#005DAA] text-[#005DAA] shadow-xs ring-1 ring-[#005DAA]'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="statusKepemilikan"
                            checked={formData.statusKepemilikan === opt}
                            onChange={() => {
                              setFormData({ ...formData, statusKepemilikan: opt });
                              setErrorFields((prev) => ({ ...prev, statusKepemilikan: false }));
                            }}
                            className="text-[#005DAA] focus:ring-[#005DAA]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    {formData.statusKepemilikan === 'Lainnya' && (
                      <div className="pt-2 animate-in fade-in">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Keterangan Status Kepemilikan Properti Lainnya <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.statusKepemilikanLainnya || ''}
                          onChange={(e) => setFormData({ ...formData, statusKepemilikanLainnya: e.target.value })}
                          placeholder="Contoh: Rumah Keluarga / Warisan / Hak Guna Bangunan (HGB)..."
                          className="w-full px-3.5 py-2 bg-white border border-blue-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#005DAA] focus:outline-hidden shadow-2xs"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* SECTION 4: UPLOAD DOKUMEN PERSYARATAN                    */}
            {/* ======================================================== */}
            {currentStep === 4 && (
              <section className="space-y-6 animate-in fade-in">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#005DAA] border border-blue-200">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">Upload Dokumen Persyaratan</h2>
                    <p className="text-xs text-slate-500">Unggah dokumen identitas e-KTP, Kartu Keluarga, dan Bukti PBB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {/* 1. KTP */}
                  <div className={`p-4 rounded-xl border space-y-3 bg-white ${
                    errorFields.ktpDoc ? 'border-red-500 bg-red-50/50' : 'border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">1. Foto e-KTP <span className="text-red-500">*</span></span>
                      {formData.persyaratanFiles?.ktp && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Terlampir
                        </span>
                      )}
                    </div>

                    {formData.persyaratanFiles?.ktp ? (
                      <div className="relative group border rounded-xl overflow-hidden bg-black/5 aspect-video flex items-center justify-center">
                        <img
                          src={formData.persyaratanFiles.ktp.dataUrl}
                          alt="KTP"
                          className="max-h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc('ktp')}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setCameraModalConfig({
                            isOpen: true,
                            targetType: 'document',
                            docKey: 'ktp',
                            title: 'Ambil Foto KTP via Kamera',
                            guideType: 'document'
                          })}
                          className="w-full py-2 px-3 bg-[#005DAA] hover:bg-[#004A88] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          Ambil via Kamera
                        </button>
                        <label className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
                          <Upload className="w-3.5 h-3.5" />
                          Pilih File Foto
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDocUpload('ktp', e, 'file')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* 2. KK */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">2. Foto Kartu Keluarga (KK)</span>
                      {formData.persyaratanFiles?.kk && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Terlampir
                        </span>
                      )}
                    </div>

                    {formData.persyaratanFiles?.kk ? (
                      <div className="relative group border rounded-xl overflow-hidden bg-black/5 aspect-video flex items-center justify-center">
                        <img
                          src={formData.persyaratanFiles.kk.dataUrl}
                          alt="KK"
                          className="max-h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc('kk')}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setCameraModalConfig({
                            isOpen: true,
                            targetType: 'document',
                            docKey: 'kk',
                            title: 'Ambil Foto KK via Kamera',
                            guideType: 'document'
                          })}
                          className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#005DAA] border border-blue-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          Ambil via Kamera
                        </button>
                        <label className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
                          <Upload className="w-3.5 h-3.5" />
                          Pilih File Foto
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDocUpload('kk', e, 'file')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* 3. PBB */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">3. Bukti PBB / Listrik</span>
                      {formData.persyaratanFiles?.pbb && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Terlampir
                        </span>
                      )}
                    </div>

                    {formData.persyaratanFiles?.pbb ? (
                      <div className="relative group border rounded-xl overflow-hidden bg-black/5 aspect-video flex items-center justify-center">
                        <img
                          src={formData.persyaratanFiles.pbb.dataUrl}
                          alt="PBB"
                          className="max-h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc('pbb')}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setCameraModalConfig({
                            isOpen: true,
                            targetType: 'document',
                            docKey: 'pbb',
                            title: 'Ambil Foto PBB via Kamera',
                            guideType: 'document'
                          })}
                          className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#005DAA] border border-blue-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          Ambil via Kamera
                        </button>
                        <label className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
                          <Upload className="w-3.5 h-3.5" />
                          Pilih File Foto
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDocUpload('pbb', e, 'file')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* 4. Dokumen Lainnya */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">4. Foto Dokumen Lainnya (Opsional)</span>
                      {formData.persyaratanFiles?.lainnya && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Terlampir
                        </span>
                      )}
                    </div>

                    {formData.persyaratanFiles?.lainnya ? (
                      <div className="relative group border rounded-xl overflow-hidden bg-black/5 aspect-video flex items-center justify-center">
                        <img
                          src={formData.persyaratanFiles.lainnya.dataUrl}
                          alt="Dokumen Lainnya"
                          className="max-h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc('lainnya')}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setCameraModalConfig({
                            isOpen: true,
                            targetType: 'document',
                            docKey: 'lainnya',
                            title: 'Ambil Foto Dokumen Lainnya via Kamera',
                            guideType: 'document'
                          })}
                          className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#005DAA] border border-blue-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          Ambil via Kamera
                        </button>
                        <label className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
                          <Upload className="w-3.5 h-3.5" />
                          Pilih File Foto
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDocUpload('lainnya', e, 'file')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* SECTION 5: KONDISI & KATEGORI TARIF (3 KOLOM KATEGORI)   */}
            {/* ======================================================== */}
            {currentStep === 5 && (
              <section className="space-y-6 animate-in fade-in">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#005DAA] border border-blue-200">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">Kategori Peruntukan &amp; Golongan Tarif</h2>
                    <p className="text-xs text-slate-500">Pilih peruntukan persil sambungan air untuk penetapan tarif resmi Aetra</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 3 KOLOM KATEGORI UTAMA: RUMAH TANGGA, SOSIAL/INSTANSI, USAHA/NIAGA */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-800">
                      Pilih Kategori Pelanggan <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {[
                        { 
                          id: 'rumah_tangga', 
                          label: 'Rumah Tangga', 
                          icon: Home, 
                          desc: 'Hunian Tempat Tinggal (R1, R2, R3, R4)',
                        },
                        { 
                          id: 'sosial_instansi', 
                          label: 'Sosial / Instansi', 
                          icon: ShieldCheck, 
                          desc: 'Tempat Ibadah, Yayasan Sosial & Kantor Dinas',
                        },
                        { 
                          id: 'usaha', 
                          label: 'Usaha / Niaga', 
                          icon: Layers, 
                          desc: 'Komersial, Toko, Ruko, Resto & Bisnis',
                        },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = kategoriFungsi === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setKategoriFungsi(item.id as KategoriFungsi);
                              if (item.id === 'rumah_tangga') {
                                setFormData({ ...formData, fungsiBangunan: 'Rumah Tangga' });
                              } else if (item.id === 'sosial_instansi') {
                                setFormData({ ...formData, fungsiBangunan: SOSIAL_OPTIONS[0] });
                              } else {
                                setFormData({ ...formData, fungsiBangunan: USAHA_OPTIONS[0] });
                              }
                            }}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between gap-3 ${
                              isSelected
                                ? 'bg-blue-50/90 border-[#005DAA] shadow-sm ring-2 ring-[#005DAA]/30'
                                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#005DAA] text-white shadow-xs' : 'bg-slate-100 text-slate-600'}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <input
                                type="radio"
                                name="kategoriFungsiRadio"
                                checked={isSelected}
                                onChange={() => {}}
                                className="text-[#005DAA] w-4 h-4"
                              />
                            </div>
                            <div>
                              <strong className={`block text-sm font-black ${isSelected ? 'text-[#005DAA]' : 'text-slate-800'}`}>
                                {item.label}
                              </strong>
                              <span className="text-xs text-slate-500 block mt-1 leading-snug">
                                {item.desc}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* JIKA SOSIAL / INSTANSI: TAMPILKAN PILIHAN DALAM BENTUK KOLOM & KARTU PILIHAN */}
                  {kategoriFungsi === 'sosial_instansi' && (
                    <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-4 animate-in fade-in">
                      <div>
                        <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          <span>Pilih Jenis Fasilitas Sosial / Instansi</span>
                        </h3>
                        <p className="text-[11px] text-emerald-800 mt-0.5">
                          Klik pada salah satu kolom opsi di bawah yang sesuai dengan persil Anda:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Kolom 1: Fasilitas Sosial */}
                        <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2.5 shadow-2xs">
                          <span className="text-xs font-black text-emerald-900 block border-b border-emerald-100 pb-1.5">
                            1. Fasilitas Sosial (Golongan 1)
                          </span>
                          <div className="space-y-2">
                            {SOSIAL_OPTIONS.map((opt) => {
                              const isChecked = formData.fungsiBangunan === opt;
                              return (
                                <div
                                  key={opt}
                                  onClick={() => setFormData({ ...formData, fungsiBangunan: opt })}
                                  className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center gap-2.5 ${
                                    isChecked
                                      ? 'bg-emerald-100/70 border-emerald-500 text-emerald-950 ring-1 ring-emerald-400'
                                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                                  )}
                                  <span className="leading-snug">{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Kolom 2: Instansi Pemerintah & Lembaga */}
                        <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-2.5 shadow-2xs">
                          <span className="text-xs font-black text-[#005DAA] block border-b border-blue-100 pb-1.5">
                            2. Instansi Pemerintah &amp; Lembaga (Golongan 2B)
                          </span>
                          <div className="space-y-2">
                            {INSTANSI_OPTIONS.map((opt) => {
                              const isChecked = formData.fungsiBangunan === opt;
                              return (
                                <div
                                  key={opt}
                                  onClick={() => setFormData({ ...formData, fungsiBangunan: opt })}
                                  className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center gap-2.5 ${
                                    isChecked
                                      ? 'bg-blue-100/70 border-blue-500 text-blue-950 ring-1 ring-blue-400'
                                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-[#005DAA] shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                                  )}
                                  <span className="leading-snug">{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* JIKA USAHA / NIAGA: TAMPILKAN DALAM BENTUK KOLOM & KARTU PILIHAN */}
                  {kategoriFungsi === 'usaha' && (
                    <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-4 animate-in fade-in">
                      <div>
                        <h3 className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-2">
                          <Layers className="w-4 h-4 text-amber-700" />
                          <span>Pilih Bidang Usaha / Niaga (Golongan 3)</span>
                        </h3>
                        <p className="text-[11px] text-amber-800 mt-0.5">
                          Pilih jenis kegiatan komersial / usaha pada kolom di bawah:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {USAHA_OPTIONS.map((opt) => {
                          const isChecked = formData.fungsiBangunan === opt;
                          return (
                            <div
                              key={opt}
                              onClick={() => setFormData({ ...formData, fungsiBangunan: opt })}
                              className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center gap-2.5 ${
                                isChecked
                                  ? 'bg-amber-100/80 border-amber-500 text-amber-950 ring-1 ring-amber-400 shadow-2xs'
                                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-amber-700 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                              <span className="leading-snug">{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* JIKA RUMAH TANGGA: TAMPILKAN LUAS & GOLONGAN TARIF */}
                  {kategoriFungsi === 'rumah_tangga' && (
                    <div className="space-y-4 animate-in fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-sky-200 shadow-2xs">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Luas Bangunan Dasar (m²) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="5000"
                            required
                            value={formData.luasBangunan}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                luasBangunan: val,
                                totalLuasBangunan: parseFloat(val || '0') * (parseInt(String(prev.kondisiBangunan?.jumlahLantai || '1'), 10) || 1),
                              }));
                              setErrorFields((prev) => ({ ...prev, luasBangunan: false }));
                            }}
                            placeholder="Contoh: 36, 54, 72"
                            className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold focus:outline-hidden ${
                              errorFields.luasBangunan ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Luas Tanah (m²) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="5000"
                            required
                            value={formData.luasTanah}
                            onChange={(e) => {
                              setFormData({ ...formData, luasTanah: e.target.value });
                              setErrorFields((prev) => ({ ...prev, luasTanah: false }));
                            }}
                            placeholder="Contoh: 60, 90, 120"
                            className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold focus:outline-hidden ${
                              errorFields.luasTanah ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#005DAA]'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Kondisi Bangunan & Lingkungan */}
                      <BuildingEnvironmentFields
                        formData={formData}
                        setFormData={setFormData}
                        errorFields={errorFields}
                      />

                      {/* HANYA RUMAH TANGGA: TAMPILKAN KARTU HASIL GOLONGAN TARIF */}
                      <DomesticTariffResultCard
                        totalLuas={parseFloat(String(formData.totalLuasBangunan || formData.luasBangunan || '0'))}
                        isRealEstate={formData.lingkungan?.realEstate === 'Ya' || formData.lingkungan?.realEstate === 'Real Estate / Cluster / Komplek'}
                        hasUsaha={Boolean(formData.hasUsahaKomersil)}
                        luasBangunan={formData.luasBangunan || '0'}
                        jumlahLantai={formData.kondisiBangunan?.jumlahLantai || '1'}
                      />
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* SECTION 6: PETUGAS LAPANGAN, FOTO & S&K BERLANGGANAN     */}
            {/* ======================================================== */}
            {currentStep === 6 && (
              <section className="space-y-6 animate-in fade-in">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#005DAA] border border-blue-200">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">Petugas Lapangan, Dokumentasi &amp; Syarat Ketentuan</h2>
                    <p className="text-xs text-slate-500">Administrasi teknis, verifikasi jalur distribusi, foto fisik properti, dan persetujuan berlangganan resmi</p>
                  </div>
                </div>

                <PetugasOfficerFields
                  formData={formData}
                  setFormData={setFormData}
                  errorFields={errorFields}
                />

                {/* DOKUMENTASI FOTO PROPERTI (DIPINDAHKAN KE PETUGAS LAPANGAN) */}
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <Camera className="w-4 h-4 text-[#005DAA]" />
                    <span>Dokumentasi Foto Properti Lapangan (3 Foto)</span>
                  </div>
                  <PropertyPhotosSection
                    photos={formData.fotoPropertiFiles || []}
                    onChange={(updatedPhotos) => setFormData({ ...formData, fotoPropertiFiles: updatedPhotos })}
                    onOpenCamera={(cat) => setCameraModalConfig({
                      isOpen: true,
                      targetType: 'property',
                      propertyCategory: cat,
                      title: `Foto ${cat.replace('_', ' ').toUpperCase()} via Kamera`,
                      guideType: 'property',
                    })}
                  />
                </div>

                {/* ======================================================== */}
                {/* BANK-GRADE SYARAT & KETENTUAN BERLANGGANAN (PASAL 1-11) */}
                {/* ======================================================== */}
                <div className="bg-linear-to-r from-blue-50 via-sky-50 to-indigo-50/80 p-5 sm:p-6 rounded-3xl border-2 border-blue-300 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#005DAA] text-white flex items-center justify-center shadow-xs shrink-0">
                        <ScrollText className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                            Perjanjian Pelayanan Resmi
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isTermsRead || formData.persetujuan
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {isTermsRead || formData.persetujuan ? '✓ S&K Telah Dibaca' : 'Wajib Dibaca & Disetujui'}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 mt-0.5">
                          Syarat &amp; Ketentuan Berlangganan PT Aetra Air Tangerang
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsTermsModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-[#005DAA] hover:bg-[#004A88] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer self-start sm:self-center"
                    >
                      <BookOpen className="w-4 h-4 text-amber-300" />
                      <span>Buka &amp; Baca Dokumen S&amp;K (Pasal 1 - 11)</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dokumen ini memuat hak &amp; kewajiban Para Pihak, ketentuan tarif air, tagihan bulanan, larangan penyadapan ilegal, dan penyelesaian sengketa sesuai peraturan perundang-undangan.
                  </p>

                  <div className="p-3 bg-blue-100/70 rounded-xl border border-blue-200 text-xs text-blue-950 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#005DAA] shrink-0" />
                    <span>Ketika Anda mengklik tombol <strong>"Daftarkan Sambungan Baru"</strong>, jendela resmi Syarat &amp; Ketentuan beserta kotak pernyataan persetujuan akan terbuka untuk konfirmasi pendaftaran.</span>
                  </div>
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* BOTTOM NAVIGATION ACTIONS                                */}
            {/* ======================================================== */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition cursor-pointer"
                >
                  Kosongkan Form
                </button>

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#005DAA] hover:bg-[#004A88] text-white text-xs font-bold shadow-md shadow-blue-600/20 transition transform active:scale-98 cursor-pointer"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isAllRequiredFieldsFilled}
                    className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-black transition transform shadow-lg cursor-pointer ${
                      isAllRequiredFieldsFilled
                        ? 'bg-[#005DAA] hover:bg-[#004A88] text-white shadow-blue-600/30 active:scale-98'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none opacity-70'
                    }`}
                    title={
                      isAllRequiredFieldsFilled
                        ? 'Klik untuk mendaftarkan sambungan baru'
                        : 'Semua isian bertanda bintang (*) wajib dilengkapi terlebih dahulu'
                    }
                  >
                    <CheckCheck className="w-4 h-4 text-emerald-300" />
                    <span>Daftarkan Sambungan Baru</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Syarat & Ketentuan Modal */}
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        isAccepted={Boolean(formData.persetujuan)}
        onAccept={() => {
          setFormData((prev) => ({ ...prev, persetujuan: true }));
          setIsTermsRead(true);
          setErrorFields((prev) => ({ ...prev, persetujuan: false }));
          processRegistration({ ...formData, persetujuan: true });
        }}
      />

      {/* Auto Camera Device Modal */}
      <CameraCaptureModal
        isOpen={cameraModalConfig.isOpen}
        onClose={() => setCameraModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onCapture={handleDirectCameraCapture}
        title={cameraModalConfig.title}
        guideType={cameraModalConfig.guideType === 'property' ? 'property' : 'document'}
      />
    </div>
  );
};
