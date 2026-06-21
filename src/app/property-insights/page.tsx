'use client';
import Link from 'next/link';
import ProgressRing from '@/components/ui/ProgressRing';

export default function PropertyInsights() {
  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      

  
  <section className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-outline-variant/20 pb-6">
    <div>
      <p className="font-label-md text-label-md text-on-surface-variant mb-1 flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">location_on</span> Property Analytics
      </p>
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">22 Baker Street, London NW1</h1>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-primary-container/10 text-primary-container px-3 py-1.5 rounded-full flex items-center gap-2 font-label-md text-label-md border border-primary-container/20">
        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
        Fair Value
      </div>
      <a href="valuation-report.html" className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">description</span>
        Full Report
      </a>
      <button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface p-2 rounded-lg transition-colors hidden md:flex">
        <span className="material-symbols-outlined">bookmark</span>
      </button>
      <button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface p-2 rounded-lg transition-colors hidden md:flex">
        <span className="material-symbols-outlined">share</span>
      </button>
    </div>
  </section>

  
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

    
    <div className="lg:col-span-8 space-y-6">
      
      <div className="grid grid-cols-2 gap-4">
        
        <div className="metric-card bg-surface-container-lowest p-6 rounded-xl border border-primary/10 group cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant">AI Estimated Value</h3>
            <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "\'FILL\' 1" }}>auto_awesome</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-background mb-1">Â£845,000</div>
          <div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +2.4% vs last month
          </div>
        </div>
        
        <div className="metric-card bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant">Asking Price</h3>
            <span className="material-symbols-outlined text-on-surface-variant text-xl">sell</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-background mb-1">Â£850,000</div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
            <span>0.6% premium to AI</span>
          </div>
        </div>
        
        <div className="metric-card bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant">Price per SQM</h3>
            <span className="material-symbols-outlined text-on-surface-variant text-xl">straighten</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-background mb-1">Â£12,400</div>
          <div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm">
            <span>Top 15% in NW1</span>
          </div>
        </div>
        
        <div className="metric-card bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant">Market Liquidity</h3>
            <span className="material-symbols-outlined text-on-surface-variant text-xl">speed</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-background mb-1">18 Days</div>
          <div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[14px]">bolt</span> Fast moving market
          </div>
        </div>
      </div>

      
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20" style={{"boxShadow":"0px 4px 20px rgba(15,110,86,0.02)"}}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-label-md text-label-md text-on-background">Price History â€” NW1 Postcode</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg bg-primary-container/10 text-primary-container font-label-sm text-label-sm border border-primary-container/20">1Y</button>
            <button className="px-3 py-1 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container transition-colors">3Y</button>
            <button className="px-3 py-1 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container transition-colors">5Y</button>
          </div>
        </div>
        
        <div className="relative h-32">
          <svg className="w-full h-full" viewBox="0 0 800 128" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f6e56" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#0f6e56" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,100 C50,95 100,90 160,80 C220,70 280,75 340,60 C400,45 460,50 520,35 C580,20 640,25 700,15 C750,8 780,10 800,5" fill="none" stroke="#0f6e56" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M0,100 C50,95 100,90 160,80 C220,70 280,75 340,60 C400,45 460,50 520,35 C580,20 640,25 700,15 C750,8 780,10 800,5 L800,128 L0,128 Z" fill="url(#sparkGrad)"/>
            <circle cx="800" cy="5" r="5" fill="#0f6e56"/>
          </svg>
          
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Â£900k</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Â£750k</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Â£600k</span>
          </div>
        </div>
        <div className="flex justify-between mt-2 font-label-sm text-label-sm text-on-surface-variant">
          <span>Jan 2024</span><span>Apr 2024</span><span>Jul 2024</span><span>Oct 2024</span><span>Now</span>
        </div>
      </div>

      
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20" style={{"boxShadow":"0px 4px 20px rgba(15,110,86,0.02)"}}>
        <h3 className="font-label-md text-label-md text-on-background mb-4">Market Signals &amp; News</h3>
        <div className="space-y-4">
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-tertiary-container/5 border border-tertiary-container/15">
            <div className="bg-tertiary-container/20 text-tertiary p-2 rounded-full mt-0.5 flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">train</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label-sm text-label-sm font-bold text-tertiary uppercase tracking-wider">POSITIVE</span>
                <span className="text-on-surface-variant text-xs">â€¢ 2 days ago</span>
              </div>
              <h4 className="font-label-md text-label-md text-on-background">New Crossrail Station Approval</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Confirmed plans for improved transport links within 0.5 miles, expected to drive capital growth of 3â€“5%.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary-container/10 border border-secondary-container/30">
            <div className="bg-secondary-container/30 text-secondary p-2 rounded-full mt-0.5 flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">construction</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">CAUTION</span>
                <span className="text-on-surface-variant text-xs">â€¢ 1 week ago</span>
              </div>
              <h4 className="font-label-md text-label-md text-on-background">Local Planning Updates</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">High-density development proposed nearby may affect local amenity values during construction phase.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-error-container/20 border border-error-container/40">
            <div className="bg-error-container text-error p-2 rounded-full mt-0.5 flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">gavel</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label-sm text-label-sm font-bold text-error uppercase tracking-wider">RISK</span>
                <span className="text-on-surface-variant text-xs">â€¢ 2 weeks ago</span>
              </div>
              <h4 className="font-label-md text-label-md text-on-background">Rental Legislation Changes</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Upcoming borough regulations may impact HMO licensing and short-term let yields in NW1.</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-[#E1F5EE] border border-primary/20 rounded-xl p-6 flex gap-4 items-start" style={{"boxShadow":"0px 4px 20px rgba(15,110,86,0.04)"}}>
        <div className="bg-primary-container text-on-primary-container p-2 rounded-lg flex-shrink-0">
          <span className="material-symbols-outlined">psychology</span>
        </div>
        <div>
          <h3 className="font-label-md text-label-md text-primary-container mb-2 font-bold">AI Verdict</h3>
          <p className="font-body-lg text-body-lg text-on-primary-fixed-variant leading-relaxed">This property is fairly priced for the current Baker St market. Growth potential is high due to local infrastructure projects, though near-term planning disruptions require monitoring. A <strong>score of 84/100</strong> reflects strong fundamentals with manageable short-term risks.</p>
          <a href="valuation-report.html" className="inline-flex items-center gap-1 mt-3 text-primary-container font-label-md text-label-md hover:underline">
            View Full Report <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>

    
    <div className="lg:col-span-4 space-y-6">
      
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 flex flex-col items-center" style={{"boxShadow":"0px 4px 20px rgba(15,110,86,0.02)"}}>
        <h3 className="font-label-md text-label-md text-on-surface-variant w-full text-left mb-6">Proplity Investment Score</h3>
        
        <div className="mb-8 flex justify-center items-center">
          <ProgressRing value={84} size={160} strokeWidth={8} />
        </div>
        
        <div className="w-full space-y-4">
          <div>
            <div className="flex justify-between font-label-sm text-label-sm mb-1">
              <span className="text-on-background">Location</span>
              <span className="text-primary font-bold">90</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{"width":"90%"}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between font-label-sm text-label-sm mb-1">
              <span className="text-on-background">Fairness</span>
              <span className="text-primary font-bold">85</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{"width":"85%"}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between font-label-sm text-label-sm mb-1">
              <span className="text-on-background">Growth</span>
              <span className="text-secondary font-bold">72</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{"width":"72%"}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between font-label-sm text-label-sm mb-1">
              <span className="text-on-background">Yield</span>
              <span className="text-outline font-bold">65</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-outline h-full rounded-full" style={{"width":"65%"}}></div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20" style={{"boxShadow":"0px 4px 20px rgba(15,110,86,0.02)"}}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-label-md text-label-md text-on-background">Comparable Sales</h3>
          <a href="comparable-sales.html" className="text-primary font-label-sm text-label-sm hover:underline">View All</a>
        </div>
        <div className="space-y-3">
          <div className="p-3 border border-outline-variant/20 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer flex justify-between items-center">
            <div>
              <p className="font-label-sm text-label-sm text-on-background">24 Baker St</p>
              <p className="text-xs text-on-surface-variant">Sold Oct 2023</p>
            </div>
            <div className="text-right">
              <p className="font-label-md text-label-md text-on-background">Â£860k</p>
              <p className="text-xs text-error">-1.7% delta</p>
            </div>
          </div>
          <div className="p-3 border border-outline-variant/20 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer flex justify-between items-center">
            <div>
              <p className="font-label-sm text-label-sm text-on-background">18 Baker St</p>
              <p className="text-xs text-on-surface-variant">Sold Aug 2023</p>
            </div>
            <div className="text-right">
              <p className="font-label-md text-label-md text-on-background">Â£825k</p>
              <p className="text-xs text-tertiary">+2.4% delta</p>
            </div>
          </div>
          <div className="p-3 border border-outline-variant/20 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer flex justify-between items-center">
            <div>
              <p className="font-label-sm text-label-sm text-on-background">31 Gloucester Pl</p>
              <p className="text-xs text-on-surface-variant">Sold Jun 2023</p>
            </div>
            <div className="text-right">
              <p className="font-label-md text-label-md text-on-background">Â£890k</p>
              <p className="text-xs text-error">-5.0% delta</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20" style={{"boxShadow":"0px 4px 20px rgba(15,110,86,0.02)"}}>
        <h3 className="font-label-md text-label-md text-on-background mb-4">Property Details</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">home</span> Type</span>
            <span className="font-label-sm text-label-sm text-on-surface">Terraced House</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">bed</span> Bedrooms</span>
            <span className="font-label-sm text-label-sm text-on-surface">4</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">square_foot</span> Floor Area</span>
            <span className="font-label-sm text-label-sm text-on-surface">68 mÂ²</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">key</span> Tenure</span>
            <span className="font-label-sm text-label-sm text-on-surface">Freehold</span>
          </div>
        </div>
      </div>
    </div>
  </div>

    </div>
  );
}

