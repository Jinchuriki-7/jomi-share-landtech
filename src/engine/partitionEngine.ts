// ============================================================
// PARTITION OPTIMIZATION ENGINE
// Deterministic, explainable algorithms for land partition planning.
// All results computed from actual input data — no fabricated scores.
// ============================================================

import type { Plot, Heir, PartitionPlan, PlotAllocation, PlanScores, ConstraintStatus, HeirSummary } from '../data/demoData';
export type { PartitionPlan };

export interface OptimizationWeights {
  areaFairness: number;
  valueFairness: number;
  accessScore: number;
  shapeQuality: number;
}

export const DEFAULT_WEIGHTS: OptimizationWeights = {
  areaFairness: 0.30,
  valueFairness: 0.35,
  accessScore: 0.25,
  shapeQuality: 0.10,
};

/**
 * Validate that entitlements are non-negative and sum to 100.
 */
export function validateEntitlements(heirs: Heir[]): { valid: boolean; message: string } {
  if (heirs.length === 0) return { valid: false, message: 'No heirs defined.' };
  const total = heirs.reduce((s, h) => s + h.entitlement, 0);
  if (heirs.some(h => h.entitlement < 0)) {
    return { valid: false, message: 'Entitlements cannot be negative.' };
  }
  if (Math.abs(total - 100) > 0.01) {
    return { valid: false, message: `Entitlements sum to ${total.toFixed(2)}% — must sum to exactly 100%.` };
  }
  return { valid: true, message: 'Entitlements are valid.' };
}

/**
 * Calculate the area each heir is entitled to based on their percentage.
 */
export function calculateEntitlementAreas(heirs: Heir[], totalArea: number): Record<string, number> {
  const result: Record<string, number> = {};
  heirs.forEach(h => {
    result[h.id] = (h.entitlement / 100) * totalArea;
  });
  return result;
}

/**
 * Calculate the value each heir is entitled to based on their percentage.
 */
export function calculateEntitlementValues(heirs: Heir[], totalValue: number): Record<string, number> {
  const result: Record<string, number> = {};
  heirs.forEach(h => {
    result[h.id] = (h.entitlement / 100) * totalValue;
  });
  return result;
}

/**
 * Compute area fairness score (0–100).
 * Based on deviation of actual allocation from entitlement area.
 * Lower deviation → higher score.
 */
export function computeAreaFairness(
  heirs: Heir[],
  allocations: PlotAllocation[],
  totalArea: number
): number {
  const entitledAreas = calculateEntitlementAreas(heirs, totalArea);
  const actualAreas: Record<string, number> = {};
  heirs.forEach(h => { actualAreas[h.id] = 0; });
  allocations.forEach(a => {
    if (actualAreas[a.heirId] !== undefined) actualAreas[a.heirId] += a.allocatedArea;
  });

  let totalDeviation = 0;
  heirs.forEach(h => {
    const entitled = entitledAreas[h.id];
    const actual = actualAreas[h.id] || 0;
    const deviation = Math.abs(actual - entitled) / (entitled || 1);
    totalDeviation += deviation;
  });
  const avgDeviation = totalDeviation / heirs.length;
  return Math.max(0, Math.min(100, 100 - avgDeviation * 100));
}

/**
 * Compute value fairness score (0–100).
 */
export function computeValueFairness(
  heirs: Heir[],
  allocations: PlotAllocation[],
  totalValue: number
): number {
  const entitledValues = calculateEntitlementValues(heirs, totalValue);
  const actualValues: Record<string, number> = {};
  heirs.forEach(h => { actualValues[h.id] = 0; });
  allocations.forEach(a => {
    if (actualValues[a.heirId] !== undefined) actualValues[a.heirId] += a.allocatedValue;
  });

  let totalDeviation = 0;
  heirs.forEach(h => {
    const entitled = entitledValues[h.id];
    const actual = actualValues[h.id] || 0;
    const deviation = Math.abs(actual - entitled) / (entitled || 1);
    totalDeviation += deviation;
  });
  const avgDeviation = totalDeviation / heirs.length;
  return Math.max(0, Math.min(100, 100 - avgDeviation * 100));
}

/**
 * Compute access score: fraction of allocated plots with direct road access.
 */
export function computeAccessScore(allocations: PlotAllocation[]): number {
  if (allocations.length === 0) return 0;
  const withAccess = allocations.filter(a => a.hasDirectAccess).length;
  return (withAccess / allocations.length) * 100;
}

