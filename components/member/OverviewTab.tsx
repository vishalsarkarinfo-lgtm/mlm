'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { Users, DollarSign, Wallet, ArrowUpRight, Copy, Check, TrendingUp, Award, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const OverviewTab: React.FC = () => {
  const { currentUser, members, commissions, walletTransactions, getMemberWalletBalance, getTeamMembers } = useMLM();
  const [copied, setCopied] = useState(false);

  if (!currentUser) return null;

  const walletBalance = getMemberWalletBalance(currentUser.id);
  const directTeam = getTeamMembers(currentUser.id);
  const totalCommissionsEarned = commissions
    .filter((c) => c.recipientId === currentUser.id && c.status === 'approved')
    .reduce((sum, c) => sum + c.amount, 0);

  const referralLink = `https://apex-mlm.com/register?ref=${currentUser.referralCode}`;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Chart data
  const chartData = [
    { month: 'Oct', earnings: 1200 },
    { month: 'Nov', earnings: 2800 },
    { month: 'Dec', earnings: 4100 },
    { month: 'Jan', earnings: 6400 },
    { month: 'Feb', earnings: totalCommissionsEarned + 1500 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Rank: {currentUser.rank}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back, {currentUser.name}!</h1>
          <p className="text-sm text-slate-300">Here is your unilevel network performance summary for today.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-1 w-full md:w-auto">
          <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">My Referral ID</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg font-bold text-white">{currentUser.referralCode}</span>
            <button
              onClick={copyReferral}
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Wallet Balance</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">₹{walletBalance.toLocaleString('en-IN')}</div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Available for withdrawal
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Commission</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">₹{totalCommissionsEarned.toLocaleString('en-IN')}</div>
          <span className="text-xs text-blue-600 font-semibold">Across all unilevel tiers</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Direct Referrals</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{directTeam.length}</div>
          <span className="text-xs text-indigo-600 font-semibold">Level 1 team members</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">KYC Status</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 capitalize">{currentUser.kycStatus}</div>
          <span className={`text-xs font-semibold ${currentUser.kycStatus === 'verified' ? 'text-emerald-600' : 'text-amber-600'}`}>
            {currentUser.kycStatus === 'verified' ? 'Fully Verified' : 'Pending verification'}
          </span>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Income & Commission Growth</h3>
            <p className="text-xs text-slate-500">Monthly breakdown of unilevel earnings</p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">Live Analytics</span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Earnings']} />
              <Area type="monotone" dataKey="earnings" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions & Commissions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Commission History</h3>
          <span className="text-xs text-slate-500">Showing latest activity</span>
        </div>
        <div className="divide-y divide-slate-200">
          {commissions.filter((c) => c.recipientId === currentUser.id).length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">No commissions earned yet. Share your referral link to get started!</div>
          ) : (
            commissions
              .filter((c) => c.recipientId === currentUser.id)
              .slice(0, 5)
              .map((com) => (
                <div key={com.id} className="px-8 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-slate-900">{com.description}</h4>
                    <span className="text-xs text-slate-500">{new Date(com.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-emerald-600">+₹{com.amount.toLocaleString('en-IN')}</span>
                    <span className="block text-[11px] text-blue-600 font-semibold uppercase">Level {com.level} ({com.percentage}%)</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};
