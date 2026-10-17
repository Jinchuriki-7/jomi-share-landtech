import { useNavigate } from 'react-router-dom';
import {
  Map, FileSearch, ShieldCheck, Scissors, AlertTriangle,
  TrendingUp, Users, FileText, CheckCircle, XCircle, AlertCircle,
  ArrowRight, BarChart2, Activity,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { StatCard, Badge, ProgressBar, SectionHeader, AlertBox } from '../components/ui';
import LandMap from '../components/map/LandMap';

const COLORS = ['#16a34a', '#2563eb', '#d97706'];

export default function OverviewPage() {
  const { landCase, heirs, plans } = useApp();
  const { lang, t, formatNumber, toBn } = useLanguage();
  const navigate = useNavigate();
  const isBn = lang === 'bn';

  const totalDiscrepancies = landCase.plots.reduce((s, p) => s + p.discrepancies.length, 0);
  const accessWarnings = landCase.plots.filter(p => p.roadAccess !== 'direct').length;
  const bestPlan = plans.reduce((best, p) => p.scores.overall > best.scores.overall ? p : best, plans[0]);

  const plotDistData = landCase.plots.map(p => ({
    name: isBn ? toBn(p.dagNumber) : p.dagNumber,
    area: p.area,
    value: Math.round(p.totalValue / 1000),
  }));

  const recordStatusData = [
    {
      name: isBn ? t.status.mismatch : 'Mismatch',
      value: landCase.plots.filter(p => p.recordStatus === 'mismatch').length,
      color: '#ef4444',
    },
    {
      name: isBn ? t.status.incomplete : 'Incomplete',
      value: landCase.plots.filter(p => p.recordStatus === 'incomplete').length,
      color: '#d97706',
    },
    {
      name: isBn ? t.status.verified : 'Verified',
      value: landCase.plots.filter(p => p.recordStatus === 'verified').length,
      color: '#16a34a',
    },
  ].filter(d => d.value > 0);

  const avgCompleteness = Math.round(landCase.plots.reduce((s, p) => s + p.completeness, 0) / landCase.plots.length);

  const heirEntitlementData = heirs.map(h => ({
    name: h.avatar,
    fullName: isBn
      ? (h.id === 'heir-a' ? 'নুসরাত জাহান' : h.id === 'heir-b' ? 'কামাল উদ্দিন' : 'রহিমা খাতুন')
      : h.name.split(' (')[0],
    entitlement: h.entitlement,
  }));

  const quickActions = [
    { label: t.overview.actionMap, icon: Map, path: '/map', color: 'bg-brand-50 text-brand-700' },
    { label: t.overview.actionDna, icon: FileSearch, path: '/land-dna', color: 'bg-blue-50 text-blue-700' },
    { label: t.overview.actionVerify, icon: ShieldCheck, path: '/verification', color: 'bg-purple-50 text-purple-700' },
    { label: t.overview.actionPartition, icon: Scissors, path: '/partition', color: 'bg-orange-50 text-orange-700' },
    { label: t.overview.actionHeatmap, icon: AlertTriangle, path: '/heatmap', color: 'bg-red-50 text-red-700' },
    { label: t.overview.actionReport, icon: FileText, path: '/reports', color: 'bg-gray-50 text-gray-700' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title={t.overview.title}
        subtitle={`${isBn ? 'সোনারগাঁও ভূমি কেস' : landCase.name} — ${isBn ? 'কৃত্রিম ডেমো ডেটা' : 'SYNTHETIC DEMO DATA'}`}
        actions={
          <Badge variant="yellow">{isBn ? 'ডেমো কেস ০০১' : 'Demo Case 001'}</Badge>
        }
      />

      <AlertBox type="info" title={t.overview.welcomeTitle}>
        {t.overview.welcomeDesc}
      </AlertBox>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label={t.overview.kpiTotalPlots}
          value={formatNumber(landCase.plots.length)}
          icon={<Map className="w-5 h-5 text-brand-600" />}
          color="bg-brand-50"
          sub={t.overview.subSynthetic}
        />
        <StatCard
          label={t.overview.kpiTotalArea}
          value={`${formatNumber(landCase.totalArea)} ${isBn ? 'শতাংশ' : 'dec'}`}
          icon={<Activity className="w-5 h-5 text-blue-600" />}
          color="bg-blue-50"
          sub={t.overview.subAcres}
        />
        <StatCard
          label={t.overview.kpiHeirs}
          value={formatNumber(heirs.length)}
          icon={<Users className="w-5 h-5 text-purple-600" />}
          color="bg-purple-50"
          sub={t.overview.subFictional}
        />
        <StatCard
          label={t.overview.kpiPlans}
          value={formatNumber(plans.length)}
          icon={<Scissors className="w-5 h-5 text-orange-600" />}
          color="bg-orange-50"
          sub={t.overview.subDeterministic}
        />
        <StatCard
          label={t.overview.kpiDiscrepancies}
          value={formatNumber(totalDiscrepancies)}
          icon={<AlertCircle className="w-5 h-5 text-red-600" />}
          color="bg-red-50"
          sub={t.overview.subRecordMismatches}
        />
        <StatCard
          label={t.overview.kpiAccessWarnings}
          value={formatNumber(accessWarnings)}
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          color="bg-amber-50"
          sub={t.overview.subIndirect}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Map preview */}
        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div>
              <div className="font-semibold text-navy-800 text-sm">{t.overview.mapPreview}</div>
              <div className="text-xs text-gray-500">{isBn ? 'মৌজাপুর ডেমো মৌজা — কৃত্রিম ডেমো' : 'Mouzapur Demo Mouza — SYNTHETIC DEMO'}</div>
            </div>
            <button onClick={() => navigate('/map')} className="btn-secondary text-xs py-1">
              {t.overview.openFullMap} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <LandMap height="320px" />
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Record Status */}
          <div className="card">
            <div className="font-semibold text-navy-800 text-sm mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" /> {t.overview.healthBreakdown}
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={recordStatusData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                  {recordStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${formatNumber(Number(v))} ${isBn ? 'টি দাগ' : 'DAGs'}`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1">
              {recordStatusData.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </div>
                  <span className="font-medium">{formatNumber(d.value)} {isBn ? 'টি' : `plot${d.value !== 1 ? 's' : ''}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Completeness */}
          <div className="card">
            <div className="font-semibold text-navy-800 text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-600" /> {isBn ? 'রেকর্ডের সম্পূর্ণতা' : 'Data Completeness'}
            </div>
            <div className="space-y-3">
              {landCase.plots.map(p => (
                <ProgressBar
                  key={p.id}
                  value={p.completeness}
                  label={isBn ? toBn(p.dagNumber) : p.dagNumber}
                  color={p.completeness >= 70 ? 'bg-brand-500' : p.completeness >= 50 ? 'bg-yellow-500' : 'bg-red-500'}
                />
              ))}
              <div className="pt-1 border-t border-gray-100">
                <ProgressBar value={avgCompleteness} label={isBn ? 'গড় সম্পূর্ণতা' : 'Average'} color="bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Plot distribution */}
        <div className="card">
          <div className="font-semibold text-navy-800 text-sm mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-brand-600" /> {t.overview.areaDistribution}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={plotDistData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} label={{ value: isBn ? 'শতাংশ' : 'Decimals', angle: -90, position: 'insideLeft', fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} label={{ value: isBn ? 'হাজার ৳' : '000 BDT', angle: 90, position: 'insideRight', fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="area" fill="#86efac" name={isBn ? 'জমির পরিমাণ (শতাংশ)' : 'Area (decimals)'} />
              <Bar yAxisId="right" dataKey="value" fill="#2563eb" name={isBn ? 'মূল্য (× ১০০০ ৳)' : 'Value (×1000 BDT)'} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-xs text-gray-400 mt-2">
            {isBn ? '* সকল মূল্য কৃত্রিম ডেমো ডেটা — বাজারমূল্যের সাথে সম্পর্কিত নয়' : '* All values are SYNTHETIC DEMO data — not real market prices'}
          </div>
        </div>

        {/* Heir entitlements */}
        <div className="card">
          <div className="font-semibold text-navy-800 text-sm mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" /> {isBn ? 'ওয়ারিশদের হিস্যা (ডেমো ইনপুট)' : 'Heir Entitlements (Demo Input)'}
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={heirEntitlementData} cx="50%" cy="50%" outerRadius={55} dataKey="entitlement" nameKey="name" label={(entry: any) => `${entry.name}: ${formatNumber(entry.entitlement)}%`} labelLine={false}>
                {heirEntitlementData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${formatNumber(Number(v))}%`, isBn ? 'প্রাপ্য হিস্যা' : 'Entitlement']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {heirs.map((h, i) => {
              const displayName = isBn
                ? (h.id === 'heir-a' ? 'নুসরাত জাহান' : h.id === 'heir-b' ? 'কামাল উদ্দিন' : 'রহিমা খাতুন')
                : h.name.split('(')[0].trim();
              return (
                <div key={h.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-gray-700">{displayName}</span>
                  </div>
                  <span className="font-semibold text-navy-800">{formatNumber(h.entitlement)}%</span>
                </div>
              );
            })}
          </div>
          <div className="text-xs text-amber-600 mt-2 pt-2 border-t border-gray-100">
            {isBn ? '⚠️ এগুলো ব্যবহারকারী প্রদত্ত ডেমো হিস্যা, আইনগত চূড়ান্ত ফারায়েজ নয়।' : '⚠️ These are user-defined demo inputs, not legally determined inheritance rights.'}
          </div>
        </div>
      </div>

      {/* Best plan summary */}
      <div className="card border-brand-100 bg-brand-50/30">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-semibold text-navy-800 text-sm flex items-center gap-2">
              <Scissors className="w-4 h-4 text-brand-600" />
              {t.overview.recommendedPlan}: {isBn
                ? (bestPlan?.id === 'plan-area' ? 'সম-ক্ষেত্রফল অগ্রাধিকার' : bestPlan?.id === 'plan-value' ? 'সম-মূল্য অগ্রাধিকার' : 'সরাসরি রাস্তা অগ্রাধিকার')
                : bestPlan?.name}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {isBn
                ? (bestPlan?.id === 'plan-area'
                    ? 'সকল ওয়ারিশের মধ্যে জমির পরিমাণ যথাসম্ভব সমান রাখার পরিকল্পনা।'
                    : bestPlan?.id === 'plan-value'
                    ? 'রাস্তা ও উচ্চ মূল্যের জমির সাথে পেছনের জমি সমন্বয় করে মোট বাজারমূল্য সমতা।'
                    : 'প্রত্যেক ওয়ারিশের জন্য নিজস্ব পাকা বা ব্যক্তিগত রাস্তা নিশ্চিতকরণ।')
                : bestPlan?.description}
            </div>
          </div>
          <button onClick={() => navigate('/partition')} className="btn-primary text-xs py-1.5">
            {isBn ? 'সব পরিকল্পনা দেখুন' : 'View Plans'} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        {bestPlan && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: isBn ? 'জমির পরিমাণের সমতা' : 'Area Fairness', value: bestPlan.scores.areaFairness },
              { label: isBn ? 'মূল্যের সমতা' : 'Value Fairness', value: bestPlan.scores.valueFairness },
              { label: isBn ? 'রাস্তা প্রবেশাধিকার' : 'Access Score', value: bestPlan.scores.accessScore },
              { label: isBn ? 'সামগ্রিক স্কোর' : 'Overall Score', value: bestPlan.scores.overall },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className={`text-xl font-bold ${s.value >= 70 ? 'text-brand-600' : s.value >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {formatNumber(Math.round(s.value))}
                </div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="font-semibold text-navy-800 text-sm mb-4">{t.overview.quickActionsTitle}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map(({ label, icon: Icon, path, color }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-center ${color}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="font-semibold text-navy-800 text-sm mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-gray-500" /> {isBn ? 'সাম্প্রতিক ডেমো কার্যক্রম' : 'Recent Demo Activity'}
        </div>
        <div className="space-y-3">
          {[
            {
              icon: <CheckCircle className="w-3.5 h-3.5 text-brand-500" />,
              text: isBn
                ? 'সোনারগাঁও ডেমো কেস ০০১-এর জন্য ৩টি বণ্টন পরিকল্পনা তৈরি হয়েছে'
                : '3 partition plans generated for Sonargaon Demo Case 001',
              time: isBn ? 'এইমাত্র' : 'Just now',
            },
            {
              icon: <XCircle className="w-3.5 h-3.5 text-red-500" />,
              text: isBn
                ? 'দাগ ১২৪৭-এ ক্ষেত্রফলের অমিল শনাক্ত হয়েছে (এসএ খতিয়ান বনাম সিএস খতিয়ান)'
                : 'Area discrepancy detected in DAG-1247 (SA Khatian vs CS Khatian)',
              time: isBn ? 'ডেমো ইভেন্ট' : 'Demo event',
            },
            {
              icon: <AlertCircle className="w-3.5 h-3.5 text-amber-500" />,
              text: isBn
                ? 'দাগ ১২৪৯-এ অসম্পূর্ণ নামজারি চিহ্নিত হয়েছে (MUT-PENDING/2021)'
                : 'Incomplete mutation flag on DAG-1249 (MUT-PENDING/2021)',
              time: isBn ? 'ডেমো ইভেন্ট' : 'Demo event',
            },
            {
              icon: <CheckCircle className="w-3.5 h-3.5 text-blue-500" />,
              text: isBn
                ? '৩টি কাল্পনিক দাগের ডিজিটাল ল্যান্ড ডিএনএ প্রোফাইল লোড হয়েছে'
                : 'Land DNA profiles loaded for 3 synthetic plots',
              time: isBn ? 'ডেমো ইভেন্ট' : 'Demo event',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              {item.icon}
              <span className="text-gray-600 flex-1">{item.text}</span>
              <span className="text-gray-400 flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100">
          {isBn
            ? 'প্রদর্শিত কার্যক্রম কৃত্রিম ডেমো ডেটাসেট থেকে সংগৃহীত — আসল কোনো ব্যবহারকারী বা সরকারি লেনদেন নয়।'
            : 'Activity shown is from synthetic demo dataset — not real user activity or government transactions.'}
        </div>
      </div>
    </div>
  );
}