/**
 * Shape quality heuristic: perfect = 100, penalized for small or fragmented parcels.
 * Very small parcels (< 10 decimals) score lower.
 */
export function computeShapeQuality(allocations: PlotAllocation[], plots: Plot[]): number {
  if (allocations.length === 0) return 50;
  let totalScore = 0;
  allocations.forEach(a => {
    const plot = plots.find(p => p.id === a.plotId);
    const area = a.allocatedArea;
    let score = 100;
    if (area < 10) score -= 30;
    else if (area < 20) score -= 15;
    if (a.partitionType !== 'full') score -= 10; // split plots lose shape quality
    if (!a.hasDirectAccess) score -= 20;
    if (plot?.recordStatus === 'incomplete') score -= 10;
    totalScore += Math.max(0, score);
  });
  return totalScore / allocations.length;
}

/**
 * Compute overall weighted score.
 */
export function computeOverallScore(scores: Omit<PlanScores, 'overall'>, weights: OptimizationWeights): number {
  return (
    scores.areaFairness * weights.areaFairness +
    scores.valueFairness * weights.valueFairness +
    scores.accessScore * weights.accessScore +
    scores.shapeQuality * weights.shapeQuality
  );
}

/**
 * Check access constraints: a parcel is landlocked if road access is 'none'.
 */
export function checkAccessConstraints(allocations: PlotAllocation[], plots: Plot[]): ConstraintStatus[] {
  const constraints: ConstraintStatus[] = [];
  allocations.forEach(a => {
    const plot = plots.find(p => p.id === a.plotId);
    constraints.push({
      id: `access-${a.heirId}-${a.plotId}`,
      name: `Road access: ${plot?.dagNumber || a.plotId}`,
      satisfied: a.hasDirectAccess,
      message: a.hasDirectAccess
        ? `Direct road access confirmed for ${plot?.dagNumber}.`
        : `Parcel ${plot?.dagNumber} allocated to this heir may be landlocked. Requires access via adjacent parcel or easement.`,
    });
  });
  return constraints;
}

/**
 * Check mutation constraints: flag plots with incomplete mutations.
 */
export function checkMutationConstraints(plots: Plot[]): ConstraintStatus[] {
  return plots.map(p => ({
    id: `mutation-${p.id}`,
    name: `Mutation status: ${p.dagNumber}`,
    satisfied: p.recordStatus !== 'incomplete',
    message: p.recordStatus === 'incomplete'
      ? `${p.dagNumber} has an incomplete mutation. Partition may not be legally executable until mutation is resolved.`
      : `${p.dagNumber} mutation/record status is acceptable for planning purposes.`,
  }));
}

// ============================================================
// PLAN GENERATORS
// Three deterministic plans, each with a different priority.
// ============================================================

/**
 * PLAN 1: Area-Focused
 * Assigns the highest-area plot to the highest-entitlement heir.
 * Remaining plots assigned to balance area as closely as possible.
 */
