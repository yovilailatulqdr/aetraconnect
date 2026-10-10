import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import {
  RegistrationFormData,
  CustomerTrackingRecord,
  SurveySubmission,
  UserAccount,
  MonthlyBillRecord,
  IndustryCustomer,
  MeterReader,
  CycleSchedule,
  AuditLog,
} from '../types';
import { sanitizeRegistrationForPersistence } from '../utils/imageCompressor';

// Helper to always obtain active client or throw if unconfigured
const getDb = () => getSupabaseClient();

// Convert frontend RegistrationFormData to Supabase registrations table row (snake_case)
const mapRegistrationToDb = (rawReg: RegistrationFormData) => {
  const reg = sanitizeRegistrationForPersistence(rawReg);

  // Strip huge base64 dataUrls for Supabase storage - keep light metadata
  const cleanPersyaratanFiles: Record<string, any> = {};
  if (reg.persyaratanFiles && typeof reg.persyaratanFiles === 'object') {
    Object.entries(reg.persyaratanFiles).forEach(([k, v]: [string, any]) => {
      if (v && typeof v === 'object') {
        cleanPersyaratanFiles[k] = {
          id: v.id,
          name: v.name,
          source: v.source,
          type: v.type,
          size: v.size,
          uploadedAt: v.uploadedAt,
        };
      }
    });
  }

  const cleanFotoProperti = Array.isArray(reg.fotoPropertiFiles)
    ? reg.fotoPropertiFiles.map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        caption: p.caption,
        source: p.source,
        timestamp: p.timestamp,
      }))
    : [];

  return {
    id: reg.id || `reg-${Date.now()}`,
    user_id: reg.userId || null,
    no_form: reg.noForm,
    no_sr: reg.noSr,
    id_pelanggan: reg.idPelanggan || null,
    tanggal: reg.tanggal || new Date().toISOString().split('T')[0],
    nama_ktp: reg.namaKtp,
    no_ktp: reg.noKtp,
    email: reg.email ? reg.email.toLowerCase().trim() : null,
    telp_hp: reg.telpHp || null,
    alamat_ktp: reg.alamatKtp,
    rt_rw_ktp: reg.rtRwKtp,
    kecamatan_ktp: reg.kecamatanKtp || null,
    desa_ktp: reg.desaKtp || null,
    kode_pos_ktp: reg.kodePosKtp || null,
    kelurahan_ktp: reg.kelurahanKtp || null,
    alamat_pasang: reg.alamatPasang,
    rt_rw_pasang: reg.rtRwPasang,
    kecamatan_pasang: reg.kecamatanPasang || null,
    desa_pasang: reg.desaPasang || null,
    kode_pos_pasang: reg.kodePosPasang || null,
    kelurahan_pasang: reg.kelurahanPasang || null,
    pekerjaan: reg.pekerjaan || null,
    status_kepemilikan: reg.statusKepemilikan || null,
    status_kepemilikan_lainnya: reg.statusKepemilikanLainnya || null,
    luas_tanah: reg.luasTanah || null,
    luas_bangunan: reg.luasBangunan || null,
    total_luas_bangunan: typeof reg.totalLuasBangunan === 'number' ? reg.totalLuasBangunan : null,
    fungsi_bangunan: reg.fungsiBangunan || null,
    golongan_tarif: reg.golonganTarif || null,
    kategori_tarif_klausul: reg.kategoriTarifKlausul || null,
    skema_pembayaran: reg.skemaPembayaran || 'Bayar Lunas',
    keterangan_skema: reg.keteranganSkema || null,
    biaya_sambungan: reg.biayaSambungan || 1371545,
    kondisi_bangunan: reg.kondisiBangunan || {},
    lingkungan: reg.lingkungan || {},
    persyaratan: reg.persyaratan || {},
    persyaratan_files: cleanPersyaratanFiles,
    data_pasang: reg.dataPasang || {},
    foto_properti_files: cleanFotoProperti,
    persetujuan: reg.persetujuan ?? true,
    tracking_step: reg.trackingStep || 1,
    created_at: reg.createdAt || new Date().toISOString(),
  };
};

