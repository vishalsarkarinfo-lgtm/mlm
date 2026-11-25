'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { Layers, TrendingUp, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const BusinessPlanView: React.FC = () => {
  const { config, setCurrentView } = useMLM();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Unilevel Compensation Model</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">ApexMLM Business Plan</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Our robust unilevel compensation plan rewards direct mentorship and multi-tier team building with instant, automated commission payouts.
        </p>
      </div>

      {/* Level Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden max-w-4xl mx-auto">
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Configured Unilevel Tiers</h3>
            <p className="text-sm text-slate-500">Commissions calculated from verified Business Volume (BV)</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">Active Plan</span>
        </div>
        <div className="divide-y divide-slate-200">
          {config.levelCommissions.map((lvl) => (
            <div key={lvl.level} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">
                  L{lvl.level}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Level {lvl.level} Commission</h4>
                  <p className="text-xs text-slate-500">Earned when level {lvl.level} downline members purchase products</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-blue-600">{lvl.percentage}%</span>
                <span className="block text-xs text-slate-500">of Product BV</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules & Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span>Product-Driven Rules</span>
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            In strict compliance with modern direct selling regulations, commissions are generated exclusively from verified sales of SaaS products and digital masterclasses. No earnings are generated merely from recruitment fees.
          </p>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span>Instant Wallet Credit</span>
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Whenever a downline member successfully completes an eligible purchase, our automated calculation engine immediately credits the corresponding tier commission into your digital wallet.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <button
          onClick={() => setCurrentView('register')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-500 transition-colors"
        >
          <span>Join Now & Start Earning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
