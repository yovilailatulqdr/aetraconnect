import React from 'react';
import { TabType, UserRole, UserAccount, RegistrationStatus } from '../types';
import { AetraLogo } from './AetraLogo';
import { 
  FileSignature, 
  Compass, 
  ReceiptText, 
  HeartHandshake, 
  BookOpen, 
  Users, 
  CreditCard, 
  MessageSquareHeart, 
  ShieldCheck, 
  User, 
  UserCheck,
  LogOut, 
  ChevronRight, 
  Sparkles,
  X,
  Wrench
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  adminSubTab?: 'registrations' | 'bills' | 'surveys' | 'field' | 'accounts';
  onSelectAdminSubTab?: (subTab: 'registrations' | 'bills' | 'surveys' | 'field' | 'accounts') => void;
  registeredCount: number;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  userRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  currentUser?: UserAccount | null;
  customerStatus?: RegistrationStatus;
  onLogout?: () => void;
  onOpenSupabaseModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  adminSubTab = 'registrations',
  onSelectAdminSubTab,
  registeredCount: _registeredCount,
  isOpenMobile,
  setIsOpenMobile,
  userRole,
  onSwitchRole: _onSwitchRole,
  currentUser,
  customerStatus = 'NEW_USER',
  onLogout,
  onOpenSupabaseModal: _onOpenSupabaseModal,
}) => {
  interface NavItem {
    id: TabType;
    subTab?: 'registrations' | 'bills' | 'surveys' | 'field' | 'accounts';
    label: string;
    sublabel: string;
    icon: any;
    isLiveDot?: boolean;
    isHighlight?: boolean;
  }

  // Dynamic Navigation Generator based on Customer State Workflow
  const getCustomerNavItems = (): NavItem[] => {
    if (customerStatus === 'ACTIVE_CUSTOMER') {
      return [
        {
          id: 'registration',
          label: 'Profil Anda',
          sublabel: 'ID Pelanggan & Data Sambungan',
          icon: User,
        },
        {
          id: 'tracking',
          label: 'Tracking Sambungan',
          sublabel: 'Riwayat Pemasangan Selesai',
          icon: Compass,
        },
        {
          id: 'billing',
          label: 'Cek Tagihan Bulanan',
          sublabel: 'Cek & Bayar Rekening Air',
          icon: ReceiptText,
          isHighlight: true,
        },
        {
          id: 'survey',
          label: 'Survey Kepuasan',
          sublabel: 'Evaluasi CSAT & Layanan',
          icon: HeartHandshake,
        },
        {
          id: 'faq',
          label: 'Pusat Bantuan',
          sublabel: 'Pusat Bantuan',
          icon: BookOpen,
        },
      ];
    }

    if (customerStatus === 'INSTALLATION_TRACKING') {
      return [
        {
          id: 'registration',
          label: 'Status Pendaftaran',
          sublabel: 'Data Sambungan Disetujui',
          icon: FileSignature,
        },
        {
          id: 'tracking',
          label: 'Tracking Sambungan',
          sublabel: 'Lacak Progres Kontraktor & Meter',
          icon: Compass,
          isLiveDot: true,
          isHighlight: true,
        },
        {
          id: 'faq',
          label: 'Pusat Bantuan',
          sublabel: 'Pusat Bantuan',
          icon: BookOpen,
        },
      ];
    }

    if (customerStatus === 'VERIFYING' || customerStatus === 'WAITING_PAYMENT') {
      return [
        {
          id: 'registration',
          label: 'Status Pendaftaran',
          sublabel: customerStatus === 'WAITING_PAYMENT' ? 'Menunggu Pembayaran' : 'Tahap Verifikasi Petugas',
          icon: FileSignature,
          isLiveDot: true,
          isHighlight: true,
        },
        {
          id: 'faq',
          label: 'Pusat Bantuan',
          sublabel: 'Pusat Bantuan',
          icon: BookOpen,
        },
      ];
    }

    // Default / NEW_USER (Hanya Form Pendaftaran Baru & Pusat Bantuan)
    return [
      {
        id: 'registration',
        label: 'Registrasi Baru',
        sublabel: 'Formulir Sambungan (SR)',
        icon: FileSignature,
        isHighlight: true,
      },
      {
        id: 'faq',
        label: 'Pusat Bantuan',
        sublabel: 'Pusat Bantuan',
        icon: BookOpen,
      },
    ];
  };

  const adminNavItems: NavItem[] = [
    {
      id: 'admin',
      subTab: 'registrations',
      label: 'Data Registrasi Baru',
      sublabel: 'Verifikasi Berkas & SPKO',
      icon: Users,
    },
    {
      id: 'admin',
      subTab: 'accounts',
      label: 'Daftar Akun Aetra Connect',
      sublabel: 'Pengguna & Akun Terdaftar',
      icon: UserCheck,
    },
    {
      id: 'admin',
      subTab: 'bills',
      label: 'Tagihan Pelanggan',
      sublabel: 'Input Manual & Impor Excel',
      icon: ReceiptText,
      isHighlight: true,
    },
    {
      id: 'admin',
      subTab: 'surveys',
      label: 'Survey Kepuasan',
      sublabel: 'Rekapitulasi CSAT & NPS',
      icon: MessageSquareHeart,
    },
  ];

  const isAdminAccount = currentUser?.role === 'admin' || userRole === 'admin';
  const currentNavItems = isAdminAccount ? adminNavItems : getCustomerNavItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 flex flex-col justify-between transition-transform duration-250 ease-in-out lg:translate-x-0 ${
          isAdminAccount
            ? 'bg-[#143833] text-white border-r border-[#1D4A43]'
            : 'bg-[#FAF7F2] text-slate-800 border-r border-[#E7E0D5]'
        } ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isAdminAccount ? 'border-[#1D4A43]' : 'border-[#E7E0D5]'
        }`}>
          <AetraLogo
            size="sm"
            variant="horizontal"
            textColorMode={isAdminAccount ? 'white' : 'default'}
          />
          <button
            onClick={() => setIsOpenMobile(false)}
            className={`lg:hidden p-1.5 rounded-xl transition cursor-pointer ${
              isAdminAccount
                ? 'text-[#A6C4BE] hover:text-white hover:bg-white/10'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Portal Status Header Badge */}
        {isAdminAccount ? (
          <div className="px-4 pt-3.5">
            <div className="py-2.5 px-3.5 bg-[#1B453E] border border-[#23534B] text-white rounded-2xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center text-[#E56D3B] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black tracking-wide block leading-tight text-white">PORTAL ADMIN</span>
                  <span className="text-[10px] text-[#A6C4BE] block">Sistem Kendali Backoffice</span>
                </div>
              </div>
              <span className="text-[9px] bg-[#DC602E] text-white font-mono px-2 py-0.5 rounded-lg font-black shadow-xs">
                ADMIN
              </span>
            </div>
          </div>
        ) : (
          <div className="px-4 pt-3.5">
            <div className="py-2.5 px-3.5 bg-[#EDE7DC] border border-[#DDD3C4] text-[#143833] rounded-2xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#143833] text-white flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-black block leading-tight text-[#143833]">Portal Pelanggan</span>
                  <span className="text-[10px] text-slate-500 font-medium block">Layanan Resmi Aetra Air</span>
                </div>
              </div>
              <span className="text-[9px] bg-[#143833] text-white font-black px-2 py-0.5 rounded-md shadow-xs">
                ONLINE
              </span>
            </div>
          </div>
        )}

        {/* Primary Navigation */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-1.5">
          <div className={`px-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between ${
            isAdminAccount ? 'text-[#87A8A2]' : 'text-slate-400'
          }`}>
            <span>{isAdminAccount ? 'Menu Operasional Backoffice' : 'Layanan Pemasangan'}</span>
            <span className={`text-[9px] font-black ${isAdminAccount ? 'text-[#DC602E]' : 'text-[#143833]'}`}>
              {isAdminAccount ? 'ADMINISTRATOR' : 'PELANGGAN'}
            </span>
          </div>

          <nav className="space-y-1">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                isAdminAccount && item.subTab
                  ? activeTab === 'admin' && adminSubTab === item.subTab
                  : activeTab === item.id;

              return (
                <button
                  key={`${item.id}-${item.subTab || 'default'}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.subTab && onSelectAdminSubTab) {
                      onSelectAdminSubTab(item.subTab);
                    }
                    setIsOpenMobile(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? 'bg-[#DC602E] text-white shadow-md shadow-[#DC602E]/25 font-bold'
                      : (isAdminAccount
                          ? 'text-[#C2D6D2] hover:bg-white/10 hover:text-white'
                          : 'text-slate-700 hover:bg-[#EFE9DF] hover:text-slate-900')
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white shadow-xs'
                        : (isAdminAccount
                            ? 'bg-[#1C4740] text-[#A6C4BE] group-hover:bg-white/15 group-hover:text-white'
                            : 'bg-[#EBE4D8] text-slate-700 group-hover:bg-[#DC602E]/10 group-hover:text-[#DC602E]')
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-xs font-bold truncate ${
                        isActive
                          ? 'text-white'
                          : (isAdminAccount ? 'text-[#FAF6EE]' : 'text-slate-800')
                      }`}>
                        {item.label}
                      </span>
                      {item.isLiveDot && (
                        <span className="relative flex h-2 w-2 shrink-0" title="Aktif Real-time">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] truncate leading-tight mt-0.5 ${
                        isActive 
                          ? 'text-orange-100'
                          : (isAdminAccount ? 'text-[#87A8A2]' : 'text-slate-400')
                      }`}
                    >
                      {item.sublabel}
                    </p>
                  </div>

                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive
                        ? 'text-white translate-x-0.5'
                        : (isAdminAccount ? 'text-[#6C8F89] group-hover:text-white' : 'text-slate-300 group-hover:text-slate-500')
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Account Info & Logout */}
        {currentUser && (
          <div className={`p-3 mx-3.5 mb-2 rounded-2xl border shadow-2xs ${
            isAdminAccount
              ? 'bg-[#1B453E] border-[#23534B] text-white'
              : 'bg-[#FAF5EC] border-[#E7E0D5] text-slate-800'
          }`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                  isAdminAccount ? 'bg-[#DC602E]' : 'bg-[#143833]'
                }`}>
                  {currentUser.nama?.slice(0, 2).toUpperCase() || 'PL'}
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-black truncate ${isAdminAccount ? 'text-white' : 'text-slate-900'}`}>
                    {currentUser.nama}
                  </div>
                  <div className="text-[10px] truncate">
                    {currentUser.role === 'admin' ? (
                      <span className="text-[#E56D3B] font-bold">Admin Terverifikasi</span>
                    ) : currentUser.idPelanggan ? (
                      <span className="font-mono text-emerald-700 font-bold">#{currentUser.idPelanggan}</span>
                    ) : (
                      <span className={isAdminAccount ? 'text-[#A6C4BE]' : 'text-slate-500'}>Calon Pelanggan</span>
                    )}
                  </div>
                </div>
              </div>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Keluar Akun"
                  className={`p-2 rounded-xl transition shrink-0 cursor-pointer shadow-2xs ${
                    isAdminAccount
                      ? 'bg-[#143833] text-[#A6C4BE] hover:text-red-400 hover:bg-white/10 border border-[#23534B]'
                      : 'bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200'
                  }`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bottom Status / Copyright */}
        <div className={`p-3.5 border-t text-center ${
          isAdminAccount
            ? 'border-[#1D4A43] bg-[#102F2B] text-[#A6C4BE]'
            : 'border-[#E7E0D5] bg-[#F4EFE6] text-slate-600'
        }`}>
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className={isAdminAccount ? 'text-[#FAF6EE]' : 'text-slate-700'}>PT Aetra Air Tangerang</span>
          </div>
          <p className="text-[10px] opacity-70 mt-0.5">Layanan Distribusi Air Bersih Bersertifikasi</p>
        </div>
      </aside>
    </>
  );
};
