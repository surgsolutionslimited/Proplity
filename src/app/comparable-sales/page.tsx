'use client';
import Link from 'next/link';

export default function ComparableSales() {
  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      

  
  <div className="absolute inset-0 w-full h-full map-bg">
    
    <div className="map-road-h" style={{"top":"30%","left":"0","right":"0"}}></div>
    <div className="map-road-h" style={{"top":"55%","left":"0","right":"0"}}></div>
    <div className="map-road-h" style={{"top":"70%","left":"0","right":"0"}}></div>
    <div className="map-road-v" style={{"left":"25%","top":"0","bottom":"0"}}></div>
    <div className="map-road-v" style={{"left":"50%","top":"0","bottom":"0"}}></div>
    <div className="map-road-v" style={{"left":"72%","top":"0","bottom":"0"}}></div>
    
    <div className="map-block" style={{"top":"10%","left":"5%","width":"16%","height":"16%"}}></div>
    <div className="map-block" style={{"top":"10%","left":"28%","width":"18%","height":"16%"}}></div>
    <div className="map-block" style={{"top":"10%","left":"53%","width":"14%","height":"16%"}}></div>
    <div className="map-block" style={{"top":"34%","left":"5%","width":"16%","height":"17%"}}></div>
    <div className="map-block" style={{"top":"34%","left":"28%","width":"18%","height":"17%"}}></div>
    <div className="map-block" style={{"top":"59%","left":"5%","width":"16%","height":"8%"}}></div>
    
    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent pointer-events-none md:hidden"></div>

    
    <button onClick={() => {}} className="absolute top-[28%] left-[44%] -translate-x-1/2 -translate-y-1/2 group z-20">
      <div className="bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1.5 rounded-lg shadow-lg relative font-semibold border border-primary-container ring-4 ring-primary/20 hover:scale-110 transition-transform">
        Â£4.2M
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 border-r border-b border-primary-container"></div>
      </div>
      <div className="w-5 h-5 bg-primary/20 rounded-full absolute -bottom-3 left-1/2 -translate-x-1/2 pin-pulse"></div>
    </button>

    <button onClick={() => {}} className="absolute top-[46%] left-[60%] -translate-x-1/2 -translate-y-1/2 group z-10">
      <div className="bg-surface text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-lg shadow-md relative border border-outline-variant/30 hover:border-primary/50 hover:scale-110 transition-all">
        Â£1.8M
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface rotate-45 border-r border-b border-outline-variant/30"></div>
      </div>
    </button>

    <button onClick={() => {}} className="absolute top-[55%] left-[33%] -translate-x-1/2 -translate-y-1/2 group z-10">
      <div className="bg-surface text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-lg shadow-md relative border border-outline-variant/30 hover:border-primary/50 hover:scale-110 transition-all">
        Â£3.1M
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface rotate-45 border-r border-b border-outline-variant/30"></div>
      </div>
    </button>

    <button onClick={() => {}} className="absolute top-[25%] left-[70%] -translate-x-1/2 -translate-y-1/2 group z-10">
      <div className="bg-surface text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-lg shadow-md relative border border-outline-variant/30 hover:border-primary/50 hover:scale-110 transition-all">
        Â£2.4M
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface rotate-45 border-r border-b border-outline-variant/30"></div>
      </div>
    </button>

    <button onClick={() => {}} className="absolute top-[40%] left-[18%] -translate-x-1/2 -translate-y-1/2 group z-10">
      <div className="bg-surface text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-lg shadow-md relative border border-outline-variant/30 hover:border-primary/50 hover:scale-110 transition-all">
        Â£2.9M
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface rotate-45 border-r border-b border-outline-variant/30"></div>
      </div>
    </button>
  </div>

  
  <div className="absolute top-4 left-5 right-5 z-30 md:hidden">
    <div className="relative shadow-lg">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">location_on</span>
      <input className="w-full bg-surface/95 backdrop-blur-md border border-outline-variant/20 rounded-xl pl-12 pr-4 py-3 font-label-md text-label-md text-on-surface focus:ring-1 focus:ring-primary outline-none" type="text" value="Kensington, London W8"/>
    </div>
  </div>

  
  <div className="hidden md:flex absolute top-0 right-0 w-[420px] h-full bg-surface shadow-[-4px_0_40px_rgba(15,110,86,0.06)] border-l border-outline-variant/10 flex-col z-30">
    
    <div className="p-6 border-b border-outline-variant/10 bg-surface-container-lowest/90 backdrop-blur-md flex-shrink-0">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Comparable Sales</h2>
        <button className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:bg-primary/20 transition-colors">
          Type: Flat <span className="material-symbols-outlined text-[14px]">close</span>
        </button>
        <button className="px-4 py-1.5 bg-surface-container-low text-on-surface-variant border border-outline-variant/30 rounded-full font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center gap-1">
          Beds: 1â€“4 <span className="material-symbols-outlined text-[14px]">keyboard_arrow_down</span>
        </button>
        <button className="px-4 py-1.5 bg-surface-container-low text-on-surface-variant border border-outline-variant/30 rounded-full font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center gap-1">
          Last 12M <span className="material-symbols-outlined text-[14px]">keyboard_arrow_down</span>
        </button>
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4 bg-surface">
      <div className="flex justify-between items-end mb-1">
        <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">12 Comparables</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Sorted by Relevance</span>
      </div>

      
      <div className="bg-surface-container-lowest border-2 border-primary rounded-xl p-5 cursor-pointer relative overflow-hidden" id="active-card">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
        <div className="flex justify-between items-start mb-3 pl-2">
          <div>
            <h4 className="font-headline-md text-headline-md font-bold text-on-surface">Â£4.2M</h4>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sold Oct 2023</span>
          </div>
          <div className="bg-tertiary/10 text-tertiary px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1 border border-tertiary/20">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span className="font-semibold">+4.2%</span> vs Market
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface mb-4 pl-2">12 Kensington Palace Gardens, W8 4QQ</p>
        <div className="grid grid-cols-3 gap-2 pl-2">
          <div className="bg-surface-container-low p-2 rounded-lg text-center">
            <span className="material-symbols-outlined text-on-surface-variant block text-[18px] mb-1">bed</span>
            <span className="font-label-sm text-label-sm text-on-surface">4 Beds</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg text-center">
            <span className="material-symbols-outlined text-on-surface-variant block text-[18px] mb-1">shower</span>
            <span className="font-label-sm text-label-sm text-on-surface">3 Baths</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg text-center">
            <span className="material-symbols-outlined text-on-surface-variant block text-[18px] mb-1">square_foot</span>
            <span className="font-label-sm text-label-sm text-on-surface">2,850 sqft</span>
          </div>
        </div>
      </div>

      
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-headline-md text-headline-md font-semibold text-on-surface">Â£2.4M</h4>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sold Aug 2023</span>
          </div>
          <div className="bg-tertiary/10 text-tertiary px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1 border border-tertiary/20">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span className="font-semibold">+1.8%</span> vs Market
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">44 Victoria Road, W8 5RQ</p>
        <div className="flex items-center gap-5 text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/10 pt-3">
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">bed</span> 3 Beds</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">shower</span> 2 Baths</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">square_foot</span> 1,920 sqft</span>
        </div>
      </div>

      
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-headline-md text-headline-md font-semibold text-on-surface">Â£3.1M</h4>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sold Jun 2023</span>
          </div>
          <div className="bg-error/10 text-error px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1 border border-error/20">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            <span className="font-semibold">-0.5%</span> vs Market
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">8 Campden Hill Square, W8 7JY</p>
        <div className="flex items-center gap-5 text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/10 pt-3">
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">bed</span> 5 Beds</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">shower</span> 4 Baths</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">square_foot</span> 3,400 sqft</span>
        </div>
      </div>

      
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-headline-md text-headline-md font-semibold text-on-surface">Â£2.9M</h4>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sold Mar 2023</span>
          </div>
          <div className="bg-tertiary/10 text-tertiary px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1 border border-tertiary/20">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span className="font-semibold">+2.1%</span> vs Market
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">3 Princes Gate, SW7 1QJ</p>
        <div className="flex items-center gap-5 text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/10 pt-3">
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">bed</span> 4 Beds</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">shower</span> 3 Baths</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">square_foot</span> 2,200 sqft</span>
        </div>
      </div>
    </div>
  </div>

  
  <div className="absolute bottom-[72px] left-0 w-full bg-surface rounded-t-3xl shadow-[0_-8px_40px_rgba(15,110,86,0.06)] border-t border-outline-variant/10 z-30 flex flex-col md:hidden h-[480px]">
    <div className="w-full py-3 flex justify-center cursor-grab">
      <div className="w-12 h-1.5 bg-outline-variant/40 rounded-full"></div>
    </div>
    
    <div className="px-5 pb-3 border-b border-outline-variant/10 flex gap-2 overflow-x-auto no-scrollbar">
      <button className="flex-shrink-0 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1">
        Property Type <span className="material-symbols-outlined text-[14px]">keyboard_arrow_down</span>
      </button>
      <button className="flex-shrink-0 px-4 py-1.5 bg-surface-container-low text-on-surface-variant border border-outline-variant/30 rounded-full font-label-sm text-label-sm flex items-center gap-1">
        Beds: 1â€“4 <span className="material-symbols-outlined text-[14px]">keyboard_arrow_down</span>
      </button>
      <button className="flex-shrink-0 px-4 py-1.5 bg-surface-container-low text-on-surface-variant border border-outline-variant/30 rounded-full font-label-sm text-label-sm flex items-center gap-1">
        Last 6 Months <span className="material-symbols-outlined text-[14px]">keyboard_arrow_down</span>
      </button>
    </div>
    
    <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-4">
      <div className="flex justify-between items-end mb-1">
        <h2 className="font-headline-md text-headline-md text-on-surface">12 Comparables</h2>
        <span className="font-label-sm text-label-sm text-on-surface-variant">By Relevance</span>
      </div>
      <div className="bg-surface border-2 border-primary rounded-xl p-4">
        <div className="flex justify-between items-start mb-2">
          <div><span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sold Oct 2023</span><h3 className="font-headline-md text-headline-md text-on-surface">Â£4.2M</h3></div>
          <div className="bg-tertiary/10 text-tertiary px-2 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1 border border-tertiary/20"><span className="material-symbols-outlined text-[14px]">trending_up</span>+4.2% vs Market</div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-3">12 Kensington Palace Gardens, W8 4QQ</p>
        <div className="flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/10 pt-2">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span> 4</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">shower</span> 3</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">square_foot</span> 2,850 sqft</span>
        </div>
      </div>
      <div className="bg-surface border border-outline-variant/20 rounded-xl p-4">
        <div className="flex justify-between items-start mb-2">
          <div><span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sold Aug 2023</span><h3 className="font-headline-md text-headline-md text-on-surface">Â£2.4M</h3></div>
          <div className="bg-tertiary/10 text-tertiary px-2 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1 border border-tertiary/20"><span className="material-symbols-outlined text-[14px]">trending_up</span>+1.8% vs Market</div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-3">44 Victoria Road, W8 5RQ</p>
        <div className="flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/10 pt-2">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span> 3</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">shower</span> 2</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">square_foot</span> 1,920 sqft</span>
        </div>
      </div>
    </div>
  </div>

    </div>
  );
}

