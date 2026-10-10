import React from 'react';
import { TabType, UserRole, UserAccount, RegistrationStatus } from '../types';
import { AetraLogo } from './AetraLogo';
import { Menu, ShieldCheck, User, LogOut, HelpCircle, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onOpenMobileSidebar: () => void;
  registeredCount: number;
  userRole: UserRole;
  onSwitchRole?: (role: UserRole) => void;
  currentUser?: UserAccount | null;
  customerStatus?: RegistrationStatus;
  isSidebarVisible?: boolean;
  onLogout?: () => void;
  onOpenSupabaseModal?: () => void;
  onSelectTab?: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenMobileSidebar,
  registeredCount: _registeredCount,
  userRole,
  onSwitchRole,
  currentUser,
  customerStatus,
  isSidebarVisible = true,
  onLogout,
  onOpenSupabaseModal: _onOpenSupabaseModal,
  onSelectTab,
}) => {
  const tabTitles: Record<TabType, { title: string; subtitle: string; tag: string }> = {
    registration: {
      title: 'Register Pelanggan Baru',
      subtitle: 'Formulir Pendaftaran Sambungan Rumah Tangga PT Aetra Air Tangerang',
      tag: 'Sambungan Baru',
    },
    tracking: {
      title: 'Tracking Sambungan Baru',
      subtitle: 'Pantau Real-Time Progres Pemasangan Pipa & Meter Air Layaknya Lacak Pesanan Online',
      tag: 'Pelacakan Real-Time',
    },
    survey: {
      title: 'Survey Kepuasan Pelanggan',
      subtitle: 'Evaluasi Mutu Pelayanan Air Bersih PT Aetra Air Tangerang',
      tag: 'Evaluasi Mutu',
    },
    faq: {
      title: 'Tanya Jawab (FAQ)',
      subtitle: 'Pusat Bantuan Resmi, Syarat Administrasi & Info Pemeliharaan Jaringan Pipa',
      tag: 'Pusat Informasi',
    },
    billing: {
      title: 'Pembayaran Tagihan Bulanan',
      subtitle: 'Inquiry Rekening Air, Pemakaian Kubikasi (m³) & Pelunasan Resmi PT Aetra Air Tangerang',
      tag: 'Cek & Bayar Tagihan',
    },
    admin: {
      title: 'Data Pelanggan Pendaftaran Sambungan Baru',
      subtitle: 'Pengendalian Permohonan, Verifikasi Dokumen, Ekspor/Impor Excel & Progres SPKO Lapangan',
      tag: 'Data Pelanggan & Backoffice',
    },
  };

  const current = tabTitles[activeTab] || tabTitles.registration;
  const isCustomerActive = customerStatus === 'ACTIVE_CUSTOMER';
  const isAdminView = activeTab === 'admin' || currentUser?.role === 'admin';

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#E7E0D5] transition-all">
      {/* Dynamic Top Micro Accent Line */}
      <div className={`h-1 w-full ${
        isAdminView
          ? 'bg-linear-to-r from-[#143833] via-[#1C4A42] to-[#DC602E]'
          : 'bg-linear-to-r from-[#DC602E] via-[#E26D3B] to-[#143833]'
      }`} />

      {/* Top Subtle Info Ribbon */}
      <div className={`text-[11px] px-4 sm:px-8 py-1.5 flex items-center justify-between border-b transition-colors ${
        isAdminView
          ? 'bg-[#EAE4D8] text-[#143833] border-[#DDD3C4]'
          : 'bg-[#F2ECE1] text-[#143833] border-[#E5DDD0]'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isAdminView ? 'bg-[#DC602E] shadow-xs' : 'bg-emerald-600 shadow-xs'}`}></span>
          <span className="font-bold tracking-wide">
            PT Aetra Air Tangerang
          </span>
          <span className="opacity-40 hidden md:inline">|</span>
          <span className="opacity-80 hidden md:inline font-medium">
            {isAdminView ? 'Backoffice & Pengendalian Operasional' : 'Sistem Informasi Layanan Pelanggan'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className={`w-3.5 h-3.5 ${isAdminView ? 'text-[#DC602E]' : 'text-[#143833]'}`} />
            <span className="hidden sm:inline">
              {isAdminView ? 'Akses Terverifikasi Backoffice' : 'Standar Air Bersih SNI'}
            </span>
            <span className="sm:hidden">
              {isAdminView ? 'Backoffice' : 'Layanan Resmi'}
            </span>
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Hamburger & Active Module Breadcrumb */}
        <div className="flex items-center gap-3">
          {isSidebarVisible ? (
            <button
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-[#EFE9DF] border border-[#DDD3C4] transition cursor-pointer"
              aria-label="Buka Menu Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          ) : null}

          <div className="hidden sm:block">
            <div className={`text-[10px] font-black uppercase tracking-wider ${
              isAdminView ? 'text-[#DC602E]' : 'text-[#143833]'
            }`}>
              {current.tag}
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight leading-tight">
              {current.title}
            </h1>
          </div>
        </div>

        {/* Right: FAQ Quick Button & Account Info */}
        <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
          {/* Top Quick FAQ Button */}
          {onSelectTab && (
            <button
              type="button"
              onClick={() => onSelectTab(activeTab === 'faq' ? 'registration' : 'faq')}
              title="Pusat Bantuan & Tanya Jawab (FAQ)"
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'faq'
                  ? (isAdminView ? 'bg-[#143833] text-white border-[#143833] shadow-xs' : 'bg-[#DC602E] text-white border-[#DC602E] shadow-xs')
                  : 'bg-[#EDE7DC] hover:bg-[#E2D9CC] text-[#143833] border-[#DDD3C4]'
              }`}
            >
              <HelpCircle className={`w-3.5 h-3.5 ${activeTab === 'faq' ? 'text-amber-300' : 'text-[#DC602E]'}`} />
              <span className="hidden sm:inline">Pusat Bantuan</span>
            </button>
          )}

          {/* Role Status Badge & Admin Access Switcher */}
          {currentUser?.role === 'admin' ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#143833] text-white text-xs font-bold shadow-xs border border-[#1D4A43]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DC602E]" />
                <span className="hidden sm:inline">Admin Aetra Connect</span>
                <span className="sm:hidden">Admin</span>
              </div>
              {onSelectTab && (
                <button
                  type="button"
                  onClick={() => onSelectTab(activeTab === 'admin' ? 'registration' : 'admin')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                    activeTab === 'admin'
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-[#DC602E] hover:bg-[#C85324] text-white border-[#DC602E] shadow-xs'
                  }`}
                  title={activeTab === 'admin' ? 'Buka pratinjau antarmuka pelanggan' : 'Kembali ke dashboard admin'}
                >
                  <span>{activeTab === 'admin' ? 'Lihat Pelanggan' : 'Kembali ke Admin'}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#DC602E] text-white text-xs font-bold shadow-xs">
                <User className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Aetra Connect</span>
                <span className="sm:hidden">Pelanggan</span>
              </div>
            </div>
          )}

          {/* User Account Info & Logout */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-[#DDD3C4]">
              {/* Dynamic User Avatar */}
              <div className={`w-8 h-8 rounded-xl text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0 select-none ${
                isAdminView
                  ? 'bg-[#143833]'
                  : 'bg-[#DC602E]'
              }`}>
                {currentUser.nama?.slice(0, 2).toUpperCase() || 'PL'}
              </div>

              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-800 truncate max-w-[150px] leading-tight">
                  {currentUser.nama}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {currentUser.role === 'admin' ? (
                    'Otoritas Administrator'
                  ) : isCustomerActive && currentUser.idPelanggan ? (
                    `ID: #${currentUser.idPelanggan}`
                  ) : (
                    'Calon Pelanggan'
                  )}
                </div>
              </div>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Keluar dari Akun"
                  className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
