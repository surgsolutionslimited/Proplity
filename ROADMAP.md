# 🏠 Proplity — Development Roadmap

## Current State (What's Live)

| Area | Status |
|---|---|
| Landing / Homepage | ✅ Done |
| Auth (Sign In, Reset Password) | ✅ Done |
| Onboarding flow (Goals → Preferences → Complete) | ✅ Done |
| User Dashboard | ✅ Done |
| Property Insights (Land Registry + EPC data) | ✅ Done |
| Comparable Sales page | ✅ Done |
| Valuation Report page | ✅ Done |
| Agency Dashboard | ✅ Done |
| Pricing page | ✅ Done |
| User Profile page | ✅ Done |
| Dark/Light Theme | ✅ Done |
| Saved Places (bookmark postcodes) | ✅ Done |
| Map component (Leaflet) | ✅ Done |
| API routes (EPC, Land Registry, Postcodes) | ✅ Done |
| Firebase Auth + Firestore + Storage | ✅ Done |
| Vercel deployment | ✅ Live |

---

## Phase 3 — Data Depth & Monetisation Engine
> **Goal**: Turn the app from a prototype into a product people pay for.

### 3.1 — Subscription & Paywall System (🔴 High Priority)
The pricing page exists but nothing is gated. This is the most critical next step.

- [ ] Integrate **Stripe** (or Paddle) for payments
- [ ] Create subscription tiers in Firestore (`users/{uid}/subscription`)
- [ ] Gate features behind plan checks (search limits, PDF export, yield modelling)
- [ ] Build a `useSubscription()` hook that reads plan from Firestore
- [ ] Add webhook handler (`/api/stripe/webhook`) to sync plan changes
- [ ] Add billing portal link in Profile page

### 3.2 — Search Usage Tracking (🔴 High Priority)
The dashboard shows "0 / 3 searches" but it's hardcoded.

- [ ] Track searches in Firestore (`users/{uid}/usage`)
- [ ] Increment on each `/api/property-data` call (server-side)
- [ ] Enforce free-tier limit (3/month) — return 402 when exceeded
- [ ] Show live usage counter on dashboard
- [ ] Reset usage monthly (Cloud Function or cron)

### 3.3 — Investment Score Engine (🟡 Medium Priority)
Currently the score is a rough formula. Build a real scoring model.

- [ ] Define scoring rubric: price trend, yield estimate, EPC rating, sales volume, area growth
- [ ] Move score calculation to a dedicated API route `/api/investment-score`
- [ ] Add sub-scores with breakdowns visible to Pro/Investor users
- [ ] Add score history over time per saved postcode

### 3.4 — Yield Modelling (🟡 Medium Priority — Pro Feature)
- [ ] Add rental yield estimate based on property type + area
- [ ] Integrate Zoopla/Rightmove rental data API (or scrape averages)
- [ ] Show gross yield %, net yield estimate, and mortgage scenario calculator
- [ ] Gate behind Investor plan

### 3.5 — PDF Export (🟡 Medium Priority — Pro Feature)
- [ ] Generate a branded PDF report for a postcode
- [ ] Include: key metrics, price chart, EPC, comparables, score
- [ ] Use `@react-pdf/renderer` or server-side Puppeteer
- [ ] Gate behind Buyer/Investor plan

---

## Phase 4 — AI Signals & Intelligence Layer
> **Goal**: Make Proplity the "smart" choice by surfacing signals no one else shows.

### 4.1 — Real-time News Signals (Mentioned in app as "Coming Phase 3")
- [ ] Integrate a news API (NewsAPI, GNews, or Bing News)
- [ ] Filter news by postcode district/area keywords
- [ ] Categorise: planning permission, regeneration, crime, infrastructure
- [ ] Show on Property Insights as "Area News Feed"
- [ ] Gate behind Pro tier

### 4.2 — Planning Permission Alerts
- [ ] Connect to Planning Portal API or council open data
- [ ] Alert when new planning applications filed near a postcode
- [ ] "Watch" a postcode and get email notifications (Firebase Functions)

### 4.3 — AI-Generated Property Verdict
- [ ] Use Gemini API to generate a 2-paragraph buy/hold/avoid summary
- [ ] Feed it: price trend, EPC, sales volume, yield, news signals
- [ ] Show as "AI Verdict" card on Property Insights
- [ ] Gate behind Investor plan

---

## Phase 5 — User Experience & Retention
> **Goal**: Make users come back, share, and invite others.

### 5.1 — Watchlist & Alerts
- [ ] Let users "watch" postcodes and get weekly email digests
- [ ] Alert when median price in watched area changes >5%
- [ ] Firebase Cloud Functions + email (SendGrid / Resend)

### 5.2 — Saved Places Enhancement
- [ ] Currently saves postcodes — add notes, tags, target price
- [ ] Portfolio view: track multiple properties/postcodes on one screen
- [ ] Compare two postcodes side by side

### 5.3 — Onboarding Optimisation
- [ ] A/B test onboarding flow length
- [ ] Personalise dashboard based on onboarding answers (first-time buyer vs investor)
- [ ] Skip onboarding for returning users

### 5.4 — Mobile App (React Native / Expo)
- [ ] Wrap the core flows in a React Native app
- [ ] Push notifications for price alerts
- [ ] Barcode/camera scan of for-sale boards (future)

---

## Phase 6 — Agency & B2B Product
> **Goal**: Sell to estate agents and property professionals as a SaaS tool.

- [ ] Agency Dashboard — multi-property portfolio view (started)
- [ ] White-label reports for agents
- [ ] Bulk postcode upload + analysis
- [ ] CRM integration (export to HubSpot / Salesforce)
- [ ] Team accounts with seat-based billing

---

## 🎯 Recommended Immediate Next Steps

> Start here — highest impact for a live product:

1. **Wire up Stripe** — without payments you have no revenue model
2. **Enforce search limits** — the free tier limit is hardcoded, make it real
3. **PDF export** — high-value feature users will pay for
4. **News signals** — differentiates Proplity from Zoopla/Rightmove
5. **AI Verdict** — the "wow" feature that gets people talking