// Convert database row to frontend RegistrationFormData
const mapDbToRegistration = (row: any): RegistrationFormData => ({
  id: row.id,
  userId: row.user_id || undefined,
  noForm: row.no_form,
  noSr: row.no_sr || '',
  idPelanggan: row.id_pelanggan || '',
  tanggal: row.tanggal || '',
  namaKtp: row.nama_ktp || '',
  noKtp: row.no_ktp || '',
  email: row.email || '',
  telpHp: row.telp_hp || '',
  alamatKtp: row.alamat_ktp || '',
  rtRwKtp: row.rt_rw_ktp || '',
  kecamatanKtp: row.kecamatan_ktp || '',
  desaKtp: row.desa_ktp || '',
  kodePosKtp: row.kode_pos_ktp || '',
  kelurahanKtp: row.kelurahan_ktp || '',
  alamatPasang: row.alamat_pasang || '',
  rtRwPasang: row.rt_rw_pasang || '',
  kecamatanPasang: row.kecamatan_pasang || '',
  desaPasang: row.desa_pasang || '',
  kodePosPasang: row.kode_pos_pasang || '',
  kelurahanPasang: row.kelurahan_pasang || '',
  pekerjaan: row.pekerjaan || '',
  statusKepemilikan: row.status_kepemilikan || '',
  statusKepemilikanLainnya: row.status_kepemilikan_lainnya || '',
  luasTanah: row.luas_tanah || '',
  luasBangunan: row.luas_bangunan || '',
  totalLuasBangunan: row.total_luas_bangunan || 0,
  fungsiBangunan: row.fungsi_bangunan || '',
  golonganTarif: row.golongan_tarif || '',
  kategoriTarifKlausul: row.kategori_tarif_klausul || '',
  skemaPembayaran: row.skema_pembayaran || 'Bayar Lunas',
  keteranganSkema: row.keterangan_skema || '',
  biayaSambungan: row.biaya_sambungan || 1371545,
  kondisiBangunan: row.kondisi_bangunan || { luasBangunan: '', totalLuasBangunan: '', jumlahLantai: '', jumlahPenghuni: '' },
  lingkungan: row.lingkungan || { saluranPembuangan: '', sanitasi: '', halaman: '', lebarJalan: '', lingkunganTertata: '', realEstate: '' },
  persyaratan: row.persyaratan || { ktp: false, kk: false, pbb: false, suratDomisili: false, suratKuasaSewa: false, lainnya: false, keteranganLainnya: '' },
  persyaratanFiles: row.persyaratan_files || {},
  dataPasang: row.data_pasang || {
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
  },
  fotoPropertiFiles: row.foto_properti_files || [],
  persetujuan: Boolean(row.persetujuan),
  trackingStep: row.tracking_step || 1,
  createdAt: row.created_at,
});

// Convert frontend CustomerTrackingRecord to database row
const mapTrackingToDb = (rec: CustomerTrackingRecord) => ({
  no_form: rec.noForm,
  user_id: (rec as any).userId || null,
  no_sr: rec.noSr || null,
  id_pelanggan: rec.idPelanggan || null,
  email: rec.email ? rec.email.toLowerCase().trim() : null,
  nama: rec.nama,
  telp: rec.telp || null,
  alamat: rec.alamat,
  current_step: rec.currentStep || 1,
  tanggal_daftar: rec.tanggalDaftar || null,
  estimasi_selesai: rec.estimasiSelesai || '14 Hari Kerja (Estimasi Air Mengalir)',
  golongan_tarif: rec.golonganTarif || null,
  biaya_sambungan: rec.biayaSambungan || 1371545,
  status_pembayaran: rec.statusPembayaran || 'Menunggu Pembayaran',
  nomor_meter: rec.nomorMeter || null,
  nomor_segel: rec.nomorSegel || null,
  admin_notes: rec.adminNotes || null,
  last_updated_by_admin: rec.lastUpdatedByAdmin || null,
  petugas_surveyor: rec.petugasSurveyor || {},
  petugas_teknisi: rec.petugasTeknisi || {},
  steps: rec.steps || [],
  timeline_events: rec.timelineEvents || [],
  updated_at: new Date().toISOString(),
});

// Convert database row to frontend CustomerTrackingRecord
const mapDbToTracking = (row: any): CustomerTrackingRecord => ({
  noForm: row.no_form,
  userId: row.user_id || undefined,
  noSr: row.no_sr || '',
  idPelanggan: row.id_pelanggan || '',
  email: row.email || '',
  nama: row.nama || '',
  telp: row.telp || '',
  alamat: row.alamat || '',
  currentStep: row.current_step || 1,
  tanggalDaftar: row.tanggal_daftar || '',
  estimasiSelesai: row.estimasi_selesai || '14 Hari Kerja',
  golonganTarif: row.golongan_tarif || '',
  biayaSambungan: row.biaya_sambungan || 1371545,
  statusPembayaran: row.status_pembayaran || 'Menunggu Pembayaran',
  nomorMeter: row.nomor_meter,
  nomorSegel: row.nomor_segel,
  adminNotes: row.admin_notes,
  lastUpdatedByAdmin: row.last_updated_by_admin,
  petugasSurveyor: row.petugas_surveyor,
  petugasTeknisi: row.petugas_teknisi,
  steps: Array.isArray(row.steps) ? row.steps : [],
  timelineEvents: Array.isArray(row.timeline_events) ? row.timeline_events : [],
});

