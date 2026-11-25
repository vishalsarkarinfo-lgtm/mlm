'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { Users, DollarSign, Wallet, ShoppingBag, ShieldCheck, ArrowUpRight, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const AdminOverviewTab: React.FC = () => {
  const { members, orders, commissions, withdrawals } = useMLM();

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'active').length;
  const pendingKyc = members.filter((m) => m.kycStatus === 'pending').length;
  const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);
  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending');
  const pendingWithdrawalsAmount = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0);

  const revenueData = [
    { month: 'Oct', revenue: 145000 },
    { month: 'Nov', revenue: 290000 },
    { month: 'Dec', revenue: 420000 },
    { month: 'Jan', revenue: 680000 },
    { month: 'Feb', revenue: totalSales + 250000 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Platform Administrator Portal</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Admin Command Center</h1>
        <p className="text-sm text-slate-300">Monitor overall platform performance, member KYC approvals, withdrawal requests, and unilevel configurations.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Members</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{totalMembers}</div>
          <span className="text-xs text-emerald-600 font-semibold">{activeMembers} Active members</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Product Sales</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">₹{totalSales.toLocaleString('en-IN')}</div>
          <span className="text-xs text-indigo-600 font-semibold">{orders.length} verified orders</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Commissions</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">₹{totalCommissions.toLocaleString('en-IN')}</div>
          <span className="text-xs text-emerald-600 font-semibold">Distributed across tiers</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Withdrawals</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">₹{pendingWithdrawalsAmount.toLocaleString('en-IN')}</div>
          <span className="text-xs text-amber-600 font-semibold">{pendingWithdrawals.length} requests pending</span>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Platform Revenue & Sales Volume</h3>
            <p className="text-xs text-slate-500">Monthly revenue growth from eligible product sales</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">Growth +24.8%</span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
