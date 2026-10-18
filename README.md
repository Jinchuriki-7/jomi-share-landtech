# JOMI-SHARE & NIRBASH — AI Land Intelligence & Property Ecosystem

> **"Understand Your Land. Verify the Records. Partition & Trade With Confidence."**

---

### 🏆 LandTech Innovation Hackathon 2026 (LandTech 2026)
* **Theme:** Land Tech Software for Smart E-Governance in Bangladesh
* **Track:** **Digital Land Records, Verification & Digitization**
* **Organized By:** Department of CSE & CSE-TECH, Daffodil International University (DIU)

---

## 📌 Project Links

* 🌐 **Live Web Application:** [https://jomi-share-portal.web.app](https://jomi-share-portal.web.app)
* 📦 **GitHub Repository:** [https://github.com/Jinchuriki-7/jomi-share-landtech](https://github.com/Jinchuriki-7/jomi-share-landtech)

---

## 👥 Team Information — InnoSphere

* **Team Name:** InnoSphere
* **Farhanul Haque:** Lead Full-Stack & GIS Architect
* **Md Rahat Mahmud:** Co-Lead, Systems & Research
* **Tanzina Afroz Rimi:** Mentor

---

## 🌟 Project Overview & Architecture

**NIRBASH & JOMI-SHARE** is an integrated dual-platform solution addressing Bangladesh's land management challenges, inheritance disputes, and opaque property transactions:

1. **NIRBASH (নিবাস — Citizen Portal `/`):**  
   A broker-free property marketplace for citizens and buyers, featuring verified listings with the **Land DNA™** index, instant surveyor/digital amin booking, and direct property consultation.

2. **JOMI-SHARE (AI Engine Suite `/jomi-share`):**  
   The core algorithmic intelligence engine that cross-audits 4 generations of land records (**CS ➔ SA ➔ RS ➔ BS**), calculates statutory Shariah inheritance shares (Faraiez), and generates 3 automated partition layout models with GIS vector maps.

---

## 🚀 Running & Setup Instructions

Follow the steps below to set up, run, and build the project locally:

### 1. Prerequisites
Ensure the following tools are installed on your machine:
* **Node.js**: `v18.0.0` or higher (recommended: `v20.x` or later)
* **npm**: `v9.0.0` or higher
* **Git**: Installed and accessible in your shell

### 2. Clone the Repository & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/Jinchuriki-7/jomi-share-landtech.git

# Navigate into the project folder
cd jomi-share-landtech

# Install all npm dependencies
npm install
```

### 3. Start the Local Development Server
```bash
npm run dev
```
Once the dev server starts, open your browser and navigate to:
* **Main Application:** `http://localhost:5173`
* **Direct AI Partition & Audit Suite:** `http://localhost:5173/jomi-share`

### 4. Type Safety & Production Build
To check TypeScript compilation and create an optimized production build:
```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview the production build locally
npm run preview
```

### 5. Deployment (Firebase Hosting)
The application is pre-configured with `firebase.json` and `.firebaserc` for single-page application (SPA) routing:
```bash
# Deploy dist directory to Firebase Hosting
firebase deploy --only hosting
```

---

## 📊 Data Sources

The platform's records audit engine, geospatial algorithms, and legal inheritance rules are built upon authentic Bangladeshi government, historical, and statutory data sources:

1. **Land Records & Survey Data:**
   * **Ministry of Land, Bangladesh:** Record structures aligned with *e-Khatian* and *e-Mutation* schemas.
   * **Four-Era Cadastral Survey Records:** Historical data hierarchy spanning **CS** (*Cadastral Survey 1888–1940*), **SA** (*State Acquisition 1956–1963*), **RS** (*Revisional Survey*), and **BS / City Survey**.
   * **Directorate of Land Records and Surveys (DLRS):** Mouza map sheets, boundary conventions, and plot (Daag) geometric configurations.

2. **Geospatial & Vector GIS Data:**
   * **OpenStreetMap (OSM) & Leaflet Engine:** High-resolution tile base maps, coordinate projections, and road network geometries.
   * **Turf.js & GeoJSON Spatial Datasets:** Custom vector polygon boundary calculations, road frontage spatial analysis, and waterway buffering.

3. **Inheritance & Legal Frameworks:**
   * **Muslim Family Laws Ordinance, 1961:** Quranic fixed sharers (*Zawil-Furood*), residuaries (*Asaba*), and proportional adjustments (*Aul* and *Radd*).
   * **Dayabhaga Hindu Law of Succession:** Statutory shares and inheritance structures for Hindu family partitions.
   * **The Partition Act, 1893:** Statutory rules for amicable property division and joint-property demarcations.

4. **Property Valuation & Market Standards:**
   * **Sub-Registry Government Mouza Values:** Minimum government mouza deed values used for registration tariff benchmarks.
   * **Real Estate & Housing Association of Bangladesh (REHAB):** Commercial and residential zone market price indices and road frontage premiums.

---

## 🤖 AI Tool Usage Declaration

In compliance with hackathon regulations and ethical guidelines, we declare the use of AI tools in this project as follows:

### 1. Development & Code Acceleration
* **AI Tools Utilized:** **Google DeepMind Antigravity IDE & Google Gemini Models**
* **Scope of Usage:**
  * Architecture scaffolding for React 18 and TypeScript interfaces.
  * Tailwind CSS design tokens and responsive glassmorphism UI adjustments.
  * Assisting in writing edge-case test logic for Turf.js spatial geometry and complex Faraiez share fraction calculations.
  * Technical documentation formatting and grammar refinement.

### 2. Proprietary Algorithmic & AI Engines Built into the Platform
The platform includes original algorithms and AI decision-support engines engineered by our team:
* **Land DNA™ Multi-Factor Scoring Engine:** Evaluates road width, terrain elevation, zoning risk, and chain of custody to compute a comprehensive risk score (0–100).
* **4-Era Discrepancy Matrix:** An automated heuristic audit engine tracing plot boundaries and ownership chains across CS ➔ SA ➔ RS ➔ BS to flag area drops, unauthorized splits, and missing mutations.
* **3-Model Partition Optimizer:** Generates 3 dispute-resolving partition proposals:
  * *Area-Focused Partition* (equal surface area allocation)
  * *Value-Balanced Partition* (valuation-adjusted allocations with financial compensations)
  * *Access-Prioritized Partition* (road access maximization for each heir)
* **Interactive What-If Simulation Sandbox:** Real-time recalculation of valuations and accessibility when shared utilities (access roads, water reservoirs) are partitioned vs. held jointly.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18, TypeScript, Tailwind CSS |
| **Build & Tooling** | Vite 8.3 (Next-Generation Frontend Tooling) |
| **Icons & UI Components** | Lucide React, Radix UI Primitives, Custom Emerald/Slate Theme |
| **Geospatial & Vector GIS** | Leaflet, React-Leaflet, Turf.js, Native SVG Vector Engine |
| **Data Visualization** | Recharts (Radar, Bar, and Composed Charts) |
| **Document Generation** | jsPDF, HTML2Canvas |
| **Hosting & Cloud** | Google Firebase Hosting (Global Edge CDN, Automatic SSL, SPA Rewriting) |
| **Localization** | Dual-language interface (Bengali ⇄ English toggle) |

---

## ⚖️ Statutory Disclaimer

> **Disclaimer:** JOMI-SHARE & NIRBASH is an educational, decision-support, and dispute-resolution platform. Partition proposals, Land DNA™ metrics, and record audit analyses generated by this software serve as technical decision aids for mediation and amicable settlement. They do not replace formal mutations (*Namjari*) conducted by the Assistant Commissioner (Land) or registered partition deeds (*Bonton-nama*) executed through the Sub-Registry Office.
