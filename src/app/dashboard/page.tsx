'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import SearchAutocomplete from '@/components/ui/SearchAutocomplete';
import ProgressRing from '@/components/ui/ProgressRing';

const quickSearches = ['SW1A 1AA', 'E14 5AB', 'W11 2BQ', 'M1 1AE'];

const features = [
  {
    href: '/valuation-report',
    icon: 'monitoring',
    color: 'bg-primary/10',
    iconColor: 'text-primary-container',
    title: 'AI Valuation',
    desc: 'Get an institutional-grade property valuation in seconds.',
    cta: 'View Report',
  },
  {
    href: '/comparable-sales',
    icon: 'history',
    color: 'bg-outline/10',
    iconColor: 'text-outline',
    title: 'Comparable Sales',
    desc: 'Explore historical sold prices and validate asking prices.',
    cta: 'Explore Comps',
  },
  {
    href: '/pricing',
    icon: 'trending_up',
    color: 'bg-secondary-container/30',
    iconColor: 'text-secondary',
    title: 'Upgrade Plan',
    desc: 'Unlock news signals, yield modeling, and PDF exports.',
    cta: 'See Plans',
    isUpgrade: true,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'there';
  const firstName = displayName.split(' ')[0];

  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">

      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">Welcome back</p>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Hello, {firstName} 👋
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-3 py-1.5 rounded-lg border border-outline-variant/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            Free Plan
          </span>
          <Link
            href="/pricing"
            className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Upgrade
          </Link>
        </div>
      </section>

      {/* Search bar */}
      <section className="bg-surface-container-lowest rounded-2xl p-5 md:p-8 border border-outline-variant/20 soft-shadow">
        <p className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">search</span>
          Search a property
        </p>
        <div className="relative w-full flex items-center bg-surface rounded-xl p-3 border border-outline-variant/30 focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/20 transition-all">
          <span className="material-symbols-outlined text-outline ml-2 mr-2">location_on</span>
          <SearchAutocomplete />
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Try:</span>
          {quickSearches.map(postcode => (
            <button
              key={postcode}
              onClick={() => router.push(`/property-insights?postcode=${encodeURIComponent(postcode)}`)}
              className="cursor-pointer px-3 py-1 rounded-full bg-surface-container border border-outline-variant/20 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high transition-colors"
            >
              {postcode}
            </button>
          ))}
        </div>
      </section>

      {/* Stats row */}
      <section className="-mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-4 w-max md:w-full md:grid md:grid-cols-3">
          <div className="stat-card bg-surface border border-outline-variant/20 rounded-2xl p-5 min-w-[200px] md:min-w-0 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Searches Used</span>
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
            </div>
            <div className="flex items-end gap-1.5">
              <span className="font-headline-md text-headline-md font-semibold text-on-surface">0</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mb-1">/ 3</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '0%' }} />
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">3 remaining this month</span>
          </div>

          <div className="stat-card bg-surface border border-outline-variant/20 rounded-2xl p-5 min-w-[200px] md:min-w-0 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Investment Score</span>
              <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <ProgressRing value={74} size={48} strokeWidth={5} />
              <span className="font-label-sm text-label-sm text-on-surface-variant">Example: SW1A 1AA</span>
            </div>
          </div>

          <div className="stat-card bg-surface border border-primary/10 rounded-2xl p-5 min-w-[200px] md:min-w-0 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Plan</span>
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </div>
            <span className="font-headline-md text-headline-md font-semibold text-on-surface">Free</span>
            <Link href="/pricing" className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1 mt-auto">
              Upgrade to unlock more <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick access features */}
      <section className="flex flex-col gap-4">
        <h2 className="font-headline-md text-headline-md text-on-surface">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(f => (
            <Link
              key={f.title}
              href={f.href}
              className={`glass-card rounded-2xl p-6 card-hover card-transition flex flex-col gap-4 group ${f.isUpgrade ? 'border border-secondary-container/30' : ''}`}
            >
              <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  <span className={`material-symbols-outlined ${f.iconColor}`}>{f.icon}</span>
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{f.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">{f.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm group-hover:gap-2 transition-all">
                <span>{f.cta}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Upgrade CTA banner */}
      <section className="w-full bg-primary rounded-2xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined absolute text-[300px] -right-10 -top-10 text-white">analytics</span>
        </div>
        <div className="relative z-10">
          <h2 className="font-headline-lg text-headline-lg text-on-primary mb-2">Unlock the full picture</h2>
          <p className="font-body-md text-body-md text-on-primary/80 max-w-md">
            Get real-time news signals, investment scoring, yield modeling, and PDF reports with a Buyer or Investor plan.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10 flex-shrink-0 w-full md:w-auto">
          <Link href="/pricing" className="bg-on-primary text-primary font-label-md text-label-md px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-center font-semibold">
            View Plans
          </Link>
          <Link href="/" className="bg-on-primary/10 text-on-primary border border-on-primary/30 font-label-md text-label-md px-6 py-3.5 rounded-xl hover:bg-on-primary/20 transition-colors text-center">
            Search Properties
          </Link>
        </div>
      </section>

    </div>
  );
}
