'use client';
import React from 'react';
import { useTheme } from '@/lib/contexts/ThemeContext';

export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full w-full min-h-[200px]">
      <video
        key={theme} // Forces the video element to reload when the theme changes
        src={theme === 'dark' ? '/assets/Logo/Poplity Favicon Animation Night Theme.mp4' : '/assets/Logo/Poplity Favicon Animation 2.mp4'}
        className="h-16 w-auto mb-4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="text-on-surface-variant font-label-md animate-pulse">
        {message}
      </div>
    </div>
  );
}
