'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { DollarSign, ArrowUpRight } from 'lucide-react';

export const CommissionsTab: React.FC = () => {
  const { currentUser, commissions } = useMLM();

  if (!currentUser) return null;

  const userCommissions = commissions.filter((c) => c.recipientId === currentUser.id);
  const totalEarned = userCommissions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commission History</h1>
          <p className="text-sm text-slate-500">Detailed record of all unilevel tier commissions earned from your team sales</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-extrabold text-emerald-600">₹{totalEarned.toLocaleString('en-IN')}</span>
          <span className="block text-xs text-slate-500 font-semibold">Total Commissions</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">All Transactions</h3>
          <span className="text-xs text-slate-500">Instant real-time settlement</span>
        </div>

        <div className="divide-y divide-slate-200">
          {userCommissions.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">No commissions recorded yet.</div>
          ) : (
            userCommissions.map((com) => (
              <div key={com.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">{com.description}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>Source: {com.sourceMemberName}</span>
                    <span>•</span>
                    <span>{new Date(com.createdAt).toLocaleString()}</span>
                  </div>
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
