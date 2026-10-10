import React from 'react';
import { TabType, UserRole, RegistrationStatus } from '../types';
import { 
  FileSignature, 
  Compass, 
  ReceiptText, 
  HeartHandshake, 
  BookOpen, 
  Users, 
  MessageSquareHeart,
  User,
  Wrench
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userRole: UserRole;
  registeredCount: number;
  customerStatus?: RegistrationStatus;
  adminSubTab?: 'registrations' | 'bills' | 'surveys' | 'field' | 'accounts';
  onSelectAdminSubTab?: (subTab: 'registrations' | 'bills' | 'surveys' | 'field' | 'accounts') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  registeredCount: _registeredCount,
  customerStatus = 'NEW_USER',
  adminSubTab = 'registrations',
  onSelectAdminSubTab,
}) => {
  interface TabItem {
    id: TabType;
    subTab?: 'registrations' | 'bills' | 'surveys' | 'field' | 'accounts';
    label: string;
    icon: any;
    isCenter?: boolean;
    isLive?: boolean;
  }

  // Hide bottom tabs in mobile mode when customer is still in registration / not yet active (air mengalir)
  if (userRole !== 'admin' && customerStatus !== 'ACTIVE_CUSTOMER') {
    return null;
  }

  const getCustomerTabs = (): TabItem[] => {
    return [
      {
        id: 'registration',
        label: 'Profil Anda',
        icon: User,
      },
      {
        id: 'tracking',
        label: 'Tracking',
        icon: Compass,
      },
      {
        id: 'billing',
        label: 'Tagihan',
        icon: ReceiptText,
        isCenter: true,
      },
      {
        id: 'survey',
        label: 'Survey',
        icon: HeartHandshake,
      },
      {
        id: 'faq',
        label: 'Pusat Bantuan',
        icon: BookOpen,
      },
    ];
  };

  const adminTabs: TabItem[] = [
    {
      id: 'admin',
      subTab: 'registrations',
      label: 'Registrasi',
      icon: Users,
    },
    {
      id: 'admin',
      subTab: 'bills',
      label: 'Tagihan',
      icon: ReceiptText,
      isCenter: true,
    },
    {
      id: 'admin',
      subTab: 'surveys',
      label: 'Survey',
      icon: MessageSquareHeart,
    },
  ];

  const tabs = userRole === 'admin' ? adminTabs : getCustomerTabs();

  return (
    <nav 
      aria-label="Navigasi Bawah Mobile" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E7E0D5] shadow-2xl px-2 pt-1 pb-safe lg:hidden transition-transform"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            userRole === 'admin' && tab.subTab
              ? activeTab === 'admin' && adminSubTab === tab.subTab
              : activeTab === tab.id;

          const handleTabClick = () => {
            setActiveTab(tab.id);
            if (tab.subTab && onSelectAdminSubTab) {
              onSelectAdminSubTab(tab.subTab);
            }
          };

          const isAdminMode = userRole === 'admin';

          if (tab.isCenter) {
            return (
              <button
                key={`${tab.id}-${tab.subTab || 'center'}`}
                type="button"
                onClick={handleTabClick}
                className="relative -top-3 flex flex-col items-center group cursor-pointer focus:outline-hidden"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-95 ${
                    isActive
                      ? (isAdminMode
                          ? 'bg-[#143833] text-white ring-4 ring-[#143833]/20 shadow-[#143833]/30'
                          : 'bg-[#DC602E] text-white ring-4 ring-[#DC602E]/20 shadow-[#DC602E]/30')
                      : 'bg-[#143833] text-white shadow-md'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span
                  className={`text-[10px] font-black tracking-tight mt-1 transition-colors ${
                    isActive ? (isAdminMode ? 'text-[#143833]' : 'text-[#DC602E]') : 'text-slate-700'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={`${tab.id}-${tab.subTab || 'default'}`}
              type="button"
              onClick={handleTabClick}
              className={`relative flex-1 py-1.5 flex flex-col items-center justify-center transition-colors group cursor-pointer ${
                isActive ? (isAdminMode ? 'text-[#143833]' : 'text-[#DC602E]') : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive
                      ? (isAdminMode ? 'bg-[#EAE4D8] text-[#143833]' : 'bg-[#FDEEE7] text-[#DC602E]')
                      : 'group-hover:bg-[#EFE9DF]'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                </div>

                {tab.isLive && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 transition-all truncate max-w-[64px] ${
                  isActive ? (isAdminMode ? 'font-black text-[#143833]' : 'font-black text-[#DC602E]') : 'font-semibold text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
