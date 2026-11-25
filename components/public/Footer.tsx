'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { Layers, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, config } = useMLM();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Apex<span className="text-blue-500">MLM</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {config.companyName} is a next-generation enterprise MLM and referral network platform built with transparent unilevel compensation, real digital products, and robust compliance standards.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-400 pt-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>100% Product-Driven Sales & Regulatory Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-blue-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-blue-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('business-plan')} className="hover:text-blue-400 transition-colors">Business Plan</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('products')} className="hover:text-blue-400 transition-colors">Products / Services</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('how-it-works')} className="hover:text-blue-400 transition-colors">How It Works</button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal & Compliance</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentView('legal-terms')} className="hover:text-blue-400 transition-colors">Terms & Conditions</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('legal-privacy')} className="hover:text-blue-400 transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('legal-refund')} className="hover:text-blue-400 transition-colors">Refund Policy</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('legal-income')} className="hover:text-blue-400 transition-colors">Income Disclaimer</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('contact')} className="hover:text-blue-400 transition-colors">Contact Support</button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Global HQ</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                <span>Apex Towers, BKC Complex, Bandra East, Mumbai, MH 400051</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{config.supportEmail}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+91 (022) 5548-9000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {config.companyName}. All rights reserved. Built on verified product sales.</p>
          <div className="flex items-center gap-6">
            <span>Secure SSL Encryption</span>
            <span>PCI-DSS Compliant Gateway</span>
            <span>256-Bit Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
