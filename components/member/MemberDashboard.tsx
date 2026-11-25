'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { OverviewTab } from './OverviewTab';
import { TeamTab } from './TeamTab';
import { GenealogyTab } from './GenealogyTab';
import { CommissionsTab } from './CommissionsTab';
import { WalletTab } from './WalletTab';
import { KycTab } from './KycTab';
import { SupportTab } from './SupportTab';
import { ProfileTab } from './ProfileTab';
import {
  LayoutDashboard,
  Users,
  GitBranch,
  DollarSign,
  Wallet,
  ShieldCheck,
  HelpCircle,
  User,
  LogOut,
  ShoppingBag,
  Menu,
  X,
  Layers,
} from 'lucide-react';

export const MemberDashboard: React.FC = () => {
  const { currentUser, logout, setCurrentView } = useMLM();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return null;

  const menuItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'team', name: 'My Team', icon: <Users className="w-5 h-5" /> },
    { id: 'genealogy', name: 'Genealogy Tree', icon: <GitBranch className="w-5 h-5" /> },
    { id: 'commissions', name: 'Commissions', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'wallet', name: 'Wallet & Withdrawals', icon: <Wallet className="w-5 h-5" /> },
    { id: 'kyc', name: 'KYC Verification', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'support', name: 'Support Tickets', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'profile', name: 'Profile Settings', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">Apex<span className="text-blue-500">MLM</span></span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Member Portal</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setCurrentView('products')}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-blue-400" />
            <span>Product Catalog</span>
          </button>
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setCurrentView('admin-dashboard')}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-200 text-sm font-semibold transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Switch to Admin Portal</span>
            </button>
          )}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-rose-500/10 text-rose-400 text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 h-20 px-6 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:block font-bold text-slate-800 capitalize">
            {activeTab.replace('-', ' ')}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <span className="block text-sm font-bold text-slate-900">{currentUser.name}</span>
                <span className="block text-xs text-slate-500">{currentUser.email}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'team' && <TeamTab />}
          {activeTab === 'genealogy' && <GenealogyTab />}
          {activeTab === 'commissions' && <CommissionsTab />}
          {activeTab === 'wallet' && <WalletTab />}
          {activeTab === 'kyc' && <KycTab />}
          {activeTab === 'support' && <SupportTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </main>
      </div>
    </div>
  );
};
