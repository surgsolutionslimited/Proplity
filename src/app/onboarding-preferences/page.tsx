'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Budget = 'starter' | 'moving_up' | 'premium';

const budgetOptions: { value: Budget; label: string; range: string }[] = [
  { value: 'starter',   label: 'Starter',   range: 'Under £250k' },
  { value: 'moving_up', label: 'Moving Up', range: '£250k – £500k' },
  { value: 'premium',   label: 'Premium',   range: '£500k+' },
];

const quickTags = ['London SE1', 'Birmingham', 'Edinburgh', 'Manchester', 'Bristol'];

export default function OnboardingPreferences() {
  const [postcode, setPostcode] = useState('');
  const [budget, setBudget] = useState<Budget>('moving_up');
  const [specificLimit, setSpecificLimit] = useState(425000);
  const router = useRouter();

  return (
    <div className="flex-grow flex flex-col items-center w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">

      {/* Progress */}
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-1.5 flex-1 rounded-full bg-surface-container-high overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: '66%' }} />
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Step 2 of 3</span>
        </div>
      </div>

      <div className="slide-up d1 text-center w-full max-w-4xl">
        <p className="font-label-sm text-label-sm font-semibold text-primary uppercase tracking-widest mb-3">66% Complete</p>
        <h1 className="font-headline-lg text-headline-lg text-on-background tracking-tight mb-4">Target Area &amp; Budget</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg mx-auto">
          We use this to narrow down the most relevant market shifts and property scores for you.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 slide-up d2">

        {/* Left: postcode */}
        <div className="md:col-span-7 space-y-5">
          <div className="glass-card rounded-2xl p-7">
            <label className="block font-label-sm text-xs font-bold text-primary mb-4 uppercase tracking-widest" htmlFor="postcode">
              Preferred Postcode or City
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
              <input
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all text-on-surface placeholder:text-outline"
                id="postcode"
                placeholder="e.g. SW1A, Manchester, Bristol..."
                type="text"
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setPostcode(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    postcode === tag
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 overflow-hidden relative group">
            <div className="flex items-start gap-4">
              <div className="bg-primary-fixed p-3 rounded-xl flex-shrink-0">
                <span className="material-symbols-outlined text-on-primary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
              </div>
              <div>
                <h3 className="font-headline-md font-bold text-on-surface mb-1">Why this matters</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Property prices can fluctuate by up to 12% between adjacent postcodes. Being specific helps us find the quiet gems with strong growth potential.</p>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '140px', fontVariationSettings: "'FILL' 1" }}>map</span>
            </div>
          </div>
        </div>

        {/* Right: budget */}
        <div className="md:col-span-5">
          <div className="glass-card rounded-2xl p-7 h-full flex flex-col">
            <label className="block font-label-sm text-xs font-bold text-primary mb-6 uppercase tracking-widest">Your Budget Range</label>
            <div className="space-y-3 flex-grow">
              {budgetOptions.map(opt => {
                const isSelected = budget === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setBudget(opt.value)}
                    className={`w-full p-4 text-left rounded-xl border-2 flex justify-between items-center transition-all ${
                      isSelected ? 'border-primary bg-primary/[0.04]' : 'border-outline-variant hover:border-primary/40'
                    }`}
                  >
                    <div>
                      <span className={`block font-headline-md font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{opt.label}</span>
                      <span className="text-sm text-on-surface-variant">{opt.range}</span>
                    </div>
                    <span className={`material-symbols-outlined ${isSelected ? 'text-primary' : 'text-outline'}`}>
                      {isSelected ? 'check_circle' : 'chevron_right'}
                    </span>
                  </button>
                );
              })}

              <div className="pt-5 border-t border-outline-variant/20">
                <div className="flex justify-between font-label-sm text-xs font-bold text-outline-variant uppercase mb-4">
                  <span>Specific Limit</span>
                  <span className="text-primary">£{specificLimit.toLocaleString()}</span>
                </div>
                <input
                  className="w-full accent-primary"
                  max="1000000"
                  min="100000"
                  onChange={e => setSpecificLimit(Number(e.target.value))}
                  step="10000"
                  type="range"
                  value={specificLimit}
                />
                <div className="flex justify-between text-xs text-outline mt-2">
                  <span>£100k</span><span>£1M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="slide-up d3 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 mt-4 pt-8 border-t border-surface-variant">
        <button
          onClick={() => router.back()}
          className="w-full md:w-auto px-8 py-3 rounded-full text-on-surface-variant font-label-md font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
        </button>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <span className="text-sm text-on-surface-variant italic hidden md:block">Nearly there — just one more step!</span>
          <button
            onClick={() => router.push('/onboarding-complete')}
            className="w-full md:w-64 bg-primary-container text-on-primary px-8 py-4 rounded-2xl font-headline-md font-bold text-lg shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Next Step
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
