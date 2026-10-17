import { useState } from 'react';
import { Sliders, Play, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { generateAllPlans, buildHeirSummaries } from '../engine/partitionEngine';
import { Badge, SectionHeader, AlertBox, HeirAvatar, ScoreMeter } from '../components/ui';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Heir } from '../data/demoData';
import clsx from 'clsx';

interface ScenarioInputs {
  heirA: number;
  heirB: number;
  heirC: number;
  pondArrangement: 'shared' | 'heir-a' | 'heir-b' | 'heir-c';
  minAccessWidth: number;
  areaWeight: number;
  valueWeight: number;
  accessWeight: number;
}

export default function SimulatorPage() {
  const { landCase, heirs, plans: basePlans } = useApp();
  const { lang, t, toBn, formatNumber, formatArea, formatCurrency } = useLanguage();
  const isBn = lang === 'bn';

  const [inputs, setInputs] = useState<ScenarioInputs>({
    heirA: heirs[0].entitlement,
    heirB: heirs[1].entitlement,
    heirC: heirs[2].entitlement,
    pondArrangement: 'shared',
    minAccessWidth: 2,
    areaWeight: 30,
    valueWeight: 35,
    accessWeight: 25,
  });
  const [scenarioPlans, setScenarioPlans] = useState<ReturnType<typeof generateAllPlans> | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const entitlementTotal = inputs.heirA + inputs.heirB + inputs.heirC;
  const isValid = Math.abs(entitlementTotal - 100) < 0.5 && inputs.heirA >= 0 && inputs.heirB >= 0 && inputs.heirC >= 0;

  const runScenario = () => {
    if (!isValid) return;
    setIsRunning(true);
    setTimeout(() => {
      const newHeirs: Heir[] = [
        { ...heirs[0], entitlement: inputs.heirA },
        { ...heirs[1], entitlement: inputs.heirB },
        { ...heirs[2], entitlement: inputs.heirC },
      ];
      const newPlans = generateAllPlans(landCase.plots, newHeirs);
      setScenarioPlans(newPlans);
      setIsRunning(false);
    }, 600);
  };

  const resetScenario = () => {
    setInputs({
      heirA: heirs[0].entitlement,
      heirB: heirs[1].entitlement,
      heirC: heirs[2].entitlement,
      pondArrangement: 'shared',
      minAccessWidth: 2,
      areaWeight: 30,
      valueWeight: 35,
      accessWeight: 25,
    });
    setScenarioPlans(null);
  };

  const baseScores = basePlans[0].scores;
  const scenScores = scenarioPlans?.[0].scores;

  const radarComparison = [
    { metric: isBn ? 'ক্ষেত্রফল' : 'Area Fair', base: Math.round(baseScores.areaFairness), scenario: scenScores ? Math.round(scenScores.areaFairness) : 0 },
    { metric: isBn ? 'মূল্য' : 'Value Fair', base: Math.round(baseScores.valueFairness), scenario: scenScores ? Math.round(scenScores.valueFairness) : 0 },
    { metric: isBn ? 'রাস্তা' : 'Access', base: Math.round(baseScores.accessScore), scenario: scenScores ? Math.round(scenScores.accessScore) : 0 },
    { metric: isBn ? 'আকৃতি' : 'Shape', base: Math.round(baseScores.shapeQuality), scenario: scenScores ? Math.round(scenScores.shapeQuality) : 0 },
  ];

  const summaries = scenarioPlans
    ? buildHeirSummaries(scenarioPlans[0], [
        { ...heirs[0], entitlement: inputs.heirA },
        { ...heirs[1], entitlement: inputs.heirB },
        { ...heirs[2], entitlement: inputs.heirC },
      ], landCase.plots, landCase.totalArea, landCase.totalValue)
    : null;

  return (
    <div className="space-y-5">
      <SectionHeader
        title={t.simulator.title}
        subtitle={t.simulator.subtitle}
        actions={<Badge variant="navy">{isBn ? 'সিমুলেশন টুল' : 'What-If Tool'}</Badge>}
      />

      <AlertBox type="info" title={t.simulator.disclaimerTitle}>
        {t.simulator.disclaimer}
      </AlertBox>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Controls */}
        <div className="space-y-4">
          <div className="card">
            <div className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-600" />
              {isBn ? 'সিমুলেশন প্যারামিটারসমূহ' : 'Scenario Inputs'}
            </div>

            {/* Entitlements */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                {isBn ? 'ওয়ারিশদের হিস্যা পরিবর্তন (%)' : 'Heir Entitlements'}
              </div>
              {[
                { id: 'heirA', key: 'heirA' as keyof ScenarioInputs, heir: heirs[0] },
                { id: 'heirB', key: 'heirB' as keyof ScenarioInputs, heir: heirs[1] },
                { id: 'heirC', key: 'heirC' as keyof ScenarioInputs, heir: heirs[2] },
              ].map(({ id, key, heir }) => (
                <div key={id} className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <HeirAvatar name={heir.name} initials={heir.avatar} color={heir.color} size="sm" />
                      <span className="text-xs font-medium text-navy-800">
                        {isBn
                          ? (heir.id === 'heir-a' ? 'নুসরাত জাহান' : heir.id === 'heir-b' ? 'কামাল উদ্দিন' : 'রহিমা খাতুন')
                          : heir.avatar}
                      </span>
                    </div>
                    <span className={clsx('text-sm font-bold', isValid ? 'text-navy-800' : 'text-red-600')}>
                      {formatNumber((inputs[key] as number).toFixed(1))}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.5}
                    value={inputs[key] as number}
                    onChange={e => setInputs(p => ({ ...p, [key]: parseFloat(e.target.value) }))}
                    className="w-full accent-brand-600"
                    style={{ accentColor: heir.color }}
                  />
                </div>
              ))}
              <div className={clsx('text-xs font-semibold text-right', isValid ? 'text-brand-600' : 'text-red-600')}>
                {isBn ? `মোট: ${formatNumber(entitlementTotal.toFixed(1))}% ${isValid ? '✓' : '— ১০০% হতে হবে'}` : `Total: ${entitlementTotal.toFixed(1)}% ${isValid ? '✓' : '— must be 100%'}`}
              </div>
            </div>

            {/* Pond arrangement */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                {isBn ? 'যৌথ পুকুর বণ্টন ব্যবস্থা' : 'Pond Arrangement'}
              </div>
              {[
                { value: 'shared', label: isBn ? 'সকল ওয়ারিশের মধ্যে যৌথ (সমান অধিকার)' : 'Shared among all heirs' },
                { value: 'heir-a', label: isBn ? 'ওয়ারিশ ক (নুসরাত)-কে একক বরাদ্দ' : 'Exclusive to Heir A' },
                { value: 'heir-b', label: isBn ? 'ওয়ারিশ খ (কামাল)-কে একক বরাদ্দ' : 'Exclusive to Heir B' },
                { value: 'heir-c', label: isBn ? 'ওয়ারিশ গ (রহিমা)-কে একক বরাদ্দ' : 'Exclusive to Heir C' },
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-2 text-xs text-gray-700 mb-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="pond"
                    value={opt.value}
                    checked={inputs.pondArrangement === opt.value}
                    onChange={e => setInputs(p => ({ ...p, pondArrangement: e.target.value as ScenarioInputs['pondArrangement'] }))}
                    className="accent-brand-600"
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            {/* Weights */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                {isBn ? 'অপটিমাইজেশন লক্ষ্যের গুরুত্ব (%)' : 'Optimization Weights'}
              </div>
              {[
                { key: 'areaWeight', label: isBn ? 'ক্ষেত্রফলের সমতার গুরুত্ব' : 'Area Fairness' },
                { key: 'valueWeight', label: isBn ? 'বাজারমূল্যের সমতার গুরুত্ব' : 'Value Fairness' },
                { key: 'accessWeight', label: isBn ? 'রাস্তা নিশ্চিতকরণের গুরুত্ব' : 'Access Priority' },
              ].map(({ key, label }) => (
                <div key={key} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-medium">{formatNumber(inputs[key as keyof ScenarioInputs])}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={5}
                    value={inputs[key as keyof ScenarioInputs] as number}
                    onChange={e => setInputs(p => ({ ...p, [key]: parseInt(e.target.value) }))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={runScenario}
                disabled={!isValid || isRunning}
                className="btn-primary flex-1 justify-center"
              >
                {isRunning
                  ? <><TrendingUp className="w-4 h-4 animate-spin" /> {isBn ? 'গণনা চলছে…' : 'Running…'}</>
                  : <><Play className="w-4 h-4" /> {isBn ? 'সিমুলেশন চালান' : 'Run Scenario'}</>
                }
              </button>
              <button onClick={resetScenario} className="btn-secondary px-3" title={isBn ? 'রিসেট' : 'Reset'}>
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {!scenarioPlans ? (
            <div className="card flex flex-col items-center justify-center py-16 text-center">
              <Sliders className="w-12 h-12 text-gray-200 mb-3" />
              <div className="text-gray-500 font-medium">
                {isBn ? 'প্যারামিটার পরিবর্তন করে "সিমুলেশন চালান"-এ ক্লিক করুন' : 'Configure scenario inputs and click "Run Scenario"'}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {isBn ? 'মূল পরিকল্পনার সাথে তুলনামূলক বিশ্লেষণ এখানে প্রদর্শিত হবে' : 'Results will appear here comparing with the baseline plan'}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="card">
                <div className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-600" />
                  {isBn ? 'সিমুলেশন বনাম মূল পরিকল্পনার তুলনা' : 'Scenario vs Baseline Comparison'}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-2 font-medium">
                      {isBn ? 'মূল পরিকল্পনা (সম-ক্ষেত্রফল)' : 'Baseline Plan (Area-Focused)'}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ScoreMeter score={baseScores.areaFairness} label={isBn ? 'ক্ষেত্রফল' : 'Area'} size="sm" />
                      <ScoreMeter score={baseScores.valueFairness} label={isBn ? 'মূল্য' : 'Value'} size="sm" />
                      <ScoreMeter score={baseScores.accessScore} label={isBn ? 'রাস্তা' : 'Access'} size="sm" />
                      <ScoreMeter score={baseScores.overall} label={isBn ? 'সামগ্রিক' : 'Overall'} size="sm" />
                    </div>
                  </div>
                  <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                    <div className="text-xs text-brand-700 mb-2 font-medium">
                      {isBn ? 'সিমুলেশন পরিকল্পনা' : 'Scenario Plan'}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ScoreMeter score={scenScores!.areaFairness} label={isBn ? 'ক্ষেত্রফল' : 'Area'} size="sm" />
                      <ScoreMeter score={scenScores!.valueFairness} label={isBn ? 'মূল্য' : 'Value'} size="sm" />
                      <ScoreMeter score={scenScores!.accessScore} label={isBn ? 'রাস্তা' : 'Access'} size="sm" />
                      <ScoreMeter score={scenScores!.overall} label={isBn ? 'সামগ্রিক' : 'Overall'} size="sm" />
                    </div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarComparison}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                    <Radar name={isBn ? 'মূল পরিকল্পনা' : 'Baseline'} dataKey="base" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} />
                    <Radar name={isBn ? 'সিমুলেশন' : 'Scenario'} dataKey="scenario" stroke="#16a34a" fill="#16a34a" fillOpacity={0.2} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Heir summaries */}
              <div className="card">
                <div className="font-semibold text-navy-800 mb-3">
                  {isBn ? 'সিমুলেশনে ওয়ারিশভিত্তিক বরাদ্দ' : 'Scenario Heir Allocations'}
                </div>
                <div className="space-y-3">
                  {summaries?.map(s => {
                    const heir = heirs.find(h => h.id === s.heirId)!;
                    const heirDisplayName = isBn
                      ? (heir.id === 'heir-a' ? 'নুসরাত জাহান' : heir.id === 'heir-b' ? 'কামাল উদ্দিন' : 'রহিমা খাতুন')
                      : s.heirName.split('(')[0].trim();

                    return (
                      <div key={s.heirId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <HeirAvatar name={s.heirName} initials={heir.avatar} color={heir.color} />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-navy-800">{heirDisplayName}</div>
                          <div className="text-xs text-gray-500">
                            {isBn
                              ? `হিস্যা: ${formatNumber(s.entitlement)}% → বরাদ্দকৃত: ${formatArea(parseFloat(s.allocatedArea.toFixed(1)))}`
                              : `Entitlement: ${s.entitlement}% → Allocated: ${s.allocatedArea.toFixed(1)} dec`}
                            <span className={clsx('ml-1', s.areaDeviation >= 0 ? 'text-brand-600' : 'text-red-600')}>
                              ({s.areaDeviation >= 0 ? '+' : ''}{formatNumber(s.areaDeviation.toFixed(1))})
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-semibold text-navy-800">{formatCurrency(s.allocatedValue)}</div>
                          <Badge variant={s.accessStatus === 'direct' ? 'green' : 'yellow'}>
                            {s.accessStatus === 'direct' ? (isBn ? 'সরাসরি রাস্তা' : 'direct') : (isBn ? 'পরোক্ষ পথ' : 'indirect')}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pond arrangement result */}
              <div className={clsx(
                'rounded-xl p-4 border text-sm',
                inputs.pondArrangement === 'shared'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-amber-50 border-amber-200',
              )}>
                <div className="font-semibold text-navy-800 mb-1 flex items-center gap-2">
                  🐟 {isBn
                    ? (inputs.pondArrangement === 'shared' ? 'পুকুর ব্যবস্থা: সকল ওয়ারিশের যৌথ মালিকানা' : `পুকুর ব্যবস্থা: একক মালিকানায় প্রদান (${inputs.pondArrangement === 'heir-a' ? 'নুসরাত' : inputs.pondArrangement === 'heir-b' ? 'কামাল' : 'রহিমা'})`)
                    : `Pond Arrangement: ${inputs.pondArrangement === 'shared' ? 'Shared Among All Heirs' : `Exclusive to ${inputs.pondArrangement.replace('heir-', 'Heir ').toUpperCase()}`}`}
                </div>
                {inputs.pondArrangement === 'shared' ? (
                  <div className="text-xs text-gray-600">
                    {isBn
                      ? 'পারিবারিক পুকুরটি (৮.০ শতাংশ) যৌথ মালিকানাধীন সম্পদ হিসেবে বজায় থাকবে। সকল ওয়ারিশদের সমান অধিকার নিশ্চিত থাকবে।'
                      : 'The family pond (8.0 decimals) remains a jointly-owned shared resource. All heirs have equal access rights. Maintenance responsibilities should be specified in the partition deed. [SYNTHETIC DEMO]'}
                  </div>
                ) : (
                  <div className="text-xs text-amber-700 flex gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    {isBn
                      ? 'একক ওয়ারিশকে পুকুর বরাদ্দ করায় অপর দুই ওয়ারিশের প্রবেশাধিকার সংকুচিত হতে পারে। তাদের অনুকূলে বিকল্প জমি বা আর্থিক ক্ষতিপূরণ সমন্বয় প্রয়োজন হতে পারে।'
                      : 'Exclusive pond assignment removes access rights from the other two heirs. This may require compensating those heirs through adjusted plot values or additional payment. Legal documentation required. [SYNTHETIC DEMO]'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
