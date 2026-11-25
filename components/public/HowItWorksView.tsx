'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { UserPlus, ShoppingBag, Users, Wallet, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { setCurrentView } = useMLM();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Step-by-Step Guide</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">How ApexMLM Works</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Discover how simple it is to register, acquire elite products, build your referral network, and earn automated unilevel commissions.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-12 max-w-4xl mx-auto">
        {[
          {
            num: '01',
            title: 'Register with a Sponsor Code',
            desc: 'Join the platform using a valid sponsor referral code. You will receive your own unique referral link and ID immediately upon successful registration.',
            icon: <UserPlus className="w-6 h-6 text-blue-600" />,
          },
          {
            num: '02',
            title: 'Acquire Eligible Digital Products',
            desc: 'Activate your account and build business volume by purchasing world-class SaaS software or digital masterclasses from our product catalog.',
            icon: <ShoppingBag className="w-6 h-6 text-indigo-600" />,
          },
          {
            num: '03',
            title: 'Expand Your Unilevel Team',
            desc: 'Share your referral link with peers and entrepreneurs. Your downline expands across 5 unilevel tiers, giving you powerful mentorship reach.',
            icon: <Users className="w-6 h-6 text-emerald-600" />,
          },
          {
            num: '04',
            title: 'Earn & Withdraw Instantly',
            desc: 'Whenever your team members purchase products, commissions are instantly credited to your digital wallet. Request secure withdrawals anytime.',
            icon: <Wallet className="w-6 h-6 text-amber-600" />,
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Step {item.num}</span>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <button
          onClick={() => setCurrentView('register')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-500 transition-colors"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
