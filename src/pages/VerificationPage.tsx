import { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle, XCircle, Search, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Badge, SectionHeader, AlertBox } from '../components/ui';
import type { Plot, Discrepancy } from '../data/demoData';
import { translateDiscrepancy, translateDocOwner } from '../i18n/translations';
import clsx from 'clsx';

interface MatchResult {
  field: string;
  userValue: string;
  recordValue: string;
  status: 'match' | 'mismatch' | 'missing';
  explanation: string;
}

function matchRecords(plot: Plot, userInputs: Record<string, string>, isBn: boolean, toBn: (v: string | number) => string): MatchResult[] {
  const results: MatchResult[] = [];

  // DAG number check
  const cleanInput = (userInputs.dagNumber || '').trim();
  const normUser = cleanInput.toLowerCase().replace(/^(dag|দাগ)[\s\-_]*/i, '').replace(/[০-৯]/g, d => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));
  const normPlot = plot.dagNumber.toLowerCase().replace(/^(dag|দাগ)[\s\-_]*/i, '').replace(/[০-৯]/g, d => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));

  const dagMatch = cleanInput !== '' && (
    cleanInput.toLowerCase() === plot.dagNumber.toLowerCase() ||
    toBn(cleanInput) === toBn(plot.dagNumber) ||
    normUser === normPlot
  );

  results.push({
    field: isBn ? 'দাগ নম্বর' : 'DAG Number',
    userValue: cleanInput ? (isBn ? toBn(cleanInput) : cleanInput) : '—',
    recordValue: isBn ? toBn(plot.dagNumber) : plot.dagNumber,
    status: dagMatch ? 'match' : cleanInput ? 'mismatch' : 'missing',
    explanation: dagMatch
      ? (isBn ? 'দাগ নম্বর ডেমো রেকর্ডের সাথে হুবহু মিলেছে।' : 'DAG number matches the demo record.')
      : cleanInput
      ? (isBn ? `প্রদত্ত দাগ "${toBn(cleanInput)}" ডেমো রেকর্ড "${toBn(plot.dagNumber)}"-এর সাথে মেলেনি। [কৃত্রিম ডেমো]` : `Supplied DAG "${cleanInput}" does not match demo record "${plot.dagNumber}". [SYNTHETIC DEMO]`)
      : (isBn ? 'কোনো দাগ নম্বর প্রদান করা হয়নি।' : 'No DAG number supplied for comparison.'),
  });

  // Mouza check
  const mouzaMatch = userInputs.mouza ? userInputs.mouza.toLowerCase().trim() === plot.mouzaName.toLowerCase().trim() : false;
  results.push({
    field: isBn ? 'মৌজার নাম' : 'Mouza Name',
    userValue: userInputs.mouza || '—',
    recordValue: plot.mouzaName,
    status: userInputs.mouza ? (mouzaMatch ? 'match' : 'mismatch') : 'missing',
    explanation: userInputs.mouza
      ? (mouzaMatch
        ? (isBn ? 'মৌজার নাম সঠিকভাবে মিলেছে।' : 'Mouza name matches.')
        : (isBn ? `প্রদত্ত মৌজা "${userInputs.mouza}" রেকর্ডের সাথে মেলেনি। [কৃত্রিম ডেমো]` : `Supplied mouza "${userInputs.mouza}" does not match demo record "${plot.mouzaName}". [SYNTHETIC DEMO]`))
      : (isBn ? 'কোনো মৌজার নাম দেওয়া হয়নি।' : 'No mouza name supplied.'),
  });

  // Area check
  const suppliedArea = parseFloat(userInputs.area);
  if (!isNaN(suppliedArea)) {
    const diff = Math.abs(suppliedArea - plot.area);
    const pct = (diff / plot.area) * 100;
    results.push({
      field: isBn ? 'জমির পরিমাণ (শতাংশ)' : 'Area (Decimals)',
      userValue: isBn ? `${toBn(suppliedArea)} শতাংশ` : `${suppliedArea} dec`,
      recordValue: isBn ? `${toBn(plot.area)} শতাংশ` : `${plot.area} dec`,
      status: pct <= 1 ? 'match' : 'mismatch',
      explanation: pct <= 1
        ? (isBn ? '১% পরিমাপ সহনশীলতার মধ্যে জমির পরিমাণ মিলেছে।' : 'Area matches within 1% tolerance.')
        : (isBn
          ? `জমির পরিমাণে অমিল: প্রদত্ত ${toBn(suppliedArea)} শতাংশ বনাম রেকর্ডে ${toBn(plot.area)} শতাংশ (${toBn(pct.toFixed(1))}% বিচ্যুতি)। [কৃত্রিম ডেমো]`
          : `Area mismatch: supplied ${suppliedArea} decimals vs demo record ${plot.area} decimals (${pct.toFixed(1)}% deviation). [SYNTHETIC DEMO]`),
    });
  } else if (userInputs.area) {
    results.push({
      field: isBn ? 'জমির পরিমাণ (শতাংশ)' : 'Area (Decimals)',
      userValue: userInputs.area,
      recordValue: isBn ? `${toBn(plot.area)} শতাংশ` : `${plot.area} dec`,
      status: 'mismatch',
      explanation: isBn ? 'সঠিক সংখ্যা প্রদান করুন।' : 'Invalid area value supplied. Must be a number.',
    });
  }

  // Owner name check
  if (userInputs.ownerName) {
    const latestDoc = plot.documents[plot.documents.length - 1];
    const ownerMatch = latestDoc.owner.toLowerCase().includes(userInputs.ownerName.toLowerCase());
    results.push({
      field: isBn ? 'মালিক / ওয়ারিশের নাম' : 'Owner/Claimant Name',
      userValue: userInputs.ownerName,
      recordValue: isBn ? translateDocOwner(latestDoc.owner, 'bn') : latestDoc.owner,
      status: ownerMatch ? 'match' : 'mismatch',
      explanation: ownerMatch
        ? (isBn ? 'সর্বশেষ খতিয়ানের রেকর্ডে প্রদত্ত নাম পাওয়া গেছে।' : 'Supplied name found in the most recent document record.')
        : (isBn
          ? `প্রদত্ত নাম "${userInputs.ownerName}" সর্বশেষ নথির সাথে হুবহু মেলেনি। নামের বানানে পার্থক্য থাকতে পারে। [কৃত্রিম ডেমো]`
          : `Supplied name "${userInputs.ownerName}" not found in latest document "${latestDoc.type}: ${latestDoc.owner}". [SYNTHETIC DEMO]`),
    });
  }

  return results;
}

