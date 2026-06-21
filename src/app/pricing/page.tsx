'use client';
import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  { q: "How accurate are the AI valuations?", a: "Our AI engine analyses over 20 million historical transactions, planning data, school ratings, transport links, and real-time news to deliver valuations with a typical margin of ±5%. Investor plan subscribers receive enhanced accuracy with a ±3% margin." },
  { q: "Can I cancel my subscription at any time?", a: "Yes. You can cancel at any time from your account settings. Your access continues until the end of the current billing period, and you will not be charged again." },
  { q: "What data sources does Proplity use?", a: "We aggregate data from the Land Registry, Ordnance Survey, ONS housing statistics, Ofsted school inspections, planning portals, and over 50 licensed news sources — all updated daily and fully compliant with UK GDPR and FCA guidelines." },
  { q: "Is there an API for agencies?", a: "Yes. Agency Starter plans include basic API access, and Agency Pro and Enterprise plans include full REST API access with webhook support for real-time data integration into your existing CRM systems." },
  { q: "Is my data secure?", a: "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are fully GDPR compliant and never sell your personal data to third parties. Our infrastructure is hosted on ISO 27001 certified cloud providers." }
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="pw-faq-item bg-surface border border-outline-variant/20 rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer pw-faq-trigger w-full flex justify-between items-center p-5 font-label-md text-label-md text-on-surface text-left hover:bg-surface-container-lowest transition-colors"
      >
        <span>{question}</span>
        <span className={`material-symbols-outlined text-on-surface-variant flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          keyboard_arrow_down
        </span>
      </button>
      <div className={`pw-faq-body transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="font-body-md text-body-md text-on-surface-variant px-5 pb-5 pt-2 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'buyer' | 'agency'>('buyer');

  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      
  <section className="text-center max-w-3xl mx-auto space-y-6">
    <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm">
      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>local_offer</span>
      Simple, transparent pricing
    </div>
    <h1 className="font-display text-display text-on-surface">Institutional Grade Analysis. <br/><span className="text-primary-container">Scaled for You.</span></h1>
    <p className="font-body-lg text-body-lg text-on-surface-variant">Choose the plan that fits your investment strategy. From individual buyers finding their first property to agencies managing large portfolios.</p>
    
    <div className="inline-flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/20 mx-auto mt-8">
      <button id="toggle-buyer" className={`cursor-pointer px-6 py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${activeTab === 'buyer' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`} onClick={() => setActiveTab('buyer')}>Buyer Plans</button>
      <button id="toggle-agency" className={`cursor-pointer px-6 py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${activeTab === 'agency' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`} onClick={() => setActiveTab('agency')}>Agency Plans</button>
    </div>
  </section>

  
  <section id="buyer-plans" className={`${activeTab === 'buyer' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto`}>
    
    <div className="plan-card bg-surface rounded-2xl p-8 border border-outline-variant/30 flex flex-col">
      <div className="mb-8">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Free</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg text-headline-lg text-on-surface">£0</span>
          <span className="font-body-md text-body-md text-on-surface-variant">/mo</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-3">Essential tools for casual browsing.</p>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Basic property valuation</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Standard search filters</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">3 searches per month</span></li>
        <li className="flex items-start gap-3 opacity-40"><span className="material-symbols-outlined text-outline text-[20px]">cancel</span><span className="font-body-md text-body-md text-on-surface-variant">News signals</span></li>
        <li className="flex items-start gap-3 opacity-40"><span className="material-symbols-outlined text-outline text-[20px]">cancel</span><span className="font-body-md text-body-md text-on-surface-variant">Investment score</span></li>
      </ul>
      <button className="cursor-pointer w-full py-3.5 rounded-xl border border-primary-container text-primary-container font-label-md text-label-md hover:bg-surface-container-low transition-colors font-semibold">Current Plan</button>
    </div>

    
    <div className="plan-card bg-surface rounded-2xl p-8 border border-outline-variant/30 flex flex-col">
      <div className="mb-8">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Buyer</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg text-headline-lg text-on-surface">£19</span>
          <span className="font-body-md text-body-md text-on-surface-variant">/mo</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-3">Advanced insights for active buyers.</p>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Everything in Free</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Real-time news signals</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Proplity Investment Score</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">25 searches per month</span></li>
        <li className="flex items-start gap-3 opacity-40"><span className="material-symbols-outlined text-outline text-[20px]">cancel</span><span className="font-body-md text-body-md text-on-surface-variant">Predictive yield modeling</span></li>
      </ul>
      <button className="cursor-pointer w-full py-3.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity font-semibold">Upgrade to Buyer</button>
    </div>

    
    <div className="plan-card plan-card-featured bg-surface rounded-2xl p-8 border-2 border-primary-container flex flex-col relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-container text-on-primary font-label-sm text-label-sm px-4 py-1.5 rounded-full uppercase tracking-wider font-bold whitespace-nowrap">Most Popular</div>
      <div className="mb-8 mt-2">
        <h3 className="font-headline-md text-headline-md text-primary-container mb-3">Investor</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg text-headline-lg text-on-surface">£49</span>
          <span className="font-body-md text-body-md text-on-surface-variant">/mo</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-3">Institutional grade tools for serious investors.</p>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface font-medium">Everything in Buyer</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Unlimited deep-dive reports</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Full comparable sales history</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Predictive yield modeling</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">PDF report exports</span></li>
      </ul>
      <button className="cursor-pointer w-full py-3.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity font-semibold">Upgrade to Investor</button>
    </div>
  </section>

  
  <section id="agency-plans" className={`${activeTab === 'agency' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto`}>
    
    <div className="plan-card bg-surface rounded-2xl p-8 border border-outline-variant/30 flex flex-col">
      <div className="mb-8">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Agency Starter</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg text-headline-lg text-on-surface">£149</span>
          <span className="font-body-md text-body-md text-on-surface-variant">/mo</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-3">For small teams of up to 3 agents.</p>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Up to 3 user seats</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">100 reports/month</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Basic API Access</span></li>
        <li className="flex items-start gap-3 opacity-40"><span className="material-symbols-outlined text-outline text-[20px]">cancel</span><span className="font-body-md text-body-md text-on-surface-variant">White-label reports</span></li>
      </ul>
      <button className="cursor-pointer w-full py-3.5 rounded-xl border border-primary-container text-primary-container font-label-md text-label-md hover:bg-surface-container-low transition-colors font-semibold">Start Free Trial</button>
    </div>

    
    <div className="plan-card plan-card-featured bg-surface rounded-2xl p-8 border-2 border-primary-container flex flex-col relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-container text-on-primary font-label-sm text-label-sm px-4 py-1.5 rounded-full uppercase tracking-wider font-bold whitespace-nowrap">Most Popular</div>
      <div className="mb-8 mt-2">
        <h3 className="font-headline-md text-headline-md text-primary-container mb-3">Agency Pro</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg text-headline-lg text-on-surface">£349</span>
          <span className="font-body-md text-body-md text-on-surface-variant">/mo</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-3">For growing brokerages and teams.</p>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface font-medium">Everything in Starter</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Up to 10 user seats</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Full API Access</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">White-label reports</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Portfolio analytics dashboard</span></li>
      </ul>
      <button className="cursor-pointer w-full py-3.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity font-semibold">Contact Sales</button>
    </div>

    
    <div className="plan-card bg-surface rounded-2xl p-8 border border-outline-variant/30 flex flex-col">
      <div className="mb-8">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Enterprise</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg text-headline-lg text-on-surface">£749+</span>
          <span className="font-body-md text-body-md text-on-surface-variant">/mo</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-3">Custom solutions for large institutions.</p>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Unlimited seats</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Dedicated Account Manager</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">Custom integration support</span></li>
        <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span><span className="font-body-md text-body-md text-on-surface">SLA & compliance reports</span></li>
      </ul>
      <button className="cursor-pointer w-full py-3.5 rounded-xl border border-primary-container text-primary-container font-label-md text-label-md hover:bg-surface-container-low transition-colors font-semibold">Contact Sales</button>
    </div>
  </section>

  
  <section className="max-w-5xl mx-auto overflow-x-auto">
    <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Feature Comparison</h2>
    <div className="min-w-[700px] bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant/20">
            <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider w-1/4">Feature</th>
            <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider w-1/4 text-center">Free</th>
            <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider w-1/4 text-center bg-surface-container-high/30">Buyer</th>
            <th className="p-4 font-label-sm text-label-sm text-primary-container uppercase tracking-wider w-1/4 text-center bg-primary-container/5">Investor</th>
          </tr>
        </thead>
        <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant/10">
          <tr className="hover:bg-surface-container-lowest/50 transition-colors">
            <td className="p-4 font-medium">AI Valuation Accuracy</td>
            <td className="p-4 text-center text-on-surface-variant">Standard</td>
            <td className="p-4 text-center text-on-surface-variant bg-surface-container-high/10">Enhanced</td>
            <td className="p-4 text-center font-medium text-primary-container bg-primary-container/5">Maximum</td>
          </tr>
          <tr className="hover:bg-surface-container-lowest/50 transition-colors">
            <td className="p-4 font-medium">News Alerts</td>
            <td className="p-4 text-center"><span className="material-symbols-outlined text-outline text-[18px]">remove</span></td>
            <td className="p-4 text-center bg-surface-container-high/10"><span className="material-symbols-outlined text-primary-container text-[18px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span></td>
            <td className="p-4 text-center bg-primary-container/5"><span className="material-symbols-outlined text-primary-container text-[18px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span></td>
          </tr>
          <tr className="hover:bg-surface-container-lowest/50 transition-colors">
            <td className="p-4 font-medium">Comparables History</td>
            <td className="p-4 text-center text-on-surface-variant">Last 3 Years</td>
            <td className="p-4 text-center text-on-surface-variant bg-surface-container-high/10">Last 10 Years</td>
            <td className="p-4 text-center font-medium text-primary-container bg-primary-container/5">Full History</td>
          </tr>
          <tr className="hover:bg-surface-container-lowest/50 transition-colors">
            <td className="p-4 font-medium">Investment Score</td>
            <td className="p-4 text-center"><span className="material-symbols-outlined text-outline text-[18px]">remove</span></td>
            <td className="p-4 text-center bg-surface-container-high/10"><span className="material-symbols-outlined text-primary-container text-[18px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span></td>
            <td className="p-4 text-center bg-primary-container/5"><span className="material-symbols-outlined text-primary-container text-[18px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span></td>
          </tr>
          <tr className="hover:bg-surface-container-lowest/50 transition-colors">
            <td className="p-4 font-medium">PDF Export</td>
            <td className="p-4 text-center"><span className="material-symbols-outlined text-outline text-[18px]">remove</span></td>
            <td className="p-4 text-center bg-surface-container-high/10"><span className="material-symbols-outlined text-outline text-[18px]">remove</span></td>
            <td className="p-4 text-center bg-primary-container/5"><span className="material-symbols-outlined text-primary-container text-[18px]" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span></td>
          </tr>
          <tr className="hover:bg-surface-container-lowest/50 transition-colors">
            <td className="p-4 font-medium">Yield Modeling</td>
            <td className="p-4 text-center"><span className="material-symbols-outlined text-outline text-[18px]">remove</span></td>
            <td className="p-4 text-center bg-surface-container-high/10"><span className="material-symbols-outlined text-outline text-[18px]">remove</span></td>
            <td className="p-4 text-center bg-primary-container/5">Predictive</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  
  <section className="max-w-3xl mx-auto">
    <h2 className="font-headline-md text-headline-md text-on-surface mb-8 text-center">Frequently Asked Questions</h2>
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.q} answer={faq.a} />
      ))}
    </div>
  </section>

    </div>
  );
}
