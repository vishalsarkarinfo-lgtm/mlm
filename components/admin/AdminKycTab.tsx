'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { ShieldCheck, Check, X } from 'lucide-react';

export const AdminKycTab: React.FC = () => {
  const { members, updateKycStatus } = useMLM();
  const kycMembers = members.filter((m) => m.kycStatus === 'pending' || m.kycStatus === 'verified');

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">KYC Verification Management</h1>
          <p className="text-sm text-slate-500">Review member PAN, Aadhaar, and bank account submissions</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-200">
          {kycMembers.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">No KYC records found.</div>
          ) : (
            kycMembers.map((member) => (
              <div key={member.id} className="px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-base text-slate-900">{member.name} ({member.email})</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      member.kycStatus === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {member.kycStatus}
                    </span>
                  </div>
                  {member.kycDetails && (
                    <div className="text-xs text-slate-500 space-y-0.5">
                      <p>PAN: <span className="font-mono font-bold text-slate-700">{member.kycDetails.panNumber}</span> | Aadhaar: <span className="font-mono font-bold text-slate-700">{member.kycDetails.aadhaarNumber}</span></p>
                      <p>Bank: <span className="font-mono font-bold text-slate-700">{member.kycDetails.bankAccount}</span> ({member.kycDetails.ifscCode}) - {member.kycDetails.accountHolder}</p>
                    </div>
                  )}
                </div>

                {member.kycStatus === 'pending' ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateKycStatus(member.id, 'verified')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-500 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve KYC</span>
                    </button>
                    <button
                      onClick={() => updateKycStatus(member.id, 'rejected')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-emerald-600">Verified</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
