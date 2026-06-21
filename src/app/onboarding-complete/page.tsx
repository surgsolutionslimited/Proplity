'use client';
import Link from 'next/link';

export default function OnboardingComplete() {
  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      
    <div className="space-y-10">

      
      <div className="relative inline-flex items-center justify-center scale-in">
        <div className="absolute inset-0 bg-primary/15 rounded-full blur-3xl animate-pulse-glow" style={{"width":"200px","height":"200px","left":"-20px","top":"-20px"}}></div>
        <div className="bg-surface-container-lowest shadow-[0px_8px_40px_rgba(15,110,86,0.10)] p-10 rounded-full relative z-10 border border-outline-variant/10">
          <span className="material-symbols-outlined text-primary leading-none" style={{fontSize:"88px", fontVariationSettings:"'FILL' 1, 'wght' 500"}}>check_circle</span>
        </div>
      </div>

      
      <div className="space-y-4 fade-up d1">
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight">You're all set!</h1>
        <p className="text-on-surface-variant text-xl md:text-2xl max-w-md mx-auto leading-relaxed">
          We've customized your dashboard based on your preferences.
        </p>
      </div>

      
      <div className="pt-2 fade-up d2">
        <a href="index.html" className="bg-primary hover:opacity-90 active:scale-95 text-on-primary font-headline font-bold text-xl px-14 py-5 rounded-2xl shadow-sm transition-all duration-200 flex items-center gap-3 mx-auto w-fit">
          Go to Dashboard
          <span className="material-symbols-outlined" style={{"fontSize":"22px"}}>arrow_forward</span>
        </a>
      </div>

      
      <div className="fade-up d3 grid grid-cols-1 md:grid-cols-2 gap-5 text-left mt-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_4px_20px_rgba(15,110,86,0.05)] border border-outline-variant/20 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <span className="material-symbols-outlined text-primary" style={{fontSize:"20px", fontVariationSettings:"'FILL' 1"}}>analytics</span>
            </div>
            <span className="font-headline font-bold text-on-surface">Personalized Insights</span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">We've highlighted growth areas and properties that match your investment profile and target area.</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_4px_20px_rgba(15,110,86,0.05)] border border-outline-variant/20 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-secondary-container/25 rounded-xl">
              <span className="material-symbols-outlined text-secondary" style={{fontSize:"20px", fontVariationSettings:"'FILL' 1"}}>notifications_active</span>
            </div>
            <span className="font-headline font-bold text-on-surface">Smart Alerts</span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">Real-time updates when properties hit your criteria — price drops, new listings, and market shifts.</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_4px_20px_rgba(15,110,86,0.05)] border border-outline-variant/20 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-tertiary-fixed-dim/25 rounded-xl">
              <span className="material-symbols-outlined text-tertiary" style={{fontSize:"20px", fontVariationSettings:"'FILL' 1"}}>description</span>
            </div>
            <span className="font-headline font-bold text-on-surface">Valuation Reports</span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">Generate full AI-powered PDF reports with comparable sales, signals, and investment scoring.</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_4px_20px_rgba(15,110,86,0.05)] border border-outline-variant/20 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <span className="material-symbols-outlined text-primary" style={{fontSize:"20px", fontVariationSettings:"'FILL' 1"}}>map</span>
            </div>
            <span className="font-headline font-bold text-on-surface">Map Explorer</span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">Browse comparable sales with interactive map pins, price filters, and neighbourhood intelligence.</p>
        </div>
      </div>

      
      <div className="fade-up d4 flex items-center justify-center gap-6 pt-4">
        <a href="pricing.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">View Plans</a>
        <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
        <a href="sign-in.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Manage Account</a>
      </div>
    </div>
  
    </div>
  );
}


