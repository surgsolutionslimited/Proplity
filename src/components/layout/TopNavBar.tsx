'use client';
import Link from 'next/link';

export default function TopNavBar() {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center w-full px-margin-desktop py-4 bg-surface border-b border-outline-variant/20 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="Proplity Logo" className="h-20 w-auto" />
          </Link>
        </div>
        <nav className="flex gap-8">
          <Link href="/#search" className="text-on-surface-variant font-label-md text-label-md hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined">search</span> Search
          </Link>
          <Link href="/property-insights" className="text-on-surface-variant font-label-md text-label-md hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link href="/comparable-sales" className="text-on-surface-variant font-label-md text-label-md hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined">map</span> Map
          </Link>
          <Link href="/pricing" className="text-on-surface-variant font-label-md text-label-md hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined">sell</span> Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/agency-dashboard" className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/30 flex items-center justify-center hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-on-surface-variant">person</span>
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center w-full px-margin-mobile py-4 bg-surface border-b border-outline-variant/20 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <img src="/logo.svg" alt="Proplity Logo" className="h-16 w-auto" />
        </Link>
        <button aria-label="Menu" className="text-on-surface-variant p-2 rounded-lg hover:bg-surface-container">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>
    </>
  );
}
