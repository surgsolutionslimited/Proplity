'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scrolls the window to the top (0, 0) on every page navigation.
 * Must be a client component since it uses usePathname + useEffect.
 * Rendered inside RootLayout so it applies globally.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
