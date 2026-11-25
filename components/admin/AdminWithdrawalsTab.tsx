'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { Wallet, Check, X } from 'lucide-react';

export const AdminWithdrawalsTab: React.FC = () => {
  const { withdrawals, approveWithdrawal, rejectWithdrawal } = useMLM();

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Withdrawal Requests Approval</h1>
          <p className="text-sm text-slate-500">Review and process member wallet withdrawal requests</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-extrabold text-blue-600">
            {withdrawals.filter((w) => w.status === 'pending').length}
          </span>
          <span className="block text-xs text-slate-500 font-semibold">Pending Requests</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-200">
          {withdrawals.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">No withdrawal requests found.</div>
          ) : (
            withdrawals.map((wd) => (
              <div key={wd.id} className="px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-base text-slate-900">{wd.memberName} — ₹{wd.amount.toLocaleString('en-IN')}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      wd.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                      wd.status === 'rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {wd.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Method: {wd.method} • {wd.destinationDetails}</p>
                  <span className="text-[11px] text-slate-400">Requested: {new Date(wd.requestedAt).toLocaleString()}</span>
                </div>

                {wd.status === 'pending' ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => approveWithdrawal(wd.id, 'Approved by admin')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-500 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => rejectWithdrawal(wd.id, 'Rejected by admin')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-slate-500">{wd.adminNotes}</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