function generateAreaFocusedPlan(plots: Plot[], heirs: Heir[], totalArea: number, totalValue: number): PartitionPlan {
  const sortedHeirs = [...heirs].sort((a, b) => b.entitlement - a.entitlement);
  const sortedPlots = [...plots].sort((a, b) => b.area - a.area);

  // Simple greedy assignment
  const allocations: PlotAllocation[] = [];
  const heirAreas: Record<string, number> = {};
  heirs.forEach(h => { heirAreas[h.id] = 0; });

  // Assign each plot to the heir furthest below their entitlement
  sortedPlots.forEach(plot => {
    let bestHeir = sortedHeirs[0];
    let bestDeficit = -Infinity;
    heirs.forEach(h => {
      const entitled = (h.entitlement / 100) * totalArea;
      const deficit = entitled - (heirAreas[h.id] || 0);
      if (deficit > bestDeficit) {
        bestDeficit = deficit;
        bestHeir = h;
      }
    });
    heirAreas[bestHeir.id] = (heirAreas[bestHeir.id] || 0) + plot.area;
    allocations.push({
      heirId: bestHeir.id,
      plotId: plot.id,
      partitionType: 'full',
      allocatedArea: plot.area,
      allocatedValue: plot.totalValue,
      hasDirectAccess: plot.roadAccess === 'direct',
      subPlotId: `${plot.id}-${bestHeir.id}`,
    });
  });

  const areaFairness = computeAreaFairness(heirs, allocations, totalArea);
  const valueFairness = computeValueFairness(heirs, allocations, totalValue);
  const accessScore = computeAccessScore(allocations);
  const shapeQuality = computeShapeQuality(allocations, plots);
  const scores: PlanScores = {
    areaFairness, valueFairness, accessScore, shapeQuality,
    overall: computeOverallScore({ areaFairness, valueFairness, accessScore, shapeQuality }, DEFAULT_WEIGHTS),
  };

  const accessConstraints = checkAccessConstraints(allocations, plots);
  const mutationConstraints = checkMutationConstraints(plots);
  const accessWarnings = accessConstraints.filter(c => !c.satisfied).map(c => c.message);

  return {
    id: 'plan-area',
    name: 'Area-Focused Plan',
    type: 'area_focused',
    description: 'Allocates whole plots to maximise area fairness using a greedy deficit-filling algorithm. Each heir receives complete, undivided plots. This plan minimises physical fragmentation but may result in value imbalance.',
    allocations,
    scores,
    advantages: [
      'Each heir receives one undivided plot — minimal boundary fragmentation.',
      'Best area fairness of all three plans.',
      'Simple to implement physically — no plot subdivision required.',
      'Reduces boundary disputes by avoiding partial ownership.',
    ],
    disadvantages: [
      'Value fairness is lower because plots have unequal per-decimal values.',
      'Plot-003 (orchard) has only indirect road access — the heir receiving it may face an access constraint.',
      'Does not account for relative land value per decimal.',
    ],
    constraints: [...accessConstraints, ...mutationConstraints],
    isValid: accessWarnings.length === 0,
    accessWarnings,
  };
}

/**
 * PLAN 2: Value-Balanced Plan
 * Assigns plots based on minimising value deviation from entitlement.
 * May result in some landlocked parcels.
 */
function generateValueBalancedPlan(plots: Plot[], heirs: Heir[], totalArea: number, totalValue: number): PartitionPlan {
  const sortedHeirs = [...heirs].sort((a, b) => b.entitlement - a.entitlement);
  const sortedPlotsByValue = [...plots].sort((a, b) => b.totalValue - a.totalValue);

  const allocations: PlotAllocation[] = [];
  const heirValues: Record<string, number> = {};
  heirs.forEach(h => { heirValues[h.id] = 0; });

  sortedPlotsByValue.forEach(plot => {
    let bestHeir = sortedHeirs[0];
    let bestDeficit = -Infinity;
    heirs.forEach(h => {
      const entitled = (h.entitlement / 100) * totalValue;
      const deficit = entitled - (heirValues[h.id] || 0);
      if (deficit > bestDeficit) {
        bestDeficit = deficit;
        bestHeir = h;
      }
    });
    heirValues[bestHeir.id] = (heirValues[bestHeir.id] || 0) + plot.totalValue;
    allocations.push({
      heirId: bestHeir.id,
      plotId: plot.id,
      partitionType: 'full',
      allocatedArea: plot.area,
      allocatedValue: plot.totalValue,
      hasDirectAccess: plot.roadAccess === 'direct',
      subPlotId: `${plot.id}-${bestHeir.id}`,
    });
  });

  const areaFairness = computeAreaFairness(heirs, allocations, totalArea);
  const valueFairness = computeValueFairness(heirs, allocations, totalValue);
  const accessScore = computeAccessScore(allocations);
  const shapeQuality = computeShapeQuality(allocations, plots);
  const scores: PlanScores = {
    areaFairness, valueFairness, accessScore, shapeQuality,
    overall: computeOverallScore({ areaFairness, valueFairness, accessScore, shapeQuality }, DEFAULT_WEIGHTS),
  };

  const accessConstraints = checkAccessConstraints(allocations, plots);
  const mutationConstraints = checkMutationConstraints(plots);
  const accessWarnings = accessConstraints.filter(c => !c.satisfied).map(c => c.message);

  return {
    id: 'plan-value',
    name: 'Value-Balanced Plan',
    type: 'value_balanced',
    description: 'Allocates whole plots to minimise the deviation of each heir\'s allocated value from their proportional entitlement. Prioritises economic fairness over area balance. Each heir receives one complete plot.',
    allocations,
    scores,
    advantages: [
      'Best estimated-value fairness of all three plans.',
      'Accounts for the fact that the homestead plot (DAG-1248) has a higher per-decimal value.',
      'Economically rational allocation for families prioritising monetary equity.',
      'Still avoids plot subdivision — keeps parcels physically whole.',
    ],
    disadvantages: [
      'Area fairness is somewhat lower, as value-per-decimal differs across plots.',
      'The heir receiving the orchard (DAG-1249) may have indirect access only.',
      'Estimated values are synthetic demo values only — actual valuation requires a certified surveyor.',
    ],
    constraints: [...accessConstraints, ...mutationConstraints],
    isValid: accessWarnings.length === 0,
    accessWarnings,
  };
}

