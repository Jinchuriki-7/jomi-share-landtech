import { useState } from 'react';
import { Scissors, CheckCircle, XCircle, AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Badge, SectionHeader, AlertBox, HeirAvatar, ScoreMeter } from '../components/ui';
import { buildHeirSummaries } from '../engine/partitionEngine';
import LandMap from '../components/map/LandMap';
import clsx from 'clsx';

export default function PartitionPage() {
  const { landCase, heirs, plans, selectedPlanId, selectPlan, generatePlans, isGeneratingPlans } = useApp();
  const { lang, t, toBn, formatNumber, formatArea, formatCurrency } = useLanguage();
  const isBn = lang === 'bn';

  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'constraints' | 'comparison'>('overview');

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[0];
  const summaries = selectedPlan
    ? buildHeirSummaries(selectedPlan, heirs, landCase.plots, landCase.totalArea, landCase.totalValue)
    : [];

  const PLAN_TYPES: Record<string, { label: string; color: string; bg: string; border: string }> = {
    area_focused: {
      label: isBn ? t.partition.planAreaFocused : 'Area-Focused',
      color: '#16a34a',
      bg: 'bg-brand-50',
      border: 'border-brand-200',
    },
    value_balanced: {
      label: isBn ? t.partition.planValueBalanced : 'Value-Balanced',
      color: '#2563eb',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    access_focused: {
      label: isBn ? t.partition.planAccessFocused : 'Access-Focused',
      color: '#d97706',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
  };

  const getPlanDescription = (planType: string, defaultDesc: string) => {
    if (!isBn) return defaultDesc;
    if (planType === 'area_focused') return t.partition.planAreaFocusedDesc;
    if (planType === 'value_balanced') return t.partition.planValueBalancedDesc;
    if (planType === 'access_focused') return t.partition.planAccessFocusedDesc;
    return defaultDesc;
  };

  const radarData = selectedPlan ? [
    { metric: isBn ? 'ক্ষেত্রফল' : 'Area Fair', value: Math.round(selectedPlan.scores.areaFairness) },
    { metric: isBn ? 'মূল্য' : 'Value Fair', value: Math.round(selectedPlan.scores.valueFairness) },
    { metric: isBn ? 'রাস্তা' : 'Access', value: Math.round(selectedPlan.scores.accessScore) },
    { metric: isBn ? 'আকৃতি' : 'Shape', value: Math.round(selectedPlan.scores.shapeQuality) },
  ] : [];

  const comparisonData = heirs.map(h => {
    const row: Record<string, number | string> = {
      name: h.avatar,
      entitlement: h.entitlement,
    };
    plans.forEach(p => {
      const s = buildHeirSummaries(p, heirs, landCase.plots, landCase.totalArea, landCase.totalValue);
      const hs = s.find(x => x.heirId === h.id);
      row[p.name] = hs ? Math.round((hs.allocatedArea / landCase.totalArea) * 100) : 0;
    });
    return row;
  });

  const partitionAllocations = selectedPlan
    ? selectedPlan.allocations.map((a: any) => ({ plotId: a.plotId, heirId: a.heirId }))
    : [];

  return (
    <div className="space-y-5">
      <SectionHeader
        title={t.partition.title}
        subtitle={t.partition.subtitle}
        actions={
          <button onClick={generatePlans} disabled={isGeneratingPlans} className="btn-primary text-xs py-1.5">
            {isGeneratingPlans
              ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> {t.partition.generating}</>
              : <><RefreshCw className="w-3.5 h-3.5" /> {t.partition.regenerate}</>
            }
          </button>
        }
      />

      <AlertBox type="info" title={t.partition.disclaimerTitle}>
        {t.partition.disclaimer}
      </AlertBox>

      {/* Plan selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map(plan => {
          const pt = PLAN_TYPES[plan.type] || PLAN_TYPES['area_focused'];
          const isActive = plan.id === selectedPlanId;
          return (
            <button
              key={plan.id}
              onClick={() => selectPlan(plan.id)}
              className={clsx(
                'text-left p-4 rounded-xl border-2 transition-all duration-150',
                isActive ? `${pt.border} ${pt.bg}` : 'border-gray-100 bg-white hover:border-gray-200',
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant={plan.type === 'area_focused' ? 'green' : plan.type === 'value_balanced' ? 'blue' : 'yellow'}>
                  {pt.label}
                </Badge>
                <div className={clsx('text-2xl font-bold', isActive ? '' : 'text-gray-700')} style={{ color: isActive ? pt.color : undefined }}>
                  {formatNumber(Math.round(plan.scores.overall))}
                </div>
              </div>
              <div className="text-sm font-semibold text-navy-800 mb-1">{plan.name}</div>
              <div className="text-xs text-gray-500 line-clamp-2">{getPlanDescription(plan.type, plan.description)}</div>
              <div className="grid grid-cols-2 gap-1 mt-3">
                {[
                  { l: isBn ? 'ক্ষেত্রফল' : 'Area', v: plan.scores.areaFairness },
                  { l: isBn ? 'মূল্য' : 'Value', v: plan.scores.valueFairness },
                  { l: isBn ? 'রাস্তা' : 'Access', v: plan.scores.accessScore },
                  { l: isBn ? 'আকৃতি' : 'Shape', v: plan.scores.shapeQuality },
                ].map(({ l, v }) => (
                  <div key={l} className="text-xs">
                    <span className="text-gray-500">{l}: </span>
                    <span className={clsx('font-medium', v >= 70 ? 'text-brand-600' : v >= 50 ? 'text-yellow-600' : 'text-red-600')}>
                      {formatNumber(Math.round(v))}
                    </span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail tabs */}
      {selectedPlan && (
        <div className="card">
          <div className="flex gap-1 mb-5 border-b border-gray-100 pb-3 flex-wrap">
            {[
              { id: 'overview', label: t.partition.tabOverview },
              { id: 'map', label: t.partition.tabMap },
              { id: 'constraints', label: isBn ? 'শর্তাবলী ও বিধিনিষেধ' : 'Constraints' },
              { id: 'comparison', label: t.partition.tabComparison },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  activeTab === tab.id ? 'bg-brand-600 text-white' : 'text-gray-600 hover:bg-gray-100',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Radar */}
                <div>
                  <div className="text-sm font-semibold text-navy-800 mb-3 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-brand-600" />
                    {isBn ? 'স্কোর বিশ্লেষণ' : 'Score Breakdown'}
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <ScoreMeter score={selectedPlan.scores.areaFairness} label={isBn ? 'ক্ষেত্রফল' : 'Area'} />
                    <ScoreMeter score={selectedPlan.scores.valueFairness} label={isBn ? 'মূল্য' : 'Value'} />
                    <ScoreMeter score={selectedPlan.scores.accessScore} label={isBn ? 'রাস্তা' : 'Access'} />
                    <ScoreMeter score={selectedPlan.scores.shapeQuality} label={isBn ? 'আকৃতি' : 'Shape'} />
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      <Radar
                        name={selectedPlan.name}
                        dataKey="value"
                        stroke={PLAN_TYPES[selectedPlan.type]?.color || '#16a34a'}
                        fill={PLAN_TYPES[selectedPlan.type]?.color || '#16a34a'}
                        fillOpacity={0.2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Heir allocations */}
                <div>
                  <div className="text-sm font-semibold text-navy-800 mb-3">
                    {isBn ? 'ওয়ারিশভিত্তিক বরাদ্দ' : 'Heir Allocations'}
                  </div>
                  <div className="space-y-3">
                    {summaries.map(s => {
                      const heir = heirs.find(h => h.id === s.heirId)!;
                      const areaOk = Math.abs(s.areaDeviation) / s.entitlementArea < 0.05;
                      const heirDisplayName = isBn
                        ? (heir.id === 'heir-a' ? 'নুসরাত জাহান' : heir.id === 'heir-b' ? 'কামাল উদ্দিন' : 'রহিমা খাতুন')
                        : s.heirName.split('(')[0].trim();

                      return (
                        <div key={s.heirId} className="border border-gray-100 rounded-xl p-3">
                          <div className="flex items-center gap-3 mb-2">
                            <HeirAvatar name={s.heirName} initials={heir.avatar} color={heir.color} />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-navy-800">{heirDisplayName}</div>
                              <div className="text-xs text-gray-500">
                                {formatNumber(s.entitlement)}% {isBn ? 'প্রাপ্য হিস্যা' : 'entitlement'}
                              </div>
                            </div>
                            <Badge variant={s.accessStatus === 'direct' ? 'green' : s.accessStatus === 'indirect' ? 'yellow' : 'red'}>
                              {s.accessStatus === 'direct' ? (isBn ? 'সরাসরি রাস্তা' : 'direct') : (isBn ? 'পরোক্ষ পথ' : 'indirect')}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-gray-500">{isBn ? 'বরাদ্দকৃত জমি' : 'Allocated Area'}</div>
                              <div className="font-semibold">
                                {formatArea(parseFloat(s.allocatedArea.toFixed(1)))}
                                <span className={clsx('ml-1 text-xs', areaOk ? 'text-brand-600' : 'text-red-600')}>
                                  ({s.areaDeviation >= 0 ? '+' : ''}{formatNumber(s.areaDeviation.toFixed(1))})
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500">{isBn ? 'বরাদ্দকৃত মূল্য' : 'Allocated Value'}</div>
                              <div className="font-semibold">{formatCurrency(s.allocatedValue)}</div>
                            </div>
                          </div>
                          {/* Which plot */}
                          {selectedPlan.allocations.filter((a: any) => a.heirId === s.heirId).map((a: any) => {
                            const plot = landCase.plots.find(p => p.id === a.plotId);
                            return plot ? (
                              <div key={a.plotId} className="mt-2 flex items-center gap-2 bg-gray-50 rounded-lg p-1.5 text-xs">
                                <span className="w-2 h-2 rounded-full" style={{ background: plot.color }} />
                                <span className="font-medium">{isBn ? toBn(plot.dagNumber) : plot.dagNumber}</span>
                                <span className="text-gray-500">
                                  {formatArea(a.allocatedArea)} · {t.status[plot.classification] || plot.classification}
                                </span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Advantages/Disadvantages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-brand-50 rounded-xl p-4">
                  <div className="text-sm font-semibold text-brand-800 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {t.partition.advantages}
                  </div>
                  <ul className="space-y-1">
                    {selectedPlan.advantages.map((a: string, i: number) => (
                      <li key={i} className="text-xs text-brand-700 flex gap-2">
                        <span className="flex-shrink-0">•</span> {isBn ? toBn(a) : a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> {t.partition.disadvantages}
                  </div>
                  <ul className="space-y-1">
                    {selectedPlan.disadvantages.map((d: string, i: number) => (
                      <li key={i} className="text-xs text-red-700 flex gap-2">
                        <span className="flex-shrink-0">•</span> {isBn ? toBn(d) : d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Access warnings */}
              {selectedPlan.accessWarnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {isBn ? 'রাস্তা সংক্রান্ত সতর্কতা' : 'Access Warnings'}
                  </div>
                  {selectedPlan.accessWarnings.map((w: string, i: number) => (
                    <div key={i} className="text-xs text-amber-700 flex gap-2 mb-1">
                      <span className="flex-shrink-0">⚠️</span> {isBn ? toBn(w) : w}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'map' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <div className="flex gap-3">
                  {heirs.map(h => (
                    <span key={h.id} className="flex items-center gap-1.5 text-xs">
                      <span className="w-3 h-3 rounded-sm" style={{ background: h.color }} />
                      {h.avatar} — {isBn
                        ? (h.id === 'heir-a' ? 'নুসরাত জাহান' : h.id === 'heir-b' ? 'কামাল উদ্দিন' : 'রহিমা খাতুন')
                        : h.name.split('(')[0].trim()}
                    </span>
                  ))}
                </div>
              </div>
              <LandMap
                showPartition
                partitionAllocations={partitionAllocations}
                height="450px"
              />
              <div className="text-xs text-gray-400 text-center">
                {isBn
                  ? `রং নির্দেশ করছে ${selectedPlan.name}-এর অধীনে ওয়ারিশদের বরাদ্দকৃত জমি — কৃত্রিম ডেমো ডেটা`
                  : `Plot colors indicate heir allocation under ${selectedPlan.name} — SYNTHETIC DEMO DATA`}
              </div>
            </div>
          )}

          {activeTab === 'constraints' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-sm font-semibold text-navy-800 mb-3">{isBn ? 'শর্তাবলী ও বিধিনিষেধের অবস্থা' : 'Constraint Status'}</div>
              {selectedPlan.constraints.map((c: any) => (
                <div key={c.id} className={clsx(
                  'flex items-start gap-3 p-3 rounded-lg border text-sm',
                  c.satisfied ? 'bg-brand-50 border-brand-200' : 'bg-red-50 border-red-200',
                )}>
                  {c.satisfied
                    ? <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <div className="font-medium text-navy-800">{isBn ? toBn(c.name) : c.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{isBn ? toBn(c.message) : c.message}</div>
                  </div>
                  <Badge variant={c.satisfied ? 'green' : 'red'} className="ml-auto flex-shrink-0">
                    {c.satisfied ? (isBn ? 'উত্তীর্ণ' : 'Pass') : (isBn ? 'ব্যর্থ' : 'Fail')}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-sm font-semibold text-navy-800">{isBn ? 'পরিকল্পনাসমূহের তুলনা — জমির শতাংশ বরাদ্দ (%)' : 'Plan Comparison — Area Allocation %'}</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip formatter={(v) => [`${formatNumber(Number(v))}%`, '']} />
                  <Legend />
                  <Bar dataKey="entitlement" fill="#94a3b8" name={isBn ? 'প্রাপ্য হিস্যা %' : 'Entitlement %'} />
                  {plans.map((p, i) => (
                    <Bar key={p.id} dataKey={p.name} fill={['#16a34a', '#2563eb', '#d97706'][i]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 text-gray-500">{isBn ? 'সূচক' : 'Metric'}</th>
                      {plans.map(p => (
                        <th key={p.id} className="text-right py-2 text-gray-500">{p.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'areaFairness', label: isBn ? 'জমির পরিমাণের সমতা' : 'Area Fairness' },
                      { key: 'valueFairness', label: isBn ? 'বাজারমূল্যের সমতা' : 'Value Fairness' },
                      { key: 'accessScore', label: isBn ? 'রাস্তা প্রবেশাধিকার' : 'Road Access Score' },
                      { key: 'shapeQuality', label: isBn ? 'প্লটের আকৃতি মান' : 'Parcel Shape Quality' },
                      { key: 'overall', label: isBn ? 'সামগ্রিক স্কোর' : 'Overall Score' },
                    ].map(({ key, label }) => (
                      <tr key={key} className="border-b border-gray-50">
                        <td className="py-2 font-medium text-navy-800">{label}</td>
                        {plans.map(p => {
                          const val = Math.round(p.scores[key as keyof typeof p.scores]);
                          const best = Math.max(...plans.map(pp => pp.scores[key as keyof typeof pp.scores]));
                          return (
                            <td key={p.id} className={clsx('py-2 text-right font-semibold', val === best ? 'text-brand-600' : 'text-gray-600')}>
                              {formatNumber(val)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-gray-400">
                {isBn ? '* সবুজ/বোল্ড সংখ্যাগুলো প্রতিটি সূচকে সেরা স্কোর নির্দেশ করে।' : '* Bold/green values indicate the best score for each metric across all plans.'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
