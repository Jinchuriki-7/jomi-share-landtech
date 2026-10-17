// ============================================================
// SYNTHETIC DEMO DATA — NOT REAL GOVERNMENT RECORDS
// All people, plots, documents, and values are fictional.
// Sonargaon Family Land Partition — Demo Case 001
// ============================================================

export interface LatLng { lat: number; lng: number; }

export interface PlotGeometry {
  type: 'Polygon';
  coordinates: [number, number][][]; // [lng, lat] pairs (GeoJSON)
}

export interface Plot {
  id: string;
  dagNumber: string;
  mouzaName: string;
  mouzaCode: string;
  area: number;          // in decimals
  areaAcres: number;
  geometry: PlotGeometry;
  center: LatLng;
  classification: 'agricultural' | 'homestead' | 'pond' | 'road' | 'orchard';
  relativeValue: number;  // synthetic BDT per decimal estimate
  totalValue: number;     // area × relativeValue
  roadAccess: 'direct' | 'indirect' | 'none';
  accessVia?: string;
  soilType: string;
  currentUse: string;
  recordStatus: 'verified' | 'mismatch' | 'incomplete';
  documents: DocumentRef[];
  discrepancies: Discrepancy[];
  completeness: number; // 0–100
  color: string;
}

export interface SharedResource {
  id: string;
  type: 'pond' | 'access_corridor' | 'road';
  name: string;
  area?: number; // decimals
  geometry: PlotGeometry;
  center: LatLng;
  adjacentPlots: string[];
  description: string;
}

export interface Road {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'kuccha';
  coordinates: [number, number][];
}

export interface DocumentRef {
  id: string;
  type: 'CS Khatian' | 'SA Khatian' | 'RS Khatian' | 'Mutation' | 'DCR' | 'Deed' | 'Survey Map';
  number: string;
  year: number;
  owner: string;
  area: number;
  status: 'consistent' | 'mismatch' | 'missing';
  notes: string;
}

export interface Discrepancy {
  id: string;
  field: string;
  docValue: string | number;
  recordValue: string | number;
  severity: 'high' | 'medium' | 'low';
  explanation: string;
}

export interface Heir {
  id: string;
  name: string;
  relation: string;
  entitlement: number; // percentage 0-100
  color: string;
  avatar: string;
}

export interface LandCase {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  plots: Plot[];
  heirs: Heir[];
  sharedResources: SharedResource[];
  roads: Road[];
  totalArea: number;
  totalValue: number;
}

export interface TimelineEvent {
  id: string;
  plotId: string;
  date: string;
  type: 'record_entry' | 'document_added' | 'record_updated' | 'mutation' | 'discrepancy';
  title: string;
  description: string;
  actor: string;
}

export interface PartitionPlan {
  id: string;
  name: string;
  type: 'area_focused' | 'value_balanced' | 'access_focused';
  description: string;
  allocations: PlotAllocation[];
  scores: PlanScores;
  advantages: string[];
  disadvantages: string[];
  constraints: ConstraintStatus[];
  isValid: boolean;
  accessWarnings: string[];
}

export interface PlotAllocation {
  heirId: string;
  plotId: string;
  partitionType: 'full' | 'north_half' | 'south_half' | 'east_half' | 'west_half';
  allocatedArea: number;
  allocatedValue: number;
  hasDirectAccess: boolean;
  subPlotId: string;
}

export interface PlanScores {
  areaFairness: number;      // 0-100
  valueFairness: number;     // 0-100
  accessScore: number;       // 0-100
  shapeQuality: number;      // 0-100
  overall: number;           // weighted
}

export interface ConstraintStatus {
  id: string;
  name: string;
  satisfied: boolean;
  message: string;
}

export interface HeirSummary {
  heirId: string;
  heirName: string;
  entitlement: number;
  allocatedArea: number;
  allocatedValue: number;
  entitlementArea: number;
  entitlementValue: number;
  areaDeviation: number;
  valueDeviation: number;
  accessStatus: 'direct' | 'indirect' | 'none';
}

