'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { LogIn, Layers, Sparkles, AlertCircle } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, setCurrentView } = useMLM();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email);
    if (success) {
      const foundUser = JSON.parse(localStorage.getItem('apex_current_user') || '{}');
      if (foundUser.role === 'admin') {
        setCurrentView('admin-dashboard');
      } else {
        setCurrentView('member-dashboard');
      }
    } else {
      setError('Email not found. Try one of the demo accounts below or register.');
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    const success = login(demoEmail);
    if (success) {
      const foundUser = JSON.parse(localStorage.getItem('apex_current_user') || '{}');
      if (foundUser.role === 'admin') {
        setCurrentView('admin-dashboard');
      } else {
        setCurrentView('member-dashboard');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 space-y-8">
        {/* Logo Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center text-white mx-auto shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">Sign in to access your MLM dashboard</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-center gap-2 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com or admin@apexmlm.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </form>

        {/* Demo Quick Logins */}
        <div className="border-t border-slate-200 pt-6 space-y-3">
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Quick Demo Accounts</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => fillDemo('admin@apexmlm.com')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
            >
              👑 Login as Admin
            </button>
            <button
              onClick={() => fillDemo('john@example.com')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
            >
              👤 Login as John (Member)
            </button>
          </div>
          <button
            onClick={() => fillDemo('sarah@example.com')}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
          >
            👤 Login as Sarah (L1 Leader)
          </button>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <button onClick={() => setCurrentView('register')} className="text-blue-600 font-bold hover:underline">
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};
