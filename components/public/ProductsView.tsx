'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { ShoppingBag, CheckCircle2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProductsView: React.FC = () => {
  const { products, currentUser, purchaseProduct, setCurrentView } = useMLM();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'razorpay' | 'bank_transfer' | 'wallet'>('upi');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleBuy = (product: any) => {
    if (!currentUser) {
      setCurrentView('login');
      return;
    }
    setSelectedProduct(product);
  };

  const confirmPurchase = () => {
    if (!selectedProduct) return;
    const success = purchaseProduct(selectedProduct.id, paymentMethod);
    if (success) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setSuccessMessage(`Successfully purchased "${selectedProduct.title}"! Commissions have been distributed to your upline.`);
      setSelectedProduct(null);
      setTimeout(() => setSuccessMessage(null), 6000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Eligible Digital Products</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Premium Product Catalog</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Every commission distributed across our unilevel network originates directly from verified sales of these high-value SaaS and digital education products.
        </p>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex items-center gap-3 max-w-2xl mx-auto shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <p className="font-medium text-sm">{successMessage}</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((prod) => (
          <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                  BV: {prod.businessVolume}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{prod.category}</span>
                <h3 className="text-xl font-bold text-slate-900">{prod.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{prod.description}</p>
                <ul className="space-y-2 pt-2">
                  {prod.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
              <div>
                <span className="text-2xl font-extrabold text-slate-900">₹{prod.price.toLocaleString('en-IN')}</span>
                <span className="block text-[11px] text-slate-500">Inclusive of all taxes</span>
              </div>
              <button
                onClick={() => handleBuy(prod)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors shadow-md"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Confirm Product Purchase</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">{selectedProduct.title}</h4>
              <p className="text-sm text-slate-600">Price: ₹{selectedProduct.price.toLocaleString('en-IN')}</p>
              <p className="text-xs text-blue-600 font-semibold">Generates {selectedProduct.businessVolume} BV for unilevel commissions</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'upi', label: 'UPI / QR Code' },
                  { id: 'razorpay', label: 'Razorpay Gateway' },
                  { id: 'bank_transfer', label: 'Bank NEFT/RTGS' },
                  { id: 'wallet', label: 'Member Wallet' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${
                      paymentMethod === m.id
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-1/2 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="w-1/2 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-500"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