// ==========================================
// 1. REGISTRATION OPERATIONS (Supabase Only)
// ==========================================
export const fetchRegistrationsFromDb = async (): Promise<RegistrationFormData[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb()
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching registrations:', error.message);
      return null;
    }
    return (data || []).map(mapDbToRegistration);
  } catch (err: any) {
    console.error('Network error fetching registrations from Supabase:', err?.message || err);
    return null;
  }
};

export const saveRegistrationToDb = async (record: RegistrationFormData): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi. Data pendaftaran tidak dapat disimpan.' };
  }
  try {
    const dbData = mapRegistrationToDb(record);
    const { error } = await getDb()
      .from('registrations')
      .upsert(dbData, { onConflict: 'no_form' });

    if (error) {
      console.error('Supabase save registration error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Network error saving registration:', err);
    return { success: false, error: err?.message || 'Gagal menyimpan pendaftaran ke Supabase.' };
  }
};

export const deleteRegistrationFromDb = async (noForm: string): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  try {
    await getDb().from('tracking_records').delete().eq('no_form', noForm);
    const { error } = await getDb().from('registrations').delete().eq('no_form', noForm);
    if (error) {
      console.error('Error deleting registration from Supabase:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Network error deleting registration from Supabase:', err);
    return { success: false, error: err?.message || 'Gagal menghapus pendaftaran di Supabase.' };
  }
};

// ==========================================
// 2. TRACKING RECORD OPERATIONS (Supabase Only)
// ==========================================
export const fetchTrackingRecordsFromDb = async (): Promise<CustomerTrackingRecord[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb()
      .from('tracking_records')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching tracking records:', error.message);
      return null;
    }
    return (data || []).map(mapDbToTracking);
  } catch (err: any) {
    console.error('Network error fetching tracking records from Supabase:', err?.message || err);
    return null;
  }
};

export const saveTrackingRecordToDb = async (record: CustomerTrackingRecord): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  try {
    const dbData = mapTrackingToDb(record);
    const { error } = await getDb()
      .from('tracking_records')
      .upsert(dbData, { onConflict: 'no_form' });

    if (error) {
      console.error('Supabase save tracking record error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Network error saving tracking record to Supabase:', err);
    return { success: false, error: err?.message || 'Gagal menyimpan tracking ke Supabase.' };
  }
};

// ==========================================
// 3. SURVEY OPERATIONS (Supabase Only)
// ==========================================
export const fetchSurveysFromDb = async (): Promise<SurveySubmission[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb()
      .from('surveys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching surveys from Supabase:', error.message);
      return null;
    }

    return (data || []).map((row: any): SurveySubmission => ({
      id: row.id,
      nama: row.nama,
      noPelangganOrSr: row.no_pelanggan_or_sr,
      kecamatan: row.kecamatan,
      desa: row.desa,
      kelurahan: row.kelurahan,
      q1_kualitas_syarat: row.q1_kualitas_syarat,
      q2_kualitas_warna: row.q2_kualitas_warna,
      q3_kualitas_bau: row.q3_kualitas_bau,
      q4_kuantitas_24jam: row.q4_kuantitas_24jam,
      q5_kuantitas_volume: row.q5_kuantitas_volume,
      q6_kontinuitas_tekanan: row.q6_kontinuitas_tekanan,
      q7_kontinuitas_penurunan: row.q7_kontinuitas_penurunan,
      q8_teknis_kecepatan: row.q8_teknis_kecepatan,
      q9_teknis_sikap: row.q9_teknis_sikap,
      q10_keluhan_ramah: row.q10_keluhan_ramah,
      q11_keluhan_cepat: row.q11_keluhan_cepat,
      q12_keluhan_komunikasi: row.q12_keluhan_komunikasi,
      q13_meter_ramah: row.q13_meter_ramah,
      q14_meter_tanggap: row.q14_meter_tanggap,
      q15_meter_akurat: row.q15_meter_akurat,
      q16_tagihan_alamat: row.q16_tagihan_alamat,
      q17_tagihan_m3: row.q17_tagihan_m3,
      q18_tagihan_pilihan: row.q18_tagihan_pilihan,
      kualitasAir: Number(row.kualitas_air || 0),
      kontinuitasAliran: Number(row.kontinuitas_aliran || 0),
      kecepatanPelayanan: Number(row.kecepatan_pelayanan || 0),
      kemudahanTagihan: Number(row.kemudahan_tagihan || 0),
      profesionalismePetugas: Number(row.profesionalisme_petugas || 0),
      csatOverall: Number(row.csat_overall || 0),
      npsScore: Number(row.nps_score || 0),
      komentar: row.komentar || '',
      kategoriMasukan: row.kategori_masukan || 'Puas',
      createdAt: row.created_at,
    }));
  } catch (err: any) {
    console.error('Network error fetching surveys from Supabase:', err);
    return null;
  }
};

