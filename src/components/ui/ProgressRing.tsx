'use client';
import React, { useEffect, useState, useRef } from 'react';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  className?: string;
}

export default function ProgressRing({
  value,
  size = 64,
  strokeWidth = 8,
  color = '#0f6e56',
  trackColor = '#e8e8e3',
  className = ''
}: ProgressRingProps) {
  const [offset, setOffset] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Initial offset hides the ring
    setOffset(circumference);
  }, [circumference]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (ringRef.current) observer.observe(ringRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate stroke
      const targetOffset = circumference - (value / 100) * circumference;
      setOffset(targetOffset);

      // Animate number
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();

      const animateNumber = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrentValue(Math.round(eased * value));

        if (progress < 1) {
          requestAnimationFrame(animateNumber);
        }
      };
      requestAnimationFrame(animateNumber);
    }
  }, [isVisible, value, circumference]);

  return (
    <div ref={ringRef} className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-headline-md font-bold text-primary text-lg">
          {currentValue}
        </span>
      </div>
    </div>
  );
}
