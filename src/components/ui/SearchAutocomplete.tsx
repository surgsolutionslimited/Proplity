'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const POSTCODES = [
  { label: 'London, SW1A 1AA', sub: 'City of Westminster', icon: 'location_on' },
  { label: 'London, E14 5AB',  sub: 'Canary Wharf',        icon: 'location_on' },
  { label: 'London, W11 2BQ',  sub: 'Notting Hill',        icon: 'location_on' },
  { label: 'London, EC2V 8RT', sub: 'City of London',      icon: 'location_on' },
  { label: 'Manchester, M1 1AE',sub: 'City Centre',        icon: 'location_on' },
  { label: 'Manchester, M20 2RF',sub:'Didsbury',           icon: 'location_on' },
  { label: 'Birmingham, B1 1BB',sub: 'City Centre',        icon: 'location_on' },
  { label: 'Edinburgh, EH1 1YZ',sub: 'Old Town',           icon: 'location_on' },
  { label: 'Bristol, BS1 4ST',  sub: 'Harbourside',        icon: 'location_on' },
  { label: 'Leeds, LS1 4DY',    sub: 'City Centre',        icon: 'location_on' },
];

export default function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = query.length >= 2 
    ? POSTCODES.filter(p => p.label.toLowerCase().includes(query.toLowerCase()) || p.sub.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (label: string) => {
    setQuery(label);
    setIsOpen(false);
    setTimeout(() => router.push('/property-insights'), 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && filtered[activeIndex]) {
        handleSelect(filtered[activeIndex].label);
      } else if (query) {
        handleSelect(query);
      }
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant h-12 outline-none"
        placeholder="Enter postcode or address..."
        role="combobox"
        aria-expanded={isOpen}
      />
      
      {isOpen && filtered.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-outline-variant rounded-2xl shadow-[0px_20px_60px_rgba(15,110,86,0.14)] z-50 overflow-hidden">
          {filtered.map((item, index) => (
            <div
              key={item.label}
              onClick={() => handleSelect(item.label)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-outline-variant/20 last:border-0 ${
                index === activeIndex ? 'bg-surface-container-low' : 'hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-outline text-lg">{item.icon}</span>
              <div className="flex-1">
                <div className="text-sm text-on-surface">{item.label}</div>
                <div className="text-xs text-outline">{item.sub}</div>
              </div>
              <span className="material-symbols-outlined text-base text-outline-variant">north_west</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
