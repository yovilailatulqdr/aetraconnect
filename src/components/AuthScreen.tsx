import React, { useState, useEffect } from 'react';
import { UserAccount } from '../types';
import { AetraLogo } from './AetraLogo';
import { SupabaseModal } from './SupabaseModal';
import { 
  fetchUserAccountsFromDb, 
  saveUserAccountToDb,
  signInWithSupabaseAuth,
  signUpWithSupabaseAuth,
} from '../services/supabaseService';
import { cloudSyncService } from '../services/cloudSyncService';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Droplets,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthScreenProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  
  // Login fields (username/email + password)
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register fields (STRICTLY: Nama, Email/No. Telepon, Password)
  const [regNama, setRegNama] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Clean error messages on tab switch
  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [authMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const identifier = loginIdentifier.trim();
    const pass = loginPassword.trim();

    if (!identifier || !pass) {
      setIsLoading(false);
      setErrorMessage('Silakan masukkan Email / No. Telepon / ID Pelanggan dan Kata Sandi.');
      return;
    }

    try {
      const result = await signInWithSupabaseAuth(identifier, pass);
      setIsLoading(false);

      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setErrorMessage(
          result.error ||
            'Gagal masuk. Periksa kembali email dan kata sandi Anda atau pastikan koneksi Supabase aktif.'
        );
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Terjadi kendala saat memproses login. Silakan coba kembali.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const nama = regNama.trim();
    const contact = regEmail.trim();
    const pass = regPassword.trim();

    if (!nama || !contact || !pass) {
      setIsLoading(false);
      setErrorMessage('Seluruh field formulir (Nama, Alamat Email / No. Telepon, Kata Sandi) wajib diisi.');
      return;
    }

    if (pass.length < 4) {
      setIsLoading(false);
      setErrorMessage('Kata sandi minimal terdiri dari 4 karakter.');
      return;
    }

    const cleanPhone = contact.replace(/[^0-9]/g, '');
    const isPhoneNumber = cleanPhone.length >= 8 && /^[0-9+-\s]+$/.test(contact);
    const emailValue = isPhoneNumber ? `${cleanPhone}@telepon.aetra` : contact.toLowerCase();

    // ID Pelanggan is issued officially after registration is processed by Aetra
    const newIdPelanggan = '';

    try {
      const result = await signUpWithSupabaseAuth(
        emailValue,
        pass,
        nama,
        newIdPelanggan,
        'customer',
        isPhoneNumber ? contact : undefined
      );

      if (result.success && result.user) {
        // Bersihkan draf pendaftaran lama agar akun baru mulai dari formulir bersih
        try {
          localStorage.removeItem('aetra_draft_' + result.user.id);
          localStorage.removeItem('aetra_draft_' + emailValue);
          localStorage.removeItem('aetra_registration_form_draft');
          localStorage.removeItem('aetra_saved_applicant_data');
        } catch {
          // ignore
        }

        if (result.requiresEmailConfirmation) {
          setIsLoading(false);
          setSuccessMessage(
            result.message ||
              'Pendaftaran akun di Supabase Auth berhasil! Tautan verifikasi telah dikirimkan ke email Anda. Harap konfirmasi email terlebih dahulu sebelum masuk.'
          );
          // Pindahkan form ke tab login dengan mengisi email yang didaftarkan
          setAuthMode('login');
          setLoginIdentifier(contact);
          return;
        }

        setIsLoading(false);
        setSuccessMessage('Pendaftaran akun berhasil! Mengalihkan ke portal pelanggan...');

        setTimeout(() => {
          onLoginSuccess(result.user!);
        }, 750);
      } else {
        setIsLoading(false);
        setErrorMessage(result.error || 'Gagal mendaftarkan akun di Supabase Auth. Silakan periksa data Anda.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Terjadi kesalahan saat mendaftar akun.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex flex-col justify-center items-center p-4 sm:p-6 text-slate-800 relative overflow-hidden selection:bg-[#DC602E]/25 selection:text-[#143833]">
      {/* Background Decorative Tech Elements & Ambient Lights - Warm Sand & Terracotta */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DC602E]/10 rounded-full blur-3xl pointer-events-none -mt-32"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#143833]/10 rounded-full blur-3xl pointer-events-none -mb-32"></div>
      
      {/* Subtle Grid Watermark Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #143833 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-md bg-[#FAF8F4] text-slate-800 rounded-3xl shadow-xl shadow-slate-400/15 border border-[#E7DFD4] overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Branding */}
        <div className="bg-linear-to-b from-[#F2ECE1] via-[#FAF8F4] to-[#FAF8F4] px-6 pt-7 pb-4 text-center border-b border-[#EBE4D8]">
          <div className="flex justify-center mb-2">
            <AetraLogo size="lg" />
          </div>

          <h1 className="text-xl font-black text-[#143833] tracking-tight mt-1">
            Aetra Connect
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            PT Aetra Air Tangerang
          </p>

          {/* Modern Segmented Control / Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-[#EBE4D8] rounded-2xl mt-5 border border-[#DDD3C4] shadow-inner">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? 'bg-[#143833] text-white shadow-sm font-black'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Masuk Akun</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'register'
                  ? 'bg-[#DC602E] text-white shadow-sm font-black'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daftar Akun Baru</span>
            </button>
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
            <span className="leading-relaxed font-medium">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 font-semibold animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* Auth Forms */}
        <div className="p-6 pt-4">
          {authMode === 'login' ? (
            /* Form Masuk */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat Email / No. Telepon
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="nama@email.com atau 0812xxxx"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#DDD3C4] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#DC602E] focus:ring-2 focus:ring-[#DC602E]/20 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-[#DC602E] hover:underline font-semibold cursor-pointer"
                  >
                    {showPassword ? 'Sembunyikan' : 'Lihat'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Masukkan kata sandi akun Anda"
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-[#DDD3C4] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#DC602E] focus:ring-2 focus:ring-[#DC602E]/20 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#DC602E] hover:bg-[#C85324] text-white font-bold text-xs rounded-xl shadow-md shadow-[#DC602E]/25 transition duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
              >
                <span>{isLoading ? 'Memverifikasi Akun...' : 'Masuk ke Aetra Connect'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-slate-500">
                  Belum memiliki akun pelanggan?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setErrorMessage(null);
                    }}
                    className="font-bold text-[#DC602E] hover:underline cursor-pointer"
                  >
                    Daftar Akun
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* Form Daftar Akun Baru: STRICTLY Nama, Email / No. Telepon, Password */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="bg-[#F2ECE1] p-3 rounded-2xl border border-[#DDD3C4] text-[11px] text-[#143833] leading-relaxed">
                Pendaftaran akun pelanggan baru cukup masukkan <strong>Nama Lengkap</strong>, <strong>Alamat Email / No. Telepon</strong>, dan <strong>Kata Sandi</strong>.
              </div>

              {/* 1. Nama */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regNama}
                    onChange={(e) => setRegNama(e.target.value)}
                    placeholder="Masukkan nama lengkap sesuai KTP"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#DDD3C4] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#DC602E] focus:ring-2 focus:ring-[#DC602E]/20 transition"
                    required
                  />
                </div>
              </div>

              {/* 2. Email / No. Telepon */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat Email / No. Telepon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="contoh: nama@gmail.com atau 08123456789"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#DDD3C4] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#DC602E] focus:ring-2 focus:ring-[#DC602E]/20 transition"
                    required
                  />
                </div>
              </div>

              {/* 3. Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Kata Sandi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimal 4 karakter"
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-[#DDD3C4] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#DC602E] focus:ring-2 focus:ring-[#DC602E]/20 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#DC602E] hover:bg-[#C85324] text-white font-bold text-xs rounded-xl shadow-md shadow-[#DC602E]/25 transition duration-150 flex items-center justify-center gap-2 mt-1 cursor-pointer active:scale-[0.99] disabled:opacity-60"
              >
                <span>{isLoading ? 'Membuat Akun...' : 'Buat Akun & Masuk'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-slate-500">
                  Sudah memiliki akun pelanggan?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage(null);
                    }}
                    className="font-bold text-[#DC602E] hover:underline cursor-pointer"
                  >
                    Masuk di Sini
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>



        {/* Footer Security & Info */}
        <div className="bg-slate-100/90 px-6 py-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Koneksi Aman Terenkripsi SSL</span>
          </span>
          <span>&copy; 2026 PT Aetra Air Tangerang</span>
        </div>
      </div>

      {/* Supabase Guide & Database Modal */}
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
    </div>
  );
};
