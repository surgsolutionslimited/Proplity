'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

const publicRoutes = ['/', '/sign-in', '/pricing', '/reset-password', '/auth/action'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && !publicRoutes.includes(pathname)) {
      router.push('/sign-in');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 relative overflow-hidden rounded-full shadow-sm bg-white flex items-center justify-center">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover scale-[1.5]"
              src="/assets/Logo/Poplity Favicon Animation 2.mp4"
            />
          </div>
          <span className="text-on-surface-variant font-medium animate-pulse">Verifying session...</span>
        </div>
      </div>
    );
  }

  // If not loading, and we are not logged in but trying to access a private route,
  // the useEffect will handle the redirect. We can return null to avoid flashing.
  if (!user && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