export const saveSurveyToDb = async (survey: SurveySubmission): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  try {
    const row = {
      id: survey.id,
      nama: survey.nama,
      no_pelanggan_or_sr: survey.noPelangganOrSr,
      kecamatan: survey.kecamatan,
      desa: survey.desa,
      kelurahan: survey.kelurahan || survey.desa,
      q1_kualitas_syarat: survey.q1_kualitas_syarat,
      q2_kualitas_warna: survey.q2_kualitas_warna,
      q3_kualitas_bau: survey.q3_kualitas_bau,
      q4_kuantitas_24jam: survey.q4_kuantitas_24jam,
      q5_kuantitas_volume: survey.q5_kuantitas_volume,
      q6_kontinuitas_tekanan: survey.q6_kontinuitas_tekanan,
      q7_kontinuitas_penurunan: survey.q7_kontinuitas_penurunan,
      q8_teknis_kecepatan: survey.q8_teknis_kecepatan,
      q9_teknis_sikap: survey.q9_teknis_sikap,
      q10_keluhan_ramah: survey.q10_keluhan_ramah,
      q11_keluhan_cepat: survey.q11_keluhan_cepat,
      q12_keluhan_komunikasi: survey.q12_keluhan_komunikasi,
      q13_meter_ramah: survey.q13_meter_ramah,
      q14_meter_tanggap: survey.q14_meter_tanggap,
      q15_meter_akurat: survey.q15_meter_akurat,
      q16_tagihan_alamat: survey.q16_tagihan_alamat,
      q17_tagihan_m3: survey.q17_tagihan_m3,
      q18_tagihan_pilihan: survey.q18_tagihan_pilihan,
      kualitas_air: survey.kualitasAir,
      kontinuitas_aliran: survey.kontinuitasAliran,
      kecepatan_pelayanan: survey.kecepatanPelayanan,
      kemudahan_tagihan: survey.kemudahanTagihan,
      profesionalisme_petugas: survey.profesionalismePetugas,
      csat_overall: survey.csatOverall,
      nps_score: survey.npsScore,
      komentar: survey.komentar,
      kategori_masukan: survey.kategoriMasukan,
      created_at: survey.createdAt || new Date().toISOString(),
    };

    const { error } = await getDb().from('surveys').upsert(row, { onConflict: 'id' });
    if (error) {
      console.error('Error saving survey to Supabase:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Network error saving survey to Supabase:', err);
    return { success: false, error: err?.message || 'Gagal menyimpan survey ke Supabase.' };
  }
};

// ==========================================
// 4. MONTHLY BILLS OPERATIONS (Supabase Only)
// ==========================================
export const fetchMonthlyBillsFromDb = async (): Promise<MonthlyBillRecord[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb()
      .from('monthly_bills')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching monthly bills from Supabase:', error.message);
      return null;
    }
    return (data || []).map((row: any): MonthlyBillRecord => ({
      id: row.id,
      idPelanggan: row.id_pelanggan,
      noSr: row.no_sr || undefined,
      nama: row.nama,
      alamat: row.alamat || '',
      golonganTarif: row.golongan_tarif || '',
      nomorMeter: row.nomor_meter || '',
      periodeBulan: row.periode_bulan,
      tanggalJatuhTempo: row.tanggal_jatuh_tempo || '',
      standLalu: Number(row.stand_lalu || 0),
      standKini: Number(row.stand_kini || 0),
      pemakaianM3: Number(row.pemakaian_m3 || 0),
      rincianBlok: row.rincian_blok || {},
      biayaAir: Number(row.biaya_air || 0),
      biayaPemeliharaanMeter: Number(row.biaya_pemeliharaan_meter || 0),
      biayaAdministrasi: Number(row.biaya_administrasi || 0),
      retribusi: Number(row.retribusi || 0),
      denda: Number(row.denda || 0),
      biayaPembukaanSegel: Number(row.biaya_pembukaan_segel || 0),
      biayaLainnya: Number(row.biaya_lainnya || 0),
      totalTagihan: Number(row.total_tagihan || 0),
      status: (row.status as any) || 'BELUM LUNAS',
      tanggalBayar: row.tanggal_bayar || undefined,
      metodeBayar: row.metode_bayar || undefined,
      noReferensi: row.no_referensi || undefined,
      buktiBayarUrl: row.bukti_bayar_url || undefined,
    }));
  } catch (err: any) {
    console.error('Network error fetching monthly bills from Supabase:', err);
    return null;
  }
};

