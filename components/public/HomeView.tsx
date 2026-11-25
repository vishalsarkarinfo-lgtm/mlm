'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { ArrowRight, ShieldCheck, Users, TrendingUp, Award, CheckCircle2, Zap, Globe, Sparkles, ChevronRight } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setCurrentView, members, orders, commissions } = useMLM();

  const totalMembersCount = members.length * 142; // Simulated global network count
  const totalPayouts = commissions.reduce((sum, c) => sum + c.amount, 0) + 1485000;

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white pt-24 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Enterprise MLM Platform</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Build Your Digital Empire With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Unmatched Precision</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              Empower your entrepreneurial journey with our transparent unilevel referral network, verified digital product sales, and automated real-time commission engine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentView('register')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all hover:scale-105"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentView('business-plan')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800 text-slate-200 font-semibold border border-slate-700 hover:bg-slate-700 transition-all"
              >
                <span>Explore Business Plan</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-white">₹{totalPayouts.toLocaleString('en-IN')}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Total Commissions Paid</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-white">{(totalMembersCount).toLocaleString('en-IN')}+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Active Global Members</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-white">99.9%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">System Uptime</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Product-Driven Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Designed for Ambitious Entrepreneurs</h2>
          <p className="text-slate-600">Our platform combines enterprise-grade security with intuitive workflows so you can scale your network effortlessly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Unilevel Commission Engine</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real-time multi-level payouts ranging across 5 distinct tiers. Automatically calculated and credited instantly upon verified product sales.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Interactive Genealogy Tree</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Visualize your entire downline hierarchy in real-time. Track sponsor relationships, member activation status, and team business volume.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Secure Wallet & KYC</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Robust wallet ledger with instant withdrawal requests, bank/UPI payout verification, and strict regulatory compliance controls.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">How ApexMLM Works</h2>
            <p className="text-slate-600">Start your journey in four simple, transparent steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Register & Join', desc: 'Sign up using a sponsor referral code and verify your profile.' },
              { step: '02', title: 'Acquire Products', desc: 'Choose from our elite SaaS and digital education suite.' },
              { step: '03', title: 'Build Your Team', desc: 'Share your unique referral link and build your unilevel downline.' },
              { step: '04', title: 'Earn & Withdraw', desc: 'Earn automated tier commissions and withdraw securely to your bank.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
                <span className="text-4xl font-extrabold text-blue-600/20">{item.step}</span>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Trusted by Top Leaders</h2>
          <p className="text-slate-600">Hear from successful members who transformed their careers with ApexMLM.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Rajesh Kumar',
              role: 'Director Rank, Delhi',
              text: 'ApexMLM has the most transparent commission engine I have ever experienced. Payouts are instant and accurate every single week.',
            },
            {
              name: 'Ananya Deshmukh',
              role: 'Senior Manager, Pune',
              text: 'The digital product suite is genuinely top-tier. Selling products that deliver real value makes building the team effortless.',
            },
            {
              name: 'Vikram Malhotra',
              role: 'Executive Rank, Bangalore',
              text: 'The admin dashboard and genealogy tree give complete clarity on downline performance. Outstanding platform architecture.',
            },
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <p className="text-slate-700 italic text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div>
                <h4 className="font-bold text-slate-900">{t.name}</h4>
                <p className="text-xs text-blue-600 font-semibold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-10 sm:p-16 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)]" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Start Your Success Story?</h2>
          <p className="text-blue-100 max-w-xl mx-auto text-base">
            Join thousands of successful entrepreneurs building scalable digital businesses with ApexMLM today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('register')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-blue-950 font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Create Free Account
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-800 text-white font-bold hover:bg-blue-700 transition-colors border border-blue-700"
            >
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
