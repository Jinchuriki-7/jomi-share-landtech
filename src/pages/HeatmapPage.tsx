import { AlertTriangle, AlertCircle, TrendingUp, Navigation, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { computeConflictRisks } from '../engine/partitionEngine';
import { Badge, SectionHeader, AlertBox } from '../components/ui';
import LandMap from '../components/map/LandMap';
import { translateRiskWarning } from '../i18n/translations';
import clsx from 'clsx';

function RiskBar({ value, label, formatNumber }: { value: number; label: string; formatNumber: (v: number | string) => string }) {
  const color = value >= 70 ? 'bg-red-500' : value >= 40 ? 'bg-yellow-500' : 'bg-brand-500';
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className={clsx('font-semibold', value >= 70 ? 'text-red-600' : value >= 40 ? 'text-yellow-600' : 'text-brand-600')}>
          {formatNumber(value)}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={clsx('h-full rounded-full transition-all duration-500', color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function HeatmapPage() {
  const { landCase, plans } = useApp();
  const { lang, t, toBn, formatNumber, formatArea } = useLanguage();
  const isBn = lang === 'bn';

  const risks = computeConflictRisks(landCase.plots, plans);
  const maxRisk = Math.max(...risks.map(r => r.overallRisk));
  const overallRiskColor = maxRisk >= 70 ? 'text-red-600' : maxRisk >= 40 ? 'text-yellow-600' : 'text-brand-600';

  return (
    <div className="space-y-5">
      <SectionHeader
        title={t.heatmap.title}
        subtitle={t.heatmap.subtitle}
        actions={
          <Badge variant={maxRisk >= 70 ? 'red' : maxRisk >= 40 ? 'yellow' : 'green'}>
            {isBn ? 'সর্বোচ্চ ঝুঁকি: ' : 'Max Risk: '} {formatNumber(maxRisk)}
          </Badge>
        }
      />

      <AlertBox type="warning" title={t.heatmap.disclaimerTitle}>
        {t.heatmap.disclaimer}
      </AlertBox>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Risk cards */}
        <div className="space-y-4">
          {risks.map(risk => {
            const plot = landCase.plots.find(p => p.id === risk.plotId)!;
            return (
              <div
                key={risk.plotId}
                className={clsx(
                  'card border-l-4',
                  risk.overallRisk >= 70 ? 'border-l-red-500' :
                  risk.overallRisk >= 40 ? 'border-l-yellow-500' : 'border-l-brand-500',
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-navy-800">{isBn ? toBn(risk.dagNumber) : risk.dagNumber}</div>
                    <div className="text-xs text-gray-500">
                      {t.status[plot.classification] || plot.classification} · {formatArea(plot.area)}
                    </div>
                  </div>
                  <div className={clsx('text-2xl font-bold', overallRiskColor)}>
                    {formatNumber(risk.overallRisk)}
                    <span className="text-xs font-normal text-gray-500 ml-0.5">/{formatNumber(100)}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <RiskBar value={risk.accessRisk} label={isBn ? 'রাস্তা সংক্রান্ত ঝুঁকি' : 'Access Risk'} formatNumber={formatNumber} />
                  <RiskBar value={risk.valueRisk} label={isBn ? 'মূল্য বৈষম্যের ঝুঁকি' : 'Value Disparity Risk'} formatNumber={formatNumber} />
                  <RiskBar value={risk.recordRisk} label={isBn ? 'রেকর্ড সংক্রান্ত ঝুঁকি' : 'Record Risk'} formatNumber={formatNumber} />
                </div>

                {risk.warnings.length > 0 && (
                  <div className="space-y-1">
                    {risk.warnings.map((w, i) => (
                      <div key={i} className={clsx(
                        'text-xs rounded-lg px-2 py-1.5 flex gap-1.5',
                        risk.overallRisk >= 70 ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700',
                      )}>
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        {translateRiskWarning(w, lang)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Map + risk overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="font-semibold text-sm text-navy-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                {isBn ? 'বিরোধ ঝুঁকি মানচিত্র' : 'Conflict Risk Map'}
              </div>
              <Badge variant="yellow">{isBn ? 'অনুমিত নির্দেশক মাত্র' : 'Heuristic indicators only'}</Badge>
            </div>
            <LandMap height="350px" />
          </div>

          {/* Risk summary table */}
          <div className="card">
            <div className="font-semibold text-navy-800 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-600" />
              {isBn ? 'ঝুঁকি সারসংক্ষেপ টেবিল' : 'Risk Summary Table'}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500">
                    <th className="text-left py-2">{isBn ? 'দাগ' : 'DAG'}</th>
                    <th className="text-right py-2">{isBn ? 'রাস্তা ঝুঁকি' : 'Access Risk'}</th>
                    <th className="text-right py-2">{isBn ? 'মূল্য ঝুঁকি' : 'Value Risk'}</th>
                    <th className="text-right py-2">{isBn ? 'রেকর্ড ঝুঁকি' : 'Record Risk'}</th>
                    <th className="text-right py-2">{isBn ? 'সামগ্রিক' : 'Overall'}</th>
                    <th className="text-right py-2">{isBn ? 'মাত্রা' : 'Level'}</th>
                  </tr>
                </thead>
                <tbody>
                  {risks.map(risk => (
                    <tr key={risk.plotId} className="border-b border-gray-50">
                      <td className="py-2 font-medium text-navy-800">{isBn ? toBn(risk.dagNumber) : risk.dagNumber}</td>
                      <td className="py-2 text-right">
                        <span className={risk.accessRisk >= 70 ? 'text-red-600 font-bold' : risk.accessRisk >= 40 ? 'text-yellow-600' : 'text-brand-600'}>
                          {formatNumber(risk.accessRisk)}
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <span className={risk.valueRisk >= 70 ? 'text-red-600 font-bold' : risk.valueRisk >= 40 ? 'text-yellow-600' : 'text-brand-600'}>
                          {formatNumber(risk.valueRisk)}
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <span className={risk.recordRisk >= 70 ? 'text-red-600 font-bold' : risk.recordRisk >= 40 ? 'text-yellow-600' : 'text-brand-600'}>
                          {formatNumber(risk.recordRisk)}
                        </span>
                      </td>
                      <td className="py-2 text-right font-bold">
                        <span className={risk.overallRisk >= 70 ? 'text-red-600' : risk.overallRisk >= 40 ? 'text-yellow-600' : 'text-brand-600'}>
                          {formatNumber(risk.overallRisk)}
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <Badge variant={risk.overallRisk >= 70 ? 'red' : risk.overallRisk >= 40 ? 'yellow' : 'green'}>
                          {risk.overallRisk >= 70 ? (isBn ? 'উচ্চ' : 'High') : risk.overallRisk >= 40 ? (isBn ? 'মাঝারি' : 'Medium') : (isBn ? 'স্বল্প' : 'Low')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk explanations */}
          <div className="card">
            <div className="font-semibold text-navy-800 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              {isBn ? 'ঝুঁকি উপাদানসমূহের ব্যাখ্যা' : 'Risk Factor Explanations'}
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: <Navigation className="w-4 h-4 text-amber-600" />,
                  title: isBn ? 'রাস্তা প্রবেশাধিকার ঝুঁকি' : 'Access Risk',
                  desc: isBn
                    ? 'প্রতিটি দাগে সরাসরি সরকারি বা প্রশস্ত রাস্তা আছে কি না তা পরিমাপ করে। চলাচলের পথহীন অবরুদ্ধ দাগ সর্বোচ্চ ৯০ স্কোর পায়, পরোক্ষ পথের ক্ষেত্রে ৫৫ এবং সরাসরি পাকা রাস্তা থাকলে সর্বনিম্ন ৫ স্কোর দেওয়া হয়।'
                    : 'Measures whether each plot has verified direct road access. Landlocked plots (no access) score 90. Plots with indirect access (requiring passage through another plot) score 55. Plots with confirmed direct road access score 5.',
                },
                {
                  icon: <TrendingUp className="w-4 h-4 text-blue-600" />,
                  title: isBn ? 'মূল্য বৈষম্যের ঝুঁকি' : 'Value Disparity Risk',
                  desc: isBn
                    ? 'প্রতিটি দাগের শতাংশ প্রতি বাজারমূল্য পুরো কেসের গড় মূল্যের চেয়ে কতটা বেশি বা কম তা পরিমাপ করে। অতিরিক্ত বৈষম্য থাকলে বণ্টন নিয়ে ওয়ারিশদের মধ্যে টানাপোড়েন সৃষ্টি হতে পারে।'
                    : 'Measures how far each plot\'s estimated value-per-decimal deviates from the portfolio average. High deviation creates unequal partition outcomes and may incentivise disputes over which heir receives which plot. Based on synthetic demo values only.',
                },
                {
                  icon: <AlertCircle className="w-4 h-4 text-red-600" />,
                  title: isBn ? 'রেকর্ড সংক্রান্ত ঝুঁকি' : 'Record Risk',
                  desc: isBn
                    ? 'খতিয়ান ও নামজারির নির্ভরযোগ্যতা ও ত্রুটি নির্দেশ করে। অমীমাংসিত নামজারি থাকলে ৮০ এবং সিএস বনাম এসএ খতিয়ানের পরিমাপে গরমিল থাকলে ৫০ ঝুঁকি স্কোর নির্ধারিত হয়।'
                    : 'Reflects the quality and completeness of synthetic land records. Incomplete mutations (e.g., MUT-PENDING) receive a high score of 80. Record mismatches (e.g., area differences between CS and SA Khatian) score 50. Missing RS Khatian also raises completeness risk.',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <div className="text-sm font-medium text-navy-800">{title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
