'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import ProgressRing from '@/components/ui/ProgressRing';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { SoldTransaction } from '@/lib/api/landRegistry';
import type { EpcRecord } from '@/lib/api/epc';
import { useSavedPlaces } from '@/lib/hooks/useSavedPlaces';

interface PropertyData {
  postcode: string;
  district: string;
  region: string;
  medianPrice: number | null;
  priceHistory: { month: string; avg: number }[];
  soldTransactions: SoldTransaction[];
  epc: EpcRecord | null;
}

function formatPrice(p: number): string {
  if (p >= 1_000_000) return `£${(p / 1_000_000).toFixed(2)}m`;
  if (p >= 1_000) return `£${Math.round(p / 1_000)}k`;
  return `£${p}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// Skeleton loader
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-container-high rounded-lg ${className ?? ''}`} />;
}

function LoadingSkeleton() {
  return <LoadingSpinner message="Analyzing Property Data..." />;
}

// Sparkline chart from real price history
function PriceChart({ history }: { history: { month: string; avg: number }[] }) {
  if (history.length < 2) return (
    <div className="h-32 flex items-center justify-center text-on-surface-variant font-body-md text-body-md">
      Not enough price history data for this postcode
    </div>
  );

  const prices = history.map(h => h.avg);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const W = 800, H = 128, PAD = 10;
  const points = history.map((h, i) => {
    const x = PAD + (i / (history.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((h.avg - min) / range) * (H - PAD * 2);
    return `${x},${y}`;
  });
  const path = `M${points.join(' L')}`;
  const fill = `${path} L${W - PAD},${H} L${PAD},${H} Z`;
  const first = history[0];
  const last = history[history.length - 1];
  const pctChange = ((last.avg - first.avg) / first.avg) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className={`font-label-sm text-label-sm flex items-center gap-1 ${pctChange >= 0 ? 'text-tertiary' : 'text-error'}`}>
          <span className="material-symbols-outlined text-[14px]">{pctChange >= 0 ? 'trending_up' : 'trending_down'}</span>
          {pctChange >= 0 ? '+' : ''}{pctChange.toFixed(1)}% over period
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">{history.length} data points</span>
      </div>
      <div className="relative h-32">
        <svg className="w-full h-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f6e56" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0f6e56" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fill} fill="url(#sparkGrad)" />
          <path d={path} fill="none" stroke="#0f6e56" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={W - PAD} cy={parseFloat(points[points.length - 1].split(',')[1])} r="5" fill="#0f6e56" />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <span className="font-label-sm text-label-sm text-on-surface-variant">{formatPrice(max)}</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">{formatPrice(Math.round((max + min) / 2))}</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">{formatPrice(min)}</span>
        </div>
      </div>
      <div className="flex justify-between mt-2 font-label-sm text-label-sm text-on-surface-variant">
        <span>{formatDate(first.month + '-01')}</span>
        <span>Latest</span>
      </div>
    </div>
  );
}

function PropertyInsightsContent() {
  const searchParams = useSearchParams();
  const postcode = searchParams.get('postcode') ?? '';
  const [data, setData] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSaved, addPlace, removePlace, isLoaded } = useSavedPlaces();

  const saved = isSaved(postcode);
  const handleSaveToggle = () => {
    if (saved) removePlace(postcode);
    else addPlace(postcode, data?.postcode || postcode);
  };

  useEffect(() => {
    if (!postcode) {
      setLoading(false);
      setError('No postcode provided. Please search for a postcode from the homepage.');
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/property-data?postcode=${encodeURIComponent(postcode)}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch(e => setError(e.message ?? 'Failed to load data'))
      .finally(() => setLoading(false));
  }, [postcode]);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center gap-6 py-24 px-margin-mobile">
        <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
        <h1 className="font-headline-md text-headline-md text-on-surface text-center">{error}</h1>
        <Link href="/" className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
          Back to Search
        </Link>
      </div>
    );
  }

  if (!data) return null;

  const { medianPrice, soldTransactions, epc, priceHistory } = data;

  // Compute a simple "investment score" from available data
  const score = medianPrice
    ? Math.min(100, Math.max(40, 60 + Math.round((soldTransactions.length / 20) * 20) + (epc?.energyScore ? Math.round(epc.energyScore / 10) : 0)))
    : null;

  const pricePerSqm = (medianPrice && epc?.floorArea && epc.floorArea > 0)
    ? Math.round(medianPrice / epc.floorArea)
    : null;

  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">

      {/* Header */}
      <section className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-outline-variant/20 pb-6">
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            Property Analytics
            {data.district && <span className="ml-1">· {data.district}</span>}
            {data.region && <span className="ml-1">· {data.region}</span>}
          </p>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background flex items-center gap-3">
            {data.postcode}
            {isLoaded && (
              <button 
                onClick={handleSaveToggle}
                className={`p-1.5 rounded-full flex items-center transition-colors ${saved ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container'}`}
                title={saved ? 'Remove from saved places' : 'Save place'}
              >
                <span className="material-symbols-outlined text-[28px]" style={saved ? { fontVariationSettings: "'FILL' 1" } : {}}>bookmark</span>
              </button>
            )}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {medianPrice && (
            <div className="bg-primary-container/10 text-primary-container px-3 py-1.5 rounded-full flex items-center gap-2 font-label-md text-label-md border border-primary-container/20">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              Live Data
            </div>
          )}
          <Link href="/" className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface p-2 rounded-lg transition-colors flex items-center gap-2 font-label-md text-label-md px-4">
            <span className="material-symbols-outlined text-sm">search</span>
            New Search
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left column */}
        <div className="lg:col-span-8 space-y-6">

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-4">

            <div className="metric-card bg-surface-container-lowest p-6 rounded-xl border border-primary/10 group cursor-default">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-label-sm text-label-sm text-on-surface-variant">Area Median Price</h3>
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
              </div>
              {medianPrice ? (
                <>
                  <div className="font-headline-md text-headline-md text-on-background mb-1">{formatPrice(medianPrice)}</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Based on {soldTransactions.length} recent sales</div>
                </>
              ) : (
                <div className="font-label-sm text-label-sm text-on-surface-variant mt-2">No sold data available</div>
              )}
            </div>

            <div className="metric-card bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 cursor-default">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-label-sm text-label-sm text-on-surface-variant">Price per m²</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-xl">straighten</span>
              </div>
              {pricePerSqm ? (
                <>
                  <div className="font-headline-md text-headline-md text-on-background mb-1">{formatPrice(pricePerSqm)}</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Floor area: {epc!.floorArea} m²</div>
                </>
              ) : (
                <div className="font-label-sm text-label-sm text-on-surface-variant mt-2">EPC data unavailable</div>
              )}
            </div>

            <div className="metric-card bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 cursor-default">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-label-sm text-label-sm text-on-surface-variant">Recent Sales Volume</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-xl">bar_chart</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-background mb-1">{soldTransactions.length}</div>
              <div className={`flex items-center gap-1 font-label-sm text-label-sm ${soldTransactions.length >= 10 ? 'text-tertiary' : 'text-secondary'}`}>
                <span className="material-symbols-outlined text-[14px]">{soldTransactions.length >= 10 ? 'bolt' : 'info'}</span>
                {soldTransactions.length >= 10 ? 'Active market' : soldTransactions.length >= 5 ? 'Moderate activity' : 'Low activity'}
              </div>
            </div>

            <div className="metric-card bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 cursor-default">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-label-sm text-label-sm text-on-surface-variant">Energy Rating</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-xl">bolt</span>
              </div>
              {epc?.energyRating ? (
                <>
                  <div className="font-headline-md text-headline-md text-on-background mb-1">
                    Band {epc.energyRating}
                    <span className="text-sm font-normal ml-2 text-on-surface-variant">({epc.energyScore ?? '—'}/100)</span>
                  </div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">EPC rating</div>
                </>
              ) : (
                <div className="font-label-sm text-label-sm text-on-surface-variant mt-2">EPC data unavailable</div>
              )}
            </div>
          </div>

          {/* Price History Chart */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-label-md text-label-md text-on-background">Price History — {data.postcode}</h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-primary-container/10 text-primary-container border border-primary-container/20 px-2 py-1 rounded-full">Land Registry</span>
            </div>
            <PriceChart history={priceHistory} />
          </div>

          {/* Market signals — curated per area */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20">
            <h3 className="font-label-md text-label-md text-on-background mb-4">Market Context</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-tertiary-container/5 border border-tertiary-container/15">
                <div className="bg-tertiary-container/20 text-tertiary p-2 rounded-full mt-0.5 flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">assured_workload</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-sm text-label-sm font-bold text-tertiary uppercase tracking-wider">DATA</span>
                    <span className="text-on-surface-variant text-xs">· Live</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-background">Land Registry Verified Sales</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">
                    {soldTransactions.length > 0
                      ? `${soldTransactions.length} sold transactions found in ${data.postcode}. Most recent: ${formatDate(soldTransactions[0]?.date)} at ${formatPrice(soldTransactions[0]?.price)}.`
                      : `No recent Land Registry transactions found for ${data.postcode}. Try a nearby postcode for comparable data.`}
                  </p>
                </div>
              </div>

              {epc && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary-container/10 border border-secondary-container/30">
                  <div className="bg-secondary-container/30 text-secondary p-2 rounded-full mt-0.5 flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">energy_savings_leaf</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">EPC</span>
                      <span className="text-on-surface-variant text-xs">· {epc.inspectionDate ? formatDate(epc.inspectionDate) : 'Verified'}</span>
                    </div>
                    <h4 className="font-label-md text-label-md text-on-background">Energy Performance Certificate</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">
                      Rated Band {epc.energyRating} ({epc.energyScore}/100). Property type: {epc.propertyType || 'Unknown'}.
                      {epc.floorArea ? ` Floor area: ${epc.floorArea} m².` : ''}
                      {epc.tenure ? ` Tenure: ${epc.tenure}.` : ''}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container border border-outline-variant/20">
                <div className="bg-outline/10 text-outline p-2 rounded-full mt-0.5 flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">info</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-sm text-label-sm font-bold text-outline uppercase tracking-wider">NOTE</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-background">AI Signals — Coming in Phase 3</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">
                    Real-time news signals, planning alerts, and AI-generated verdicts are planned for Phase 3 of development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 space-y-6">

          {/* Score */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 flex flex-col items-center">
            <h3 className="font-label-md text-label-md text-on-surface-variant w-full text-left mb-6">Proplity Area Score</h3>
            <div className="mb-8 flex justify-center items-center">
              {score !== null ? (
                <ProgressRing value={score} size={160} strokeWidth={8} />
              ) : (
                <div className="w-40 h-40 rounded-full border-8 border-surface-container flex items-center justify-center">
                  <span className="text-on-surface-variant font-label-md text-label-md">N/A</span>
                </div>
              )}
            </div>
            <div className="w-full space-y-4">
              {[
                { label: 'Sales Activity', value: Math.min(100, soldTransactions.length * 5), color: 'primary' },
                { label: 'Energy Efficiency', value: epc?.energyScore ?? 0, color: epc?.energyScore && epc.energyScore >= 70 ? 'primary' : 'secondary' },
                { label: 'Data Coverage', value: (soldTransactions.length > 0 ? 50 : 0) + (epc ? 50 : 0), color: 'primary' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-on-background">{item.label}</span>
                    <span className={`text-${item.color} font-bold`}>{item.value}</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className={`bg-${item.color} h-full rounded-full transition-all duration-700`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparable Sales */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-label-md text-label-md text-on-background">Recent Sold Prices</h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">Land Registry</span>
            </div>
            {soldTransactions.length === 0 ? (
              <p className="font-body-md text-body-md text-on-surface-variant text-sm py-4 text-center">No sold data found for this postcode</p>
            ) : (
              <div className="space-y-3">
                {soldTransactions.slice(0, 5).map((t, i) => {
                  const delta = medianPrice ? ((t.price - medianPrice) / medianPrice) * 100 : 0;
                  return (
                    <div key={i} className="p-3 border border-outline-variant/20 rounded-lg hover:bg-surface-container-low transition-colors flex justify-between items-center">
                      <div>
                        <p className="font-label-sm text-label-sm text-on-background truncate max-w-[130px]" title={t.address}>{t.address}</p>
                        <p className="text-xs text-on-surface-variant">{formatDate(t.date)} · {t.propertyType.split(' ')[0]}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-label-md text-label-md text-on-background">{formatPrice(t.price)}</p>
                        {medianPrice && (
                          <p className={`text-xs ${delta >= 0 ? 'text-error' : 'text-tertiary'}`}>
                            {delta >= 0 ? '+' : ''}{delta.toFixed(1)}% vs median
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20">
            <h3 className="font-label-md text-label-md text-on-background mb-4">Property Details</h3>
            <div className="space-y-3">
              {[
                { icon: 'home', label: 'Type', value: epc?.propertyType || soldTransactions[0]?.propertyType || '—' },
                { icon: 'bed', label: 'Bedrooms', value: epc?.bedrooms != null ? `${epc.bedrooms}` : '—' },
                { icon: 'square_foot', label: 'Floor Area', value: epc?.floorArea ? `${epc.floorArea} m²` : '—' },
                { icon: 'key', label: 'Tenure', value: epc?.tenure || soldTransactions[0]?.tenure || '—' },
                { icon: 'bolt', label: 'EPC Rating', value: epc?.energyRating ? `Band ${epc.energyRating}` : '—' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">{icon}</span>{label}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyInsights() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PropertyInsightsContent />
    </Suspense>
  );
}
