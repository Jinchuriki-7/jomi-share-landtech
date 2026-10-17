import { useState, useRef } from 'react';
import { FileText, Printer, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { buildHeirSummaries, computeConflictRisks } from '../engine/partitionEngine';
import { Badge, SectionHeader } from '../components/ui';
import { translateDiscrepancy, translateRiskWarning } from '../i18n/translations';
import clsx from 'clsx';

export default function ReportsPage() {
  const { landCase, heirs, plans, selectedPlanId } = useApp();
  const { lang, t, toBn, formatNumber, formatArea, formatCurrency } = useLanguage();
  const isBn = lang === 'bn';

  const [selectedReportPlan, setSelectedReportPlan] = useState(selectedPlanId || plans[0].id);
  const reportRef = useRef<HTMLDivElement>(null);

  const plan = plans.find(p => p.id === selectedReportPlan) || plans[0];
  const summaries = buildHeirSummaries(plan, heirs, landCase.plots, landCase.totalArea, landCase.totalValue);
  const risks = computeConflictRisks(landCase.plots, plans);
  const now = new Date().toLocaleDateString(isBn ? 'bn-BD' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const getHeirDisplayName = (heirName: string, heirId: string) => {
    if (!isBn) return heirName.split('(')[0].trim();
    if (heirId === 'heir-a') return 'নুসরাত জাহান';
    if (heirId === 'heir-b') return 'কামাল উদ্দিন';
    if (heirId === 'heir-c') return 'রহিমা খাতুন';
    return heirName;
  };

  const getHeirRelation = (heirId: string, defaultRel: string) => {
    if (!isBn) return defaultRel;
    if (heirId === 'heir-a') return 'জ্যেষ্ঠ কন্যা';
    if (heirId === 'heir-b') return 'একমাত্র পুত্র';
    if (heirId === 'heir-c') return 'কনিষ্ঠ কন্যা';
    return defaultRel;
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title={t.reports.title}
        subtitle={t.reports.subtitle}
        actions={
          <div className="flex gap-2">
            <button onClick={handlePrint} className="btn-secondary text-xs py-1.5 gap-1.5 no-print">
              <Printer className="w-3.5 h-3.5" /> {isBn ? 'প্রিন্ট / পিডিএফ ডাউনলোড' : 'Print / Save PDF'}
            </button>
          </div>
        }
      />

      {/* Plan selector */}
      <div className="card no-print">
        <div className="text-sm font-semibold text-navy-800 mb-3">
          {isBn ? 'রিপোর্টের জন্য পরিকল্পনা নির্বাচন করুন' : 'Select Plan for Report'}
        </div>
        <div className="flex gap-2 flex-wrap">
          {plans.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedReportPlan(p.id)}
              className={clsx(
                'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                selectedReportPlan === p.id
                  ? 'border-brand-400 bg-brand-50 text-brand-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600',
              )}
            >
              {isBn
                ? (p.id === 'plan-area' ? 'সম-ক্ষেত্রফল অগ্রাধিকার' : p.id === 'plan-value' ? 'সম-মূল্য অগ্রাধিকার' : 'সরাসরি রাস্তা অগ্রাধিকার')
                : p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Report */}
      <div ref={reportRef} className="card space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="text-2xl font-bold text-navy-800">{isBn ? 'জমি-শেয়ার' : 'JOMI-SHARE'}</div>
              <div className="text-sm text-gray-500 mt-0.5">
                {isBn ? 'এআই-চালিত ভূমি বুদ্ধিমত্তা ও উত্তরাধিকার সমবণ্টন প্ল্যাটফর্ম' : 'AI-Powered Land Intelligence & Inheritance Partition Platform'}
              </div>
            </div>
            <div className="text-right">
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-xs text-red-800 font-bold">
                {isBn ? (
                  <>
                    ⚠️ ডেমো প্রতিবেদন — কৃত্রিম ডেটা<br />
                    কোনো আইনগত মালিকানা সনদ বা<br />
                    রেজিস্ট্রিকৃত বণ্টননামা দলিল নয়
                  </>
                ) : (
                  <>
                    ⚠️ DEMO REPORT — SYNTHETIC DATA<br />
                    NOT A LEGAL OWNERSHIP CERTIFICATE<br />
                    OR PARTITION DEED
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-xs text-gray-500">{isBn ? 'রিপোর্টের তারিখ' : 'Report Date'}</div>
              <div className="font-medium">{now}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">{isBn ? 'কেস নম্বর' : 'Case ID'}</div>
              <div className="font-medium">{isBn ? toBn(landCase.id) : landCase.id}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">{isBn ? 'পরিকল্পনা' : 'Plan'}</div>
              <div className="font-medium">
                {isBn
                  ? (plan.id === 'plan-area' ? 'সম-ক্ষেত্রফল অগ্রাধিকার' : plan.id === 'plan-value' ? 'সম-মূল্য অগ্রাধিকার' : 'সরাসরি রাস্তা অগ্রাধিকার')
                  : plan.name}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">{isBn ? 'সামগ্রিক স্কোর' : 'Overall Score'}</div>
              <div className="font-bold text-brand-700">{formatNumber(Math.round(plan.scores.overall))}/{formatNumber(100)}</div>
            </div>
          </div>
        </div>

        {/* Case Info */}
        <div>
          <div className="text-lg font-bold text-navy-800 mb-1">
            {isBn ? '১. কেসের তথ্যাবলি — কৃত্রিম ডেমো' : '1. Case Information — SYNTHETIC DEMO'}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 mb-3">
            {isBn
              ? 'এই প্রতিবেদনের সকল ব্যক্তি, দাগ নম্বর, খতিয়ান ও আর্থিক মূল্য কাল্পনিক কৃত্রিম ডেমো ডেটা। এটি বাস্তব কোনো সরকারি ডাটাবেজের সাথে সংযুক্ত নয়।'
              : 'All names, plots, records, and values in this report are fictional synthetic demo data. They do not represent real people, real land parcels, real government records, or real monetary values.'}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              [isBn ? 'কেসের নাম' : 'Case Name', isBn ? 'সোনারগাঁও পারিবারিক ভূমি বণ্টন নিষ্পত্তি' : landCase.name],
              [isBn ? 'বিবরণ' : 'Description', isBn ? 'সোনারগাঁও মৌজায় ওয়ারিশদের মধ্যে ৩টি প্লটের সমবণ্টন প্রক্রিয়া' : landCase.description],
              [isBn ? 'মোট দাগ সংখ্যা' : 'Total Plots', `${formatNumber(landCase.plots.length)} ${isBn ? 'টি কাল্পনিক দাগ' : 'synthetic plots'}`],
              [isBn ? 'মোট জমির পরিমাণ' : 'Total Area', `${formatArea(landCase.totalArea)} (${formatNumber((landCase.totalArea / 100).toFixed(3))} ${isBn ? 'একর' : 'acres'})`],
              [isBn ? 'প্রাক্কলিত মোট মূল্য' : 'Estimated Total Value', `${formatCurrency(landCase.totalValue)} ${isBn ? '(কৃত্রিম)' : '(SYNTHETIC)'}`],
              [isBn ? 'ওয়ারিশ সংখ্যা' : 'No. of Heirs', `${formatNumber(heirs.length)} ${isBn ? 'জন কাল্পনিক ওয়ারিশ' : 'fictional heirs'}`],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-xs text-gray-500">{k}</div>
                <div className="font-medium text-navy-800 text-xs">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Plot IDs */}
        <div>
          <div className="text-lg font-bold text-navy-800 mb-3">
            {isBn ? '২. দাগের পরিচিতি ও রেকর্ড তফসিল' : '2. Plot Identifiers — SYNTHETIC DEMO'}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'আইডি' : 'Plot ID'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'দাগ নম্বর' : 'DAG Number'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'মৌজা' : 'Mouza'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-right text-gray-600">{isBn ? 'পরিমাণ (শতাংশ)' : 'Area (dec)'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'শ্রেণী' : 'Classification'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'রাস্তা' : 'Access'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'রেকর্ড অবস্থা' : 'Record Status'}</th>
                </tr>
              </thead>
              <tbody>
                {landCase.plots.map(p => (
                  <tr key={p.id}>
                    <td className="border border-gray-200 px-3 py-2">{isBn ? toBn(p.id) : p.id}</td>
                    <td className="border border-gray-200 px-3 py-2 font-medium">{isBn ? toBn(p.dagNumber) : p.dagNumber}</td>
                    <td className="border border-gray-200 px-3 py-2">{p.mouzaName}</td>
                    <td className="border border-gray-200 px-3 py-2 text-right">{formatNumber(p.area)}</td>
                    <td className="border border-gray-200 px-3 py-2">{t.status[p.classification] || p.classification}</td>
                    <td className="border border-gray-200 px-3 py-2">
                      {p.roadAccess === 'direct' ? (isBn ? 'সরাসরি রাস্তা' : 'direct') : (isBn ? 'পরোক্ষ পথ' : 'indirect')}
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      <Badge variant={p.recordStatus === 'verified' ? 'green' : p.recordStatus === 'mismatch' ? 'red' : 'yellow'}>
                        {t.status[p.recordStatus] || p.recordStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Entitlements */}
        <div>
          <div className="text-lg font-bold text-navy-800 mb-3">
            {isBn ? '৩. ওয়ারিশদের হিস্যা — ডেমো ইনপুট' : '3. Supplied Entitlements — User-Defined Demo Input'}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 mb-3">
            {isBn
              ? 'নিচের হিস্যার শতকরা হার ব্যবহারকারীর প্রদত্ত ডেমো ইনপুট। এটি কোনো আইনগত ফারায়েজের ভিত্তি নয়।'
              : 'These entitlement percentages are user-defined demo inputs, not legally determined inheritance rights.'}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'ওয়ারিশ' : 'Heir'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'সম্পর্ক' : 'Relation'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-right text-gray-600">{isBn ? 'হিস্যা %' : 'Entitlement %'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-right text-gray-600">{isBn ? 'প্রাপ্য জমি (শতাংশ)' : 'Entitled Area (dec)'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-right text-gray-600">{isBn ? 'প্রাপ্য মূল্য (৳)' : 'Entitled Value (৳)'}</th>
                </tr>
              </thead>
              <tbody>
                {summaries.map(s => {
                  const heir = heirs.find(h => h.id === s.heirId)!;
                  return (
                    <tr key={s.heirId}>
                      <td className="border border-gray-200 px-3 py-2 font-medium">{getHeirDisplayName(s.heirName, s.heirId)}</td>
                      <td className="border border-gray-200 px-3 py-2">{getHeirRelation(s.heirId, heir.relation)}</td>
                      <td className="border border-gray-200 px-3 py-2 text-right font-bold">{formatNumber(s.entitlement)}%</td>
                      <td className="border border-gray-200 px-3 py-2 text-right">{formatNumber(s.entitlementArea.toFixed(1))}</td>
                      <td className="border border-gray-200 px-3 py-2 text-right">{formatCurrency(Math.round(s.entitlementValue))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Proposed Allocation */}
        <div>
          <div className="text-lg font-bold text-navy-800 mb-3">
            {isBn ? `৪. প্রস্তাবিত বণ্টন তফসিল — ${plan.name}` : `4. Proposed Allocation — ${plan.name}`}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'ওয়ারিশ' : 'Heir'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'বরাদ্দকৃত দাগ' : 'Allocated DAG'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-right text-gray-600">{isBn ? 'পরিমাণ (শতাংশ)' : 'Area (dec)'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-right text-gray-600">{isBn ? 'মূল্য (৳)' : 'Value (৳)'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-right text-gray-600">{isBn ? 'জমির তারতম্য' : 'Area Dev.'}</th>
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-600">{isBn ? 'রাস্তা প্রাপ্তি' : 'Road Access'}</th>
                </tr>
              </thead>
              <tbody>
                {summaries.map((s: any) => {
                  const myAllocs = plan.allocations.filter((a: any) => a.heirId === s.heirId);
                  return myAllocs.map((alloc: any, i: number) => {
                    const plot = landCase.plots.find(p => p.id === alloc.plotId)!;
                    return (
                      <tr key={alloc.subPlotId}>
                        {i === 0 && (
                          <td className="border border-gray-200 px-3 py-2 font-medium" rowSpan={myAllocs.length}>
                            {getHeirDisplayName(s.heirName, s.heirId)}
                          </td>
                        )}
                        <td className="border border-gray-200 px-3 py-2">{isBn ? toBn(plot.dagNumber) : plot.dagNumber}</td>
                        <td className="border border-gray-200 px-3 py-2 text-right">{formatNumber(alloc.allocatedArea.toFixed(1))}</td>
                        <td className="border border-gray-200 px-3 py-2 text-right">{formatCurrency(alloc.allocatedValue)}</td>
                        {i === 0 && (
                          <td className="border border-gray-200 px-3 py-2 text-right" rowSpan={myAllocs.length}>
                            <span className={s.areaDeviation >= 0 ? 'text-brand-600' : 'text-red-600'}>
                              {s.areaDeviation >= 0 ? '+' : ''}{formatNumber(s.areaDeviation.toFixed(1))}
                            </span>
                          </td>
                        )}
                        <td className="border border-gray-200 px-3 py-2">
                          <span className={alloc.hasDirectAccess ? 'text-brand-600' : 'text-red-600'}>
                            {alloc.hasDirectAccess ? (isBn ? '✓ সরাসরি' : '✓ Direct') : (isBn ? '⚠ পরোক্ষ' : '⚠ Indirect')}
                          </span>
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Record Discrepancies */}
        <div>
          <div className="text-lg font-bold text-navy-800 mb-3">
            {isBn ? '৫. রেকর্ড ও খতিয়ানের অসঙ্গতিসমূহ' : '5. Record Discrepancies'}
          </div>
          {landCase.plots.every(p => p.discrepancies.length === 0) ? (
            <div className="text-sm text-brand-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> {isBn ? 'ডেমো ডেটাতে কোনো অসঙ্গতি নেই।' : 'No discrepancies detected in demo data.'}
            </div>
          ) : (
            <div className="space-y-2">
              {landCase.plots.flatMap(p => p.discrepancies.map(d => {
                const tr = translateDiscrepancy(d, lang);
                return (
                  <div key={d.id} className={clsx(
                    'rounded-lg p-3 border text-xs',
                    d.severity === 'high' ? 'bg-red-50 border-red-200' :
                    d.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200',
                  )}>
                    <div className="font-semibold mb-1">
                      {isBn ? `${toBn(p.dagNumber)} — ${tr.field}` : `DAG ${p.dagNumber.replace(/^DAG-?/i, '')} — ${tr.field}`}
                      <Badge variant={d.severity === 'high' ? 'red' : d.severity === 'medium' ? 'yellow' : 'blue'} className="ml-2">
                        {d.severity === 'high' ? (isBn ? 'উচ্চ' : 'high') : (isBn ? 'মাঝারি' : 'medium')}
                      </Badge>
                    </div>
                    <div className="text-gray-600">
                      {tr.explanation}
                    </div>
                  </div>
                );
              }))}
            </div>
          )}
        </div>

        {/* Conflict Risk */}
        <div>
          <div className="text-lg font-bold text-navy-800 mb-3">
            {isBn ? '৬. বিরোধ ঝুঁকির নির্দেশক' : '6. Conflict Risk Indicators'}
          </div>
          <div className="space-y-2">
            {risks.map(risk => (
              <div key={risk.plotId} className={clsx(
                'rounded-lg p-3 border text-xs',
                risk.overallRisk >= 70 ? 'bg-red-50 border-red-200' :
                risk.overallRisk >= 40 ? 'bg-amber-50 border-amber-200' : 'bg-brand-50 border-brand-200',
              )}>
                <div className="font-semibold mb-1 flex items-center gap-2">
                  {isBn ? toBn(risk.dagNumber) : risk.dagNumber}
                  <Badge variant={risk.overallRisk >= 70 ? 'red' : risk.overallRisk >= 40 ? 'yellow' : 'green'}>
                    {isBn ? 'সামগ্রিক ঝুঁকি: ' : 'Overall Risk: '} {formatNumber(risk.overallRisk)}
                  </Badge>
                </div>
                {risk.warnings.length > 0
                  ? risk.warnings.map((w, i) => <div key={i} className="text-gray-600">• {translateRiskWarning(w, lang)}</div>)
                  : <div className="text-brand-600">{isBn ? 'ডেমো ডেটাতে উল্লেখযোগ্য ঝুঁকি নেই।' : 'No significant risk indicators detected in demo data.'}</div>
                }
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div>
          <div className="text-lg font-bold text-navy-800 mb-3">
            {isBn ? '৭. সীমাবদ্ধতা ও অমীমাংসিত শর্তাবলী' : '7. Limitations & Unresolved Constraints'}
          </div>
          <div className="space-y-2 text-xs">
            {[
              {
                icon: <XCircle className="w-3.5 h-3.5 text-red-500" />,
                text: isBn
                  ? 'এই পরিকল্পনা দাগ ১২৪৯-এর অসম্পূর্ণ নামজারি (MUT-PENDING/2021) সমাধান করে না। সহকারী কমিশনার (ভূমি) অফিসে নামজারি না হওয়া পর্যন্ত দলিল কার্যকর করা যাবে না।'
                  : 'The partition plan does not resolve the incomplete mutation on DAG-1249 (MUT-PENDING/2021). Physical partition cannot proceed until this mutation is completed with the relevant land administration authority.',
              },
              {
                icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
                text: isBn
                  ? 'প্রদর্শিত আর্থিক মূল্য আনুমানিক ও কৃত্রিম। বাস্তব বণ্টনের ক্ষেত্রে সরকার অনুমোদিত সাব-রেজিস্ট্রারের নির্ধারিত মৌজা রেট বা সনদপ্রাপ্ত সার্ভেয়ার দ্বারা মূল্যায়ন প্রয়োজন।'
                  : 'Area value estimates are synthetic demo values only. Real partition requires formal valuation by a licensed land valuer or government-appointed authority.',
              },
              {
                icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
                text: isBn
                  ? 'দাগ ১২৪৯-এর রাস্তা পরোক্ষ। স্থায়ী সমাধানের জন্য বণ্টননামা দলিলে সুস্পষ্ট নিকাশ বা চলাচলের পথের স্বত্বাধিকার (Easement rights) অন্তর্ভুক্ত করতে হবে।'
                  : 'Road access for DAG-1249 is indirect. Physical partition requires either a formal easement agreement documented in the partition deed or alternative access negotiation.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-2">
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div className="text-gray-600">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Co-owners Signature Block */}
        <div className="border-t border-gray-200 pt-6">
          <div className="text-sm font-bold text-navy-800 mb-2">
            {isBn ? '৮. ওয়ারিশ ও সহ-মালিকগণের সম্মতি স্বাক্ষর (খসড়া প্রস্তাব)' : '8. Signatures of Co-Owners / Heirs (Proposal Acceptance)'}
          </div>
          <div className="text-xs text-gray-500 mb-6">
            {isBn
              ? 'নিচে স্বাক্ষরকারী ওয়ারিশগণ ঘোষণা করিতেছেন যে, তাহারা এই সিমুলেশন প্রস্তাব পর্যালোচনা করিয়াছেন এবং সমঝোতার ভিত্তিতে রেজিস্ট্রি দলিলের সিদ্ধান্ত গ্রহণ করিবেন:'
              : 'By signing below, the heirs acknowledge receipt and review of this partition simulation proposal:'}
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8">
            {heirs.map(h => (
              <div key={h.id} className="text-center">
                <div className="border-b border-gray-400 pb-1 mb-1 font-medium text-xs">
                  {getHeirDisplayName(h.name, h.id)}
                </div>
                <div className="text-[10px] text-gray-400">
                  {isBn ? 'ওয়ারিশের স্বাক্ষর' : 'Signature of Heir'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 text-xs text-gray-500 space-y-1">
          <div className="font-bold text-red-700">
            {isBn
              ? 'ডেমো রিপোর্ট — কৃত্রিম ডেটা — এটি কোনো বৈধ মালিকানা সনদ বা বণ্টননামা দলিল নয়'
              : 'DEMO REPORT — SYNTHETIC DATA — NOT A LEGAL OWNERSHIP CERTIFICATE OR PARTITION DEED'}
          </div>
          <div>
            {isBn
              ? `জমি-শেয়ার প্ল্যাটফর্ম দ্বারা প্রস্তুতকৃত · ${now} · ল্যান্ডটেক হ্যাকাথন — বাংলাদেশ`
              : `Generated by JOMI-SHARE v1.0 Demo · ${now} · LandTech Hackathon — Bangladesh`}
          </div>
        </div>
      </div>
    </div>
  );
}
