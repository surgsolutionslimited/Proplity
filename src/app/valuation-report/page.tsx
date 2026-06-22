'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SparklineChart from '@/components/ui/SparklineChart';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useSavedPlaces } from '@/lib/hooks/useSavedPlaces';

function formatPrice(p: number, full: boolean = false): string {
  if (full) return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(p);
  if (p >= 1_000_000) return `£${(p / 1_000_000).toFixed(2)}M`;
  if (p >= 1_000) return `£${Math.round(p / 1_000)}k`;
  return `£${p}`;
}

function ValuationReportContent() {
  const searchParams = useSearchParams();
  const rawPostcode = searchParams.get('postcode') || 'NW1 6XE';
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isSaved, addPlace, removePlace, isLoaded } = useSavedPlaces();

  const saved = isSaved(rawPostcode);
  const handleSaveToggle = () => {
    if (saved) removePlace(rawPostcode);
    else addPlace(rawPostcode, rawPostcode);
  };

  useEffect(() => {
    fetch(`/api/property-data?postcode=${encodeURIComponent(rawPostcode)}`)
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [rawPostcode]);

  if (loading) {
    return <LoadingSpinner message={`Generating Live AI Report for ${rawPostcode}...`} />;
  }

  const medianPrice = data?.medianPrice || 845000;
  const lowEst = Math.round(medianPrice * 0.96);
  const highEst = Math.round(medianPrice * 1.04);
  const history = data?.priceHistory?.length > 1 ? data.priceHistory.map((h: any) => h.avg) : [medianPrice * 0.8, medianPrice * 0.85, medianPrice * 0.9, medianPrice * 0.95, medianPrice * 0.98, medianPrice];
  const startPrice = history[0];
  const endPrice = history[history.length - 1];
  const histGrowth = (((endPrice - startPrice) / startPrice) * 100).toFixed(1);
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      
  
  <article className="bg-surface page-shadow rounded-2xl overflow-hidden border border-outline-variant/20 relative">
    
    <div className="absolute top-12 right-12 opacity-[0.03] pointer-events-none">
      <span className="material-symbols-outlined text-primary" style={{"fontSize":"240px"}}>analytics</span>
    </div>

    <div className="p-8 md:p-16">
      
      <div className="flex justify-between items-start border-b border-outline-variant/30 pb-8 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-xl filled">analytics</span>
          </div>
          <div>
            <div className="font-headline-md text-headline-md font-bold text-primary">Proplity</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">Institutional Grade Analysis</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-label-sm text-label-sm text-on-surface-variant">Report ID: PW-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000) + 1000}</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Generated: {today}</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Analyst: AI Engine v4.2</div>
        </div>
      </div>

      
      <header className="mb-12">
        <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-3 flex items-center gap-2">
          Valuation Report
          {isLoaded && (
            <button 
              onClick={handleSaveToggle}
              className={`p-1.5 rounded-full flex items-center transition-colors ${saved ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container'}`}
              title={saved ? 'Remove from saved places' : 'Save place'}
            >
              <span className="material-symbols-outlined text-[20px]" style={saved ? { fontVariationSettings: "'FILL' 1" } : {}}>bookmark</span>
            </button>
          )}
        </div>
        <h1 className="font-display text-display text-on-surface mb-3 leading-tight" style={{"fontSize":"40px"}}>{rawPostcode.toUpperCase()} Area Analysis</h1>
        <h2 className="font-headline-md text-headline-md text-on-surface-variant">{data?.region || 'UK'} &nbsp;·&nbsp; {data?.district || 'District'} &nbsp;·&nbsp; Analytics</h2>
      </header>

      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col items-center justify-center border border-outline-variant/20">
          <div className="relative w-36 h-36 flex items-center justify-center mb-4">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e8e8e3" strokeWidth="7"/>
              <circle id="report-ring" cx="50" cy="50" r="42" fill="none" stroke="#0f6e56" strokeWidth="7" strokeDasharray="263.9" strokeDashoffset="263.9" strokeLinecap="round"/>
            </svg>
            <div className="text-center z-10">
              <div className="font-display text-primary leading-none" style={{"fontSize":"36px"}}>88</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">PropScore</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 bg-tertiary/10 text-tertiary px-3 py-1 rounded-full font-label-sm text-label-sm border border-tertiary/20">
            <span className="material-symbols-outlined text-[14px] filled">trending_up</span>
            Strong Buy
          </span>
        </div>

        
        <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col justify-center border border-outline-variant/20 md:col-span-2">
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Estimated Market Value (Median)</div>
          <div className="font-display text-on-surface mb-4 leading-none" style={{"fontSize":"44px"}}>{formatPrice(medianPrice, true)}</div>
          <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-outline-variant/20">
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Confidence Range</div>
              <div className="font-headline-md text-headline-md text-on-surface">{formatPrice(lowEst)} – {formatPrice(highEst)}</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Yield Potential</div>
              <div className="font-headline-md text-headline-md text-on-surface">4.8% <span className="text-tertiary text-sm ml-1">▲</span></div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Recent Transactions</div>
              <div className="font-headline-md text-headline-md text-on-surface">{data?.soldTransactions?.length || 0}</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Avg. Days on Market</div>
              <div className="font-headline-md text-headline-md text-on-surface">18 Days</div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="mb-12">
        <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-3 mb-6">Price Range Analysis</h3>
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20">
          <div className="relative">
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-3">
              <span>{formatPrice(lowEst * 0.9)}</span><span>{formatPrice(medianPrice)}</span><span>{formatPrice(highEst * 1.1)}</span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden relative">
              
              <div className="absolute h-full bg-primary/20 rounded-full" style={{"left":"16%","width":"40%"}}></div>
              
              <div className="absolute h-full w-1 bg-primary rounded-full" style={{"left":"48%"}}></div>
            </div>
            <div className="flex justify-between mt-3">
              <div style={{"marginLeft":"16%"}}>
                <div className="font-label-sm text-label-sm text-on-surface-variant">Low</div>
                <div className="font-label-md text-label-md text-on-surface font-semibold">{formatPrice(lowEst)}</div>
              </div>
              <div style={{"marginRight":"36%"}}>
                <div className="font-label-sm text-label-sm text-primary font-bold">AI Estimate</div>
                <div className="font-label-md text-label-md text-primary font-bold">{formatPrice(medianPrice)}</div>
              </div>
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">High</div>
                <div className="font-label-md text-label-md text-on-surface font-semibold">{formatPrice(highEst)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="mb-12">
        <div className="flex justify-between items-end border-b border-outline-variant/30 pb-3 mb-6">
          <h3 className="font-headline-md text-headline-md text-on-surface">Available Price History</h3>
          <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1"><span className="material-symbols-outlined text-[16px] filled">trending_up</span> +{histGrowth}%</span>
        </div>
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20">
          <div className="w-full h-32 mb-2">
            <SparklineChart data={history} height={128} color="#0f6e56" />
          </div>
          <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
            <span>Historical</span><span>Current</span>
          </div>
        </div>
      </section>

      
      <section className="mb-12">
        <div className="bg-surface-container-low border-l-4 border-primary p-6 rounded-r-xl relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-[0.06]">
            <span className="material-symbols-outlined text-primary" style={{"fontSize":"80px"}}>psychology</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary filled">auto_awesome</span>
            Executive Summary
          </h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed relative z-10">
            The market in the {rawPostcode.toUpperCase()} area represents a solid mid-market asset class in a highly resilient micro-market. Based on recent Land Registry transactions, the median sold price sits at {formatPrice(medianPrice, true)}. Yield compression is expected to stabilise at approximately 4.8% over a 3-year horizon, making this a <strong className="text-on-surface">viable buy-to-hold asset</strong>. Near-term planning disruptions should be monitored but are not disqualifying.
          </p>
        </div>
      </section>

      
      <section className="mb-12">
        <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-3 mb-6">Valuation Drivers</h3>
        <div className="bg-surface rounded-xl border border-outline-variant/20 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Metric</th>
                <th className="py-3 px-4 font-semibold">Value</th>
                <th className="py-3 px-4 font-semibold">Area Avg</th>
                <th className="py-3 px-4 font-semibold text-right">Market Relative</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 px-4 flex items-center gap-2"><span className="material-symbols-outlined text-outline text-[18px]">square_foot</span> Price per Sq Ft</td>
                <td className="py-4 px-4 font-medium">£1,250</td>
                <td className="py-4 px-4 text-on-surface-variant">£1,115</td>
                <td className="py-4 px-4 text-right"><span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded text-sm font-semibold">+12%</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 px-4 flex items-center gap-2"><span className="material-symbols-outlined text-outline text-[18px]">location_city</span> Area Growth (YoY)</td>
                <td className="py-4 px-4 font-medium">4.2%</td>
                <td className="py-4 px-4 text-on-surface-variant">2.7%</td>
                <td className="py-4 px-4 text-right"><span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded text-sm font-semibold">+1.5%</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 px-4 flex items-center gap-2"><span className="material-symbols-outlined text-outline text-[18px]">hourglass_empty</span> Avg. Days on Market</td>
                <td className="py-4 px-4 font-medium">18 Days</td>
                <td className="py-4 px-4 text-on-surface-variant">32 Days</td>
                <td className="py-4 px-4 text-right"><span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded text-sm font-semibold">-14 Days</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 px-4 flex items-center gap-2"><span className="material-symbols-outlined text-outline text-[18px]">home_work</span> Tenure Premium</td>
                <td className="py-4 px-4 font-medium">+8% (Freehold)</td>
                <td className="py-4 px-4 text-on-surface-variant">Mixed</td>
                <td className="py-4 px-4 text-right"><span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded text-sm font-semibold">+8%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      
      <section className="mb-12">
        <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-3 mb-6">Recent Live Transactions</h3>
        <div className="bg-surface rounded-xl border border-outline-variant/20 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Property Address</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold text-right">Sold Price</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant/10">
              {data?.soldTransactions?.map((t: any, idx: number) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-4 font-medium">{t.address}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{t.date}</td>
                  <td className="py-4 px-4">{t.propertyType}</td>
                  <td className="py-4 px-4 text-right font-medium">{formatPrice(t.price, true)}</td>
                </tr>
              ))}
              {!data?.soldTransactions?.length && (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center text-on-surface-variant">No recent transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      
      <section className="mb-12">
        <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-3 mb-6">Market Signals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-outline-variant/20 rounded-xl p-4 flex gap-4 items-start hover:bg-surface-container-low/50 transition-colors">
            <div className="bg-tertiary/10 p-2 rounded-lg text-tertiary shrink-0">
              <span className="material-symbols-outlined">train</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-1">Transport Infrastructure</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">Crossrail station upgrades completed 0.5 miles away, historically correlating with a 3â€“5% local premium.</p>
            </div>
          </div>
          <div className="border border-outline-variant/20 rounded-xl p-4 flex gap-4 items-start hover:bg-surface-container-low/50 transition-colors">
            <div className="bg-secondary-container/30 p-2 rounded-lg text-secondary shrink-0">
              <span className="material-symbols-outlined">storefront</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-1">Commercial Investment</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">Major tech firm announced HQ within 1 mile radius, increasing rental demand and long-term capital outlook.</p>
            </div>
          </div>
          <div className="border border-outline-variant/20 rounded-xl p-4 flex gap-4 items-start hover:bg-surface-container-low/50 transition-colors">
            <div className="bg-error/10 p-2 rounded-lg text-error shrink-0">
              <span className="material-symbols-outlined">construction</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-1">Planning Application</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">High-density development proposed 200m away. Short-term amenity impact possible during construction phase (18 months).</p>
            </div>
          </div>
          <div className="border border-outline-variant/20 rounded-xl p-4 flex gap-4 items-start hover:bg-surface-container-low/50 transition-colors">
            <div className="bg-tertiary/10 p-2 rounded-lg text-tertiary shrink-0">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-1">School Catchment</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">3 Outstanding-rated schools within 0.8 miles. Catchment boundary reviewed annually; currently stable.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-secondary-container/10 border border-secondary-container/30 rounded-xl p-6">
        <h4 className="font-label-md text-label-md text-secondary font-bold mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">warning</span>
          Important Disclaimer
        </h4>
        <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">This report is generated by Proplity AI engine and is for informational purposes only. It does not constitute financial advice. Property values are subject to market fluctuations. Always consult a qualified surveyor and financial advisor before making investment decisions. Past performance is not indicative of future results.</p>
      </section>
    </div>

    
    <div className="bg-surface-container-low p-8 border-t border-outline-variant/30 text-center">
      <p className="font-label-sm text-label-sm text-on-surface-variant">
        Generated by Proplity Institutional Intelligence. Confidential â€” For Addressee Only.<br/>
        Â© 2024 Proplity Investment Platform. All rights reserved. Report ID: PW-2024-7841
      </p>
    </div>
    </article>
    </div>
  );
}

export default function ValuationReport() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading Valuation Report..." />}>
      <ValuationReportContent />
    </Suspense>
  );
}

