'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import Link from 'next/link';

export default function SignInPage() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (tab === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // Note: In a real app we'd save the name to Firestore here
        router.push('/onboarding-goals');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
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
              Expert property insights,<br/>delivered with clarity.
            </h2>
            <p className="text-xl text-primary-fixed leading-relaxed opacity-90 max-w-md">
              Join thousands of investors and homeowners using Proplity to make data-driven property decisions.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="font-headline-md text-2xl font-extrabold text-white">£2.4B+</div>
                <div className="text-xs text-primary-fixed/80 mt-1">Transactions analyzed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="font-headline-md text-2xl font-extrabold text-white">±3%</div>
                <div className="text-xs text-primary-fixed/80 mt-1">Valuation accuracy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="font-headline-md text-2xl font-extrabold text-white">50+</div>
                <div className="text-xs text-primary-fixed/80 mt-1">Live data sources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="w-full lg:w-[48%] flex items-center justify-center p-6 md:p-12 bg-surface-bright relative">
        <div className="w-full max-w-md z-10">
          
          <div className="mb-8">
            <div className="inline-flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/20 w-full">
              <button onClick={() => setTab('signin')} className={`flex-1 py-2.5 rounded-lg font-headline-sm font-semibold text-sm transition-all ${tab === 'signin' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}>Sign In</button>
              <button onClick={() => setTab('signup')} className={`flex-1 py-2.5 rounded-lg font-headline-sm font-semibold text-sm transition-all ${tab === 'signup' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}>Create Account</button>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="font-headline-lg text-3xl font-bold text-on-background tracking-tight mb-2">
              {tab === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-on-surface-variant">
              {tab === 'signin' ? 'Log in to access your property intelligence dashboard.' : 'Start accessing institutional-grade property intelligence today.'}
            </p>
          </div>

          {error && <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-sm">{error}</div>}

          <form className="space-y-5" onSubmit={handleAuth}>
            {tab === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface ml-1">Full name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-[20px]">person</span>
                  </div>
                  <input value={name} onChange={e => setName(e.target.value)} required type="text" className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all" placeholder="James Davidson" />
                </div>
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface ml-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">mail</span>
                </div>
                <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all" placeholder="james@example.com" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-on-surface">Password</label>
                {tab === 'signin' && <Link className="text-xs font-medium text-primary hover:underline" href="/reset-password">Forgot password?</Link>}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                </div>
                <input value={password} onChange={e => setPassword(e.target.value)} required minLength={8} type={showPassword ? 'text' : 'password'} className="block w-full pl-11 pr-11 py-3.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all" placeholder={tab === 'signin' ? '••••••••' : 'Min. 8 characters'} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-primary-container text-on-primary font-headline-sm font-bold py-4 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              {loading ? 'Processing...' : (tab === 'signin' ? 'Sign In' : 'Create Account')}
              {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </button>
          </form>
          
        </div>
      </section>
    </div>
  );
}
