<<<<<<< HEAD
# JOMI-SHARE — AI Land Intelligence & Inheritance Partition Platform

> **"Understand Your Land. Verify the Records. Plan a Fairer Partition."**  
> *Developed for University LandTech Hackathon (Bangladesh)*

---

## 🌟 Executive Summary

**JOMI-SHARE** is an AI-assisted geospatial land intelligence and inheritance partition platform designed specifically for Bangladesh's complex land tenure reality. 

Land disputes account for over **70% of all civil litigation in Bangladesh**, often taking decades to resolve due to fragmented records, disputed khatian lineages (CS, SA, RS, City Survey), and unequal physical land characteristics (road access, water bodies, high vs. low land).

JOMI-SHARE solves this by unifying:
1. **Interactive Geospatial Parcel Mapping** with SVG and OpenStreetMap Leaflet layers.
2. **Multi-Record Chain-of-Title Reconciliation** (CS ➔ SA ➔ RS ➔ Mutation Khatian ➔ Deed analysis) with automatic discrepancy detection.
3. **Multi-Criteria Inheritance Partition Optimization Engine** generating balanced, legally defensible partition alternatives according to Muslim personal law entitlements.
4. **Explainable Conflict Heatmap & Risk Scoring** highlighting boundary overlapping, access bottlenecks, and chain-of-title gaps before disputes erupt.
5. **What-If Scenario Simulator** for amicable family mediation.
6. **Judicial & Settlement Ready Printable Reports** complete with statutory disclaimers.

---

## 🚀 Key Features & Modules

| Module | Route | Functionality |
|---|---|---|
| **Executive Overview** | `/` | High-level summary of the estate (4.50 Bigha / 150 Decimals), 6 heirs, 7 plots, verification health score (78%), and quick scenario triggers. |
| **Land Map Explorer** | `/map` | Interactive canvas/Leaflet plot viewer showing plot boundaries, land types, canal/road infrastructure, and detailed parcel inspector. |
| **Land DNA Profiler** | `/dna` | Comprehensive multi-factor parcel profiling: road accessibility, elevation/soil, natural resources, market valuation, and mutation history. |
| **Chain-of-Title Verification** | `/verification` | Automated verification matrix checking CS, SA, RS Khatians & Deeds. Identifies 3 realistic recorded discrepancies with severity flags. |
| **Inheritance Manager** | `/inheritance` | Faraidh entitlement breakdown (Wife: 12.5%, Son 1: 29.17%, Son 2: 29.17%, Daughter 1: 14.58%, Daughter 2: 14.58%). Full editability and validation to 100%. |
| **Partition Optimizer** | `/partition` | Generates 3 distinct partition plans: **Plan A (Area-Focused)**, **Plan B (Value-Balanced)**, and **Plan C (Access-Prioritized)**. Visualized via interactive SVG parcel distribution, heir radar charts, and comparative metric tables. |
| **Conflict Risk Heatmap** | `/heatmap` | Plot-by-plot risk assessment (Road Access Risk, Valuation Disparity, Document Confidence) with actionable mitigation recommendations. |
| **What-If Simulator** | `/simulator` | Dynamic real-time sandbox allowing stakeholders to adjust entitlement weights, test shared vs. partitioned pond/nal land, and adjust fairness tolerances. |
| **Audit & Settlement Report** | `/reports` | 8-section comprehensive dispute-resolution report with one-click print/PDF layout and full legal disclaimers. |
| **About & Statutory Disclaimers** | `/about` | Architectural documentation, Hackathon context, AI safety disclosures, and statutory limitations. |

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Custom Design Tokens (Emerald/Slate Glassmorphism)
- **Icons**: Lucide React
- **Geospatial & Canvas**: Leaflet, React-Leaflet, Native Vector SVG Canvas
- **Data Visualization**: Recharts (Radar, Bar, Composed charts)
- **Routing**: React Router v6
- **Build Tool**: Vite

---

## ⚡ Quick Start & Installation

The application includes realistic synthetic demo data based on **Mauza: Boro Beraid, J.L. No. 28, Upazila: Rupganj, District: Narayanganj**, allowing immediate evaluation without external databases or file uploads.

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd jomi-share
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## ⚖️ Hackathon Legal & Statutory Disclaimer

> **IMPORTANT**: JOMI-SHARE is an academic decision-support and mediation platform developed for a university LandTech hackathon. All partition plans, valuation estimates, and risk scores are **advisory exploratory proposals**. They do **not** constitute formal legal survey documents (*Batwara Deed*), land registry mutations (*Namzari*), or certified judicial decrees under the Partition Act of 1893 or Bangladesh Muslim Personal Law (Shariat) Application Act. All partitions require on-ground physical cadastre survey (*Ameen* certification) and formal registration with the Sub-Registry Office.
=======
# jomi-share-landtech
>>>>>>> 50f9ac3d56695027785519d4b0ac258427c60a5a
