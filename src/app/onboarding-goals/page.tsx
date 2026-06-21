'use client';
import Link from 'next/link';

export default function OnboardingGoals() {
  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      

    
    <div className="slide-up d1 text-center mb-8 w-full max-w-3xl">
      <p className="font-label text-sm font-semibold text-primary uppercase tracking-widest mb-3">Step 1 of 3 · 33% Complete</p>
      <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-background tracking-tight mb-4">What are your goals?</h1>
      <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg mx-auto">
        We'll tailor your experience based on what you're looking to achieve in the property market.
      </p>
    </div>

    
    <div className="hidden md:grid grid-cols-3 gap-5 w-full max-w-3xl slide-up d2 mb-10">
      
      <label className="relative cursor-pointer bento-card">
        <input checked className="goal-radio sr-only" name="goal" type="radio" value="first_time"/>
        <div className="goal-card-ui h-full p-7 bg-surface-container-lowest border-2 border-primary rounded-2xl flex flex-col items-center text-center shadow-[0px_4px_20px_rgba(15,110,86,0.08)]" style={{"backgroundColor":"rgba(0,84,64,0.04)"}}>
          <div className="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "\'FILL\' 1" }}>key</span>
          </div>
          <h3 className="font-headline font-bold text-lg text-on-background mb-2">First-time Buyer</h3>
          <p className="text-on-surface-variant text-sm leading-snug">Finding and securing my very first home to live in.</p>
          <div className="check-dot opacity-100 absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center transition-opacity">
            <span className="material-symbols-outlined text-white text-sm">check</span>
          </div>
        </div>
      </label>
      
      <label className="relative cursor-pointer bento-card">
        <input className="goal-radio sr-only" name="goal" type="radio" value="investor"/>
        <div className="goal-card-ui h-full p-7 bg-surface-container-lowest border-2 border-transparent rounded-2xl flex flex-col items-center text-center hover:border-primary/30">
          <div className="w-16 h-16 rounded-full bg-secondary-container/25 flex items-center justify-center mb-5 transition-transform">
            <span className="material-symbols-outlined text-secondary text-3xl">account_balance</span>
          </div>
          <h3 className="font-headline font-bold text-lg text-on-background mb-2">Portfolio Investor</h3>
          <p className="text-on-surface-variant text-sm leading-snug">Scaling investments with yield data and rental market insights.</p>
          <div className="check-dot opacity-0 absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-primary transition-opacity"></div>
        </div>
      </label>
      
      <label className="relative cursor-pointer bento-card">
        <input className="goal-radio sr-only" name="goal" type="radio" value="agent"/>
        <div className="goal-card-ui h-full p-7 bg-surface-container-lowest border-2 border-transparent rounded-2xl flex flex-col items-center text-center hover:border-primary/30">
          <div className="w-16 h-16 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center mb-5 transition-transform">
            <span className="material-symbols-outlined text-tertiary text-3xl">real_estate_agent</span>
          </div>
          <h3 className="font-headline font-bold text-lg text-on-background mb-2">Real Estate Agent</h3>
          <p className="text-on-surface-variant text-sm leading-snug">Delivering better results and confidence for my clients.</p>
          <div className="check-dot opacity-0 absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-primary transition-opacity"></div>
        </div>
      </label>
    </div>

    
    <div className="md:hidden space-y-4 w-full max-w-lg slide-up d2 mb-10">
      <button onClick={() => {}} className="goal-mobile w-full flex items-center gap-5 p-5 rounded-2xl border-2 border-primary bg-primary/[0.04] text-left selected">
        <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-primary-container text-2xl" style={{ fontVariationSettings: "\'FILL\' 1" }}>key</span>
        </div>
        <div className="flex-grow">
          <h3 className="font-headline font-bold text-base text-on-background">First-time Buyer</h3>
          <p className="text-on-surface-variant text-sm mt-0.5">Finding my very first home.</p>
        </div>
        <div className="check-btn w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-white text-base">check</span>
        </div>
      </button>
      <button onClick={() => {}} className="goal-mobile w-full flex items-center gap-5 p-5 rounded-2xl border-2 border-outline-variant bg-surface-container-lowest text-left">
        <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant text-2xl">account_balance</span>
        </div>
        <div className="flex-grow">
          <h3 className="font-headline font-bold text-base text-on-background">Portfolio Investor</h3>
          <p className="text-on-surface-variant text-sm mt-0.5">Scaling my property investments.</p>
        </div>
        <div className="check-btn w-6 h-6 rounded-full border-2 border-primary opacity-0 flex-shrink-0"></div>
      </button>
      <button onClick={() => {}} className="goal-mobile w-full flex items-center gap-5 p-5 rounded-2xl border-2 border-outline-variant bg-surface-container-lowest text-left">
        <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant text-2xl">real_estate_agent</span>
        </div>
        <div className="flex-grow">
          <h3 className="font-headline font-bold text-base text-on-background">Real Estate Agent</h3>
          <p className="text-on-surface-variant text-sm mt-0.5">Better insights for my clients.</p>
        </div>
        <div className="check-btn w-6 h-6 rounded-full border-2 border-primary opacity-0 flex-shrink-0"></div>
      </button>
    </div>

    
    <div className="w-full max-w-3xl slide-up d3 mb-10">
      <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/30 flex items-start gap-4">
        <span className="material-symbols-outlined text-primary-container text-[22px] flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "\'FILL\' 1" }}>lightbulb</span>
        <div>
          <p className="font-headline font-bold text-on-surface text-sm mb-1">Friendly tip</p>
          <p className="text-on-surface-variant text-sm leading-relaxed">Don't worry, you can always adjust your preferences later. This just helps us show you the most relevant data first.</p>
        </div>
      </div>
    </div>

    
    <div className="slide-up d4 flex flex-col items-center gap-3 w-full max-w-xs">
      <a href="onboarding-preferences.html" className="w-full py-4 bg-primary-container text-on-primary font-headline font-bold text-lg rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center flex items-center justify-center gap-2">
        Next
        <span className="material-symbols-outlined">arrow_forward</span>
      </a>
      <p className="text-outline text-xs text-center max-w-xs leading-relaxed">By continuing, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.</p>
    </div>
  
    </div>
  );
}

