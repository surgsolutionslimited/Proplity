'use client';

import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ type: 'success', text: 'Password reset email sent! Check your inbox.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to send password reset email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-stretch overflow-hidden bg-background">
      {/* LEFT PANEL */}
      <section className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-primary flex-col h-[calc(100vh-80px)]">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbdQ-r6rntcnVaJug-TaaJy_WkSba0AWD46Wm4p-ZD1_eQxpXAaS-rg_MTlIBM35pO15R9Wgqb9nftOi3Ls79F5xasK6h-2DBUhUXeePJRf6U_QYJkUceAsOsad3DQzM_QUaOBCzZ6NELoDvUCUD-8_l4KWVRsYMi8A9RAaWzkKsQ4XorXokETcjh-n443136tya_J1doOgY9GK0SmnEFApBDVMllxhXszeVqxyxf7KWSVFk4lZwQDXB_Ef88esV7RTYmcehNE3o0')"}}></div>
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/80 to-primary/40"></div>

        <div className="relative z-20 p-14 flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-on-primary" style={{fontVariationSettings: "'FILL' 1"}}>home_work</span>
            <span className="font-headline-lg text-3xl font-extrabold tracking-tight text-on-primary">Proplity</span>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline-lg text-5xl font-extrabold text-white leading-tight">
              Regain access to<br/>your account.
            </h2>
            <p className="text-xl text-primary-fixed leading-relaxed opacity-90 max-w-md">
              Enter your email address to reset your password and get back to your property intelligence dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="w-full lg:w-[48%] flex items-center justify-center p-6 md:p-12 bg-surface-bright relative">
        <div className="w-full max-w-md z-10">
          
          <div className="mb-8">
            <Link href="/sign-in" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface mb-6 transition-colors">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Sign In
            </Link>
            <h1 className="font-headline-lg text-3xl font-bold text-on-background tracking-tight mb-2">
              Reset Password
            </h1>
            <p className="text-on-surface-variant">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm ${message.type === 'error' ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'}`}>
              {message.text}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleResetPassword}>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface ml-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">mail</span>
                </div>
                <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all" placeholder="james@example.com" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-primary-container text-on-primary font-headline-sm font-bold py-4 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4">
              {loading ? 'Sending...' : 'Send Reset Link'}
              {!loading && <span className="material-symbols-outlined text-[18px]">send</span>}
            </button>
          </form>
          
        </div>
      </section>
    </div>
  );
}
