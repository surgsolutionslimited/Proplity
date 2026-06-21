'use client';
import React, { useEffect, useState, useRef } from 'react';

interface SparklineChartProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  showDots?: boolean;
  showArea?: boolean;
  strokeWidth?: number;
  className?: string;
}

export default function SparklineChart({
  data,
  color = '#005440',
  width,
  height = 80,
  showDots = true,
  showArea = true,
  strokeWidth = 2.5,
  className = ''
}: SparklineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [actualWidth, setActualWidth] = useState(width || 400);

  useEffect(() => {
    if (width) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setActualWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [width]);

  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = { top: 10, right: 10, bottom: 10, left: 10 };
  const W = actualWidth - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;

  const points = data.map((v, i) => ({
    x: pad.left + (i / (data.length - 1)) * W,
    y: pad.top + H - ((v - min) / range) * H
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const areaD = `${pathD} L${points[points.length - 1].x.toFixed(2)},${(pad.top + H).toFixed(2)} L${pad.left},${(pad.top + H).toFixed(2)} Z`;
  const gradientId = `sg-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div ref={containerRef} className={`w-full ${className}`} style={{ height }}>
      <svg viewBox={`0 0 ${actualWidth} ${height}`} className="overflow-visible" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {showArea && (
          <path d={areaD} fill={`url(#${gradientId})`} className="opacity-20" />
        )}
        <path d={pathD} stroke={color} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        {showDots && points.map((p, i) => {
          const isLast = i === data.length - 1;
          return (
            <circle
              key={i}
              cx={p.x.toFixed(2)}
              cy={p.y.toFixed(2)}
              r={isLast ? 5 : 3}
              fill={isLast ? color : '#fff'}
              stroke={color}
              strokeWidth="2"
              opacity={isLast ? 1 : 0.4}
            />
          );
        })}
      </svg>
    </div>
  );
}
