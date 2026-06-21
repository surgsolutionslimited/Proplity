'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import Link from 'next/link';

function AuthActionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');
  
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (mode === 'resetPassword' && oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setEmail(email);
          setVerifying(false);
        })
        .catch((err) => {
          setMessage({ type: 'error', text: 'Invalid or expired action code. Please try resetting your password again.' });
          setVerifying(false);
        });
    } else {
      setMessage({ type: 'error', text: 'Invalid action link.' });
      setVerifying(false);
    }
  }, [mode, oobCode]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode) return;
    
    setLoading(true);
    setMessage(null);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage({ type: 'success', text: 'Your password has been changed successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to change password' });
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex-grow flex items-center justify-center bg-surface-bright min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-on-surface-variant">Verifying link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-stretch overflow-hidden bg-background min-h-screen">
      {/* LEFT PANEL */}
      <section className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-primary flex-col">
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
              Create a new<br/>password.
            </h2>
            <p className="text-xl text-primary-fixed leading-relaxed opacity-90 max-w-md">
              You are just one step away from regaining access to your institutional-grade property intelligence dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="w-full lg:w-[48%] flex items-center justify-center p-6 md:p-12 bg-surface-bright relative">
        <div className="w-full max-w-md z-10">
          
          <div className="mb-8">
            <h1 className="font-headline-lg text-3xl font-bold text-on-background tracking-tight mb-2">
              Set new password
            </h1>
            {email && (
              <p className="text-on-surface-variant">
                Resetting password for <span className="font-semibold text-on-surface">{email}</span>
              </p>
            )}
          </div>

          {message?.type === 'success' ? (
            <div className="space-y-6 mt-4">
              <div className="p-4 rounded-xl text-sm bg-primary-container text-on-primary-container flex items-start gap-3">
                <span className="material-symbols-outlined text-on-primary-container mt-0.5">check_circle</span>
                <div>
                  <p className="font-bold text-base mb-1">Password Updated</p>
                  <p>{message.text}</p>
                </div>
              </div>
              <Link href="/sign-in" className="w-full bg-primary-container text-on-primary font-headline-sm font-bold py-4 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                Back to Sign In
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          ) : (
            <>
              {message && (
                <div className="mb-6 p-4 rounded-xl text-sm bg-error-container text-on-error-container">
                  {message.text}
                </div>
              )}

              {mode === 'resetPassword' && oobCode && (
                <form className="space-y-5" onSubmit={handleResetPassword}>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-on-surface ml-1">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                      </div>
                      <input 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                        required 
                        minLength={8} 
                        type={showPassword ? 'text' : 'password'} 
                        className="block w-full pl-11 pr-11 py-3.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all" 
                        placeholder="Min. 8 characters" 
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>

                  <button disabled={loading} type="submit" className="w-full bg-primary-container text-on-primary font-headline-sm font-bold py-4 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4">
                    {loading ? 'Saving...' : 'Save New Password'}
                    {!loading && <span className="material-symbols-outlined text-[18px]">check_circle</span>}
                  </button>
                </form>
              )}
            </>
          )}
          
        </div>
      </section>
    </div>
  );
}

export default function AuthActionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <AuthActionContent />
    </Suspense>
  );
}
