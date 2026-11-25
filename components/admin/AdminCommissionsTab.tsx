'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { DollarSign } from 'lucide-react';

export const AdminCommissionsTab: React.FC = () => {
  const { commissions } = useMLM();
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commission Management</h1>
          <p className="text-sm text-slate-500">Global audit of all distributed unilevel commissions across the platform</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-extrabold text-emerald-600">₹{totalCommissions.toLocaleString('en-IN')}</span>
          <span className="block text-xs text-slate-500 font-semibold">Total Payouts</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-200">
          {commissions.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">No commissions distributed yet.</div>
          ) : (
            commissions.map((com) => (
              <div key={com.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">Recipient: {com.recipientName}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 uppercase">
                      Level {com.level} ({com.percentage}%)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{com.description} • {new Date(com.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-600">+₹{com.amount.toLocaleString('en-IN')}</span>
                  <span className="block text-[11px] text-slate-500 capitalize">{com.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