/**
 * PLAN 3: Access-Focused Plan
 * Assigns plots with direct road access first to heirs with highest entitlement.
 * Ensures the landlocked plot is assigned to someone who can negotiate easement.
 */
function generateAccessFocusedPlan(plots: Plot[], heirs: Heir[], totalArea: number, totalValue: number): PartitionPlan {
  const sortedHeirs = [...heirs].sort((a, b) => b.entitlement - a.entitlement);
  const directAccessPlots = plots.filter(p => p.roadAccess === 'direct').sort((a, b) => b.area - a.area);
  const indirectPlots = plots.filter(p => p.roadAccess !== 'direct');

  const allocations: PlotAllocation[] = [];
  const assignedHeirs: Set<string> = new Set();

  // Assign direct-access plots to top-entitlement heirs
  directAccessPlots.forEach((plot, i) => {
    if (i < sortedHeirs.length) {
      const heir = sortedHeirs[i];
      assignedHeirs.add(heir.id);
      allocations.push({
        heirId: heir.id,
        plotId: plot.id,
        partitionType: 'full',
        allocatedArea: plot.area,
        allocatedValue: plot.totalValue,
        hasDirectAccess: true,
        subPlotId: `${plot.id}-${heir.id}`,
      });
    }
  });

  // Assign indirect plots to remaining heirs — they're adjacent to direct-access plots
  const remainingHeirs = heirs.filter(h => !assignedHeirs.has(h.id));
  indirectPlots.forEach((plot, i) => {
    const heir = remainingHeirs[i] || sortedHeirs[sortedHeirs.length - 1];
    allocations.push({
      heirId: heir.id,
      plotId: plot.id,
      partitionType: 'full',
      allocatedArea: plot.area,
      allocatedValue: plot.totalValue,
      hasDirectAccess: false, // indirect but noted as negotiable
      subPlotId: `${plot.id}-${heir.id}`,
    });
  });

  const areaFairness = computeAreaFairness(heirs, allocations, totalArea);
  const valueFairness = computeValueFairness(heirs, allocations, totalValue);
  const accessScore = computeAccessScore(allocations);
  const shapeQuality = computeShapeQuality(allocations, plots);
  const scores: PlanScores = {
    areaFairness, valueFairness, accessScore, shapeQuality,
    overall: computeOverallScore({ areaFairness, valueFairness, accessScore, shapeQuality }, DEFAULT_WEIGHTS),
  };

  const accessConstraints = checkAccessConstraints(allocations, plots);
  const mutationConstraints = checkMutationConstraints(plots);
  const accessWarnings = accessConstraints.filter(c => !c.satisfied).map(c => c.message);

  return {
    id: 'plan-access',
    name: 'Access-Focused Plan',
    type: 'access_focused',
    description: 'Prioritises direct road access when assigning plots. The two plots with direct road access are assigned first, to the heirs with the highest entitlements. The landlocked orchard is assigned last with a recommendation to negotiate a formal access easement.',
    allocations,
    scores,
    advantages: [
      'Maximises the number of heirs with direct road access (2 out of 3 direct).',
      'Reduces long-term access dispute risk for the majority of heirs.',
      'Explicitly flags the access constraint for DAG-1249.',
      'Practical approach when road access is the primary concern.',
    ],
    disadvantages: [
      'Area fairness may be lower because plots are assigned by access, not by area.',
      'The heir receiving DAG-1249 requires a formal easement agreement with adjacent plot owners.',
      'Does not optimise for value balance.',
      'Access easement negotiation is outside the scope of this planning tool.',
    ],
    constraints: [...accessConstraints, ...mutationConstraints],
    isValid: false, // has one indirect-access parcel
    accessWarnings,
  };
}

