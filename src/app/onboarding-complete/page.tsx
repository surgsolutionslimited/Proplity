'use client';
import Link from 'next/link';

const features = [
  {
    icon: 'analytics',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Personalized Insights',
    desc: "We've highlighted growth areas and properties that match your investment profile and target area.",
  },
  {
    icon: 'notifications_active',
    bg: 'bg-secondary-container/25',
    iconColor: 'text-secondary',
    title: 'Smart Alerts',
    desc: 'Real-time updates when properties hit your criteria — price drops, new listings, and market shifts.',
  },
  {
    icon: 'description',
    bg: 'bg-tertiary-fixed-dim/25',
    iconColor: 'text-tertiary',
    title: 'Valuation Reports',
    desc: 'Generate full AI-powered PDF reports with comparable sales, signals, and investment scoring.',
  },
  {
    icon: 'map',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Map Explorer',
    desc: 'Browse comparable sales with interactive map pins, price filters, and neighbourhood intelligence.',
  },
];

export default function OnboardingComplete() {
  return (
    <div className="flex-grow flex flex-col items-center text-center w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 gap-10 pw-page">

      {/* Progress */}
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-1.5 flex-1 rounded-full bg-primary rounded-full" />
          <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Step 3 of 3</span>
        </div>
      </div>

      {/* Check icon */}
      <div className="relative inline-flex items-center justify-center scale-in">
        <div
          className="absolute bg-primary/15 rounded-full blur-3xl animate-pulse-glow"
          style={{ width: '200px', height: '200px', left: '-20px', top: '-20px' }}
        />
        <div className="bg-surface-container-lowest shadow-[0px_8px_40px_rgba(15,110,86,0.10)] p-10 rounded-full relative z-10 border border-outline-variant/10">
          <span
            className="material-symbols-outlined text-primary leading-none"
            style={{ fontSize: '88px', fontVariationSettings: "'FILL' 1, 'wght' 500" }}
          >
            check_circle
          </span>
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-4 fade-up d1">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] font-extrabold text-on-surface tracking-tight">You're all set!</h1>
        <p className="text-on-surface-variant text-xl md:text-2xl max-w-md mx-auto leading-relaxed">
          We've customized your dashboard based on your preferences.
        </p>
      </div>

      {/* CTA */}
      <div className="fade-up d2">
        <Link
          href="/agency-dashboard"
          className="bg-primary hover:opacity-90 active:scale-95 text-on-primary font-headline-md font-bold text-xl px-14 py-5 rounded-2xl shadow-sm transition-all duration-200 flex items-center gap-3 mx-auto w-fit"
        >
          Go to Dashboard
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>arrow_forward</span>
        </Link>
      </div>

      {/* Feature grid */}
      <div className="fade-up d3 grid grid-cols-1 md:grid-cols-2 gap-5 text-left mt-2 w-full max-w-2xl">
        {features.map(f => (
          <div
            key={f.title}
            className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_4px_20px_rgba(15,110,86,0.05)] border border-outline-variant/20 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2.5 ${f.bg} rounded-xl`}>
                <span
                  className={`material-symbols-outlined ${f.iconColor}`}
                  style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
                >
                  {f.icon}
                </span>
              </div>
              <span className="font-headline-md font-bold text-on-surface">{f.title}</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div className="fade-up d4 flex items-center justify-center gap-6 pt-2">
        <Link href="/pricing" className="text-sm text-on-surface-variant hover:text-primary transition-colors">View Plans</Link>
        <span className="w-1 h-1 bg-outline-variant rounded-full" />
        <Link href="/sign-in" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Manage Account</Link>
      </div>
    </div>
  );
}
