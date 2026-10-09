import React, { useState, useMemo, useEffect } from 'react';
import { UserAccount, RegistrationFormData } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';
import { 
  fetchUserAccountsFromDb, 
  deleteUserAccountFromDb, 
  deleteAllNonAdminAccountsFromDb 
} from '../services/supabaseService';
import {
  UserCheck,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Users,
  Trash2
} from 'lucide-react';

interface AdminAccountManagementProps {
  registrations?: RegistrationFormData[];
  onNavigateToTracking?: (noForm: string) => void;
}

export const AdminAccountManagement: React.FC<AdminAccountManagementProps> = ({
  registrations = [],
  onNavigateToTracking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'admin'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastFeedback, setToastFeedback] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<UserAccount[]>([]);

  // Load and refresh accounts directly from Supabase
  const loadAccounts = async () => {
    setIsRefreshing(true);
    try {
      if (isSupabaseConfigured()) {
        const remote = await fetchUserAccountsFromDb();
        if (remote && Array.isArray(remote)) {
          setAccounts(remote);
        }
      }
    } catch (err) {
      console.warn('Error loading accounts:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  // Delete all registered non-admin customer accounts
  const handleDeleteAllCustomers = async () => {
    const confirmDelete = window.confirm(
      'Hapus SEMUA akun pelanggan yang terdaftar? Seluruh akun yang bukan administrator akan dihapus permanen dari Supabase. Akun Administrator akan tetap aman.'
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const res = await deleteAllNonAdminAccountsFromDb();
      if (res.success) {
        setToastFeedback(`Berhasil menghapus seluruh akun pelanggan (${res.count || 0} akun). Hanya akun Administrator yang tersisa.`);
        // Bersihkan draf atau session lokal pelanggan jika ada
        try {
          const curr = localStorage.getItem('aetra_current_user');
          if (curr) {
            const parsed = JSON.parse(curr);
            if (parsed.role !== 'admin') {
              localStorage.removeItem('aetra_current_user');
            }
          }
        } catch {}
        await loadAccounts();
      } else {
        alert(`Gagal menghapus akun: ${res.error || 'Terjadi gangguan koneksi ke Supabase.'}`);
      }
    } catch (err: any) {
      alert(`Terjadi error: ${err.message || 'Gagal memproses penghapusan akun.'}`);
    } finally {
      setIsDeleting(false);
      setTimeout(() => setToastFeedback(null), 5000);
    }
  };

  // Delete single customer account
  const handleDeleteSingleAccount = async (id: string, name: string) => {
    if (!window.confirm(`Hapus akun pelanggan "${name}"? Tindakan ini permanen.`)) {
      return;
    }
    try {
      const res = await deleteUserAccountFromDb(id);
      if (res.success) {
        setToastFeedback(`Akun "${name}" berhasil dihapus.`);
        await loadAccounts();
      } else {
        alert(`Gagal menghapus akun: ${res.error || 'Terjadi kesalahan.'}`);
      }
    } catch (err: any) {
      alert(`Terjadi error: ${err.message || 'Gagal menghapus akun.'}`);
    } finally {
      setTimeout(() => setToastFeedback(null), 4000);
    }
  };

  // Filtered accounts based on search and role
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        acc.nama?.toLowerCase().includes(q) ||
        acc.email?.toLowerCase().includes(q) ||
        (acc.telp && acc.telp.includes(q)) ||
        (acc.idPelanggan && acc.idPelanggan.includes(q));

      const matchRole =
        roleFilter === 'all' ||
        (roleFilter === 'admin' && acc.role === 'admin') ||
        (roleFilter === 'customer' && acc.role !== 'admin');

      return matchSearch && matchRole;
    });
  }, [accounts, searchTerm, roleFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = accounts.length;
    const adminCount = accounts.filter((a) => a.role === 'admin').length;
    const customerCount = accounts.filter((a) => a.role !== 'admin').length;

    // Count accounts with active registration
    const registeredEmails = new Set(registrations.map((r) => r.email?.toLowerCase().trim()));
    const withRegCount = accounts.filter((a) => a.email && registeredEmails.has(a.email.toLowerCase().trim())).length;

    return { total, adminCount, customerCount, withRegCount };
  }, [accounts, registrations]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Feedback */}
      {toastFeedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastFeedback}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE4D8] text-[#143833] text-xs font-bold border border-[#D8CFBE] mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Manajemen Pengguna Terdaftar</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Daftar Akun Aetra Connect
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Data seluruh akun pelanggan dan administrator yang mendaftar dan menggunakan portal layanan Aetra Connect.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleDeleteAllCustomers}
            disabled={isDeleting || stats.customerCount === 0}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-40"
            title="Hapus semua akun pelanggan yang terdaftar disini (Kecuali Admin)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Menghapus Akun...' : 'Hapus Semua Akun (Kecuali Admin)'}</span>
          </button>

          <button
            type="button"
            onClick={loadAccounts}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50"
            title="Muat ulang dan sinkronkan data akun"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#143833] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Menyinkronkan...' : 'Sinkronkan Akun'}</span>
          </button>
        </div>
      </div>

      {/* KPI Statistic Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">Total Akun Terdaftar</span>
            <Users className="w-4 h-4 text-[#143833]" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.total}</div>
          <span className="text-[11px] text-[#143833] font-bold">Pengguna Aetra Connect</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">Akun Pelanggan</span>
            <User className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{stats.customerCount}</div>
          <span className="text-[11px] text-emerald-600 font-bold">Warga / Pemohon Layanan</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">Akun Administrator</span>
            <ShieldCheck className="w-4 h-4 text-[#143833]" />
          </div>
          <div className="text-2xl font-black text-[#143833]">{stats.adminCount}</div>
          <span className="text-[11px] text-[#143833] font-bold">Petugas &amp; Backoffice</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">Telah Mengajukan Sambungan</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{stats.withRegCount}</div>
          <span className="text-[11px] text-amber-600 font-bold">Terhubung ke Registrasi</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Controls Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, email, no. telepon, atau ID Pelanggan..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#143833]/20 focus:border-[#143833]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Peran:
            </span>
            <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  roleFilter === 'all' ? 'bg-[#143833] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({accounts.length})
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('customer')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  roleFilter === 'customer' ? 'bg-[#143833] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pelanggan ({stats.customerCount})
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('admin')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  roleFilter === 'admin' ? 'bg-[#143833] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin ({stats.adminCount})
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Pengguna</th>
                <th className="py-3 px-4">Kontak (Email / Telepon)</th>
                <th className="py-3 px-4">ID Pelanggan Resmi</th>
                <th className="py-3 px-4 text-center">Peran Akun</th>
                <th className="py-3 px-4">Status Sambungan Baru</th>
                <th className="py-3 px-4">Terdaftar Sejak</th>
                <th className="py-3 px-4 text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <UserCheck className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-xs text-slate-700">Tidak ada akun yang sesuai kriteria pencarian</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Coba gunakan kata kunci pencarian yang lain.</p>
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((acc, idx) => {
                  const cleanEmail = acc.email?.toLowerCase().trim();
                  const relatedReg = registrations.find((r) => {
                    if (r.idPelanggan && acc.idPelanggan && r.idPelanggan === acc.idPelanggan) return true;
                    if (cleanEmail && r.email && r.email.toLowerCase().trim() === cleanEmail) return true;
                    if (acc.id && (r as any).userId === acc.id) return true;
                    return false;
                  });

                  return (
                    <tr key={acc.id || `acc-row-${idx}`} className="hover:bg-slate-50/70 transition">
                      {/* No */}
                      <td className="py-3 px-4 text-center font-mono text-slate-400 font-semibold">
                        {idx + 1}
                      </td>

                      {/* Profil Pengguna */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                            acc.role === 'admin'
                              ? 'bg-[#143833] text-white border border-[#23534B]'
                              : 'bg-emerald-100 text-[#143833] border border-[#D8CFBE]'
                          }`}>
                            {acc.nama ? acc.nama.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{acc.nama || 'Tanpa Nama'}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {acc.id?.slice(0, 14) || '-'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Kontak */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[200px]">{acc.email || '-'}</span>
                          </div>
                          {acc.telp && (
                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{acc.telp}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* ID Pelanggan */}
                      <td className="py-3 px-4">
                        {acc.idPelanggan && acc.idPelanggan.length > 5 ? (
                          <div className="inline-flex items-center gap-1 bg-[#EAE4D8] text-[#143833] px-2.5 py-1 rounded-lg border border-[#D8CFBE] font-mono font-bold text-xs">
                            <span>#{acc.idPelanggan}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(acc.idPelanggan, `copy-${acc.id}`)}
                              className="text-blue-400 hover:text-blue-700 p-0.5 cursor-pointer"
                              title="Salin ID Pelanggan"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            {copiedId === `copy-${acc.id}` && (
                              <span className="text-[9px] text-emerald-600 font-bold">Tersalin!</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">
                            Belum diterbitkan
                          </span>
                        )}
                      </td>

                      {/* Peran */}
                      <td className="py-3 px-4 text-center">
                        {acc.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#143833] text-white border border-[#23534B]">
                            <ShieldCheck className="w-3 h-3 text-[#DC602E]" />
                            <span>Administrator</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <User className="w-3 h-3 text-emerald-600" />
                            <span>Pelanggan</span>
                          </span>
                        )}
                      </td>

                      {/* Status Sambungan Baru */}
                      <td className="py-3 px-4">
                        {relatedReg ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md bg-[#EAE4D8] text-[#143833] border border-[#D8CFBE] font-bold text-[10px]">
                                No. Form: {relatedReg.noForm}
                              </span>
                              {onNavigateToTracking && (
                                <button
                                  type="button"
                                  onClick={() => onNavigateToTracking(relatedReg.noForm)}
                                  className="text-[#143833] hover:text-blue-800 p-0.5 cursor-pointer"
                                  title="Lihat Pelacakan"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              Tahap: <span className="font-bold text-slate-700">{relatedReg.trackingStep || 1} / 5</span> &bull; {relatedReg.statusPembayaran || 'Belum Lunas'}
                            </div>
                          </div>
                        ) : acc.role === 'admin' ? (
                          <span className="text-[11px] text-slate-400 italic">Akun Sistem</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                            <AlertCircle className="w-3 h-3 text-amber-500" />
                            <span>Belum mengisi formulir</span>
                          </span>
                        )}
                      </td>

                      {/* Tanggal Terdaftar */}
                      <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>
                            {acc.createdAt ? new Date(acc.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }) : '-'}
                          </span>
                        </div>
                      </td>

                      {/* Aksi */}
                      <td className="py-3 px-4 text-center">
                        {acc.role !== 'admin' ? (
                          <button
                            type="button"
                            onClick={() => handleDeleteSingleAccount(acc.id, acc.nama)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title={`Hapus akun ${acc.nama}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold italic">Aman</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
