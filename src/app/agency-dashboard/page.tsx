'use client';
import Link from 'next/link';

export default function AgencyDashboard() {
  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      

  
  <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Agency Portal</h1>
        <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-lg tracking-wider uppercase font-bold">Pro Tier</span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">Manage your institutional-grade portfolio and generate insights for clients.</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-surface border border-outline-variant/20 rounded-xl px-4 py-2">
        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
        <input id="prop-search" type="text" placeholder="Search propertiesâ€¦" className="bg-transparent border-none outline-none font-label-md text-label-md text-on-surface placeholder:text-outline w-48"/>
      </div>
      <button className="md:hidden bg-primary-container text-on-primary font-label-md text-label-md p-2.5 rounded-xl">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  </section>

  
  <section className="w-full -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 overflow-x-auto no-scrollbar pb-2">
    <div className="flex gap-4 w-max md:w-full md:grid md:grid-cols-4">
      
      <div className="stat-card bg-surface border border-primary-container/10 rounded-2xl p-5 min-w-[200px] md:min-w-0 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Reports Generated</span>
          <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "\'FILL\' 1" }}>description</span>
        </div>
        <div className="flex items-end gap-1.5">
          <span className="font-headline-md text-headline-md font-semibold text-on-surface">42</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mb-1">/ 100</span>
        </div>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full rounded-full transition-all" style={{"width":"42%"}}></div>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">58 remaining this month</span>
      </div>

      
      <div className="stat-card bg-surface border border-primary-container/10 rounded-2xl p-5 min-w-[200px] md:min-w-0 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Active Listings</span>
          <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "\'FILL\' 1" }}>real_estate_agent</span>
        </div>
        <span className="font-headline-md text-headline-md font-semibold text-on-surface">12</span>
        <div className="flex items-center gap-1 text-tertiary">
          <span className="material-symbols-outlined text-[14px]">trending_up</span>
          <span className="font-label-sm text-label-sm">+2 this week</span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">3 pending review</span>
      </div>

      
      <div className="stat-card bg-[#E1F5EE] border border-primary-container/10 rounded-2xl p-5 min-w-[200px] md:min-w-0 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-primary-container">Team Members</span>
          <span className="material-symbols-outlined text-primary-container text-sm" style={{ fontVariationSettings: "\'FILL\' 1" }}>group</span>
        </div>
        <span className="font-headline-md text-headline-md font-semibold text-on-surface">4 / 10</span>
        <div className="flex -space-x-2">
          <div className="w-7 h-7 rounded-full border-2 border-[#E1F5EE] bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm text-[10px]">JD</div>
          <div className="w-7 h-7 rounded-full border-2 border-[#E1F5EE] bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm text-[10px]">MK</div>
          <div className="w-7 h-7 rounded-full border-2 border-[#E1F5EE] bg-tertiary text-on-tertiary flex items-center justify-center font-label-sm text-label-sm text-[10px]">SL</div>
          <div className="w-7 h-7 rounded-full border-2 border-[#E1F5EE] bg-surface-container-high text-on-surface flex items-center justify-center font-label-sm text-label-sm text-[10px]">+1</div>
        </div>
      </div>

      
      <div className="stat-card bg-surface border border-primary-container/10 rounded-2xl p-5 min-w-[200px] md:min-w-0 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Portfolio Value</span>
          <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "\'FILL\' 1" }}>account_balance</span>
        </div>
        <span className="font-headline-md text-headline-md font-semibold text-on-surface">Â£18.2M</span>
        <div className="flex items-center gap-1 text-tertiary">
          <span className="material-symbols-outlined text-[14px]">trending_up</span>
          <span className="font-label-sm text-label-sm">+4.2% YoY</span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Across 12 properties</span>
      </div>
    </div>
  </section>

  
  <section className="flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <h2 className="font-headline-md text-headline-md text-on-surface">Active Properties</h2>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low px-3 py-1.5 rounded-lg transition-colors border border-outline-variant/20">
          <span className="material-symbols-outlined text-sm">filter_list</span> Filter
        </button>
        <button className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low px-3 py-1.5 rounded-lg transition-colors border border-outline-variant/20">
          <span className="material-symbols-outlined text-sm">sort</span> Sort
        </button>
      </div>
    </div>

    
    <div className="bg-surface rounded-2xl border border-outline-variant/20 overflow-hidden" style={{"boxShadow":"0px 4px 20px rgba(15,110,86,0.02)"}}>
      
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-surface-container-low border-b border-outline-variant/20 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
        <div className="col-span-5">Property Address</div>
        <div className="col-span-2">Valuation</div>
        <div className="col-span-2">PropScore</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      
      <div className="flex flex-col divide-y divide-outline-variant/10">

        
        <div className="property-row grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center transition-colors cursor-pointer">
          <div className="col-span-1 md:col-span-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-outline opacity-30 text-[28px]">apartment</span>
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface block">22 Baker Street, NW1</span>
              <span className="font-body-md text-body-md text-sm text-on-surface-variant">London, UK Â· 4 bed Â· Terraced</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant block mb-1">Valuation</span>
            <span className="font-headline-md text-headline-md text-base text-on-surface font-semibold">Â£845,000</span>
            <span className="text-tertiary font-label-sm text-label-sm block">+2.4% MoM</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#e8e8e3" strokeWidth="4"/>
                <circle cx="20" cy="20" r="16" fill="none" stroke="#0f6e56" strokeWidth="4" strokeDasharray="100.5" strokeDashoffset="16.1" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-label-sm text-label-sm text-primary font-bold text-[10px]">84</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface">84 / 100</span>
          </div>
          <div className="col-span-1 md:col-span-1 flex items-center">
            <span className="bg-tertiary/10 text-tertiary font-label-sm text-label-sm px-2.5 py-1 rounded-lg border border-tertiary/20 font-semibold">Listed</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
            <a href="valuation-report.html" className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-xl hover:opacity-90 transition-opacity w-full md:w-auto text-center">Generate Report</a>
          </div>
        </div>

        
        <div className="property-row grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center transition-colors cursor-pointer">
          <div className="col-span-1 md:col-span-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-outline opacity-30 text-[28px]">home</span>
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface block">14 Kensington Palace Gdns</span>
              <span className="font-body-md text-body-md text-sm text-on-surface-variant">London W8 Â· 5 bed Â· Detached</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant block mb-1">Valuation</span>
            <span className="font-headline-md text-headline-md text-base text-on-surface font-semibold">Â£4,800,000</span>
            <span className="text-tertiary font-label-sm text-label-sm block">+1.2% MoM</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#e8e8e3" strokeWidth="4"/>
                <circle cx="20" cy="20" r="16" fill="none" stroke="#0f6e56" strokeWidth="4" strokeDasharray="100.5" strokeDashoffset="10.1" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-label-sm text-label-sm text-primary font-bold text-[10px]">90</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface">90 / 100</span>
          </div>
          <div className="col-span-1 md:col-span-1 flex items-center">
            <span className="bg-secondary-container/30 text-secondary font-label-sm text-label-sm px-2.5 py-1 rounded-lg border border-secondary-container/40 font-semibold">Pending</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
            <a href="valuation-report.html" className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-xl hover:opacity-90 transition-opacity w-full md:w-auto text-center">Generate Report</a>
          </div>
        </div>

        
        <div className="property-row grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center transition-colors cursor-pointer">
          <div className="col-span-1 md:col-span-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-outline opacity-30 text-[28px]">villa</span>
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface block">8 Campden Hill Square, W8</span>
              <span className="font-body-md text-body-md text-sm text-on-surface-variant">London W8 Â· 3 bed Â· Semi-Detached</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant block mb-1">Valuation</span>
            <span className="font-headline-md text-headline-md text-base text-on-surface font-semibold">Â£1,250,000</span>
            <span className="text-error font-label-sm text-label-sm block">-0.8% MoM</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#e8e8e3" strokeWidth="4"/>
                <circle cx="20" cy="20" r="16" fill="none" stroke="#735c00" strokeWidth="4" strokeDasharray="100.5" strokeDashoffset="28.1" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-label-sm text-label-sm text-secondary font-bold text-[10px]">72</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface">72 / 100</span>
          </div>
          <div className="col-span-1 md:col-span-1 flex items-center">
            <span className="bg-tertiary/10 text-tertiary font-label-sm text-label-sm px-2.5 py-1 rounded-lg border border-tertiary/20 font-semibold">Listed</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
            <a href="valuation-report.html" className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-xl hover:opacity-90 transition-opacity w-full md:w-auto text-center">Generate Report</a>
          </div>
        </div>

        
        <div className="property-row grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center transition-colors cursor-pointer">
          <div className="col-span-1 md:col-span-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-outline opacity-30 text-[28px]">business</span>
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface block">42 Victoria Road, W8 5RQ</span>
              <span className="font-body-md text-body-md text-sm text-on-surface-variant">London W8 Â· Commercial Â· Retail</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant block mb-1">Valuation</span>
            <span className="font-headline-md text-headline-md text-base text-on-surface font-semibold">Â£850,000</span>
            <span className="text-on-surface-variant font-label-sm text-label-sm block">Stable</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#e8e8e3" strokeWidth="4"/>
                <circle cx="20" cy="20" r="16" fill="none" stroke="#6f7a74" strokeWidth="4" strokeDasharray="100.5" strokeDashoffset="35.2" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-label-sm text-label-sm text-outline font-bold text-[10px]">65</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface">65 / 100</span>
          </div>
          <div className="col-span-1 md:col-span-1 flex items-center">
            <span className="bg-error/10 text-error font-label-sm text-label-sm px-2.5 py-1 rounded-lg border border-error/20 font-semibold">Expired</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
            <a href="valuation-report.html" className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-xl hover:opacity-90 transition-opacity w-full md:w-auto text-center">Generate Report</a>
          </div>
        </div>

        
        <div className="property-row grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center transition-colors cursor-pointer">
          <div className="col-span-1 md:col-span-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-outline opacity-30 text-[28px]">home</span>
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface block">5 Princes Gate, SW7 1QJ</span>
              <span className="font-body-md text-body-md text-sm text-on-surface-variant">London SW7 Â· 6 bed Â· Detached</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant block mb-1">Valuation</span>
            <span className="font-headline-md text-headline-md text-base text-on-surface font-semibold">Â£7,200,000</span>
            <span className="text-tertiary font-label-sm text-label-sm block">+3.1% MoM</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#e8e8e3" strokeWidth="4"/>
                <circle cx="20" cy="20" r="16" fill="none" stroke="#0f6e56" strokeWidth="4" strokeDasharray="100.5" strokeDashoffset="8.0" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-label-sm text-label-sm text-primary font-bold text-[10px]">92</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface">92 / 100</span>
          </div>
          <div className="col-span-1 md:col-span-1 flex items-center">
            <span className="bg-tertiary/10 text-tertiary font-label-sm text-label-sm px-2.5 py-1 rounded-lg border border-tertiary/20 font-semibold">Listed</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
            <a href="valuation-report.html" className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-xl hover:opacity-90 transition-opacity w-full md:w-auto text-center">Generate Report</a>
          </div>
        </div>

      </div>

      
      <div className="p-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-on-surface-variant">Showing 5 of 12 properties</span>
        <button className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
          View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  </section>

  
  <section className="flex flex-col gap-4 hidden md:flex">
    <h2 className="font-headline-md text-headline-md text-on-surface">Recent Activity</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-surface border border-outline-variant/20 rounded-xl p-4 flex items-start gap-3" style={{"boxShadow":"0 4px 20px rgba(15,110,86,0.02)"}}>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-[16px]">description</span>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-on-surface">Report generated for 22 Baker St</p>
          <p className="text-xs text-on-surface-variant mt-1">By Marcus K. Â· 2 hours ago</p>
        </div>
      </div>
      <div className="bg-surface border border-outline-variant/20 rounded-xl p-4 flex items-start gap-3" style={{"boxShadow":"0 4px 20px rgba(15,110,86,0.02)"}}>
        <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-tertiary text-[16px]">add_home</span>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-on-surface">New listing added: 5 Princes Gate</p>
          <p className="text-xs text-on-surface-variant mt-1">By Sarah L. Â· 5 hours ago</p>
        </div>
      </div>
      <div className="bg-surface border border-outline-variant/20 rounded-xl p-4 flex items-start gap-3" style={{"boxShadow":"0 4px 20px rgba(15,110,86,0.02)"}}>
        <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-secondary text-[16px]">person_add</span>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-on-surface">Team member invited: R. Ahmed</p>
          <p className="text-xs text-on-surface-variant mt-1">By Admin Â· Yesterday</p>
        </div>
      </div>
    </div>
  </section>


    </div>
  );
}