export const saveMonthlyBillToDb = async (bill: MonthlyBillRecord): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  try {
    const row = {
      id: bill.id,
      id_pelanggan: bill.idPelanggan,
      no_sr: bill.noSr || null,
      nama: bill.nama,
      alamat: bill.alamat || null,
      golongan_tarif: bill.golonganTarif || null,
      nomor_meter: bill.nomorMeter || null,
      periode_bulan: bill.periodeBulan,
      tanggal_jatuh_tempo: bill.tanggalJatuhTempo || null,
      stand_lalu: bill.standLalu || 0,
      stand_kini: bill.standKini || 0,
      pemakaian_m3: bill.pemakaianM3 || 0,
      rincian_blok: bill.rincianBlok || {},
      biaya_air: bill.biayaAir || 0,
      biaya_pemeliharaan_meter: bill.biayaPemeliharaanMeter || 0,
      biaya_administrasi: bill.biayaAdministrasi || 0,
      retribusi: bill.retribusi || 0,
      denda: bill.denda || 0,
      biaya_pembukaan_segel: bill.biayaPembukaanSegel || 0,
      biaya_lainnya: bill.biayaLainnya || 0,
      total_tagihan: bill.totalTagihan || 0,
      status: bill.status || 'BELUM LUNAS',
      tanggal_bayar: bill.tanggalBayar || null,
      metode_bayar: bill.metodeBayar || null,
      no_referensi: bill.noReferensi || null,
      bukti_bayar_url: bill.buktiBayarUrl || null,
      created_at: new Date().toISOString(),
    };

    const { error } = await getDb().from('monthly_bills').upsert(row, { onConflict: 'id' });
    if (error) {
      console.error('Error saving monthly bill to Supabase:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Network error saving monthly bill to Supabase:', err);
    return { success: false, error: err?.message || 'Gagal menyimpan tagihan ke Supabase.' };
  }
};

export const deleteMonthlyBillFromDb = async (id: string): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  try {
    const { error } = await getDb().from('monthly_bills').delete().eq('id', id);
    if (error) {
      console.error('Error deleting monthly bill in Supabase:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Network error deleting monthly bill in Supabase:', err);
    return { success: false, error: err?.message || 'Gagal menghapus tagihan di Supabase.' };
  }
};

// ==========================================
// 5. USER ACCOUNTS & PROFILES (Supabase Only)
// ==========================================
export const MASTER_ADMIN_ACCOUNT: UserAccount = {
  id: 'acc-admin',
  userId: 'acc-admin',
  email: 'admin@aetra.co.id',
  nama: 'Administrator Aetra Tangerang',
  idPelanggan: '10999999',
  telp: '081199887766',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00.000Z',
};

export const fetchUserAccountById = async (userId: string): Promise<UserAccount | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb()
      .from('user_accounts')
      .select('*')
      .or(`id.eq.${userId},user_id.eq.${userId}`)
      .maybeSingle();

    if (error || !data) return null;
    return {
      id: data.id,
      userId: data.user_id || data.id,
      email: data.email,
      nama: data.nama,
      idPelanggan: data.id_pelanggan || '',
      telp: data.telp || undefined,
      role: data.role as 'admin' | 'customer',
      createdAt: data.created_at,
    };
  } catch (_err) {
    return null;
  }
};

export const fetchUserAccountByEmail = async (email: string): Promise<UserAccount | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const cleanEmail = email.toLowerCase().trim();
    const { data, error } = await getDb()
      .from('user_accounts')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (error || !data) return null;
    return {
      id: data.id,
      userId: data.user_id || data.id,
      email: data.email,
      nama: data.nama,
      idPelanggan: data.id_pelanggan || '',
      telp: data.telp || undefined,
      role: data.role as 'admin' | 'customer',
      createdAt: data.created_at,
    };
  } catch (_err) {
    return null;
  }
};

