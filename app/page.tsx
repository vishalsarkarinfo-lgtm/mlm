'tsx'
'use client';

import React from 'react';
import { MLMProvider, useMLM } from '@/context/MLMContext';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { HomeView } from '@/components/public/HomeView';
import { AboutView } from '@/components/public/AboutView';
import { BusinessPlanView } from '@/components/public/BusinessPlanView';
import { ProductsView } from '@/components/public/ProductsView';
import { HowItWorksView } from '@/components/public/HowItWorksView';
import { ContactView } from '@/components/public/ContactView';
import { LoginView } from '@/components/public/LoginView';
import { RegisterView } from '@/components/public/RegisterView';
import { LegalView } from '@/components/public/LegalView';
import { MemberDashboard } from '@/components/member/MemberDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

function AppContent() {
  const { currentView } = useMLM();

  if (currentView === 'member-dashboard') {
    return <MemberDashboard />;
  }

  if (currentView === 'admin-dashboard') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'business-plan' && <BusinessPlanView />}
        {currentView === 'products' && <ProductsView />}
        {currentView === 'how-it-works' && <HowItWorksView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'login' && <LoginView />}
        {currentView === 'register' && <RegisterView />}
        {currentView === 'legal-terms' && <LegalView type="terms" />}
        {currentView === 'legal-privacy' && <LegalView type="privacy" />}
        {currentView === 'legal-refund' && <LegalView type="refund" />}
        {currentView === 'legal-income' && <LegalView type="income" />}
      </main>
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <MLMProvider>
      <AppContent />
    </MLMProvider>
  );
}