// ============================================================
// CENTER COORDINATES — DEMO AREA (fictionalized, near Sonargaon)
// These are approximate coordinates used for map visualization only.
// They do NOT represent verified cadastral boundaries.
// ============================================================
const BASE_LAT = 23.6550;
const BASE_LNG = 90.5860;

// Plot geometries in GeoJSON [lng, lat] format
// All coordinates are FICTIONAL DEMO DATA
const plotGeometries: Record<string, PlotGeometry> = {
  'plot-001': {
    type: 'Polygon',
    coordinates: [[
      [BASE_LNG + 0.0000, BASE_LAT + 0.0000],
      [BASE_LNG + 0.0040, BASE_LAT + 0.0000],
      [BASE_LNG + 0.0040, BASE_LAT + 0.0030],
      [BASE_LNG + 0.0010, BASE_LAT + 0.0035],
      [BASE_LNG + 0.0000, BASE_LAT + 0.0025],
      [BASE_LNG + 0.0000, BASE_LAT + 0.0000],
    ]],
  },
  'plot-002': {
    type: 'Polygon',
    coordinates: [[
      [BASE_LNG + 0.0045, BASE_LAT + 0.0000],
      [BASE_LNG + 0.0085, BASE_LAT - 0.0005],
      [BASE_LNG + 0.0090, BASE_LAT + 0.0025],
      [BASE_LNG + 0.0045, BASE_LAT + 0.0030],
      [BASE_LNG + 0.0045, BASE_LAT + 0.0000],
    ]],
  },
  'plot-003': {
    type: 'Polygon',
    coordinates: [[
      [BASE_LNG + 0.0000, BASE_LAT + 0.0038],
      [BASE_LNG + 0.0090, BASE_LAT + 0.0033],
      [BASE_LNG + 0.0090, BASE_LAT + 0.0060],
      [BASE_LNG + 0.0045, BASE_LAT + 0.0065],
      [BASE_LNG + 0.0000, BASE_LAT + 0.0058],
      [BASE_LNG + 0.0000, BASE_LAT + 0.0038],
    ]],
  },
  'pond-001': {
    type: 'Polygon',
    coordinates: [[
      [BASE_LNG + 0.0020, BASE_LAT + 0.0040],
      [BASE_LNG + 0.0040, BASE_LAT + 0.0038],
      [BASE_LNG + 0.0043, BASE_LAT + 0.0052],
      [BASE_LNG + 0.0022, BASE_LAT + 0.0055],
      [BASE_LNG + 0.0020, BASE_LAT + 0.0040],
    ]],
  },
};

const roadGeometry: [number, number][] = [
  [BASE_LNG - 0.002, BASE_LAT - 0.001],
  [BASE_LNG + 0.0000, BASE_LAT - 0.0000],
  [BASE_LNG + 0.0090, BASE_LAT - 0.0005],
  [BASE_LNG + 0.0110, BASE_LAT + 0.0005],
];

