'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { ShieldCheck, CheckCircle2, AlertCircle, Upload } from 'lucide-react';

export const KycTab: React.FC = () => {
  const { currentUser, updateKycStatus } = useMLM();
  const [pan, setPan] = useState(currentUser?.kycDetails?.panNumber || '');
  const [aadhaar, setAadhaar] = useState(currentUser?.kycDetails?.aadhaarNumber || '');
  const [bankAccount, setBankAccount] = useState(currentUser?.kycDetails?.bankAccount || '');
  const [ifsc, setIfsc] = useState(currentUser?.kycDetails?.ifscCode || '');
  const [holder, setHolder] = useState(currentUser?.kycDetails?.accountHolder || currentUser?.name || '');
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateKycStatus(currentUser.id, 'pending', {
      panNumber: pan,
      aadhaarNumber: aadhaar,
      bankAccount,
      ifscCode: ifsc,
      accountHolder: holder,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">KYC Verification & Compliance</h1>
        <p className="text-sm text-slate-500">Submit your PAN, Aadhaar, and Bank Account details for secure commission withdrawals and regulatory compliance.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Verification Status</h3>
            <p className="text-xs text-slate-500">Current compliance state</p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            currentUser.kycStatus === 'verified' ? 'bg-emerald-50 text-emerald-700' :
            currentUser.kycStatus === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
          }`}>
            {currentUser.kycStatus}
          </span>
        </div>

        {submitted && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-medium">
            KYC documents submitted successfully! Admin review in progress.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">PAN Card Number</label>
              <input
                type="text"
                required
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm uppercase font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Aadhaar Number</label>
              <input
                type="text"
                required
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                placeholder="9999 8888 7777"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Bank Account Number</label>
              <input
                type="text"
                required
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="123456789012"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">IFSC Code</label>
              <input
                type="text"
                required
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                placeholder="HDFC0001234"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm font-mono uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Account Holder Name</label>
              <input
                type="text"
                required
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Submit KYC Documents for Verification</span>
          </button>
        </form>
      </div>
    </div>
  );
};
