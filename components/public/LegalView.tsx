'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { ShieldCheck } from 'lucide-react';

export const LegalView: React.FC<{ type: 'terms' | 'privacy' | 'refund' | 'income' }> = ({ type }) => {
  const { config } = useMLM();

  const titles = {
    terms: 'Terms and Conditions',
    privacy: 'Privacy Policy',
    refund: 'Refund and Cancellation Policy',
    income: 'Income Disclaimer & Compliance',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Regulatory Compliance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">{titles[type]}</h1>
        <p className="text-xs text-slate-500">{config.companyName} — Last updated: February 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-700 leading-relaxed">
        {type === 'terms' && (
          <>
            <p>Welcome to {config.companyName}. By accessing or using our platform, website, products, and unilevel referral network, you agree to be bound by these Terms and Conditions.</p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">1. Account Eligibility & Registration</h3>
            <p>Members must be at least 18 years of age and residents of jurisdictions where direct selling is permitted. All registration details including PAN, Aadhaar, and bank account information must be accurate and verifiable through KYC protocols.</p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">2. Product-Driven Commerce</h3>
            <p>Our platform operates strictly on verified sales of SaaS tools and digital education courses. No fees are charged solely for recruitment, and commissions are calculated exclusively from eligible product business volume (BV).</p>
          </>
        )}

        {type === 'privacy' && (
          <>
            <p>At {config.companyName}, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal and financial information.</p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">1. Information Collection</h3>
            <p>We collect personal information such as name, email, phone number, and KYC identifiers (PAN, Aadhaar) solely for account verification, commission disbursement, and regulatory tax compliance.</p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">2. Data Security</h3>
            <p>All sensitive information is encrypted using 256-bit SSL protocols and stored securely with strict role-based access controls. We never sell your data to third parties.</p>
          </>
        )}

        {type === 'refund' && (
          <>
            <p>{config.companyName} offers a transparent 7-day money-back guarantee on all digital product and software purchases.</p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">1. Refund Eligibility</h3>
            <p>If you are not satisfied with your digital software or masterclass purchase, you may request a full refund within 7 days of the transaction date, provided no fraudulent claims or abuse of the referral system has occurred.</p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">2. Commission Reversals</h3>
            <p>In the event of a product refund or order cancellation, all corresponding level commissions disbursed to upline members will be automatically reversed from wallet balances.</p>
          </>
        )}

        {type === 'income' && (
          <>
            <p>Earnings and income representations made by {config.companyName}, its leaders, and members are aspirational statements of your business potential.</p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">1. No Guaranteed Income</h3>
            <p>Success with {config.companyName} requires dedication, hard work, skill, and consistent product sales. There are no guarantees of financial success or fixed returns.</p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">2. Direct Selling Compliance</h3>
            <p>Our compensation plan strictly complies with applicable Indian consumer protection and direct selling rules. Earnings depend entirely on individual and team sales performance.</p>
          </>
        )}
      </div>
    </div>
  );
};