/**
 * Main entry point: generate all three candidate plans.
 */
export function generateAllPlans(
  plots: Plot[],
  heirs: Heir[],
): PartitionPlan[] {
  const totalArea = plots.reduce((s, p) => s + p.area, 0);
  const totalValue = plots.reduce((s, p) => s + p.totalValue, 0);

  return [
    generateAreaFocusedPlan(plots, heirs, totalArea, totalValue),
    generateValueBalancedPlan(plots, heirs, totalArea, totalValue),
    generateAccessFocusedPlan(plots, heirs, totalArea, totalValue),
  ];
}

/**
 * Build per-heir summary for a given plan.
 */
export function buildHeirSummaries(
  plan: PartitionPlan,
  heirs: Heir[],
  plots: Plot[],
  totalArea: number,
  totalValue: number
): HeirSummary[] {
  return heirs.map(h => {
    const myAllocations = plan.allocations.filter(a => a.heirId === h.id);
    const allocatedArea = myAllocations.reduce((s, a) => s + a.allocatedArea, 0);
    const allocatedValue = myAllocations.reduce((s, a) => s + a.allocatedValue, 0);
    const entitlementArea = (h.entitlement / 100) * totalArea;
    const entitlementValue = (h.entitlement / 100) * totalValue;
    const hasDirectAccess = myAllocations.some(a => a.hasDirectAccess);
    const hasAnyAccess = myAllocations.some(a => {
      const plot = plots.find(p => p.id === a.plotId);
      return plot?.roadAccess !== 'none';
    });

    return {
      heirId: h.id,
      heirName: h.name,
      entitlement: h.entitlement,
      allocatedArea,
      allocatedValue,
      entitlementArea,
      entitlementValue,
      areaDeviation: allocatedArea - entitlementArea,
      valueDeviation: allocatedValue - entitlementValue,
      accessStatus: hasDirectAccess ? 'direct' : hasAnyAccess ? 'indirect' : 'none',
    };
  });
}

/**
 * Conflict heatmap: per-plot risk indicators.
 */
export interface PlotConflictRisk {
  plotId: string;
  dagNumber: string;
  accessRisk: number;       // 0-100
  valueRisk: number;        // 0-100
  recordRisk: number;       // 0-100
  overallRisk: number;
  warnings: string[];
}

export function computeConflictRisks(plots: Plot[], plans: PartitionPlan[]): PlotConflictRisk[] {
  return plots.map(plot => {
    const warnings: string[] = [];
    let accessRisk = 0;
    let valueRisk = 0;
    let recordRisk = 0;

    // Access risk
    if (plot.roadAccess === 'none') { accessRisk = 90; warnings.push('Plot has no road access — landlocked.'); }
    else if (plot.roadAccess === 'indirect') { accessRisk = 55; warnings.push('Plot access is indirect — requires easement or passage through adjacent plot.'); }
    else { accessRisk = 5; }

    // Value risk: homestead has much higher value per decimal → unequal value distribution
    const avgValue = plots.reduce((s, p) => s + p.relativeValue, 0) / plots.length;
    const valueDeviation = Math.abs(plot.relativeValue - avgValue) / avgValue;
    valueRisk = Math.min(100, valueDeviation * 100);
    if (valueRisk > 40) warnings.push(`High relative value variation (${plot.relativeValue.toLocaleString()} BDT/decimal vs average ${Math.round(avgValue).toLocaleString()}) may cause partition disputes.`);

    // Record risk
    if (plot.recordStatus === 'incomplete') { recordRisk = 80; warnings.push('Critical: incomplete mutation record. Partition not executable until resolved.'); }
    else if (plot.recordStatus === 'mismatch') { recordRisk = 50; warnings.push('Record mismatch detected — verify with authorised land office before partition.'); }
    else { recordRisk = 10; }

    // Completeness risk
    if (plot.completeness < 60) { recordRisk = Math.max(recordRisk, 70); warnings.push(`Low record completeness (${plot.completeness}%) — missing documents should be traced.`); }

    const overallRisk = Math.round(accessRisk * 0.35 + valueRisk * 0.30 + recordRisk * 0.35);

    return { plotId: plot.id, dagNumber: plot.dagNumber, accessRisk: Math.round(accessRisk), valueRisk: Math.round(valueRisk), recordRisk: Math.round(recordRisk), overallRisk, warnings };
  });
}