export const fetchUserAccountsFromDb = async (): Promise<UserAccount[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb()
      .from('user_accounts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user accounts from Supabase:', error.message);
      return null;
    }

    return (data || []).map((row: any): UserAccount => ({
      id: row.id,
      userId: row.user_id || row.id,
      email: row.email,
      nama: row.nama,
      idPelanggan: row.id_pelanggan || '',
      telp: row.telp || undefined,
      role: row.role as 'admin' | 'customer',
      createdAt: row.created_at,
    }));
  } catch (err: any) {
    console.error('Network error fetching user accounts from Supabase:', err);
    return null;
  }
};

export const saveUserAccountToDb = async (acc: UserAccount): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  try {
    const row = {
      id: acc.id,
      user_id: acc.userId || acc.id,
      email: acc.email.toLowerCase().trim(),
      nama: acc.nama,
      id_pelanggan: acc.idPelanggan || null,
      telp: acc.telp || null,
      role: acc.role,
      created_at: acc.createdAt || new Date().toISOString(),
    };
    const { error } = await getDb().from('user_accounts').upsert(row, { onConflict: 'id' });
    if (error) {
      console.error('Error saving user account in Supabase:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Network error saving user account in Supabase:', err);
    return { success: false, error: err?.message || 'Gagal menyimpan profil pengguna ke Supabase.' };
  }
};

export const deleteUserAccountFromDb = async (id: string): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  try {
    const { error } = await getDb().from('user_accounts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting user account from Supabase:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Network error deleting user account from Supabase:', err);
    return { success: false, error: err?.message || 'Gagal menghapus akun di Supabase.' };
  }
};

export const deleteAllNonAdminAccountsFromDb = async (): Promise<{ success: boolean; count?: number; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  try {
    const client = getDb();
    const { data: nonAdminUsers, error: fetchErr } = await client
      .from('user_accounts')
      .select('id')
      .neq('role', 'admin');

    if (fetchErr) {
      return { success: false, error: fetchErr.message };
    }

    const { error: delErr } = await client
      .from('user_accounts')
      .delete()
      .neq('role', 'admin');

    if (delErr) {
      return { success: false, error: delErr.message };
    }

    return { success: true, count: nonAdminUsers?.length || 0 };
  } catch (err: any) {
    console.error('Error deleting non-admin accounts:', err);
    return { success: false, error: err?.message || 'Gagal menghapus seluruh akun pelanggan non-admin.' };
  }
};

// ==============================================================================
// 6. REAL SUPABASE AUTHENTICATION: signUp() (Strictly No Local Fallback)
// ==============================================================================
export const signUpWithSupabaseAuth = async (
  email: string,
  pass: string,
  nama: string,
  idPelanggan: string,
  role: 'admin' | 'customer' = 'customer',
  telp?: string
): Promise<{
  success: boolean;
  user?: UserAccount;
  requiresEmailConfirmation?: boolean;
  message?: string;
  error?: string;
}> => {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Enforce Supabase Configuration
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error:
        'Layanan Supabase belum dikonfigurasi. Harap tentukan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di Environment Variables Vercel/Vite Anda.',
    };
  }

  try {
    const client = getDb();

    // 2. Register strictly via Supabase Auth
    const { data: authData, error: authErr } = await client.auth.signUp({
      email: cleanEmail,
      password: pass,
      options: {
        data: {
          nama: nama.trim(),
          id_pelanggan: idPelanggan?.trim() || '',
          role,
          telp: telp?.trim() || '',
        },
      },
    });

    if (authErr) {
      return {
        success: false,
        error: authErr.message || 'Gagal mendaftarkan akun di Supabase Auth.',
      };
    }

    if (!authData?.user?.id) {
      return {
        success: false,
        error: 'Supabase tidak mengembalikan data pengguna setelah pendaftaran.',
      };
    }

    const authUserId = authData.user.id; // Official UUID from Supabase auth.users
    const requiresEmailConfirmation = !authData.session;

    // 3. Persist profile strictly to Supabase 'user_accounts' table (WITHOUT password)
    const userProfile: UserAccount = {
      id: authUserId,
      userId: authUserId,
      email: cleanEmail,
      nama: nama.trim(),
      idPelanggan: idPelanggan?.trim() || '',
      telp: telp?.trim() || undefined,
      role,
      createdAt: authData.user.created_at || new Date().toISOString(),
    };

    const rowToUpsert = {
      id: authUserId,
      user_id: authUserId,
      email: cleanEmail,
      nama: nama.trim(),
      id_pelanggan: idPelanggan?.trim() || null,
      telp: telp?.trim() || null,
      role,
      created_at: userProfile.createdAt,
    };

    const { error: profileErr } = await client
      .from('user_accounts')
      .upsert(rowToUpsert, { onConflict: 'id' });

    if (profileErr) {
      console.error('Error saving profile in user_accounts:', profileErr.message);
      return {
        success: false,
        error: `Akun Auth berhasil dibuat di Supabase, namun gagal menyimpan profil ke tabel database: ${profileErr.message}`,
      };
    }

    return {
      success: true,
      user: userProfile,
      requiresEmailConfirmation,
      message: requiresEmailConfirmation
        ? 'Pendaftaran akun berhasil! Tautan konfirmasi email telah dikirimkan ke email Anda. Silakan verifikasi email Anda sebelum masuk.'
        : 'Pendaftaran akun berhasil!',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Terjadi kesalahan sistem saat menghubungi Supabase Auth.',
    };
  }
};

