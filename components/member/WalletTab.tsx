'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WalletTab: React.FC = () => {
  const { currentUser, walletTransactions, withdrawals, requestWithdrawal, getMemberWalletBalance, config } = useMLM();
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'bank_transfer' | 'upi'>('bank_transfer');
  const [details, setDetails] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!currentUser) return null;

  const currentBalance = getMemberWalletBalance(currentUser.id);
  const userTxs = walletTransactions.filter((t) => t.memberId === currentUser.id);
  const userWithdrawals = withdrawals.filter((w) => w.memberId === currentUser.id);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    const result = requestWithdrawal(numAmount, method, details);
    if (result.success) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setSuccess('Withdrawal request submitted successfully! Pending admin review.');
      setWithdrawModalOpen(false);
      setAmount('');
      setDetails('');
      setTimeout(() => setSuccess(null), 5000);
    } else {
      setError(result.error || 'Withdrawal failed.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Wallet Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Wallet className="w-3.5 h-3.5" />
            <span>Secure Digital Wallet</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">₹{currentBalance.toLocaleString('en-IN')}</h1>
          <p className="text-sm text-slate-300">Available balance ready for instant withdrawal or reinvestment.</p>
        </div>
        <button
          onClick={() => setWithdrawModalOpen(true)}
          className="px-6 py-3.5 rounded-xl bg-white text-emerald-950 font-bold hover:bg-emerald-50 transition-colors shadow-md"
        >
          Request Withdrawal
        </button>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-medium">
          {success}
        </div>
      )}

      {/* Withdrawal Requests History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Withdrawal Requests</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {userWithdrawals.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">No withdrawal requests submitted yet.</div>
          ) : (
            userWithdrawals.map((wd) => (
              <div key={wd.id} className="px-8 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-sm text-slate-900">₹{wd.amount.toLocaleString('en-IN')}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      wd.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                      wd.status === 'rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {wd.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Method: {wd.method} • {wd.destinationDetails}</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span>{new Date(wd.requestedAt).toLocaleString()}</span>
                  {wd.adminNotes && <span className="block text-[11px] text-slate-400 mt-0.5">{wd.adminNotes}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Ledger Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Immutable Transaction Ledger</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {userTxs.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">No transactions recorded.</div>
          ) : (
            userTxs.map((tx) => (
              <div key={tx.id} className="px-8 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-slate-900">{tx.description}</h4>
                    <span className="text-xs text-slate-500">{new Date(tx.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-base font-extrabold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[11px] text-slate-500">Balance: ₹{tx.balanceAfter.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Request Withdrawal</h3>
              <button onClick={() => setWithdrawModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-center gap-2 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  required
                  min={config.minWithdrawal}
                  max={currentBalance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm"
                />
                <span className="text-[11px] text-slate-500">Minimum withdrawal: ₹{config.minWithdrawal}</span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Payment Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm bg-white"
                >
                  <option value="bank_transfer">Bank Transfer (NEFT/IMPS)</option>
                  <option value="upi">UPI ID</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Account / UPI Details</label>
                <input
                  type="text"
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="HDFC A/C: 123456789012, IFSC: HDFC0001234"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="w-1/2 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-md hover:bg-emerald-500"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
