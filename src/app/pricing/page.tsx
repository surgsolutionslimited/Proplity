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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-surface border border-outline-variant/20 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full flex justify-between items-center p-5 font-label-md text-label-md text-on-surface text-left hover:bg-surface-container-lowest transition-colors gap-4"
      >
        <span>{question}</span>
        <span className={`material-symbols-outlined text-on-surface-variant flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          keyboard_arrow_down
        </span>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="font-body-md text-body-md text-on-surface-variant px-5 pb-5 pt-2 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

const buyerPlans = [
  {
    name: 'Free', price: '£0', period: '/mo', desc: 'Essential tools for casual browsing.',
    featured: false,
    features: [
      { label: 'Basic property valuation', included: true },
      { label: 'Standard search filters', included: true },
      { label: '3 searches per month', included: true },
      { label: 'News signals', included: false },
      { label: 'Investment score', included: false },
    ],
    cta: 'Current Plan', ctaVariant: 'outline' as const,
  },
  {
    name: 'Buyer', price: '£19', period: '/mo', desc: 'Advanced insights for active buyers.',
    featured: false,
    features: [
      { label: 'Everything in Free', included: true },
      { label: 'Real-time news signals', included: true },
      { label: 'Proplity Investment Score', included: true },
      { label: '25 searches per month', included: true },
      { label: 'Predictive yield modeling', included: false },
    ],
    cta: 'Upgrade to Buyer', ctaVariant: 'primary' as const,
  },
  {
    name: 'Investor', price: '£49', period: '/mo', desc: 'Institutional grade tools for serious investors.',
    featured: true,
    features: [
      { label: 'Everything in Buyer', included: true },
      { label: 'Unlimited deep-dive reports', included: true },
      { label: 'Full comparable sales history', included: true },
      { label: 'Predictive yield modeling', included: true },
      { label: 'PDF report exports', included: true },
    ],
    cta: 'Upgrade to Investor', ctaVariant: 'primary' as const,
  },
];

const agencyPlans = [
  {
    name: 'Agency Starter', price: '£149', period: '/mo', desc: 'For small teams of up to 3 agents.',
    featured: false,
    features: [
      { label: 'Up to 3 user seats', included: true },
      { label: '100 reports/month', included: true },
      { label: 'Basic API Access', included: true },
      { label: 'White-label reports', included: false },
    ],
    cta: 'Start Free Trial', ctaVariant: 'outline' as const,
  },
  {
    name: 'Agency Pro', price: '£349', period: '/mo', desc: 'For growing brokerages and teams.',
    featured: true,
    features: [
      { label: 'Everything in Starter', included: true },
      { label: 'Up to 10 user seats', included: true },
      { label: 'Full API Access', included: true },
      { label: 'White-label reports', included: true },
      { label: 'Portfolio analytics dashboard', included: true },
    ],
    cta: 'Contact Sales', ctaVariant: 'primary' as const,
  },
  {
    name: 'Enterprise', price: '£749+', period: '/mo', desc: 'Custom solutions for large institutions.',
    featured: false,
    features: [
      { label: 'Unlimited seats', included: true },
      { label: 'Dedicated Account Manager', included: true },
      { label: 'Custom integration support', included: true },
      { label: 'SLA & compliance reports', included: true },
    ],
    cta: 'Contact Sales', ctaVariant: 'outline' as const,
  },
];

const comparisonRows = [
  { feature: 'AI Valuation Accuracy', free: 'Standard', buyer: 'Enhanced', investor: 'Maximum', investorHighlight: true },
  { feature: 'News Alerts', free: false, buyer: true, investor: true },
  { feature: 'Comparables History', free: 'Last 3 Years', buyer: 'Last 10 Years', investor: 'Full History', investorHighlight: true },
  { feature: 'Investment Score', free: false, buyer: true, investor: true },
  { feature: 'PDF Export', free: false, buyer: false, investor: true },
  { feature: 'Yield Modeling', free: false, buyer: false, investor: 'Predictive', investorHighlight: true },
];

function CellValue({ val, highlight }: { val: string | boolean | undefined; highlight?: boolean }) {
  if (val === true) return <span className="material-symbols-outlined text-primary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>;
  if (val === false || val === undefined) return <span className="material-symbols-outlined text-outline text-[18px]">remove</span>;
  return <span className={`text-sm font-medium ${highlight ? 'text-primary-container' : 'text-on-surface-variant'}`}>{val}</span>;
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'buyer' | 'agency'>('buyer');
  const plans = activeTab === 'buyer' ? buyerPlans : agencyPlans;

  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-10 md:gap-16 pw-page">

      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_offer</span>
          Simple, transparent pricing
        </div>
        <h1 className="font-headline-lg text-headline-lg md:text-[40px] text-on-surface leading-tight">
          Institutional Grade Analysis.<br />
          <span className="text-primary-container">Scaled for You.</span>
        </h1>
        <p className="font-body-md text-body-md md:text-lg text-on-surface-variant max-w-xl mx-auto">
          From individual buyers to agencies managing large portfolios — choose the plan that fits your strategy.
        </p>

        {/* Toggle */}
        <div className="inline-flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/20 mx-auto mt-4">
          <button
            className={`cursor-pointer px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${activeTab === 'buyer' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('buyer')}
          >
            Buyer Plans
          </button>
          <button
            className={`cursor-pointer px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all font-semibold ${activeTab === 'agency' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('agency')}
          >
            Agency Plans
          </button>
        </div>
      </section>

      {/* Plan Cards — horizontal scroll on mobile */}
      <section className="-mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-5 w-max md:w-full md:grid md:grid-cols-3 md:max-w-5xl md:mx-auto">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-7 min-w-[280px] md:min-w-0 border-2 ${
                plan.featured
                  ? 'border-primary-container bg-surface shadow-[0_8px_32px_rgba(15,110,86,0.12)]'
                  : 'border-outline-variant/30 bg-surface'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-container text-on-primary font-label-sm text-label-sm px-4 py-1.5 rounded-full uppercase tracking-wider font-bold whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className={`mb-6 ${plan.featured ? 'mt-2' : ''}`}>
                <h3 className={`font-headline-md text-headline-md mb-2 ${plan.featured ? 'text-primary-container' : 'text-on-surface'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface">{plan.price}</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">{plan.period}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">{plan.desc}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map(f => (
                  <li key={f.label} className={`flex items-start gap-3 ${!f.included ? 'opacity-40' : ''}`}>
                    <span
                      className={`material-symbols-outlined text-[20px] flex-shrink-0 ${f.included ? 'text-primary-container' : 'text-outline'}`}
                      style={f.included ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {f.included ? 'check_circle' : 'cancel'}
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">{f.label}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`cursor-pointer w-full py-3.5 rounded-xl font-label-md text-label-md font-semibold transition-all ${
                  plan.ctaVariant === 'primary'
                    ? 'bg-primary-container text-on-primary hover:opacity-90'
                    : 'border border-primary-container text-primary-container hover:bg-surface-container-low'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison — horizontal scroll on mobile */}
      {activeTab === 'buyer' && (
        <section className="max-w-5xl mx-auto w-full">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Feature Comparison</h2>
          {/* Edge-to-edge scroll on mobile */}
          <div className="-mx-margin-mobile md:mx-0 overflow-x-auto no-scrollbar">
            <div className="min-w-[540px] px-margin-mobile md:px-0 bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden md:rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/20">
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Feature</th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">Free</th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center bg-surface-container-high/30">Buyer</th>
                    <th className="p-4 font-label-sm text-label-sm text-primary-container uppercase tracking-wider text-center bg-primary-container/5">Investor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {comparisonRows.map(row => (
                    <tr key={row.feature} className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="p-4 font-label-sm text-label-sm text-on-surface font-medium">{row.feature}</td>
                      <td className="p-4 text-center"><CellValue val={row.free} /></td>
                      <td className="p-4 text-center bg-surface-container-high/10"><CellValue val={row.buyer} /></td>
                      <td className="p-4 text-center bg-primary-container/5"><CellValue val={row.investor} highlight={row.investorHighlight} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="max-w-3xl mx-auto w-full">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

    </div>
  );
}