const DEMO_PLOTS: Plot[] = [
  {
    id: 'plot-001',
    dagNumber: 'DAG-1247',
    mouzaName: 'Mouzapur Demo Mouza',
    mouzaCode: 'DM-001',
    area: 42.5,
    areaAcres: 0.425,
    geometry: plotGeometries['plot-001'],
    center: { lat: BASE_LAT + 0.0015, lng: BASE_LNG + 0.0020 },
    classification: 'agricultural',
    relativeValue: 85000,
    totalValue: 3612500,
    roadAccess: 'direct',
    soilType: 'Alluvial (Loamy)',
    currentUse: 'Paddy / Aman cultivation',
    recordStatus: 'mismatch',
    completeness: 72,
    color: '#16a34a',
    documents: [
      {
        id: 'doc-001a',
        type: 'CS Khatian',
        number: 'CS-1247/84',
        year: 1984,
        owner: 'Rahimuddin Miah (Grandfather — SYNTHETIC)',
        area: 42.5,
        status: 'consistent',
        notes: 'Original cadastral survey record — SYNTHETIC DEMO',
      },
      {
        id: 'doc-001b',
        type: 'SA Khatian',
        number: 'SA-2201/95',
        year: 1995,
        owner: 'Rahimuddin Miah (Grandfather — SYNTHETIC)',
        area: 40.0,
        status: 'mismatch',
        notes: 'Area discrepancy: 42.5 vs 40.0 decimals — SYNTHETIC DEMO',
      },
      {
        id: 'doc-001c',
        type: 'Mutation',
        number: 'MUT-3391/2010',
        year: 2010,
        owner: 'Estate of Rahimuddin Miah — SYNTHETIC',
        area: 42.5,
        status: 'consistent',
        notes: 'Post-death mutation — SYNTHETIC DEMO',
      },
    ],
    discrepancies: [
      {
        id: 'disc-001a',
        field: 'Area (Decimals)',
        docValue: 40.0,
        recordValue: 42.5,
        severity: 'high',
        explanation: 'SA Khatian (1995) records 40.0 decimals, while CS record and mutation show 42.5 decimals. The 2.5-decimal difference (≈ 5.9%) may indicate a survey measurement error or clerical mistake. Physical resurvey recommended. [SYNTHETIC DEMO]',
      },
    ],
  },
  {
    id: 'plot-002',
    dagNumber: 'DAG-1248',
    mouzaName: 'Mouzapur Demo Mouza',
    mouzaCode: 'DM-001',
    area: 35.0,
    areaAcres: 0.350,
    geometry: plotGeometries['plot-002'],
    center: { lat: BASE_LAT + 0.0012, lng: BASE_LNG + 0.0067 },
    classification: 'homestead',
    relativeValue: 120000,
    totalValue: 4200000,
    roadAccess: 'direct',
    soilType: 'Raised ground (homestead)',
    currentUse: 'Family homestead, garden',
    recordStatus: 'mismatch',
    completeness: 85,
    color: '#2563eb',
    documents: [
      {
        id: 'doc-002a',
        type: 'CS Khatian',
        number: 'CS-1248/84',
        year: 1984,
        owner: 'Rahimuddin Miah (Grandfather — SYNTHETIC)',
        area: 35.0,
        status: 'consistent',
        notes: 'Original cadastral record — SYNTHETIC DEMO',
      },
      {
        id: 'doc-002b',
        type: 'Deed',
        number: 'DEED-7745/2001',
        year: 2001,
        owner: 'Rahimuddin Miah — SYNTHETIC',
        area: 35.0,
        status: 'consistent',
        notes: 'Registered deed — SYNTHETIC DEMO',
      },
      {
        id: 'doc-002c',
        type: 'RS Khatian',
        number: 'RS-889/2018',
        year: 2018,
        owner: 'Fatema Begum (Grandmother — SYNTHETIC)',
        area: 35.0,
        status: 'mismatch',
        notes: 'Owner name changed in RS without documented mutation — SYNTHETIC DEMO',
      },
    ],
    discrepancies: [
      {
        id: 'disc-002a',
        field: 'Owner Name',
        docValue: 'Fatema Begum (Grandmother — SYNTHETIC)',
        recordValue: 'Rahimuddin Miah (Grandfather — SYNTHETIC)',
        severity: 'medium',
        explanation: 'RS Khatian (2018) lists a different owner than CS Khatian and the registered deed. No documented mutation was found linking the name change. A formal mutation record is required to explain this discrepancy. [SYNTHETIC DEMO]',
      },
    ],
  },
  {
    id: 'plot-003',
    dagNumber: 'DAG-1249',
    mouzaName: 'Mouzapur Demo Mouza',
    mouzaCode: 'DM-001',
    area: 28.0,
    areaAcres: 0.280,
    geometry: plotGeometries['plot-003'],
    center: { lat: BASE_LAT + 0.0049, lng: BASE_LNG + 0.0045 },
    classification: 'orchard',
    relativeValue: 70000,
    totalValue: 1960000,
    roadAccess: 'indirect',
    accessVia: 'plot-001 or plot-002 south boundary',
    soilType: 'Alluvial (Sandy loam)',
    currentUse: 'Mixed fruit orchard (mango, jackfruit)',
    recordStatus: 'incomplete',
    completeness: 55,
    color: '#d97706',
    documents: [
      {
        id: 'doc-003a',
        type: 'CS Khatian',
        number: 'CS-1249/84',
        year: 1984,
        owner: 'Rahimuddin Miah (Grandfather — SYNTHETIC)',
        area: 28.0,
        status: 'consistent',
        notes: 'Original cadastral record — SYNTHETIC DEMO',
      },
      {
        id: 'doc-003b',
        type: 'Mutation',
        number: 'MUT-PENDING/2021',
        year: 2021,
        owner: 'Heirs of Rahimuddin Miah — SYNTHETIC',
        area: 28.0,
        status: 'missing',
        notes: 'Mutation application filed but not completed — SYNTHETIC DEMO',
      },
    ],
    discrepancies: [
      {
        id: 'disc-003a',
        field: 'Mutation Status',
        docValue: 'Pending / Incomplete',
        recordValue: 'Required for valid ownership transfer',
        severity: 'high',
        explanation: 'The mutation application (MUT-PENDING/2021) was filed after the estate holder\'s death but has not been completed. Ownership transfer cannot be considered confirmed without a completed mutation. This is the highest-priority record issue for this plot. [SYNTHETIC DEMO]',
      },
      {
        id: 'disc-003b',
        field: 'RS Khatian',
        docValue: 'Not available',
        recordValue: 'Required for modern survey',
        severity: 'medium',
        explanation: 'No RS Khatian record was found for this plot in the demo dataset. This may indicate an oversight in the resurvey process. A resurvey may be needed. [SYNTHETIC DEMO]',
      },
    ],
  },
];

