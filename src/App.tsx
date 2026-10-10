import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TabType, RegistrationFormData, CustomerTrackingRecord, TrackingTimelineEvent, SurveySubmission, UserRole, UserAccount, MonthlyBillRecord, RegistrationStatus } from './types';
import { 
  INITIAL_FAQS 
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AetraLogo } from './components/AetraLogo';
import { RegistrationForm } from './components/RegistrationForm';
import { TrackingSection } from './components/TrackingSection';
import { SurveySection } from './components/SurveySection';
import { FaqSection } from './components/FaqSection';
import { AdminSection } from './components/AdminSection';
import { ReceiptModal } from './components/ReceiptModal';
import { AuthScreen } from './components/AuthScreen';
import { SupabaseModal } from './components/SupabaseModal';
import { MonthlyBillSection } from './components/MonthlyBillSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  fetchRegistrationsFromDb,
  saveRegistrationToDb,
  deleteRegistrationFromDb,
  fetchTrackingRecordsFromDb,
  saveTrackingRecordToDb,
  fetchSurveysFromDb,
  saveSurveyToDb,
  fetchMonthlyBillsFromDb,
  saveMonthlyBillToDb,
  getSupabaseSessionUser,
  signOutUserWithSupabase,
  MASTER_ADMIN_ACCOUNT,
} from './services/supabaseService';
import { getSupabaseClient, isSupabaseConfigured } from './lib/supabase';
import { cloudSyncService } from './services/cloudSyncService';
import { safeLocalStorageSetItem } from './utils/storageUtils';
import { Droplets, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('aetra_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return currentUser?.role === 'admin' ? 'admin' : 'registration';
  });
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return currentUser?.role === 'admin' ? 'admin' : 'customer';
  });
  const [activeTrackingForm, setActiveTrackingForm] = useState<string>('');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  // Registrations state (Supabase is single source of truth)
  const [registrations, setRegistrations] = useState<RegistrationFormData[]>(() => {
    if (isSupabaseConfigured()) return [];
    try {
      const saved = localStorage.getItem('aetra_registrations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Tracking records state (Supabase is single source of truth)
  const [trackingRecords, setTrackingRecords] = useState<CustomerTrackingRecord[]>(() => {
    if (isSupabaseConfigured()) return [];
    try {
      const saved = localStorage.getItem('aetra_tracking');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Survey Submissions state (Supabase is single source of truth)
  const [surveys, setSurveys] = useState<SurveySubmission[]>(() => {
    if (isSupabaseConfigured()) return [];
    try {
      const saved = localStorage.getItem('aetra_surveys');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Monthly Bills state (Supabase is single source of truth)
  const [bills, setBills] = useState<MonthlyBillRecord[]>([]);

  // Admin sub-tab state ('registrations' | 'bills' | 'surveys' | 'field' | 'accounts')
  const [adminSubTab, setAdminSubTab] = useState<'registrations' | 'bills' | 'surveys' | 'field' | 'accounts'>('registrations');

  // Customer Status Workflow calculation based on registration record
  const currentCustomerReg = useMemo(() => {
    if (!currentUser || currentUser.role === 'admin') return null;
    const cleanEmail = currentUser.email?.toLowerCase().trim();
    const cleanId = currentUser.idPelanggan?.trim();

    return (
      registrations.find((r) => {
        // 1. Match by direct user ID
        if (currentUser.id && (r as any).userId === currentUser.id) return true;
        if (currentUser.userId && (r as any).userId === currentUser.userId) return true;

        // 2. Match by exact confirmed customer ID
        if (cleanId && cleanId.length > 5 && r.idPelanggan && r.idPelanggan.trim() === cleanId) return true;

        // 3. Match by exact email
        if (cleanEmail && r.email && r.email.toLowerCase().trim() === cleanEmail) return true;

        return false;
      }) || null
    );
  }, [currentUser, registrations]);

  // Compute customer tracking records strictly scoped to current user account
  const customerTrackingList = useMemo(() => {
    if (userRole === 'admin') {
      return trackingRecords;
    }
    if (!currentUser) {
      return [];
    }

    const cleanUserEmail = currentUser.email?.toLowerCase().trim();
    const cleanUserId = currentUser.idPelanggan?.trim();

    // Registrations owned by this user account
    const userRegForms = new Set<string>();
    registrations.forEach((reg) => {
      const matchUserId = Boolean(
        (currentUser.id && (reg as any).userId === currentUser.id) ||
        (currentUser.userId && (reg as any).userId === currentUser.userId)
      );
      const matchEmail = Boolean(cleanUserEmail && reg.email && reg.email.toLowerCase().trim() === cleanUserEmail);
      const matchId = Boolean(cleanUserId && cleanUserId.length > 5 && reg.idPelanggan && reg.idPelanggan.trim() === cleanUserId);

      if (matchUserId || matchEmail || matchId) {
        userRegForms.add(reg.noForm);
      }
    });

    const filtered = trackingRecords.filter((rec) => {
      const matchEmail = Boolean(cleanUserEmail && rec.email && rec.email.toLowerCase().trim() === cleanUserEmail);
      const matchId = Boolean(cleanUserId && cleanUserId.length > 5 && rec.idPelanggan && rec.idPelanggan.trim() === cleanUserId);
      const matchRegForm = userRegForms.has(rec.noForm);
      return matchEmail || matchId || matchRegForm;
    });

    return filtered;
  }, [userRole, trackingRecords, currentUser, registrations]);

  const customerStatus: RegistrationStatus = useMemo(() => {
    if (!currentUser) return 'NEW_USER';
    if (currentUser.role === 'admin') return 'ACTIVE_CUSTOMER';
    if (!currentCustomerReg) return 'NEW_USER';
    
    // Status hanya ACTIVE_CUSTOMER jika tahapan sambungan sudah selesai (trackingStep >= 5)
    if ((currentCustomerReg.trackingStep || 1) >= 5) {
      return 'ACTIVE_CUSTOMER';
    }
    if (currentCustomerReg.statusPembayaran === 'Menunggu Verifikasi Kasir' || currentCustomerReg.paymentProof || currentCustomerReg.statusPendaftaran === 'PAYMENT_CONFIRMED' || currentCustomerReg.status_pendaftaran === 'PAYMENT_CONFIRMED') {
      return 'PAYMENT_CONFIRMED';
    }
    if (currentCustomerReg.nomorPembayaran || currentCustomerReg.trackingStep === 2 || currentCustomerReg.statusPendaftaran === 'WAITING_PAYMENT' || currentCustomerReg.status_pendaftaran === 'WAITING_PAYMENT') {
      return 'WAITING_PAYMENT';
    }
    if (currentCustomerReg.trackingStep === 3 || currentCustomerReg.trackingStep === 4 || currentCustomerReg.statusPendaftaran === 'INSTALLATION_TRACKING' || currentCustomerReg.status_pendaftaran === 'INSTALLATION_TRACKING') {
      return 'INSTALLATION_TRACKING';
    }
    return 'VERIFYING';
  }, [currentUser, currentCustomerReg]);

  const isSidebarVisible = useMemo(() => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;

    // Fitur sidebar BARU DITAMPILKAN KETIKA PROSES TAHAPAN SAMBUNGANNYA SELESAI (Tahap 5: Air Bersih Mengalir / Selesai)
    const hasFinishedReg = Boolean(currentCustomerReg && (currentCustomerReg.trackingStep || 1) >= 5);
    const hasFinishedTracking = Boolean(
      customerTrackingList &&
        customerTrackingList.some((rec) => {
          const isStep5 = (rec.currentStep || 1) >= 5;
          const step5Completed = rec.steps?.some((st) => st.step === 5 && st.isCompleted);
          return isStep5 || step5Completed;
        })
    );

    return hasFinishedReg || hasFinishedTracking;
  }, [currentUser, currentCustomerReg, customerTrackingList]);

  // Receipt Modal State
  const [receiptData, setReceiptData] = useState<RegistrationFormData | null>(null);
  // Supabase Guide & Database Modal
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [dbVersion, setDbVersion] = useState(0);

  // Initial load from Supabase as single source of truth for all cross-browser data
  const loadFromSupabase = useCallback(async () => {
    try {
      const [remoteRegs, remoteTrackings, remoteSurveys, remoteBills] = await Promise.all([
        fetchRegistrationsFromDb(),
        fetchTrackingRecordsFromDb(),
        fetchSurveysFromDb(),
        fetchMonthlyBillsFromDb(),
      ]);

      if (remoteRegs !== null) {
        setRegistrations(remoteRegs);
      }
      if (remoteTrackings !== null) {
        setTrackingRecords(remoteTrackings);
      }
      if (remoteSurveys !== null) {
        setSurveys(remoteSurveys);
      }
      if (remoteBills !== null) {
        setBills(remoteBills);
      }
    } catch (err) {
      console.warn('Initial data fetch notice:', err);
    }
  }, []);

  // Separate, safe initial auth check on mount only (never auto-re-login if logged out)
  useEffect(() => {
    const checkInitialAuth = async () => {
      if (!isSupabaseConfigured()) return;
      try {
        const hasSavedUser = Boolean(localStorage.getItem('aetra_current_user'));
        if (hasSavedUser) {
          const sessionUser = await getSupabaseSessionUser();
          if (sessionUser) {
            setCurrentUser(sessionUser);
            setUserRole(sessionUser.role);
          }
        }
      } catch (e) {
        console.warn('Initial auth check notice:', e);
      }
    };
    checkInitialAuth();
  }, []);

  useEffect(() => {
    loadFromSupabase();

    // Subscribe to Supabase Auth state changes only when Supabase is configured
    let authSub: { unsubscribe: () => void } | null = null;
    if (isSupabaseConfigured()) {
      try {
        const client = getSupabaseClient();
        const { data } = client.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_OUT') {
            setCurrentUser(null);
            setUserRole('customer');
            localStorage.removeItem('aetra_current_user');
          } else if (event === 'SIGNED_IN' && session?.user) {
            const user = await getSupabaseSessionUser();
            if (user) {
              setCurrentUser(user);
              setUserRole(user.role);
              localStorage.setItem('aetra_current_user', JSON.stringify(user));
            }
          }
        });
        authSub = data?.subscription || null;
      } catch (e) {
        console.warn('Auth state change subscription notice:', e);
      }
    }

    // Supabase Realtime Channel: Listen to changes across all tables so Browser A immediately syncs to Browser B
    let realtimeChannel: any = null;
    if (isSupabaseConfigured()) {
      try {
        const client = getSupabaseClient();
        realtimeChannel = client
          .channel('public-db-changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, () => {
            fetchRegistrationsFromDb().then((data) => {
              if (data !== null) setRegistrations(data);
            });
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'tracking_records' }, () => {
            fetchTrackingRecordsFromDb().then((data) => {
              if (data !== null) setTrackingRecords(data);
            });
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'monthly_bills' }, () => {
            fetchMonthlyBillsFromDb().then((data) => {
              if (data !== null) setBills(data);
            });
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'surveys' }, () => {
            fetchSurveysFromDb().then((data) => {
              if (data !== null) setSurveys(data);
            });
          })
          .subscribe();
      } catch (err) {
        console.warn('Realtime subscription notice:', err);
      }
    }

    // Interval polling backup every 15 seconds to guarantee cross-browser sync even if Realtime socket drops
    const pollInterval = setInterval(() => {
      if (isSupabaseConfigured()) {
        loadFromSupabase();
      }
    }, 15000);

    // Listen to local sync events
    const unsub = cloudSyncService.addListener(() => {
      const snap = cloudSyncService.getLocalSnapshot();
      if (snap.registrations) setRegistrations(snap.registrations);
      if (snap.trackingRecords) setTrackingRecords(snap.trackingRecords);
      if (snap.surveys) setSurveys(snap.surveys);
      if (snap.bills) setBills(snap.bills);
    });

    return () => {
      authSub?.unsubscribe();
      if (realtimeChannel) {
        try {
          getSupabaseClient().removeChannel(realtimeChannel);
        } catch {}
      }
      clearInterval(pollInterval);
      unsub();
    };
  }, [loadFromSupabase]);

  // Sync with local storage safely
  useEffect(() => {
    safeLocalStorageSetItem('aetra_registrations', registrations);
  }, [registrations]);

  useEffect(() => {
    safeLocalStorageSetItem('aetra_tracking', trackingRecords);
  }, [trackingRecords]);

  useEffect(() => {
    safeLocalStorageSetItem('aetra_surveys', surveys);
  }, [surveys]);

  useEffect(() => {
    safeLocalStorageSetItem('aetra_customer_bills', bills);
  }, [bills]);

  // Handler when admin updates customer bills (manual or excel import)
  const handleUpdateBills = async (newBills: MonthlyBillRecord[]) => {
    setBills(newBills);
    safeLocalStorageSetItem('aetra_customer_bills', newBills);
    cloudSyncService.saveBills(newBills);
    for (const b of newBills) {
      await saveMonthlyBillToDb(b);
    }
  };

  // Handler when user registers a new customer
  const handleRegisterSuccess = async (newRecord: RegistrationFormData) => {
    const recordWithUser: RegistrationFormData = {
      ...newRecord,
      userId: currentUser?.id,
      email: newRecord.email || currentUser?.email || '',
    };

    setRegistrations((prev) => [recordWithUser, ...prev]);
    cloudSyncService.saveRegistration(recordWithUser);
    saveRegistrationToDb(recordWithUser).catch((e) => console.warn('Supabase reg save notice:', e));

    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const nowTimeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    // Create corresponding tracking record in live tracking with strict stage 1 alignment
    const newTracking: CustomerTrackingRecord = {
      noForm: recordWithUser.noForm,
      noSr: recordWithUser.noSr,
      idPelanggan: recordWithUser.idPelanggan || '', // Belum ada ID Pelanggan sampai pembayaran diverifikasi admin
      email: recordWithUser.email || currentUser?.email || '',
      nama: recordWithUser.namaKtp,
      telp: recordWithUser.telpHp,
      alamat: `${recordWithUser.alamatPasang}, RT/RW ${recordWithUser.rtRwPasang}, Desa ${recordWithUser.desaPasang || recordWithUser.kelurahanPasang}`,
      currentStep: 1,
      tanggalDaftar: `${todayStr}, ${nowTimeStr}`,
      estimasiSelesai: '14 - 1 Bulan Hari Kerja',
      golonganTarif: recordWithUser.golonganTarif || '2A1 - Rumah Tangga Standard',
      biayaSambungan: recordWithUser.biayaSambungan || 1371545,
      statusPembayaran: 'Belum Ditagihkan',
      petugasSurveyor: {
        nama: newRecord.dataPasang?.namaSales?.trim() || 'Bpk. Hendra Gunawan',
        id: newRecord.dataPasang?.noWorkOrder?.trim() ? `SRV-${newRecord.dataPasang.noWorkOrder.trim()}` : 'SRV-AET-042',
        telp: newRecord.dataPasang?.telpPetugas?.trim() || '0812-8899-1122',
        role: 'Surveyor Wilayah',
      },
      petugasTeknisi: {
        nama: newRecord.dataPasang?.namaTeknisi?.trim() || 'Bpk. Agus Santoso',
        id: 'TKN-AET-018',
        telp: newRecord.dataPasang?.telpPetugas?.trim() || '0877-8822-4645',
        role: 'Teknisi Lapangan',
      },
      nomorMeter: newRecord.dataPasang?.noSeriMeter?.trim() || '',
      nomorSegel: newRecord.dataPasang?.noSegel?.trim() || '',
      panjangPipaDinas: '4.5 Meter (Standar s/d 6m)',
      steps: [
        {
          step: 1,
          title: 'Verifikasi Berkas',
          statusLabel: `Sedang Berjalan: ${todayStr}`,
          updatedAt: todayStr,
          isCompleted: false,
          isCurrent: true,
          notes: 'Formulir pendaftaran berhasil diterima sistem dan sedang diperiksa oleh Tim Administrasi Aetra.',
        },
        {
          step: 2,
          title: 'Pembayaran Biaya Sambungan',
          statusLabel: 'Menunggu Verifikasi Tahap 1',
          updatedAt: '-',
          isCompleted: false,
          isCurrent: false,
          deadlineNote: 'Batas pembayaran: 7 hari kerja sejak persetujuan berkas.',
          notes: 'Nomor Pembayaran resmi akan diterbitkan setelah berkas administrasi disetujui.',
        },
        {
          step: 3,
          title: 'SPKO & Pipa Dinas',
          statusLabel: 'Menunggu Pembayaran',
          updatedAt: '-',
          isCompleted: false,
          isCurrent: false,
          notes: 'Penjadwalan teknisi lapangan untuk galian dan penarikan pipa dinas setelah pembayaran lunas.',
        },
        {
          step: 4,
          title: 'Proses Pemasangan Meteran',
          statusLabel: 'Belum Aktif',
          updatedAt: '-',
          isCompleted: false,
          isCurrent: false,
          notes: 'Pemasangan unit meter air SNI dan penguncian segel resmi di persil pelanggan.',
        },
        {
          step: 5,
          title: 'Air Mengalir',
          statusLabel: 'Belum Aktif',
          updatedAt: '-',
          isCompleted: false,
          isCurrent: false,
          notes: 'Uji pengaliran air bersih rampung dan sambungan siap digunakan.',
        },
      ],
      timelineEvents: [
        {
          id: `log-reg-${Date.now()}`,
          time: nowTimeStr,
          date: todayStr,
          title: 'Pendaftaran Sambungan Baru Diterima',
          description: `Formulir permohonan sambungan baru SR-${newRecord.noSr} atas nama ${newRecord.namaKtp} berhasil didaftarkan ke sistem Aetra.`,
          status: 'completed',
          step: 1,
          actor: 'Pelanggan / Pemohon',
          badge: 'Tersimpan',
        },
        {
          id: `log-verif-${Date.now()}`,
          time: nowTimeStr,
          date: todayStr,
          title: 'Pemeriksaan Berkas Administrasi',
          description: 'Petugas Administrasi Aetra sedang memeriksa kesesuaian dokumen identitas KTP, KK, dan data persil.',
          status: 'in_progress',
          step: 1,
          actor: 'Tim Administrasi Aetra',
          badge: 'Sedang Berjalan',
        },
      ],
    };

    setTrackingRecords((prev) => {
      const exists = prev.some((t) => t.noForm === newTracking.noForm || t.noSr === newTracking.noSr);
      if (exists) {
        return prev.map((t) => (t.noForm === newTracking.noForm ? newTracking : t));
      }
      return [newTracking, ...prev];
    });

    setActiveTrackingForm(newRecord.noForm);
    // Tidak langsung membuka ReceiptModal agar layar status "Pelanggan Sudah Melakukan Pendaftaran" langsung terlihat jelas oleh pelanggan.
    // Pelanggan dapat membuka tanda terima kapan saja melalui tombol "Lihat Bukti Tanda Terima / SPK" pada kartu status.

    // Save directly to localStorage immediately with safe storage wrapper
    try {
      const saved = localStorage.getItem('aetra_registrations');
      const currentList: RegistrationFormData[] = saved ? JSON.parse(saved) : [];
      const updatedList = [newRecord, ...currentList.filter((r) => r.noForm !== newRecord.noForm)];
      safeLocalStorageSetItem('aetra_registrations', updatedList);

      if (currentUser && !currentUser.idPelanggan) {
        const updatedUser = { ...currentUser, idPelanggan: newRecord.idPelanggan };
        setCurrentUser(updatedUser);
        safeLocalStorageSetItem('aetra_current_user', updatedUser);
      }
    } catch (err) {
      console.warn('Direct storage sync warning:', err);
    }

    // Persist to online Supabase database directly
    try {
      const regRes = await saveRegistrationToDb(recordWithUser);
      if (!regRes.success) {
        console.error('Supabase registration error:', regRes.error);
      }
      const trackRes = await saveTrackingRecordToDb(newTracking);
      if (!trackRes.success) {
        console.error('Supabase tracking error:', trackRes.error);
      }
    } catch (e) {
      console.warn('Supabase save error:', e);
    }
  };

  const handleUpdateTrackingStep = (noForm: string, nextStep: 1 | 2 | 3 | 4 | 5, customNote?: string) => {
    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const nowTimeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    // Synchronize registrations state
    setRegistrations((prev) => {
      const updatedList = prev.map((reg) => {
        if (reg.noForm !== noForm) return reg;
        const isComplete = nextStep === 5;
        const updatedReg: RegistrationFormData = {
          ...reg,
          trackingStep: nextStep,
          statusPembayaran: nextStep >= 2 ? ('Lunas' as const) : reg.statusPembayaran,
          statusPendaftaran: isComplete
            ? ('ACTIVE_CUSTOMER' as const)
            : nextStep === 2
            ? ('WAITING_PAYMENT' as const)
            : ('INSTALLATION_TRACKING' as const),
          status_pendaftaran: isComplete
            ? ('ACTIVE_CUSTOMER' as const)
            : nextStep === 2
            ? ('WAITING_PAYMENT' as const)
            : ('INSTALLATION_TRACKING' as const),
          dataPasang: {
            ...reg.dataPasang,
            noSeriMeter: nextStep >= 4 ? (reg.dataPasang?.noSeriMeter || 'AET-2609-8812') : reg.dataPasang?.noSeriMeter,
            noSegel: nextStep >= 4 ? (reg.dataPasang?.noSegel || 'SGL-AAT-77401') : reg.dataPasang?.noSegel,
          },
        };
        return updatedReg;
      });

      safeLocalStorageSetItem('aetra_registrations', updatedList);
      const targetReg = updatedList.find((r) => r.noForm === noForm);
      if (targetReg) {
        cloudSyncService.saveRegistration(targetReg);
        saveRegistrationToDb(targetReg).catch((e) => console.warn('Supabase reg update error:', e));
      }
      return updatedList;
    });

    setTrackingRecords((prev) => {
      const updatedList = prev.map((rec) => {
        if (rec.noForm !== noForm) return rec;

        const updatedSteps = rec.steps.map((st) => {
          // If stage is before nextStep, or if reaching step 5 (Air Mengalir) which completes the entire journey
          if (st.step < nextStep || (st.step === 5 && nextStep === 5)) {
            return {
              ...st,
              isCompleted: true,
              isCurrent: false,
              statusLabel: `Selesai: ${todayStr}`,
            };
          } else if (st.step === nextStep) {
            return {
              ...st,
              isCompleted: false,
              isCurrent: true,
              statusLabel: `Sedang Berjalan: ${todayStr}`,
            };
          } else {
            return {
              ...st,
              isCompleted: false,
              isCurrent: false,
              statusLabel: 'Menunggu Tahap Sebelumnya',
            };
          }
        });

        const stepTitles: Record<number, string> = {
          1: 'Verifikasi Berkas & Administrasi',
          2: 'Persetujuan Teknis & Konfirmasi Pembayaran',
          3: 'Penerbitan SPKO & Pengerjaan Pipa Dinas Kontraktor',
          4: 'Pemasangan Water Meter & Segel Resmi',
          5: 'Air Bersih Mengalir & Sambungan Aktif Resmi',
        };
        const stepDescs: Record<number, string> = {
          1: customNote || 'Berkas identitas KTP, KK, dan persil telah diperiksa dan dinyatakan lengkap oleh Tim Administrasi Aetra.',
          2: customNote || 'Persetujuan teknis disahkan dan pembayaran biaya sambungan telah diverifikasi Lunas oleh Billing Aetra.',
          3: customNote || 'Surat Perintah Kerja Operasional (SPKO) diterbitkan. Kontraktor mitra Aetra melakukan penarikan pipa dinas dan galian.',
          4: customNote || 'Instalasi water meter SNI dan penguncian segel kran resmi telah selesai dilaksanakan oleh teknisi di persil.',
          5: customNote || 'Uji debit air bersih sukses lulus standar Permenkes. Air bersih resmi mengalir lancar ke persil pelanggan!',
        };

        const newLog = {
          id: `log-step-${Date.now()}`,
          date: todayStr,
          time: nowTimeStr,
          title: stepTitles[nextStep] || 'Pembaruan Status oleh Admin',
          description: stepDescs[nextStep] || 'Tahapan status sambungan baru telah diperbarui oleh Admin Aetra.',
          status: 'completed' as const,
          step: nextStep,
          actor: 'Admin Operasional Aetra',
          badge: nextStep === 5 ? 'Selesai' : `Tahap ${nextStep} Terverifikasi`,
        };

        const existingLogs = rec.timelineEvents || [];

        return {
          ...rec,
          currentStep: nextStep,
          statusPembayaran: nextStep >= 2 ? ('Lunas' as const) : rec.statusPembayaran,
          nomorMeter: nextStep >= 4 ? (rec.nomorMeter || 'AET-2609-8812') : rec.nomorMeter,
          nomorSegel: nextStep >= 4 ? (rec.nomorSegel || 'SGL-AAT-77401') : rec.nomorSegel,
          lastUpdatedByAdmin: `${todayStr}, ${nowTimeStr} (Admin Operasional Aetra)`,
          steps: updatedSteps,
          timelineEvents: [newLog, ...existingLogs],
        };
      });

      safeLocalStorageSetItem('aetra_tracking', updatedList);
      const updatedRec = updatedList.find((r) => r.noForm === noForm);
      if (updatedRec) {
        saveTrackingRecordToDb(updatedRec).catch((e) => console.warn('Supabase step update error:', e));
        cloudSyncService.saveTracking(updatedRec);
      }
      return updatedList;
    });
  };

  const handleUpdateTechnicalData = (
    noForm: string,
    data: {
      idPelanggan?: string;
      nomorMeter?: string;
      nomorSegel?: string;
      petugasSurveyor?: string;
      petugasTeknisi?: string;
      statusPembayaran?: 'Lunas' | 'Menunggu Pembayaran';
      adminNotes?: string;
    }
  ) => {
    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const nowTimeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    setTrackingRecords((prev) => {
      const updatedList = prev.map((rec) => {
        if (rec.noForm !== noForm) return rec;

        const newLog = data.adminNotes
          ? {
              id: `log-admin-${Date.now()}`,
              date: todayStr,
              time: nowTimeStr,
              title: 'Catatan Admin Operasional Aetra',
              description: data.adminNotes,
              status: 'completed' as const,
              step: rec.currentStep,
              actor: 'Backoffice / Pengawas Aetra',
              badge: 'Catatan Resmi',
            }
          : null;

        const hasIdPelanggan = Boolean(data.idPelanggan && data.idPelanggan.trim() !== '');
        const updatedStatusPembayaran = hasIdPelanggan ? 'Lunas' : (data.statusPembayaran !== undefined ? data.statusPembayaran : rec.statusPembayaran);

        return {
          ...rec,
          idPelanggan: data.idPelanggan !== undefined ? data.idPelanggan : rec.idPelanggan,
          nomorMeter: data.nomorMeter !== undefined ? data.nomorMeter : rec.nomorMeter,
          nomorSegel: data.nomorSegel !== undefined ? data.nomorSegel : rec.nomorSegel,
          statusPembayaran: updatedStatusPembayaran,
          adminNotes: data.adminNotes !== undefined ? data.adminNotes : rec.adminNotes,
          lastUpdatedByAdmin: `${todayStr}, ${nowTimeStr} (Admin Operasional Aetra)`,
          petugasSurveyor: data.petugasSurveyor
            ? {
                nama: data.petugasSurveyor,
                id: rec.petugasSurveyor?.id || 'SRV-042',
                telp: rec.petugasSurveyor?.telp || '0812-9876-5432',
                role: 'Surveyor Wilayah',
              }
            : rec.petugasSurveyor,
          petugasTeknisi: data.petugasTeknisi
            ? {
                nama: data.petugasTeknisi,
                id: rec.petugasTeknisi?.id || 'TKN-089',
                telp: rec.petugasTeknisi?.telp || '0813-8899-7711',
                role: 'Teknisi Lapangan',
              }
            : rec.petugasTeknisi,
          timelineEvents: newLog ? [newLog, ...(rec.timelineEvents || [])] : rec.timelineEvents,
        };
      });

      const updatedRec = updatedList.find((r) => r.noForm === noForm);
      if (updatedRec) {
        saveTrackingRecordToDb(updatedRec).catch((e) => console.warn('Supabase tech update error:', e));
        cloudSyncService.saveTracking(updatedRec);
      }
      safeLocalStorageSetItem('aetra_tracking', updatedList);
      return updatedList;
    });

    setRegistrations((prev) => {
      const updatedList = prev.map((reg) => {
        if (reg.noForm !== noForm) return reg;
        const isStep5 = (reg.trackingStep || 1) >= 5;
        const hasIdPelanggan = Boolean(data.idPelanggan && data.idPelanggan.trim() !== '');
        const updatedReg = {
          ...reg,
          idPelanggan: data.idPelanggan !== undefined ? data.idPelanggan : reg.idPelanggan,
          statusPembayaran: hasIdPelanggan ? ('Lunas' as const) : reg.statusPembayaran,
          statusPendaftaran: isStep5 ? ('ACTIVE_CUSTOMER' as const) : reg.statusPendaftaran,
          status_pendaftaran: isStep5 ? ('ACTIVE_CUSTOMER' as const) : reg.status_pendaftaran,
          dataPasang: {
            ...reg.dataPasang,
            noSeriMeter: data.nomorMeter || reg.dataPasang?.noSeriMeter || '',
            noSegel: data.nomorSegel || reg.dataPasang?.noSegel || '',
          },
        };
        return updatedReg;
      });

      safeLocalStorageSetItem('aetra_registrations', updatedList);
      const targetReg = updatedList.find((r) => r.noForm === noForm);
      if (targetReg) {
        cloudSyncService.saveRegistration(targetReg);
        saveRegistrationToDb(targetReg).catch((e) => console.warn('Supabase tech reg update error:', e));
      }
      return updatedList;
    });

    // Sync with currentUser if matches
    if (data.idPelanggan) {
      setCurrentUser((prevUser) => {
        if (!prevUser) return prevUser;
        const targetReg = registrations.find((r) => r.noForm === noForm);
        if (
          targetReg &&
          (prevUser.email?.toLowerCase() === targetReg.email?.toLowerCase() ||
            prevUser.idPelanggan === targetReg.idPelanggan ||
            prevUser.idPelanggan === noForm)
        ) {
          const updatedUser: UserAccount = { ...prevUser, idPelanggan: data.idPelanggan || prevUser.idPelanggan };
          localStorage.setItem('aetra_current_user', JSON.stringify(updatedUser));
          return updatedUser;
        }
        return prevUser;
      });
    }
  };

  const handleDeleteRegistration = (noForm: string) => {
    setRegistrations((prev) => prev.filter((r) => r.noForm !== noForm));
    setTrackingRecords((prev) => prev.filter((t) => t.noForm !== noForm));
    deleteRegistrationFromDb(noForm).catch((e) => console.warn('Supabase delete error:', e));
    cloudSyncService.deleteRegistration(noForm);
    if (activeTrackingForm === noForm) {
      setActiveTrackingForm('');
    }
  };

  const handleApproveRegistration = (
    noForm: string, 
    nomorPembayaran: string, 
    biayaSambungan: number, 
    adminNotes?: string,
    customIdPelanggan?: string
  ) => {
    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const nowTimeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const isPaymentVerification = Boolean(customIdPelanggan && customIdPelanggan.trim() !== '');
    const finalIdPelanggan = isPaymentVerification ? customIdPelanggan!.trim() : '';

    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.noForm !== noForm) return reg;
        return {
          ...reg,
          idPelanggan: finalIdPelanggan || reg.idPelanggan || '',
          statusPendaftaran: isPaymentVerification ? ('INSTALLATION_TRACKING' as const) : ('WAITING_PAYMENT' as const),
          status_pendaftaran: isPaymentVerification ? ('INSTALLATION_TRACKING' as const) : ('WAITING_PAYMENT' as const),
          statusPembayaran: isPaymentVerification ? ('Lunas' as const) : ('Menunggu Pembayaran' as const),
          nomorPembayaran,
          nomor_pembayaran: nomorPembayaran,
          biayaSambungan,
          trackingStep: isPaymentVerification ? (3 as const) : (2 as const),
        };
      })
    );

    setTrackingRecords((prev) =>
      prev.map((rec) => {
        if (rec.noForm !== noForm) return rec;

        const nextStep = isPaymentVerification ? 3 : 2;

        const updatedSteps = rec.steps.map((st) => {
          if (st.step < nextStep) {
            return {
              ...st,
              isCompleted: true,
              isCurrent: false,
              statusLabel: `Selesai: ${todayStr}`,
            };
          } else if (st.step === nextStep) {
            return {
              ...st,
              isCompleted: false,
              isCurrent: true,
              statusLabel: isPaymentVerification ? 'Pengerjaan Pipa Dinas & SPKO' : 'Menunggu Pembayaran',
              notes: isPaymentVerification
                ? `ID Pelanggan resmi: ${finalIdPelanggan}. Tim kontraktor menjadwalkan penarikan pipa dinas.`
                : `Nomor Pembayaran Pelanggan: ${nomorPembayaran}. Silakan lakukan pembayaran via ATM/Indomaret/Alfamart.`,
            };
          }
          return st;
        });

        const newLog: TrackingTimelineEvent = isPaymentVerification
          ? {
              id: `log-payverif-${Date.now()}`,
              date: todayStr,
              time: nowTimeStr,
              title: 'Pembayaran Lunas & ID Pelanggan Resmi Diterbitkan',
              description: adminNotes || `Pembayaran biaya sambungan baru telah diverifikasi Lunas. ID Pelanggan resmi: ${finalIdPelanggan}. SPKO diterbitkan untuk penarikan pipa dinas.`,
              status: 'completed',
              step: 3,
              actor: 'Kasir & Admin Aetra',
              badge: 'Lunas & Aktif',
            }
          : {
              id: `log-approve-${Date.now()}`,
              date: todayStr,
              time: nowTimeStr,
              title: 'Berkas Disetujui - Nomor Pembayaran Diterbitkan',
              description: adminNotes || `Berkas pemohon telah diverifikasi dan disetujui. Nomor Pembayaran resmi: ${nomorPembayaran} sebesar Rp ${biayaSambungan.toLocaleString('id-ID')}.`,
              status: 'completed',
              step: 2,
              actor: 'Petugas Administrasi Aetra',
              badge: 'Disetujui',
            };

        const updated: CustomerTrackingRecord = {
          ...rec,
          idPelanggan: finalIdPelanggan || rec.idPelanggan || '',
          currentStep: nextStep as 1 | 2 | 3 | 4 | 5,
          nomorPembayaran,
          biayaSambungan,
          statusPembayaran: isPaymentVerification ? 'Lunas' : 'Menunggu Pembayaran',
          steps: updatedSteps,
          timelineEvents: [newLog, ...(rec.timelineEvents || [])],
        };

        cloudSyncService.saveTracking(updated);
        saveTrackingRecordToDb(updated).catch((e) => console.warn(e));
        return updated;
      })
    );

    // Persist to local storage safely
    try {
      const saved = localStorage.getItem('aetra_registrations');
      if (saved) {
        const list: RegistrationFormData[] = JSON.parse(saved);
        const updatedList = list.map((r) =>
          r.noForm === noForm
            ? {
                ...r,
                idPelanggan: finalIdPelanggan || r.idPelanggan || '',
                statusPendaftaran: isPaymentVerification ? ('INSTALLATION_TRACKING' as const) : ('WAITING_PAYMENT' as const),
                status_pendaftaran: isPaymentVerification ? ('INSTALLATION_TRACKING' as const) : ('WAITING_PAYMENT' as const),
                statusPembayaran: isPaymentVerification ? ('Lunas' as const) : ('Menunggu Pembayaran' as const),
                nomorPembayaran,
                nomor_pembayaran: nomorPembayaran,
                biayaSambungan,
                trackingStep: isPaymentVerification ? 3 : 2,
              }
            : r
        );
        safeLocalStorageSetItem('aetra_registrations', updatedList);
      }
    } catch (e) {
      console.warn(e);
    }

    // Sync with currentUser if matches
    setCurrentUser((prevUser) => {
      if (!prevUser) return prevUser;
      const targetReg = registrations.find((r) => r.noForm === noForm);
      if (
        targetReg &&
        (prevUser.email?.toLowerCase() === targetReg.email?.toLowerCase() ||
          prevUser.idPelanggan === targetReg.idPelanggan ||
          prevUser.telp?.replace(/\D/g, '') === targetReg.telpHp?.replace(/\D/g, '') ||
          prevUser.nama?.toLowerCase() === targetReg.namaKtp?.toLowerCase() ||
          prevUser.idPelanggan === noForm)
      ) {
        const updatedUser = { 
          ...prevUser, 
          idPelanggan: finalIdPelanggan || prevUser.idPelanggan 
        };
        safeLocalStorageSetItem('aetra_current_user', updatedUser);
        return updatedUser;
      }
      return prevUser;
    });

    // Broadcast storage event for real-time synchronization across UI components
    window.dispatchEvent(new Event('storage'));
  };

  const handleRejectRegistration = (noForm: string, reason: string) => {
    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const nowTimeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.noForm === noForm
          ? {
              ...reg,
              statusPendaftaran: 'NEW_USER' as any,
              status_pendaftaran: 'NEW_USER' as any,
              keteranganSkema: `Ditolak / Perlu Revisi: ${reason}`,
            }
          : reg
      )
    );

    setTrackingRecords((prev) =>
      prev.map((rec) => {
        if (rec.noForm !== noForm) return rec;
        const newLog: TrackingTimelineEvent = {
          id: `log-reject-${Date.now()}`,
          date: todayStr,
          time: nowTimeStr,
          title: 'Permohonan Ditolak / Perlu Revisi Berkas',
          description: `Alasan: ${reason}`,
          status: 'in_progress',
          step: 1,
          actor: 'Petugas Administrasi Aetra',
          badge: 'Perlu Revisi',
        };
        const updated: CustomerTrackingRecord = {
          ...rec,
          timelineEvents: [newLog, ...(rec.timelineEvents || [])],
        };
        cloudSyncService.saveTracking(updated);
        return updated;
      })
    );
  };

  const handleImportRegistrations = (newRecords: RegistrationFormData[]) => {
    setRegistrations((prev) => {
      const existingForms = new Set(prev.map((r) => r.noForm));
      const filtered = newRecords.filter((r) => !existingForms.has(r.noForm));
      return [...filtered, ...prev];
    });

    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    setTrackingRecords((prev) => {
      const existingTrackingForms = new Set(prev.map((t) => t.noForm));
      const newTrackings: CustomerTrackingRecord[] = newRecords
        .filter((r) => !existingTrackingForms.has(r.noForm))
        .map((r) => {
          const step = (r.trackingStep as 1 | 2 | 3 | 4) || 1;
          const isPaid = step >= 2;
          return {
            noForm: r.noForm,
            noSr: r.noSr,
            idPelanggan: r.idPelanggan || ('10' + r.noForm.replace(/\D/g, '').padEnd(6, '0')),
            email: r.email,
            nama: r.namaKtp,
            telp: r.telpHp,
            alamat: `${r.alamatPasang}, RT/RW ${r.rtRwPasang}, Kel. ${r.kelurahanPasang || r.desaPasang || '-'}`,
            currentStep: step,
            tanggalDaftar: r.tanggal || todayStr,
            estimasiSelesai: '14 Hari Kerja',
            golonganTarif: r.golonganTarif || '2A1 - Rumah Tangga Standard',
            biayaSambungan: r.biayaSambungan || 1371545,
            statusPembayaran: isPaid ? 'Lunas' : 'Menunggu Pembayaran',
            nomorMeter: r.dataPasang?.noSeriMeter,
            nomorSegel: r.dataPasang?.noSegel,
            petugasSurveyor: {
              nama: 'Bpk. Hendra Gunawan',
              id: 'SRV-AET-042',
              telp: '0812-8899-1122',
              role: 'Surveyor Wilayah',
            },
            petugasTeknisi: {
              nama: r.dataPasang?.namaTeknisi || 'Bpk. Agus Santoso',
              id: 'TKN-AET-018',
              telp: '0877-8822-4645',
              role: 'Teknisi Pipa Dinas & Meter',
            },
            steps: [
              {
                step: 1,
                title: 'Pendaftaran Diterima',
                statusLabel: 'Selesai',
                updatedAt: r.tanggal || todayStr,
                isCompleted: true,
                isCurrent: step === 1,
                notes: 'Formulir pendaftaran berhasil diimpor ke sistem.',
              },
              {
                step: 2,
                title: 'Pembayaran Diterima',
                statusLabel: isPaid ? 'Lunas' : 'Menunggu Pembayaran',
                updatedAt: isPaid ? todayStr : '-',
                isCompleted: isPaid,
                isCurrent: step === 2,
                notes: isPaid ? 'Pembayaran terverifikasi lunas.' : 'Menunggu pembayaran di loket resmi.',
              },
              {
                step: 3,
                title: 'Proses Pemasangan',
                statusLabel: step >= 3 ? 'Sedang Dipasang' : 'Menunggu',
                updatedAt: step >= 3 ? todayStr : '-',
                isCompleted: step >= 3,
                isCurrent: step === 3,
                notes: 'Pemasangan fisik pipa dinas dan water meter.',
              },
              {
                step: 4,
                title: 'Selesai / Air Mengalir',
                statusLabel: step === 4 ? 'Aktif' : 'Belum Aktif',
                updatedAt: step === 4 ? todayStr : '-',
                isCompleted: step === 4,
                isCurrent: step === 4,
                notes: 'Air bersih mengalir dan siap digunakan.',
              },
            ],
            timelineEvents: [],
          };
        });
      return [...newTrackings, ...prev];
    });

    newRecords.forEach((reg) => {
      saveRegistrationToDb(reg).catch((e) => console.warn('Supabase sync error:', e));
    });
  };

  const handleNavigateToTracking = (noForm: string) => {
    setActiveTrackingForm(noForm);
    setActiveTab('tracking');
    setReceiptData(null);
  };

  const handleQuickDemoRegister = () => {
    const demoForm: RegistrationFormData = {
      id: 'reg-' + Date.now(),
      noForm: '572910',
      noSr: '168392',
      idPelanggan: '10842918',
      tanggal: new Date().toISOString().split('T')[0],
      namaKtp: 'Bpk. Suryadi Pratama',
      noKtp: '3671041908850003',
      alamatKtp: 'Jl. Merpati No. 24 RT 003/004, Kel. Cikupa, Tangerang',
      rtRwKtp: '003/004',
      kodePosKtp: '15710',
      kelurahanKtp: 'Cikupa',
      telpHp: '0812-9876-5432',
      email: 'suryadi.pratama@gmail.com',
      alamatPasang: 'Jl. Merpati Indah No. 24 RT 003/004',
      rtRwPasang: '003/004',
      kodePosPasang: '15710',
      kelurahanPasang: 'Cikupa',
      pekerjaan: 'Karyawan Swasta',
      statusKepemilikan: 'Milik Sendiri',
      persyaratan: {
        ktp: true,
        kk: true,
        pbb: true,
        lainnya: false,
      },
      luasTanah: '90',
      luasBangunan: '72',
      totalLuasBangunan: 72,
      fungsiBangunan: 'Rumah Tinggal Pribadi',
      kondisiBangunan: {
        jumlahLantai: 1,
        luasBangunan: '72',
        totalLuasBangunan: 72,
        jumlahPenghuni: 4,
      },
      lingkungan: {
        saluranPembuangan: 'Got Tertutup',
        sanitasi: 'Septic Tank Pribadi',
        halaman: 'Ada',
        lebarJalan: '6 Meter',
        lingkunganTertata: 'Ya',
        realEstate: 'Bukan',
      },
      dataPasang: {
        namaSales: 'Aetra Digital Portal',
        tanggalSurvey: new Date().toISOString().split('T')[0],
        noWorkOrder: 'WO-2026-9901',
        gpsLat: '-6.223451',
        gpsLong: '106.512344',
        namaKontraktor: 'PT Mitra Tirta Tangerang',
        dataAlamat: 'Jl. Merpati Indah No. 24 RT 003/004, Cikupa',
        dataJaringan: 'Pipa Tersier HDPE 63mm',
        dataGalian: ['Tanah Biasa', 'Paving Blok'],
        luasBangunanSurvey: '72 m2',
        kualitasBangunan: 'Permanen Baik',
        fotoProperti: '',
        diameterPipa: '1/2 inch',
        panjangPipa: '4.5 meter',
        panjangPipaTipe: 'Standar (s/d 6m)',
        materialTambahan: 'Kran Kuningan, Stop Kran Ball Valve',
        tanggalPasangMeter: '',
        noSegel: 'SGL-AAT-99120',
        noSeriMeter: 'AET-2609-8472',
      },
      skemaPembayaran: 'Pembayaran Penuh',
      biayaSambungan: 1371545,
      golonganTarif: '2A1 - Rumah Tangga Standard',
      persetujuan: true,
      trackingStep: 1,
      createdAt: new Date().toISOString(),
    };
    handleRegisterSuccess(demoForm);
    setReceiptData(null);
    setActiveTab('tracking');
  };

  const handleAddSurvey = async (newSurvey: SurveySubmission) => {
    setSurveys((prev) => [newSurvey, ...prev]);
    const res = await saveSurveyToDb(newSurvey);
    if (!res.success) {
      console.error('Supabase survey save error:', res.error);
    }
    cloudSyncService.saveSurvey(newSurvey);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setUserRole(user.role);
    localStorage.setItem('aetra_current_user', JSON.stringify(user));
    if (user.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('registration');
    }
  };

  const handleLogout = async () => {
    setCurrentUser(null);
    setUserRole('customer');
    setActiveTab('registration');
    localStorage.removeItem('aetra_current_user');
    try {
      await signOutUserWithSupabase();
    } catch (e) {
      console.warn('Sign out notice:', e);
    }
  };

  const handleSwitchRole = (role: UserRole) => {
    // Keamanan: Hanya akun administrator resmi yang dapat beralih tampilan
    if (currentUser?.role !== 'admin') {
      return;
    }
    setUserRole(role);
    if (role === 'admin') {
      setActiveTab('admin');
    } else {
      if (activeTab === 'admin') {
        setActiveTab('registration');
      }
    }
  };

  const handleSelectTab = (tab: TabType) => {
    // Keamanan: Cegah akun pelanggan membuka tab admin
    if (tab === 'admin' && currentUser?.role !== 'admin') {
      return;
    }
    setActiveTab(tab);
  };

  // If user is not logged in, gate the application with AuthScreen
  if (!currentUser) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const isAdminPortal = currentUser?.role === 'admin' && (activeTab === 'admin' || userRole === 'admin');

  return (
    <div className={`min-h-screen font-sans text-slate-800 transition-colors duration-200 ${
      isAdminPortal
        ? 'bg-[#F2ECE1] selection:bg-[#DC602E]/25 selection:text-[#143833]'
        : 'bg-[#F5EFE6] selection:bg-[#DC602E]/25 selection:text-[#143833]'
    }`}>
      {/* Left Sidebar Navigation (Only visible for Admin or Active Customer with installed meter) */}
      {isSidebarVisible && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleSelectTab}
          adminSubTab={adminSubTab}
          onSelectAdminSubTab={setAdminSubTab}
          registeredCount={registrations.length}
          isOpenMobile={isOpenMobile}
          setIsOpenMobile={setIsOpenMobile}
          userRole={userRole}
          currentUser={currentUser}
          customerStatus={customerStatus}
          onLogout={handleLogout}
          onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          onSwitchRole={currentUser?.role === 'admin' ? handleSwitchRole : undefined}
        />
      )}

      {/* Main Content Column (Full width when sidebar is hidden, lg:pl-80 when sidebar is visible) */}
      <div className={`${isSidebarVisible ? 'lg:pl-80' : 'w-full'} flex flex-col min-h-screen`}>
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsOpenMobile(true)}
          registeredCount={registrations.length}
          userRole={userRole}
          currentUser={currentUser}
          customerStatus={customerStatus}
          isSidebarVisible={isSidebarVisible}
          onLogout={handleLogout}
          onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          onSelectTab={handleSelectTab}
          onSwitchRole={currentUser?.role === 'admin' ? handleSwitchRole : undefined}
        />

        {/* Dedicated Mobile App Bar Header (Only visible on mobile screens when sidebar is visible) */}
        {isSidebarVisible && (
          <div className="lg:hidden px-3 pt-3 pb-1">
            <div className={`text-white p-3.5 rounded-2xl shadow-sm flex items-center justify-between gap-3 ${
              currentUser?.role === 'admin' || userRole === 'admin'
                ? 'bg-linear-to-r from-[#143833] via-[#1B453E] to-[#102E2A] border border-[#23534B]'
                : 'bg-linear-to-r from-[#143833] via-[#1C4A42] to-[#102E2A] border border-[#23534B]'
            }`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-9 h-9 rounded-xl text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${
                  currentUser?.role === 'admin' || userRole === 'admin'
                    ? 'bg-[#DC602E] border border-white/20'
                    : 'bg-[#DC602E] border border-white/20'
                }`}>
                  {currentUser?.nama?.slice(0, 2).toUpperCase() || 'PL'}
                </div>
                <div className="min-w-0">
                  <span className={`text-[10px] block leading-tight ${
                    currentUser?.role === 'admin' || userRole === 'admin' ? 'text-[#A6C4BE]' : 'text-[#A6C4BE]'
                  }`}>
                    {currentUser?.role === 'admin' ? 'Backoffice & Administrator' : 'Halo, Pelanggan Aetra'}
                  </span>
                  <span className="text-xs font-black truncate block text-white">{currentUser?.nama}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[9px] uppercase tracking-wider font-bold block ${
                  currentUser?.role === 'admin' || userRole === 'admin' ? 'text-[#A6C4BE]' : 'text-[#A6C4BE]'
                }`}>
                  {currentUser?.role === 'admin' ? 'Otoritas' : 'ID Pelanggan'}
                </span>
                <span className="text-xs font-mono font-black text-amber-300 bg-white/10 px-2 py-0.5 rounded-lg border border-white/15 block">
                  {currentUser?.role === 'admin' ? 'ADMIN' : (currentUser?.idPelanggan ? `#${currentUser.idPelanggan}` : 'Menunggu Pelunasan')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Modules */}
        <main className={`flex-1 w-full ${isSidebarVisible ? 'max-w-7xl' : 'max-w-5xl'} mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-28 lg:pb-8`}>
          {activeTab === 'admin' && currentUser?.role === 'admin' && (
            <AdminSection
              registrations={registrations}
              trackingRecords={trackingRecords}
              surveys={surveys}
              bills={bills}
              onUpdateBills={handleUpdateBills}
              activeSubTab={adminSubTab}
              onChangeSubTab={setAdminSubTab}
              onUpdateTrackingStep={handleUpdateTrackingStep}
              onUpdateTechnicalData={handleUpdateTechnicalData}
              onApproveRegistration={handleApproveRegistration}
              onRejectRegistration={handleRejectRegistration}
              onDeleteRegistration={handleDeleteRegistration}
              onQuickDemoRegister={handleQuickDemoRegister}
              onNavigateToTracking={handleNavigateToTracking}
              onNavigateToRegister={() => setActiveTab('registration')}
              onViewReceipt={(record) => setReceiptData(record)}
              onImportRegistrations={handleImportRegistrations}
              onSwitchToCustomer={() => {
                setUserRole('customer');
                setActiveTab('registration');
              }}
              onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
            />
          )}

          {activeTab === 'registration' && (
            <RegistrationForm
              onRegisterSuccess={handleRegisterSuccess}
              onNavigateTracking={handleNavigateToTracking}
              currentUser={currentUser}
              existingRegistrations={registrations}
              onViewReceipt={(record) => setReceiptData(record)}
              onUpdateRegistration={(updatedReg) => {
                setRegistrations((prev) =>
                  prev.map((r) => (r.noForm === updatedReg.noForm ? updatedReg : r))
                );
              }}
            />
          )}

          {activeTab === 'tracking' && (
            <TrackingSection
              trackingRecords={customerTrackingList}
              registrations={registrations}
              activeFormNumber={activeTrackingForm}
              currentUser={currentUser}
              onSelectCustomer={(noForm) => setActiveTrackingForm(noForm)}
              onUpdateTrackingStep={handleUpdateTrackingStep}
              onNavigateToRegister={() => setActiveTab('registration')}
              onQuickDemoRegister={handleQuickDemoRegister}
              onNavigateToAdmin={currentUser?.role === 'admin' ? (noForm) => {
                setUserRole('admin');
                setActiveTab('admin');
                if (noForm) {
                  setActiveTrackingForm(noForm);
                }
              } : undefined}
            />
          )}

          {activeTab === 'billing' && (
            <MonthlyBillSection
              currentUser={currentUser}
              registrations={registrations}
              externalBills={bills}
              onNavigateToRegister={() => setActiveTab('registration')}
            />
          )}

          {activeTab === 'survey' && (
            <SurveySection
              submissions={surveys}
              onSubmitSurvey={handleAddSurvey}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'faq' && (
            <FaqSection faqItems={INITIAL_FAQS} />
          )}
        </main>

        {/* Dedicated Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
          customerStatus={customerStatus}
          registeredCount={registrations.length}
          adminSubTab={adminSubTab}
          onSelectAdminSubTab={setAdminSubTab}
        />

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-slate-600 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AetraLogo size="sm" variant="horizontal" />
                <div className="border-l border-slate-200 pl-3">
                  <span className="font-bold text-slate-900 text-xs block">
                    PT AETRA AIR TANGERANG
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Penyedia Layanan Air Bersih Terpercaya Kabupaten &amp; Kota Tangerang
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-slate-500 text-xs">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#F37021]" />
                  Standar Mutu Permenkes RI
                </span>
                <span className="flex items-center gap-1.5 text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                  <Droplets className="w-3.5 h-3.5 text-teal-600" />
                  Jaminan Kualitas Air Bersih
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
              <div>
                <p className="text-slate-600 font-medium">PT Aetra Air Tangerang</p>
                <p className="text-slate-500">Jl. Raya Curug No.27, Kadu Jaya, Curug, Tangerang Banten 15810 &bull; Email: contact.center@aat.co.id</p>
              </div>
              <p>&copy; 2026 Hak Cipta Dilindungi &bull; Sistem Layanan Pelanggan Terpadu</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Confirmation & Printable Slip Modal */}
      {receiptData && (
        <ReceiptModal
          data={receiptData}
          isOpen={Boolean(receiptData)}
          onClose={() => setReceiptData(null)}
          onTrackNow={() => {
            setActiveTrackingForm(receiptData.noForm);
            setActiveTab('tracking');
          }}
        />
      )}

      {/* Supabase Database & Vercel Guide Modal */}
      <SupabaseModal
        key={dbVersion}
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onCredentialsUpdated={() => {
          setDbVersion((v) => v + 1);
          loadFromSupabase();
        }}
      />
    </div>
  );
}
