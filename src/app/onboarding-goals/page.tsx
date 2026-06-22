'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Goal = 'first_time' | 'investor' | 'agent';

const goals: { value: Goal; icon: string; title: string; desc: string; color: string }[] = [
  { value: 'first_time', icon: 'key', title: 'First-time Buyer', desc: 'Finding and securing my very first home to live in.', color: 'primary' },
  { value: 'investor',   icon: 'account_balance', title: 'Portfolio Investor', desc: 'Scaling investments with yield data and rental market insights.', color: 'secondary' },
  { value: 'agent',      icon: 'real_estate_agent', title: 'Real Estate Agent', desc: 'Delivering better results and confidence for my clients.', color: 'tertiary' },
];

export default function OnboardingGoals() {
  const [selected, setSelected] = useState<Goal>('first_time');
  const router = useRouter();

  return (
    <div className="flex-grow flex flex-col items-center w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">

      {/* Progress */}
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-1.5 flex-1 rounded-full bg-surface-container-high overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: '33%' }} />
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Step 1 of 3</span>
        </div>
      </div>

      <div className="slide-up d1 text-center w-full max-w-3xl">
        <p className="font-label-sm text-label-sm font-semibold text-primary uppercase tracking-widest mb-3">33% Complete</p>
        <h1 className="font-headline-lg text-headline-lg text-on-background tracking-tight mb-4">What are your goals?</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg mx-auto">
          We'll tailor your experience based on what you're looking to achieve in the property market.
        </p>
      </div>

      {/* Desktop goal cards */}
      <div className="hidden md:grid grid-cols-3 gap-5 w-full max-w-3xl slide-up d2">
        {goals.map(goal => {
          const isSelected = selected === goal.value;
          return (
            <button
              key={goal.value}
              onClick={() => setSelected(goal.value)}
              className={`relative cursor-pointer bento-card p-7 rounded-2xl flex flex-col items-center text-center border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/[0.04] shadow-[0px_4px_20px_rgba(15,110,86,0.08)]'
                  : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/30'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-transform ${isSelected ? 'scale-110' : ''} ${
                goal.color === 'primary' ? 'bg-primary-fixed/20' :
                goal.color === 'secondary' ? 'bg-secondary-container/25' : 'bg-tertiary-fixed-dim/20'
              }`}>
                <span
                  className={`material-symbols-outlined text-3xl text-${goal.color}`}
                  style={isSelected ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {goal.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-background mb-2">{goal.title}</h3>
              <p className="text-on-surface-variant text-sm leading-snug">{goal.desc}</p>
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                isSelected ? 'bg-primary opacity-100' : 'border-2 border-primary opacity-0'
              }`}>
                {isSelected && <span className="material-symbols-outlined text-white text-sm">check</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile goal list */}
      <div className="md:hidden space-y-4 w-full max-w-lg slide-up d2">
        {goals.map(goal => {
          const isSelected = selected === goal.value;
          return (
            <button
              key={goal.value}
              onClick={() => setSelected(goal.value)}
              className={`w-full flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all ${
                isSelected ? 'border-primary bg-primary/[0.04]' : 'border-outline-variant bg-surface-container-lowest'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-primary-container' : 'bg-surface-container-high'}`}>
                <span className={`material-symbols-outlined text-2xl ${isSelected ? 'text-on-primary-container' : 'text-on-surface-variant'}`}
                  style={isSelected ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                  {goal.icon}
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="font-headline-md font-bold text-base text-on-background">{goal.title}</h3>
                <p className="text-on-surface-variant text-sm mt-0.5">{goal.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${isSelected ? 'bg-primary' : 'border-2 border-primary opacity-30'}`}>
                {isSelected && <span className="material-symbols-outlined text-white text-base">check</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tip */}
      <div className="w-full max-w-3xl slide-up d3">
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/30 flex items-start gap-4">
          <span className="material-symbols-outlined text-primary-container text-[22px] flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
          <div>
            <p className="font-label-md font-bold text-on-surface text-sm mb-1">Friendly tip</p>
            <p className="text-on-surface-variant text-sm leading-relaxed">Don't worry, you can always adjust your preferences later. This just helps us show you the most relevant data first.</p>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="slide-up d4 flex flex-col items-center gap-3 w-full max-w-xs">
        <button
          onClick={() => router.push('/onboarding-preferences')}
          className="w-full py-4 bg-primary-container text-on-primary font-headline-md font-bold text-lg rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
        >
          Next
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <p className="text-outline text-xs text-center max-w-xs leading-relaxed">
          By continuing, you agree to our{' '}
          <Link href="#" className="underline hover:text-primary">Terms of Service</Link>{' '}
          and{' '}
          <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
