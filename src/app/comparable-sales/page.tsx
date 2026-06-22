'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getEpcDataClient } from '@/lib/api/epc';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useSavedPlaces } from '@/lib/hooks/useSavedPlaces';

const DynamicMap = dynamic(() => import('@/components/ui/PropertyMap'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#e8ede9] flex items-center justify-center"><LoadingSpinner message="Loading Map..." /></div>
});


function ComparableSalesContent() {
  const searchParams = useSearchParams();
  const rawPostcode = searchParams.get('postcode') || 'W8 4QQ'; // fallback
  
  const [comparables, setComparables] = useState<any[]>([]);
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);
  const [medianPrice, setMedianPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [rawData, setRawData] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterMonths, setFilterMonths] = useState<number>(0);

  const { isSaved, addPlace, removePlace, isLoaded } = useSavedPlaces();
  const saved = isSaved(rawPostcode);
  const handleSaveToggle = () => {
    if (saved) removePlace(rawPostcode);
    else addPlace(rawPostcode, rawPostcode);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/property-data?postcode=${encodeURIComponent(rawPostcode)}`);
        const data = await res.json();
        if (data && data.soldTransactions) {
          setMedianPrice(data.medianPrice);
          setRawData(data.soldTransactions);
        }
      } catch (e) {
        console.error('Failed to fetch comparables:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [rawPostcode]);

  // Apply filters whenever rawData or filter states change
  useEffect(() => {
    if (!rawData || rawData.length === 0) return;

    let filtered = [...rawData];

    if (filterType !== 'All') {
      filtered = filtered.filter(t => t.propertyType?.includes(filterType));
    }

    if (filterMonths > 0) {
      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - filterMonths);
      filtered = filtered.filter(t => new Date(t.date) >= cutoff);
    }

    const mapped = filtered.map((t: any) => {
      const price = t.price >= 1000000 ? `£${(t.price / 1000000).toFixed(1)}M` : `£${Math.round(t.price / 1000)}k`;
      const d = new Date(t.date);
      const dateStr = `Sold ${d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`;
      let trendStr = 'N/A';
      let up = true;
      if (medianPrice) {
        const delta = ((t.price - medianPrice) / medianPrice) * 100;
        trendStr = `${delta > 0 ? '+' : ''}${delta.toFixed(1)}%`;
        up = delta > 0;
      }
      return {
        price,
        date: dateStr,
        trend: trendStr,
        up,
        address: t.address,
        beds: null, // land registry doesn't provide beds directly
        baths: null,
        sqft: t.propertyType.split(' ')[0]
      };
    });
    setComparables(mapped);

    // Map markers
    const markers = filtered.map((t: any, i: number) => ({
      id: i,
      lat: t.lat,
      lng: t.lng,
      title: t.address,
      price: t.price >= 1000000 ? `£${(t.price / 1000000).toFixed(1)}M` : `£${Math.round(t.price / 1000)}k`,
      featured: i === 0
    }));
    setMapMarkers(markers);
  }, [rawData, filterType, filterMonths, medianPrice]);

  return (
    // Full viewport height container — gives absolute children a bounded context
    <div className="relative flex-grow overflow-hidden flex flex-col min-h-0" style={{ height: 'calc(100vh - 72px)' }}>

      <div className="absolute inset-0 w-full h-full bg-[#e8ede9]">
        <DynamicMap markers={mapMarkers} center={[51.505, -0.09]} />
        {/* Mobile gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent pointer-events-none md:hidden z-10" />
      </div>

      {/* ── Mobile Search Bar ───────────────────────────────────── */}
      <div className="absolute top-4 left-4 right-4 z-30 md:hidden">
        <div className="relative shadow-lg">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">location_on</span>
          <input
            className="w-full bg-surface/95 backdrop-blur-md border border-outline-variant/20 rounded-xl pl-11 pr-4 py-3 font-label-md text-label-md text-on-surface focus:ring-1 focus:ring-primary outline-none"
            type="text"
            defaultValue={rawPostcode}
            disabled
          />
        </div>
      </div>

      {/* ── Desktop Right Panel ─────────────────────────────────── */}
      <div className="hidden md:flex absolute top-0 right-0 w-[400px] h-full bg-surface shadow-[-4px_0_40px_rgba(15,110,86,0.06)] border-l border-outline-variant/10 flex-col z-30">
        <div className="p-6 border-b border-outline-variant/10 bg-surface-container-lowest flex-shrink-0">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
              Comparable Sales
              {isLoaded && (
                <button 
                  onClick={handleSaveToggle}
                  className={`p-1.5 rounded-full flex items-center transition-colors ${saved ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container'}`}
                  title={saved ? 'Remove from saved places' : 'Save place'}
                >
                  <span className="material-symbols-outlined text-[18px]" style={saved ? { fontVariationSettings: "'FILL' 1" } : {}}>bookmark</span>
                </button>
              )}
            </h2>
            <button className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilterType(filterType === 'Flat' ? 'All' : 'Flat')} className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1 border transition-colors ${
              filterType === 'Flat' ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high'
            }`}>
              Type: Flat {filterType === 'Flat' && <span className="material-symbols-outlined text-[14px]">close</span>}
            </button>
            <button onClick={() => setFilterType(filterType === 'House' ? 'All' : 'House')} className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1 border transition-colors ${
              filterType === 'House' ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high'
            }`}>
              Type: House {filterType === 'House' && <span className="material-symbols-outlined text-[14px]">close</span>}
            </button>
            <button onClick={() => setFilterMonths(filterMonths === 12 ? 0 : 12)} className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1 border transition-colors ${
              filterMonths === 12 ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high'
            }`}>
              Last 12M {filterMonths === 12 && <span className="material-symbols-outlined text-[14px]">close</span>}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">{loading ? 'Loading...' : `${comparables.length} Comparables`}</h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">By Relevance</span>
          </div>
          {loading ? (
            <LoadingSpinner message="Fetching live Land Registry data..." />
          ) : comparables.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant">No sold data found for {rawPostcode}</div>
          ) : (
            comparables.map((c, i) => <ComparableCard key={i} {...c} featured={i === 0} />)
          )}
        </div>
      </div>

      {/* ── Mobile Bottom Sheet ─────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl shadow-[0_-8px_40px_rgba(15,110,86,0.06)] border-t border-outline-variant/10 z-30 flex flex-col md:hidden h-[50vh]">
        <div className="w-full py-3 flex justify-center">
          <div className="w-12 h-1.5 bg-outline-variant/40 rounded-full" />
        </div>
        <div className="px-4 pb-3 border-b border-outline-variant/10 flex gap-2 overflow-x-auto no-scrollbar">
          <button onClick={() => setFilterType(filterType === 'Flat' ? 'All' : 'Flat')} className={`flex-shrink-0 px-4 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1 border transition-colors ${
            filterType === 'Flat' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30'
          }`}>
            Type: Flat
          </button>
          <button onClick={() => setFilterType(filterType === 'House' ? 'All' : 'House')} className={`flex-shrink-0 px-4 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1 border transition-colors ${
            filterType === 'House' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30'
          }`}>
            Type: House
          </button>
          <button onClick={() => setFilterMonths(filterMonths === 12 ? 0 : 12)} className={`flex-shrink-0 px-4 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1 border transition-colors ${
            filterMonths === 12 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30'
          }`}>
            Last 12M
          </button>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
          <div className="flex justify-between items-end mb-1">
            <h2 className="font-headline-md text-headline-md text-on-surface">{loading ? '...' : `${comparables.length} Comparables`}</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">By Relevance</span>
          </div>
          {comparables.map((c, i) => <ComparableCard key={i} {...c} featured={i === 0} compact />)}
        </div>
      </div>
    </div>
  );
}

// ── Data & Card component ─────────────────────────────────────
function ComparableCard({ price, date, trend, up, address, beds, baths, sqft, featured, compact }: {
  price: string; date: string; trend: string; up: boolean; address: string;
  beds: number | null; baths: number | null; sqft: string; featured?: boolean; compact?: boolean;
}) {
  const [epcRating, setEpcRating] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpc() {
      // Extract UK postcode from address
      const postcodeMatch = address.match(/[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i);
      if (postcodeMatch) {
        try {
          const data = await getEpcDataClient(postcodeMatch[0]);
          if (data && data.length > 0) {
            setEpcRating(data[0].energyRating);
          }
        } catch (e) {
          console.error("Failed to fetch EPC for card:", e);
        }
      }
    }
    fetchEpc();
  }, [address]);

  return (
    <div className={`rounded-xl cursor-pointer transition-all ${
      featured
        ? 'bg-surface-container-lowest border-2 border-primary relative overflow-hidden'
        : 'bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/40 hover:shadow-md'
    } ${compact ? 'p-4' : 'p-5'}`}>
      {featured && <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />}
      <div className={`flex justify-between items-start mb-2 ${featured ? 'pl-2' : ''}`}>
        <div>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">{date}</span>
          <h4 className={`font-headline-md text-headline-md font-bold text-on-surface ${compact ? 'text-base' : ''}`}>{price}</h4>
        </div>
        <div className={`px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1 border ${
          up ? 'bg-tertiary/10 text-tertiary border-tertiary/20' : 'bg-error/10 text-error border-error/20'
        }`}>
          <span className="material-symbols-outlined text-[14px]">{up ? 'trending_up' : 'trending_down'}</span>
          <span className="font-semibold">{trend}</span>
          <span className="hidden sm:inline"> vs Market</span>
        </div>
      </div>
      <p className={`font-body-md text-body-md text-on-surface-variant mb-3 ${featured ? 'pl-2' : ''} ${compact ? 'text-xs' : ''}`}>{address}</p>
      <div className={`flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm ${featured && !compact ? 'border-t border-outline-variant/10 pt-3 pl-2' : 'border-t border-outline-variant/10 pt-2'}`}>
        {beds !== null && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span> {beds}</span>}
        {baths !== null && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">shower</span> {baths}</span>}
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">home</span> {sqft}</span>
        {epcRating && (
          <span className="flex items-center gap-1 text-primary font-semibold" title={`Energy Rating: ${epcRating}`}>
            <span className="material-symbols-outlined text-[14px]">energy_savings_leaf</span> EPC {epcRating}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ComparableSales() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading Sales Data..." />}>
      <ComparableSalesContent />
    </Suspense>
  );
}
