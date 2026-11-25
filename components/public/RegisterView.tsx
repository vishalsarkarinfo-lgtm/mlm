'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { UserPlus, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegisterView: React.FC = () => {
  const { registerMember, setCurrentView } = useMLM();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sponsorCode, setSponsorCode] = useState('APEXADMIN');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerMember({ name, email, phone, sponsorCode });
    if (result.success) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setSuccess(true);
      setTimeout(() => {
        setCurrentView('member-dashboard');
      }, 2000);
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center text-white mx-auto shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-500">Join the ApexMLM unilevel network</p>
        </div>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold">Registration Successful!</h3>
            <p className="text-sm">Welcome aboard. Redirecting to your member dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-center gap-2 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Sponsor Referral Code</label>
              <input
                type="text"
                required
                value={sponsorCode}
                onChange={(e) => setSponsorCode(e.target.value)}
                placeholder="APEXADMIN or JOHN2026"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm uppercase font-mono"
              />
              <span className="text-[11px] text-slate-500">Default sponsor code is APEXADMIN if you don&apos;t have one.</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Complete Registration</span>
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button onClick={() => setCurrentView('login')} className="text-blue-600 font-bold hover:underline">
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
};
