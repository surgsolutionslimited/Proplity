'use client';
import Link from 'next/link';

export default function OnboardingPreferences() {
  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      

    
    <div className="slide-up d1 text-center mb-10 w-full max-w-4xl">
      <p className="font-label text-sm font-semibold text-primary uppercase tracking-widest mb-3">Step 2 of 3 · 66% Complete</p>
      <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-background tracking-tight mb-4">Target Area &amp; Budget</h1>
      <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg mx-auto">
        We use this to narrow down the most relevant market shifts and property scores for you.
      </p>
    </div>

    
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 slide-up d2">

      
      <div className="md:col-span-7 space-y-5">
        
        <div className="glass-card rounded-2xl p-7">
          <label className="block font-label text-xs font-bold text-primary mb-4 uppercase tracking-widest" htmlFor="postcode">Preferred Postcode or City</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
            <input className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all text-on-surface font-body placeholder:text-outline" id="postcode" placeholder="e.g. SW1A, Manchester, Bristol..." type="text"/>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => {}} className="quick-tag px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-label font-medium hover:bg-primary hover:text-on-primary transition-colors">London SE1</button>
            <button onClick={() => {}} className="quick-tag px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-label font-medium hover:bg-primary hover:text-on-primary transition-colors">Birmingham</button>
            <button onClick={() => {}} className="quick-tag px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-label font-medium hover:bg-primary hover:text-on-primary transition-colors">Edinburgh</button>
            <button onClick={() => {}} className="quick-tag px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-label font-medium hover:bg-primary hover:text-on-primary transition-colors">Manchester</button>
            <button onClick={() => {}} className="quick-tag px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-label font-medium hover:bg-primary hover:text-on-primary transition-colors">Bristol</button>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-6 overflow-hidden relative group">
          <div className="flex items-start gap-4">
            <div className="bg-primary-fixed p-3 rounded-xl flex-shrink-0">
              <span className="material-symbols-outlined text-on-primary-fixed-variant" style={{ fontVariationSettings: "\'FILL\' 1" }}>trending_up</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-on-surface mb-1">Why this matters</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Property prices can fluctuate by up to 12% between adjacent postcodes. Being specific helps us find the quiet gems with strong growth potential.</p>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500">
            <span className="material-symbols-outlined text-primary" style={{fontSize:"140px", fontVariationSettings:"'FILL' 1"}}>map</span>
          </div>
        </div>
      </div>

      
      <div className="md:col-span-5">
        <div className="glass-card rounded-2xl p-7 h-full flex flex-col">
          <label className="block font-label text-xs font-bold text-primary mb-6 uppercase tracking-widest">Your Budget Range</label>
          <div className="space-y-3 flex-grow">
            <button onClick={() => {}} className="budget-btn w-full p-4 text-left rounded-xl border-2 border-outline-variant hover:border-primary/40 flex justify-between items-center">
              <div>
                <span className="budget-label block font-headline font-bold text-on-surface">Starter</span>
                <span className="text-sm text-on-surface-variant">Under £250k</span>
              </div>
              <span className="budget-icon material-symbols-outlined text-outline">chevron_right</span>
            </button>
            <button onClick={() => {}} className="budget-btn selected w-full p-4 text-left rounded-xl border-2 flex justify-between items-center" style={{"borderColor":"#005440","backgroundColor":"rgba(0,84,64,0.04)"}}>
              <div>
                <span className="budget-label block font-headline font-bold" style={{"color":"#005440"}}>Moving Up</span>
                <span className="text-sm text-on-surface-variant">£250k – £500k</span>
              </div>
              <span className="budget-icon material-symbols-outlined" style={{"color":"#005440"}}>check_circle</span>
            </button>
            <button onClick={() => {}} className="budget-btn w-full p-4 text-left rounded-xl border-2 border-outline-variant hover:border-primary/40 flex justify-between items-center">
              <div>
                <span className="budget-label block font-headline font-bold text-on-surface">Premium</span>
                <span className="text-sm text-on-surface-variant">£500k+</span>
              </div>
              <span className="budget-icon material-symbols-outlined text-outline">chevron_right</span>
            </button>
            
            <div className="pt-5 border-t border-outline-variant/20">
              <div className="flex justify-between font-label text-xs font-bold text-outline-variant uppercase mb-4">
                <span>Specific Limit</span>
                <span className="text-primary" id="budget-display">£425,000</span>
              </div>
              <input className="w-full" id="budget-slider" max="1000000" min="100000" onChange={() => {}} step="10000" type="range" value="425000"/>
              <div className="flex justify-between text-xs text-outline mt-2">
                <span>£100k</span><span>£1M</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    
    <div className="slide-up d3 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-surface-variant">
      <a href="onboarding-goals.html" className="w-full md:w-auto px-8 py-3 rounded-full text-on-surface-variant font-label font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-2 text-sm">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
      </a>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <span className="text-sm text-on-surface-variant italic hidden md:block">Nearly there — just one more step!</span>
        <a href="onboarding-complete.html" className="w-full md:w-64 bg-primary-container text-on-primary px-8 py-4 rounded-2xl font-headline font-bold text-lg shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
          Next Step
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </div>
  
    </div>
  );
}


