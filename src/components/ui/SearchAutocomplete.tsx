'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { searchPostcodes, type PostcodeSuggestion } from '@/lib/api/postcodes';

export default function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PostcodeSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Debounced live search against postcodes.io
  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    const results = await searchPostcodes(q);
    setSuggestions(results);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (postcode: string) => {
    setQuery(postcode);
    setIsOpen(false);
    setSuggestions([]);
    router.push(`/property-insights?postcode=${encodeURIComponent(postcode)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelect(suggestions[activeIndex].postcode);
      } else if (query.trim()) {
        handleSelect(query.trim().toUpperCase());
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
        autoComplete="off"
      />

      {isOpen && (query.length >= 2) && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-outline-variant rounded-2xl shadow-[0px_20px_60px_rgba(15,110,86,0.14)] z-50 overflow-hidden min-h-[48px]">
          {isLoading && (
            <div className="flex items-center gap-3 px-4 py-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-outline text-lg animate-spin">progress_activity</span>
              <span className="text-sm">Searching postcodes...</span>
            </div>
          )}

          {!isLoading && suggestions.length === 0 && (
            <div className="flex items-center gap-3 px-4 py-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-outline text-lg">search_off</span>
              <span className="text-sm">No postcodes found for &quot;{query}&quot;</span>
            </div>
          )}

          {!isLoading && suggestions.map((item, index) => (
            <div
              key={`${item.type}-${item.postcode}-${index}`}
              onClick={() => handleSelect(item.postcode)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-outline-variant/20 last:border-0 ${
                index === activeIndex ? 'bg-surface-container-low' : 'hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-outline text-lg">
                {item.type === 'area' ? 'location_city' : 'location_on'}
              </span>
              <div className="flex-1">
                <div className="text-sm font-medium text-on-surface">{item.displayName}</div>
                <div className="text-xs text-outline">{item.district}{item.ward ? `, ${item.ward}` : ''}</div>
              </div>
              <span className="material-symbols-outlined text-base text-outline-variant">north_west</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
