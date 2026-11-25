'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { ShieldCheck, Target, Users, Award, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { config } = useMLM();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">About {config.companyName}</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          We are pioneers in enterprise MLM software and digital referral architecture, committed to ethical business practices, verified product sales, and member empowerment.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            To provide a world-class, transparent, and legally compliant direct selling platform where ambitious individuals can build sustainable digital businesses through high-value product sales and rewarding unilevel mentorship.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-slate-600 leading-relaxed">
            To redefine the global MLM industry by eliminating recruitment-only scams and establishing a gold standard of product-driven commerce, real-time automated commissions, and absolute financial transparency.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-50 p-10 sm:p-14 rounded-3xl border border-slate-200 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Our Core Principles</h2>
          <p className="text-slate-600">The foundational pillars that guide every decision we make.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Absolute Transparency', desc: 'Every commission, order, and wallet transaction is immutably recorded and instantly viewable.' },
            { title: 'Real Product Value', desc: 'Commissions are generated exclusively from verified sales of world-class SaaS and educational software.' },
            { title: 'Regulatory Compliance', desc: 'Strict adherence to direct selling guidelines, KYC verification, and tax compliance protocols.' },
          ].map((val, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
