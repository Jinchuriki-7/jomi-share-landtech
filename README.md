# JOMI-SHARE & NIRBASH (নিবাস) — AI Land Intelligence & Property Marketplace

> **"Understand Your Land. Verify the Records. Trade With Confidence."**  
> *Developed with passion by Dider & Noman for the University LandTech Hackathon (Bangladesh)*

---

## 🌟 Executive Overview

**JOMI-SHARE & NIRBASH** is an end-to-end land intelligence, inheritance partition, and 100% commission-free property marketplace designed specifically for the land administration and real estate realities of Bangladesh.

In Bangladesh, over **70% of all civil court litigations** stem from land disputes, fragmented inheritance shares (*faraez*), forged deeds (*baya dalil*), and mismatching survey records (**CS, SA, RS, and City/BS**). Furthermore, ordinary citizens lose millions to middlemen and fraudulent real estate advertisements.

Our solution unifies two powerful ecosystems into a single platform:
1. **JOMI-SHARE (Core AI Engine)**: Automated 4-era survey record reconciliation, satellite mouza georeferencing, Islamic/Hindu inheritance calculation, and equal geometric parcel partitioning.
2. **NIRBASH (নিবাস - Marketplace)**: A modern, commission-free marketplace where authentic land owners, verified developers, and licensed agents connect directly with buyers, backed by AI Land DNA™ verification badges.

---

## 🚀 Key Modules & Page Architecture

### 1. JOMI-SHARE (AI Land Intelligence & Partition Engine)
Accessible via the root layout (`/`):

| Route | Page / Feature | Key Functionality |
|---|---|---|
| `/` | **Overview Dashboard** | Estate summary (4.50 Bigha / 150 Decimals), heirs, 7 plots, verification health score (78%), and quick action triggers. |
| `/map` | **Interactive Mouza & GIS Map** | Satellite canvas plot viewer with Mouza boundaries, canal/road infrastructure, and parcel inspector. |
| `/land-dna` | **Land DNA™ Profiler** | Multi-factor parcel profiling: road access, soil elevation, natural resources, market valuation, and mutation history. |
| `/verification` | **Chain-of-Title Audit** | Automated discrepancy matrix matching CS, SA, RS, and BS khatians with severity risk flags. |
| `/inheritance` | **Inheritance & Faraez Manager** | Muslim and Hindu inheritance division engine with mathematical share validation to 100%. |
| `/partition` | **Partition Optimizer** | Generates 3 distinct partition plans (**Area-Focused**, **Value-Balanced**, and **Access-Prioritized**) with SVG parcel maps and heir radar charts. |
| `/heatmap` | **Conflict & Valuation Heatmap** | Plot-by-plot risk assessment (road bottlenecks, valuation disparity, document confidence). |
| `/simulator` | **What-If Sandbox Simulator** | Real-time negotiation sandbox allowing heirs to test shared vs. partitioned ponds, roads, and land plots. |
| `/reports` | **Audit & Settlement Reports** | Printable 8-section dispute resolution reports with judicial-grade disclaimers. |
| `/about` | **About Platform & Limitations** | Architectural documentation, Hackathon context, and AI safety limitations. |

---

### 2. NIRBASH (নিবাস - Property Marketplace)
Accessible via `/nirbash` with dedicated mobile/desktop navigation, header, and architectural slide-out drawer:

| Route | Page / Feature | Key Functionality |
|---|---|---|
| `/nirbash` | **NIRBASH Home** | Hero multi-filter search, featured listings, Land DNA verified properties, categories, and video guides. |
| `/nirbash/properties` | **Property Marketplace** | Filterable property grid (Districts, Price range, Land Plots, Apartments, Commercial) with list/map toggle. |
| `/nirbash/properties/:id` | **Property Detail View** | High-res image gallery, deed breakdown, Land DNA score, location map, and direct owner/agent contact. |
| `/nirbash/agents` | **All Agents Directory** | Verified land brokers, digital surveyors, and legal advisors directory. |
| `/nirbash/services` | **Services Hub** | Book Digital Amin surveys, Total Station/RTK-GPS demarcation, deed drafting, drone surveys, and sub-registry support. |
| `/nirbash/companies` | **Companies & Developers** | Catalog of registered housing companies and REHAB member developers. |
| `/nirbash/companies/:id` | **Company Profile** | Detailed developer portfolio, ongoing projects, and contact information. |
| `/nirbash/compare` | **Side-by-Side Comparison** | Compare up to 4 properties simultaneously on price, land size, road width, and legal status. |
| `/nirbash/saved` | **Saved / Wishlist** | User's shortlisted favorite properties with instant WhatsApp and phone actions. |
| `/nirbash/company-dashboard`| **Post Free Ad / Seller Portal** | Interactive ad creation, image upload, dag/khatian input, and listing management. |
| `/nirbash/register-company` | **Agent / Developer Onboarding** | Corporate verification form for real estate companies and independent agents. |
| `/nirbash/blog` | **Blog & Legal Guides** | Real estate knowledge hub with 4 in-depth guides (CS/SA/RS khatian verification, Bayna deed rules, RAJUK approvals, inheritance partition), categories, search, and reading modal. |
| `/nirbash/about` | **About NIRBASH** | Platform vision, 4 core technology pillars, marketplace statistics, and team credits. |
| `/nirbash/contact` | **Contact & Support Desk** | Direct hotline (`+880 1700-000000`), WhatsApp chat, interactive message submission form, and FAQ accordion. |

---

### 3. Dedicated Legal & Compliance Documentation
Clean, dedicated standalone pages styled with plain-words summaries, bold headers, and structured clauses:

* **Disclaimer** (`/nirbash/disclaimer`): Platform liability limitations, 100% commission-free disclosure, buyer self-verification checklist, and deed fraud reporting.
* **Privacy Policy** (`/nirbash/privacy`): 256-bit SSL encryption, phone number masking options, deed upload protection, and zero third-party data selling policy.
* **Terms of Service** (`/nirbash/terms`): User eligibility (18+), prohibition of khas/railway land listings, account ban policies, and jurisdiction under Bangladesh laws.
* **Listing Guidelines** (`/nirbash/listing-guidelines`): Requirement for authentic daylight photos, mandatory CS/SA/RS/BS dag-khatian entry, RAJUK approval compliance, and honest pricing standards.

---

## 🌐 Full Bilingual Localization (বাংলা ⇄ English)

The entire application features instant, reactive dual-language support:
* **বাংলা Mode**: All menus, forms, property badges, legal pages, blog articles, and drawer items are translated into natural, culturally resonant Bengali.
* **English Mode**: Complete internationalized interface with clean professional terminology.
* **Dual Toggle**: Language switchers available both on the sticky top header and inside the mobile slide-out drawer.

---

## 🛠️ Technology Stack

* **Frontend**: React 18 with TypeScript
* **Styling**: Tailwind CSS + Custom Emerald/Slate Design Tokens & Glassmorphism
* **Icons**: Lucide React
* **Geospatial & Canvas**: Leaflet, React-Leaflet, Native Vector SVG Canvas
* **Data Visualization**: Recharts (Radar, Bar, Composed charts)
* **Routing**: React Router v6
* **State & Localization**: React Context API (`LanguageContext`, `NirbashContext`, `AppContext`) with LocalStorage persistence
* **Build System**: Vite

---

## ⚡ Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd jomi-share
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser:
* Explore **JOMI-SHARE Core AI Tools**: [http://localhost:5173/](http://localhost:5173/)
* Explore **NIRBASH Property Marketplace**: [http://localhost:5173/nirbash](http://localhost:5173/nirbash)
* Explore **Disclaimer Page**: [http://localhost:5173/nirbash/disclaimer](http://localhost:5173/nirbash/disclaimer)

### 3. Validate Type Safety
```bash
node --max-old-space-size=4096 ./node_modules/typescript/bin/tsc --noEmit
```

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 👥 Hackathon Team & Project Credits

* **Project**: JOMI-SHARE & NIRBASH
* **Event**: University LandTech Hackathon 2026 (Bangladesh)
* **Developed by**: **Dider** & **Noman**
* **Mission**: Digitalizing Bangladesh land administration, resolving inheritance conflicts amicably, and creating a commission-free, secure real estate marketplace for every citizen.

---

## ⚖️ Statutory Disclaimer

> **NOTICE**: JOMI-SHARE & NIRBASH are academic decision-support, mediation, and marketplace platforms. Partition proposals, Land DNA risk scores, and valuation estimates are exploratory advisory aids. They do not substitute formal registration with the Sub-Registry Office, certified mutations (*Namzari*) by the Assistant Commissioner (Land), or judicial decrees under the Partition Act of 1893.