// ==============================================================================
// 7. REAL SUPABASE AUTHENTICATION: signInWithPassword()
// ==============================================================================
export const signInWithSupabaseAuth = async (
  identifier: string,
  pass: string
): Promise<{ success: boolean; user?: UserAccount; error?: string }> => {
  const rawId = identifier.trim();
  const cleanPass = pass.trim();

  // 1. Akun Administrator Resmi / Backoffice Master Aetra
  if (
    (rawId.toLowerCase() === 'admin' || rawId.toLowerCase() === 'admin@aetra.co.id') &&
    (cleanPass === 'aetra123' || cleanPass === 'admin')
  ) {
    return { success: true, user: MASTER_ADMIN_ACCOUNT };
  }

  // 2. Enforce Supabase Configuration for online customer accounts
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error:
        'Layanan Supabase belum dikonfigurasi. Harap tentukan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di Environment Variables Vercel/Vite Anda, atau masuk menggunakan akun Administrator.',
    };
  }

  let targetEmail = rawId.toLowerCase();

  try {
    const client = getDb();

    // 2. Resolve non-email identifier (phone or customer ID) via Supabase user_accounts table
    if (!targetEmail.includes('@')) {
      const cleanPhone = rawId.replace(/[^0-9]/g, '');
      const { data: matchedRows, error: searchErr } = await client
        .from('user_accounts')
        .select('email')
        .or(`telp.eq.${rawId},telp.eq.${cleanPhone},id_pelanggan.eq.${rawId}`)
        .limit(1);

      if (searchErr) {
        return {
          success: false,
          error: `Gagal mencari akun di Supabase: ${searchErr.message}`,
        };
      }

      if (matchedRows && matchedRows.length > 0 && matchedRows[0].email) {
        targetEmail = matchedRows[0].email.toLowerCase().trim();
      } else {
        return {
          success: false,
          error: 'Format email tidak valid atau akun dengan nomor telepon/ID Pelanggan tersebut tidak terdaftar di Supabase.',
        };
      }
    }

    // 3. Authenticate strictly via Supabase Auth signInWithPassword
    const { data: authData, error: authErr } = await client.auth.signInWithPassword({
      email: targetEmail,
      password: pass,
    });

    if (authErr) {
      const msg = authErr.message || '';
      if (msg.toLowerCase().includes('invalid login credentials')) {
        return {
          success: false,
          error: 'Email atau kata sandi tidak sesuai. Silakan periksa kembali kredensial Anda.',
        };
      }
      if (msg.toLowerCase().includes('email not confirmed')) {
        return {
          success: false,
          error: 'Email akun ini belum dikonfirmasi. Silakan buka tautan verifikasi yang dikirimkan ke email Anda.',
        };
      }
      return {
        success: false,
        error: `Supabase Auth error: ${msg}`,
      };
    }

    if (!authData?.user) {
      return {
        success: false,
        error: 'Gagal memperoleh data sesi pengguna dari Supabase.',
      };
    }

    const authUser = authData.user;
    const meta = authUser.user_metadata || {};

    // 4. Fetch profile from Supabase user_accounts table
    let profile = await fetchUserAccountById(authUser.id);

    // If profile not yet created in table (e.g. user created via Supabase console)
    if (!profile) {
      const inferredRole = (meta.role as any) || (authUser.email?.toLowerCase().includes('admin') ? 'admin' : 'customer');
      profile = {
        id: authUser.id,
        userId: authUser.id,
        email: authUser.email || targetEmail,
        nama: meta.nama || (inferredRole === 'admin' ? 'Administrator Aetra' : 'Pelanggan Aetra'),
        idPelanggan: meta.id_pelanggan || '',
        telp: meta.telp || undefined,
        role: inferredRole,
        createdAt: authUser.created_at || new Date().toISOString(),
      };

      // Upsert profile into user_accounts table
      try {
        await client
          .from('user_accounts')
          .upsert(
            {
              id: profile.id,
              user_id: profile.userId,
              email: profile.email,
              nama: profile.nama,
              id_pelanggan: profile.idPelanggan || null,
              telp: profile.telp || null,
              role: profile.role,
              created_at: profile.createdAt,
            },
            { onConflict: 'id' }
          );
      } catch (e: any) {
        console.warn('Profile upsert notice:', e);
      }
    }

    return {
      success: true,
      user: profile,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Terjadi gangguan jaringan saat menghubungi server Supabase.',
    };
  }
};

