'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchAutocomplete from '@/components/ui/SearchAutocomplete';
import ProgressRing from '@/components/ui/ProgressRing';
import { useSavedPlaces } from '@/lib/hooks/useSavedPlaces';

export default function Home() {
  const router = useRouter();
  const { savedPlaces, isLoaded } = useSavedPlaces();
  const [toastMessage, setToastMessage] = useState('');

  const handleCardClick = (routeBase: string) => {
    if (!isLoaded) return;
    if (savedPlaces.length > 0) {
      router.push(`${routeBase}?postcode=${encodeURIComponent(savedPlaces[0].id)}`);
    } else {
      setToastMessage('You have no saved places. Please search for an area to add it to your saved places.');
      setTimeout(() => setToastMessage(''), 4000);
      document.getElementById('search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-16 pw-page relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-xl shadow-lg font-label-md animate-in slide-in-from-top-4 fade-in duration-300">
          {toastMessage}
        </div>
      )}
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center max-w-3xl mx-auto space-y-8 mt-4 md:mt-12 pw-reveal is-visible">
        <div className="absolute inset-0 pointer-events-none overflow-visible opacity-40 -z-10">
          <div className="blob absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/10"></div>
          <div className="blob absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-secondary-container/20"></div>
        </div>
        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          Real Estate Like A Pro
        </div>
        <h1 className="font-display text-on-surface tracking-tight text-[28px] leading-tight md:text-display">
          Know what a property is really worth <span className="text-primary">before you make an offer</span>
        </h1>
        <p className="font-body-md text-body-md md:font-body-lg md:text-body-lg text-on-surface-variant max-w-2xl">
          Institutional-grade analysis, real-time market sentiment, and deep historical data combined to give you the edge in high-stakes real estate investments.
        </p>

        {/* Search Bar */}
        <div id="search" className="w-full max-w-2xl relative mt-4">
          <div className="relative w-full flex items-center bg-surface-container-lowest rounded-2xl p-3 ambient-shadow card-border focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/30 transition-all">
            <span className="material-symbols-outlined text-outline ml-3 mr-2">location_on</span>
            <SearchAutocomplete />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Try:</span>
            {['SW1A 1AA', 'E14 5AB', 'W11 2BQ', 'M1 1AE'].map((postcode) => (
              <button
                key={postcode}
                onClick={() => router.push(`/property-insights?postcode=${encodeURIComponent(postcode)}`)}
                className="cursor-pointer px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/20 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high transition-colors"
              >
                {postcode}
              </button>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-on-surface-variant font-label-sm text-label-sm mt-2">
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> FCA Compliant Data</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>database</span> 20M+ Transactions</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>update</span> Updated Daily</span>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full pw-reveal pw-reveal-delay-1 is-visible">
        <div onClick={() => handleCardClick('/valuation-report')} className="glass-card rounded-2xl p-6 soft-shadow card-hover card-transition flex flex-col h-full group cursor-pointer text-left">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Property Valuation</h3>
          <p className="font-body-md text-body-md text-on-surface-variant flex-grow">See the potential value of your property</p>
          <div className="mt-4 flex items-center gap-1 text-primary font-label-sm text-label-sm group-hover:gap-2 transition-all">
            <span>View Report</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </div>

        <div onClick={() => handleCardClick('/property-insights')} className="glass-card rounded-2xl p-6 soft-shadow card-hover card-transition flex flex-col h-full group cursor-pointer text-left">
          <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>newspaper</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">News Signals</h3>
          <p className="font-body-md text-body-md text-on-surface-variant flex-grow">Real-time market sentiment analysis impacting local property values.</p>
          <div className="mt-4 flex items-center gap-1 text-primary font-label-sm text-label-sm group-hover:gap-2 transition-all">
            <span>See Signals</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </div>

        <div onClick={() => handleCardClick('/property-insights')} className="glass-card rounded-2xl p-6 soft-shadow card-hover card-transition flex flex-col h-full group cursor-pointer text-left">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Investment Score</h3>
          <div className="flex items-center gap-4 mt-4">
            <ProgressRing value={74} size={64} strokeWidth={8} />
            <span className="text-sm font-medium text-on-surface">A solid choice in a steady area</span>
          </div>
        </div>

        <div onClick={() => handleCardClick('/comparable-sales')} className="glass-card rounded-2xl p-6 soft-shadow card-hover card-transition flex flex-col h-full group cursor-pointer text-left">
          <div className="w-12 h-12 rounded-xl bg-outline/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Comparable Sales</h3>
          <p className="font-body-md text-body-md text-on-surface-variant flex-grow">Deep historical data mapping to validate current asking prices.</p>
          <div className="mt-4 flex items-center gap-1 text-primary font-label-sm text-label-sm group-hover:gap-2 transition-all">
            <span>Explore Comps</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary rounded-2xl md:rounded-3xl p-7 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative pw-reveal pw-reveal-delay-2 is-visible">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined absolute text-[400px] -right-20 -top-20 text-white">analytics</span>
        </div>
        <div className="relative z-10">
          <h2 className="font-headline-lg text-on-primary mb-3 text-xl md:text-headline-lg">Ready to make informed decisions?</h2>
          <p className="font-body-md text-body-md md:font-body-lg md:text-body-lg text-on-primary/80 max-w-lg">Access institutional-grade property intelligence. Start with a free valuation today.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10 flex-shrink-0 w-full md:w-auto">
          <Link href="/pricing" className="bg-on-primary text-primary font-label-md text-label-md px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-center font-semibold">
            View Pricing
          </Link>
          <Link href="/sign-in" className="bg-on-primary/10 text-on-primary border border-on-primary/30 font-label-md text-label-md px-6 py-3.5 rounded-xl hover:bg-on-primary/20 transition-colors text-center">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}