function DiscrepancyCard({ disc, isBn, toBn: _toBn }: { disc: Discrepancy; isBn: boolean; toBn: (v: string | number) => string }) {
  const td = translateDiscrepancy(disc, isBn ? 'bn' : 'en');
  const severityLabel = isBn
    ? (disc.severity === 'high' ? 'উচ্চ' : disc.severity === 'medium' ? 'মাঝারি' : 'স্বল্প')
    : disc.severity;

  return (
    <div className={clsx(
      'rounded-lg p-4 border',
      disc.severity === 'high' ? 'bg-red-50 border-red-200' :
      disc.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200',
    )}>
      <div className="flex items-start justify-between mb-2">
        <div className="font-medium text-navy-800 text-sm flex items-center gap-2">
          <AlertCircle className={clsx('w-4 h-4', disc.severity === 'high' ? 'text-red-600' : disc.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600')} />
          {td.field}
        </div>
        <Badge variant={disc.severity === 'high' ? 'red' : disc.severity === 'medium' ? 'yellow' : 'blue'}>
          {severityLabel} {isBn ? 'মাত্রা' : ''}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white/80 rounded p-2 text-xs">
          <div className="text-gray-500 mb-0.5">{isBn ? 'দলিলে যা আছে' : 'Document states'}</div>
          <div className="font-medium text-red-700">{td.docValue}</div>
        </div>
        <div className="bg-white/80 rounded p-2 text-xs">
          <div className="text-gray-500 mb-0.5">{isBn ? 'রেকর্ডে যা আছে' : 'Record states'}</div>
          <div className="font-medium text-navy-800">{td.recordValue}</div>
        </div>
      </div>
      <div className="text-xs text-gray-600">
        {td.explanation}
      </div>
    </div>
  );
}

export default function VerificationPage() {
  const { landCase } = useApp();
  const { lang, t, toBn, formatNumber } = useLanguage();
  const isBn = lang === 'bn';

  const [selectedPlotId, setSelectedPlotId] = useState(landCase.plots[0].id);
  const [inputs, setInputs] = useState({ dagNumber: '', mouza: '', area: '', ownerName: '' });
  const [matchResults, setMatchResults] = useState<MatchResult[] | null>(null);

  const selectedPlot = landCase.plots.find(p => p.id === selectedPlotId)!;
  const totalDiscrepancies = landCase.plots.reduce((s, p) => s + p.discrepancies.length, 0);

  const runMatch = () => {
    setMatchResults(matchRecords(selectedPlot, inputs, isBn, toBn));
  };

  const statusIcon = (s: MatchResult['status']) =>
    s === 'match' ? <CheckCircle className="w-4 h-4 text-brand-500" />
    : s === 'mismatch' ? <XCircle className="w-4 h-4 text-red-500" />
    : <AlertCircle className="w-4 h-4 text-gray-400" />;

  return (
    <div className="space-y-5">
      <SectionHeader
        title={t.verification.title}
        subtitle={t.verification.subtitle}
        actions={
          <Badge variant="red">
            {formatNumber(totalDiscrepancies)} {isBn ? 'টি অসঙ্গতি' : 'discrepancies'}
          </Badge>
        }
      />

      <AlertBox type="warning" title={isBn ? 'গুরুত্বপূর্ণ সীমাবদ্ধতা' : 'Important Limitation'}>
        {t.verification.alertInfo}
      </AlertBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Record Matcher */}
        <div className="space-y-4">
          <div className="card">
            <div className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-brand-600" />
              {isBn ? 'রেকর্ড মিল পরীক্ষা টুল' : 'Record Matching Tool'}
            </div>

            {/* Plot selector */}
            <div className="mb-4">
              <label className="label">{isBn ? 'যাচাইয়ের জন্য দাগ নির্বাচন করুন' : 'Select DAG to Verify Against'}</label>
              <div className="flex gap-2">
                {landCase.plots.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedPlotId(p.id); setMatchResults(null); }}
                    className={clsx(
                      'flex-1 py-2 px-3 rounded-lg border text-xs font-medium transition-all',
                      selectedPlotId === p.id
                        ? 'border-brand-400 bg-brand-50 text-brand-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600',
                    )}
                  >
                    {isBn ? toBn(p.dagNumber) : p.dagNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Input fields */}
            <div className="space-y-3">
              <div>
                <label className="label">{isBn ? 'দাগ নম্বর (আপনার দলিল অনুসারে)' : 'DAG Number (your document)'}</label>
                <input
                  className="input"
                  placeholder={isBn ? `যেমন: ${toBn(selectedPlot.dagNumber)}` : `e.g. ${selectedPlot.dagNumber}`}
                  value={inputs.dagNumber}
                  onChange={e => setInputs(p => ({ ...p, dagNumber: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">{isBn ? 'মৌজার নাম' : 'Mouza Name'}</label>
                <input
                  className="input"
                  placeholder={isBn ? `যেমন: ${selectedPlot.mouzaName}` : `e.g. ${selectedPlot.mouzaName}`}
                  value={inputs.mouza}
                  onChange={e => setInputs(p => ({ ...p, mouza: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">{isBn ? 'জমির পরিমাণ (শতাংশ)' : 'Area (decimals)'}</label>
                <input
                  className="input"
                  type="number"
                  step="0.1"
                  placeholder={isBn ? `যেমন: ${selectedPlot.area}` : `e.g. ${selectedPlot.area}`}
                  value={inputs.area}
                  onChange={e => setInputs(p => ({ ...p, area: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">{isBn ? 'মালিক / ওয়ারিশের নাম' : 'Owner / Claimant Name'}</label>
                <input
                  className="input"
                  placeholder={isBn ? 'যেমন: রহিমউদ্দিন মিয়া' : 'e.g. Rahimuddin Miah'}
                  value={inputs.ownerName}
                  onChange={e => setInputs(p => ({ ...p, ownerName: e.target.value }))}
                />
              </div>
              <button onClick={runMatch} className="btn-primary w-full justify-center">
                <Search className="w-4 h-4" /> {isBn ? 'রেকর্ডের মিল পরীক্ষা চালান' : 'Run Record Match'}
              </button>
            </div>
          </div>

          {/* Match results */}
          {matchResults && (
            <div className="card animate-fade-in">
              <div className="font-semibold text-navy-800 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                {isBn ? 'পরীক্ষার ফলাফল' : 'Match Results'}
              </div>
              <div className="space-y-2">
                {matchResults.map(r => (
                  <div key={r.field} className={clsx(
                    'rounded-lg p-3 border text-sm',
                    r.status === 'match' ? 'bg-brand-50 border-brand-200' :
                    r.status === 'mismatch' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200',
                  )}>
                    <div className="flex items-center gap-2 mb-1">
                      {statusIcon(r.status)}
                      <span className="font-medium text-navy-800">{r.field}</span>
                      <Badge variant={r.status === 'match' ? 'green' : r.status === 'mismatch' ? 'red' : 'gray'}>
                        {isBn ? (r.status === 'match' ? 'মিলেছে' : r.status === 'mismatch' ? 'মেলেনি' : 'তথ্য নেই') : r.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">{r.explanation}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-amber-700 bg-amber-50 rounded-lg p-2">
                {isBn
                  ? '⚠️ এই ফলাফলগুলো কৃত্রিম ডেমো ডেটা থেকে প্রস্তুতকৃত। এর কোনো আইনি ভিত্তি নেই এবং সরকারি সনদ নয়।'
                  : '⚠️ These results are from SYNTHETIC DEMO DATA only. They have no legal standing and do not represent verification by any government authority.'}
              </div>
            </div>
          )}
        </div>

        {/* Right: Pre-detected discrepancies */}
        <div className="space-y-4">
          <div className="card">
            <div className="font-semibold text-navy-800 mb-1 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              {isBn ? 'পূর্বে চিহ্নিত রেকর্ড অসঙ্গতিসমূহ' : 'Pre-Detected Discrepancies'}
            </div>
            <div className="text-xs text-gray-500 mb-4">
              {isBn
                ? 'কৃত্রিম ডেমো রেকর্ড থেকে স্বয়ংক্রিয়ভাবে শনাক্তকৃত — কৃত্রিম ডেমো ডেটা'
                : 'Automatically detected from synthetic demo records — SYNTHETIC DEMO DATA'}
            </div>
            {landCase.plots.map(plot => (
              <div key={plot.id} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-navy-800">{isBn ? toBn(plot.dagNumber) : plot.dagNumber}</span>
                  <Badge variant={plot.discrepancies.length > 0 ? 'red' : 'green'}>
                    {formatNumber(plot.discrepancies.length)} {isBn ? 'টি সমস্যা' : `issue${plot.discrepancies.length !== 1 ? 's' : ''}`}
                  </Badge>
                </div>
                {plot.discrepancies.length === 0 ? (
                  <div className="text-xs text-brand-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {isBn ? 'ডেমো ডেটাতে কোনো অসঙ্গতি নেই' : 'No discrepancies detected in demo data'}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {plot.discrepancies.map(d => <DiscrepancyCard key={d.id} disc={d} isBn={isBn} toBn={toBn} />)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Record summary table */}
          <div className="card">
            <div className="font-semibold text-navy-800 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              {isBn ? 'ডেমো রেকর্ড সারসংক্ষেপ' : 'Demo Record Summary'}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-gray-500 font-medium">{isBn ? 'দাগ' : 'DAG'}</th>
                    <th className="text-left py-2 text-gray-500 font-medium">{isBn ? 'সিএস পরিমাণ' : 'CS Area'}</th>
                    <th className="text-left py-2 text-gray-500 font-medium">{isBn ? 'এসএ পরিমাণ' : 'SA Area'}</th>
                    <th className="text-left py-2 text-gray-500 font-medium">{isBn ? 'অবস্থা' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="space-y-1">
                  {landCase.plots.map(p => {
                    const cs = p.documents.find(d => d.type === 'CS Khatian');
                    const sa = p.documents.find(d => d.type === 'SA Khatian');
                    return (
                      <tr key={p.id} className="border-b border-gray-50">
                        <td className="py-2 font-medium text-navy-800">{isBn ? toBn(p.dagNumber) : p.dagNumber}</td>
                        <td className="py-2">{cs ? `${isBn ? toBn(cs.area) : cs.area} ${isBn ? 'শতাংশ' : 'dec'}` : '—'}</td>
                        <td className="py-2">
                          {sa ? (
                            <span className={sa.status !== 'consistent' ? 'text-red-600 font-medium' : ''}>
                              {isBn ? toBn(sa.area) : sa.area} {isBn ? 'শতাংশ' : 'dec'}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="py-2">
                          <Badge variant={p.recordStatus === 'verified' ? 'green' : p.recordStatus === 'mismatch' ? 'red' : 'yellow'}>
                            {t.status[p.recordStatus] || p.recordStatus}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