const DEMO_SHARED_RESOURCES: SharedResource[] = [
  {
    id: 'pond-001',
    type: 'pond',
    name: 'Family Pond (SYNTHETIC)',
    area: 8.0,
    geometry: plotGeometries['pond-001'],
    center: { lat: BASE_LAT + 0.0046, lng: BASE_LNG + 0.0032 },
    adjacentPlots: ['plot-001', 'plot-002', 'plot-003'],
    description: 'Shared fishpond used for aquaculture. Adjacent to all three plots. [SYNTHETIC DEMO]',
  },
];

const DEMO_ROADS: Road[] = [
  {
    id: 'road-001',
    name: 'Mouzapur Village Road (SYNTHETIC)',
    type: 'secondary',
    coordinates: roadGeometry,
  },
];

export const DEMO_HEIRS: Heir[] = [
  {
    id: 'heir-a',
    name: 'Nusrat Jahan (Heir A — SYNTHETIC)',
    relation: 'Eldest daughter of the estate',
    entitlement: 40,
    color: '#16a34a',
    avatar: 'NJ',
  },
  {
    id: 'heir-b',
    name: 'Kamal Uddin (Heir B — SYNTHETIC)',
    relation: 'Son of the estate',
    entitlement: 35,
    color: '#2563eb',
    avatar: 'KU',
  },
  {
    id: 'heir-c',
    name: 'Rohima Khatun (Heir C — SYNTHETIC)',
    relation: 'Youngest daughter of the estate',
    entitlement: 25,
    color: '#d97706',
    avatar: 'RK',
  },
];