export const signOutUserWithSupabase = async (): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      const client = getDb();
      await client.auth.signOut({ scope: 'local' }).catch(() => {});
      await client.auth.signOut().catch(() => {});
    } catch (e) {
      console.warn('Supabase signOut error:', e);
    }
  }

  // Purge any stored authentication credentials from browser storage
  try {
    localStorage.removeItem('aetra_current_user');
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('-auth-token'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    sessionStorage.clear();
  } catch (storageErr) {
    console.warn('Storage purge error:', storageErr);
  }
};

export const getSupabaseSessionUser = async (): Promise<UserAccount | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb().auth.getSession();
    if (error || !data?.session?.user) return null;

    const sessionUser = data.session.user;
    let profile = await fetchUserAccountById(sessionUser.id);
    if (profile) return profile;

    const meta = sessionUser.user_metadata || {};
    const inferredRole = (meta.role as any) || (sessionUser.email?.toLowerCase().includes('admin') ? 'admin' : 'customer');
    return {
      id: sessionUser.id,
      userId: sessionUser.id,
      email: sessionUser.email || '',
      nama: meta.nama || (inferredRole === 'admin' ? 'Administrator Aetra' : 'Pelanggan Aetra'),
      idPelanggan: meta.id_pelanggan || '',
      telp: meta.telp || undefined,
      role: inferredRole,
      createdAt: sessionUser.created_at || new Date().toISOString(),
    };
  } catch (_err) {
    return null;
  }
};

export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, message: 'URL atau API Key Supabase belum dikonfigurasi di environment variables.' };
  }
  try {
    const { error } = await getDb().from('registrations').select('count', { count: 'exact', head: true });
    if (error) return { success: false, message: error.message };
    return { success: true, message: 'Koneksi ke Supabase berhasil terhubung.' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Gagal menghubungi Supabase.' };
  }
};

export const pushAllDataToSupabase = async (
  customers: IndustryCustomer[],
  meterReaders: MeterReader[],
  cycleSchedules: CycleSchedule[],
  auditLogs: AuditLog[]
): Promise<{ success: boolean; message: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, message: 'Supabase belum dikonfigurasi di environment variables.' };
  }
  try {
    const db = getDb();
    if (customers.length > 0) {
      await db.from('industry_customers').upsert(customers, { onConflict: 'id' });
    }
    if (meterReaders.length > 0) {
      await db.from('meter_readers').upsert(meterReaders, { onConflict: 'id' });
    }
    if (cycleSchedules.length > 0) {
      await db.from('cycle_schedules').upsert(cycleSchedules, { onConflict: 'id' });
    }
    if (auditLogs.length > 0) {
      await db.from('audit_logs').upsert(auditLogs, { onConflict: 'id' });
    }
    return { success: true, message: 'Berhasil mengunggah data ke Supabase.' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Gagal mengunggah data ke Supabase.' };
  }
};

export const fetchSupabaseCustomers = async (): Promise<IndustryCustomer[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb().from('industry_customers').select('*');
    if (error) throw error;
    return data as IndustryCustomer[];
  } catch (e) {
    console.warn('fetchSupabaseCustomers error:', e);
    return null;
  }
};

export const fetchSupabaseMeterReaders = async (): Promise<MeterReader[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb().from('meter_readers').select('*');
    if (error) throw error;
    return data as MeterReader[];
  } catch (e) {
    console.warn('fetchSupabaseMeterReaders error:', e);
    return null;
  }
};

export const fetchSupabaseCycleSchedules = async (): Promise<CycleSchedule[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb().from('cycle_schedules').select('*');
    if (error) throw error;
    return data as CycleSchedule[];
  } catch (e) {
    console.warn('fetchSupabaseCycleSchedules error:', e);
    return null;
  }
};

export const fetchSupabaseAuditLogs = async (): Promise<AuditLog[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getDb().from('audit_logs').select('*');
    if (error) throw error;
    return data as AuditLog[];
  } catch (e) {
    console.warn('fetchSupabaseAuditLogs error:', e);
    return null;
  }
};

