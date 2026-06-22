'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useTheme } from '@/lib/contexts/ThemeContext';

export default function TopNavBar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    router.push('/');
  };

  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? '?';

  const navLinks = [
    { href: '/#search', icon: 'search', label: 'Search' },
    { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { href: '/comparable-sales', icon: 'map', label: 'Map' },
    { href: '/pricing', icon: 'sell', label: 'Pricing' },
  ];

  return (
    <>
      {/* ── Desktop Header ───────────────────────────────────────── */}
      <header className="hidden md:flex justify-between items-center w-full px-margin-desktop py-4 bg-surface border-b border-outline-variant/20 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Proplity Logo" className="h-20 w-auto site-logo" />
        </Link>

        <nav className="flex gap-8">
          {navLinks.map(({ href, icon, label }) => (
            <Link
              key={label}
              href={href}
              className="text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(v => !v)}
                className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:opacity-80 transition-opacity font-label-sm text-label-sm font-bold border border-outline-variant/30 overflow-hidden"
                aria-label="User menu"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface border border-outline-variant/20 rounded-xl shadow-lg overflow-hidden z-50 py-1">
                  <div className="px-4 py-3 border-b border-outline-variant/10">
                    <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">{user.displayName || 'Account'}</p>
                    <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                    Account Settings
                  </Link>
                  <Link
                    href="/agency-dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">business_center</span>
                    Agency Portal
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-error font-label-sm text-label-sm hover:bg-error/5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="bg-primary-container text-on-primary font-label-md text-label-md px-5 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* ── Mobile Header ────────────────────────────────────────── */}
      <header className="md:hidden flex justify-between items-center w-full px-margin-mobile py-4 bg-surface border-b border-outline-variant/20 sticky top-0 z-50">
        <Link href="/" className="flex items-center text-primary">
          <img src="/logo.svg" alt="Proplity Logo" className="h-16 w-auto site-logo" />
        </Link>
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          {user && (
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold text-xs overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
          )}
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(v => !v)}
            className="text-on-surface-variant p-2 rounded-lg hover:bg-surface-container"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ────────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute top-[64px] inset-x-0 bg-surface border-b border-outline-variant/20 py-3 px-margin-mobile flex flex-col gap-1"
            onClick={e => e.stopPropagation()}
          >
            {navLinks.map(({ href, icon, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                {label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors border-t border-outline-variant/10 mt-1 pt-4"
                >
                  <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                  Account Settings
                </Link>
                <Link
                  href="/agency-dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">business_center</span>
                  Agency Portal
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-error font-label-md text-label-md hover:bg-error/5 transition-colors w-full text-left border-t border-outline-variant/10 mt-1 pt-4"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors border-t border-outline-variant/10 mt-1 pt-4"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