export const DEMO_TIMELINE: TimelineEvent[] = [
  {
    id: 'evt-001',
    plotId: 'plot-001',
    date: '1984-01-15',
    type: 'record_entry',
    title: 'CS Survey Entry',
    description: 'Cadastral Survey (CS) record entered. DAG-1247 registered under Rahimuddin Miah. Area: 42.5 decimals. [SYNTHETIC DEMO]',
    actor: 'Demo Survey Authority',
  },
  {
    id: 'evt-002',
    plotId: 'plot-002',
    date: '1984-02-20',
    type: 'record_entry',
    title: 'CS Survey Entry',
    description: 'CS record entered for DAG-1248. Homestead plot registered. Area: 35.0 decimals. [SYNTHETIC DEMO]',
    actor: 'Demo Survey Authority',
  },
  {
    id: 'evt-003',
    plotId: 'plot-003',
    date: '1984-03-10',
    type: 'record_entry',
    title: 'CS Survey Entry',
    description: 'CS record entered for DAG-1249. Orchard plot. Area: 28.0 decimals. [SYNTHETIC DEMO]',
    actor: 'Demo Survey Authority',
  },
  {
    id: 'evt-004',
    plotId: 'plot-001',
    date: '1995-06-12',
    type: 'discrepancy',
    title: 'SA Khatian Area Mismatch Detected',
    description: 'SA Khatian recorded area as 40.0 decimals, differing from CS record of 42.5 decimals. Discrepancy flagged. [SYNTHETIC DEMO]',
    actor: 'Demo Record System',
  },
  {
    id: 'evt-005',
    plotId: 'plot-002',
    date: '2001-08-05',
    type: 'document_added',
    title: 'Registered Deed Added',
    description: 'DEED-7745/2001 registered. Confirms ownership under Rahimuddin Miah. Area consistent with CS record. [SYNTHETIC DEMO]',
    actor: 'Demo Sub-Registry',
  },
  {
    id: 'evt-006',
    plotId: 'plot-001',
    date: '2010-11-30',
    type: 'mutation',
    title: 'Post-Death Mutation Completed',
    description: 'MUT-3391/2010 completed following estate holder\'s death. Plot transferred to estate of Rahimuddin Miah. [SYNTHETIC DEMO]',
    actor: 'Demo AC Land Office',
  },
  {
    id: 'evt-007',
    plotId: 'plot-002',
    date: '2018-04-14',
    type: 'discrepancy',
    title: 'RS Owner Name Mismatch',
    description: 'RS Khatian (2018) shows Fatema Begum as owner instead of Rahimuddin Miah. No mutation links the name change. Discrepancy logged. [SYNTHETIC DEMO]',
    actor: 'Demo Record System',
  },
  {
    id: 'evt-008',
    plotId: 'plot-003',
    date: '2021-09-01',
    type: 'mutation',
    title: 'Mutation Application Filed',
    description: 'MUT-PENDING/2021 application filed for transfer to heirs. Status: Pending. Completion required for confirmed ownership. [SYNTHETIC DEMO]',
    actor: 'Demo AC Land Office',
  },
  {
    id: 'evt-009',
    plotId: 'plot-003',
    date: '2023-03-22',
    type: 'discrepancy',
    title: 'Missing RS Khatian',
    description: 'Audit found no RS Khatian record for DAG-1249. Record completeness flagged as low (55%). [SYNTHETIC DEMO]',
    actor: 'Demo Record System',
  },
];

// ============================================================
// SYNTHETIC DEMO CASE
// ============================================================
export const DEMO_CASE: LandCase = {
  id: 'case-001',
  name: 'Sonargaon Family Land Partition — Demo Case 001',
  description: 'SYNTHETIC DEMO CASE — All data is fictional. Three heirs, three agricultural/homestead plots, one shared pond, variable road access. Demonstrates the full JOMI-SHARE platform workflow.',
  createdAt: '2024-01-10',
  plots: DEMO_PLOTS,
  heirs: DEMO_HEIRS,
  sharedResources: DEMO_SHARED_RESOURCES,
  roads: DEMO_ROADS,
  totalArea: DEMO_PLOTS.reduce((s, p) => s + p.area, 0), // 105.5
  totalValue: DEMO_PLOTS.reduce((s, p) => s + p.totalValue, 0),
};

// ============================================================
// MAP VIEW CONFIG
// ============================================================
export const MAP_CENTER: LatLng = { lat: BASE_LAT + 0.003, lng: BASE_LNG + 0.0045 };
export const MAP_ZOOM = 16;
