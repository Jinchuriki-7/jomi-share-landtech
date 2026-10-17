import { useState } from 'react';
import { FileSearch, CheckCircle, XCircle, AlertCircle, Clock, BarChart2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Badge, SectionHeader, AlertBox, ProgressBar } from '../components/ui';
import { DEMO_TIMELINE } from '../data/demoData';
import type { Plot } from '../data/demoData';
import { translateDocType, translateDocOwner, translateDocNotes, translateDiscrepancy, translateTimelineEvent } from '../i18n/translations';
import clsx from 'clsx';

const DOC_TYPE_COLORS: Record<string, string> = {
  'CS Khatian': 'blue',
  'SA Khatian': 'navy',
  'RS Khatian': 'green',
  'Mutation': 'orange',
  'DCR': 'gray',
  'Deed': 'purple',
  'Survey Map': 'yellow',
};

function PlotDNACard({
  plot,
  isSelected,
  onClick,
  isBn,
  toBn,
  t,
}: {
  plot: Plot;
  isSelected: boolean;
  onClick: () => void;
  isBn: boolean;
  toBn: (v: string | number) => string;
  t: any;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-150',
        isSelected ? 'border-brand-400 bg-brand-50/50' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50',
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-bold text-navy-800">{isBn ? toBn(plot.dagNumber) : plot.dagNumber}</div>
          <div className="text-xs text-gray-500">{plot.mouzaName}</div>
        </div>
        <ChevronRight className={clsx('w-4 h-4 text-gray-400 transition-transform', isSelected && 'rotate-90 text-brand-600')} />
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        <Badge variant="gray">{t.status[plot.classification] || plot.classification}</Badge>
        <Badge variant={plot.roadAccess === 'direct' ? 'green' : 'yellow'}>
          {plot.roadAccess === 'direct' ? (isBn ? 'সরাসরি রাস্তা' : 'direct access') : (isBn ? 'পরোক্ষ পথ' : 'indirect access')}
        </Badge>
        <Badge variant={plot.recordStatus === 'mismatch' ? 'red' : plot.recordStatus === 'incomplete' ? 'yellow' : 'green'}>
          {t.status[plot.recordStatus] || plot.recordStatus}
        </Badge>
      </div>
      <ProgressBar
        value={plot.completeness}
        label={isBn ? 'রেকর্ডের সম্পূর্ণতা' : 'Completeness'}
        color={plot.completeness >= 70 ? 'bg-brand-500' : 'bg-yellow-500'}
      />
    </button>
  );
}

export default function LandDNAPage() {
  const { landCase } = useApp();
  const { lang, t, toBn, formatNumber, formatArea, formatCurrency } = useLanguage();
  const isBn = lang === 'bn';

  const [selectedId, setSelectedId] = useState(landCase.plots[0].id);
  const plot = landCase.plots.find(p => p.id === selectedId)!;
  const timeline = DEMO_TIMELINE.filter(e => e.plotId === selectedId);

  return (
    <div className="space-y-5">
      <SectionHeader
        title={t.landDna.title}
        subtitle={t.landDna.subtitle}
        actions={<Badge variant="blue">{formatNumber(landCase.plots.length)} {isBn ? 'টি দাগ' : 'DAGs'}</Badge>}
      />

      <AlertBox type="info">
        {t.landDna.alertInfo}
      </AlertBox>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Plot list */}
        <div className="space-y-3">
          {landCase.plots.map(p => (
            <PlotDNACard
              key={p.id}
              plot={p}
              isSelected={p.id === selectedId}
              onClick={() => setSelectedId(p.id)}
              isBn={isBn}
              toBn={toBn}
              t={t}
            />
          ))}
        </div>

        {/* DNA Detail panel */}
        <div className="lg:col-span-2 space-y-4 animate-fade-in" key={selectedId}>
          {/* Header */}
          <div className="card">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-navy-800">{isBn ? toBn(plot.dagNumber) : plot.dagNumber}</h2>
                  <Badge variant={plot.recordStatus === 'mismatch' ? 'red' : plot.recordStatus === 'incomplete' ? 'yellow' : 'green'}>
                    {t.status[plot.recordStatus] || plot.recordStatus}
                  </Badge>
                  <Badge variant="gray">{isBn ? 'কৃত্রিম ডেমো' : 'SYNTHETIC DEMO'}</Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {isBn ? 'মৌজাপুর ডেমো মৌজা' : plot.mouzaName} — {isBn ? 'মৌজা কোড:' : 'Mouza Code:'} {isBn ? toBn(plot.mouzaCode) : plot.mouzaCode}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{isBn ? 'আনুমানিক মোট মূল্য' : 'Est. Total Value'}</div>
                <div className="text-lg font-bold text-navy-800">{formatCurrency(plot.totalValue)}</div>
                <div className="text-xs text-gray-400">{isBn ? 'কৃত্রিম ডেমো মূল্য' : 'SYNTHETIC demo value only'}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {[
                { label: isBn ? 'জমির পরিমাণ' : 'Area', value: formatArea(plot.area), icon: <BarChart2 className="w-4 h-4 text-brand-600" /> },
                { label: isBn ? 'শ্রেণী' : 'Classification', value: t.status[plot.classification] || plot.classification, icon: <FileSearch className="w-4 h-4 text-blue-600" /> },
                {
                  label: isBn ? 'রাস্তা' : 'Road Access',
                  value: isBn ? (plot.roadAccess === 'direct' ? 'সরাসরি' : 'পরোক্ষ') : plot.roadAccess,
                  icon: plot.roadAccess === 'direct' ? <CheckCircle className="w-4 h-4 text-brand-600" /> : <XCircle className="w-4 h-4 text-amber-600" />,
                },
                { label: isBn ? 'রেকর্ডের সম্পূর্ণতা' : 'Completeness', value: `${formatNumber(plot.completeness)}%`, icon: <AlertCircle className="w-4 h-4 text-purple-600" /> },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">{icon}<span className="text-xs text-gray-500">{label}</span></div>
                  <div className="text-sm font-semibold text-navy-800">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <ProgressBar
                value={plot.completeness}
                label={isBn ? 'রেকর্ড ডেটার সম্পূর্ণতা' : 'Record Data Completeness'}
                color={plot.completeness >= 70 ? 'bg-brand-500' : plot.completeness >= 50 ? 'bg-yellow-500' : 'bg-red-500'}
              />
            </div>
          </div>

          {/* Documents */}
          <div className="card">
            <div className="font-semibold text-navy-800 mb-3 flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-brand-600" />
              {isBn ? 'সংশ্লিষ্ট রেকর্ড ও খতিয়ান — কৃত্রিম ডেমো' : 'Associated Documents — SYNTHETIC DEMO'}
            </div>
            <div className="space-y-3">
              {plot.documents.map(doc => (
                <div key={doc.id} className={clsx(
                  'border rounded-lg p-3 text-sm',
                  doc.status === 'consistent' ? 'border-brand-200 bg-brand-50/30' :
                  doc.status === 'mismatch' ? 'border-red-200 bg-red-50/30' : 'border-yellow-200 bg-yellow-50/30',
                )}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-navy-800 flex items-center gap-2">
                        <Badge variant={(DOC_TYPE_COLORS[doc.type] || 'gray') as 'blue' | 'gray' | 'green' | 'navy' | 'orange'}>
                          {translateDocType(doc.type, lang)}
                        </Badge>
                        {isBn ? toBn(doc.number) : doc.number}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {isBn ? 'মালিক:' : 'Owner:'} {translateDocOwner(doc.owner, lang)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {isBn ? 'সন:' : 'Year:'} {formatNumber(doc.year)} · {isBn ? 'জমির পরিমাণ:' : 'Area:'} {formatArea(doc.area)}
                      </div>
                    </div>
                    {doc.status === 'consistent'
                      ? <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      : doc.status === 'mismatch'
                      ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      : <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    }
                  </div>
                  {doc.notes && (
                    <div className="text-xs text-gray-500 mt-2 italic">
                      {translateDocNotes(doc.notes, lang)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Discrepancies */}
          {plot.discrepancies.length > 0 && (
            <div className="card border-red-100">
              <div className="font-semibold text-navy-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" /> {isBn ? 'রেকর্ড অসঙ্গতিসমূহ' : 'Record Discrepancies'}
              </div>
              <div className="space-y-3">
                {plot.discrepancies.map(disc => {
                  const td = translateDiscrepancy(disc, lang);
                  return (
                    <div key={disc.id} className={clsx(
                      'rounded-lg p-3 border text-sm',
                      disc.severity === 'high' ? 'bg-red-50 border-red-200' :
                      disc.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200',
                    )}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-navy-800">{td.field}</span>
                        <Badge variant={disc.severity === 'high' ? 'red' : disc.severity === 'medium' ? 'yellow' : 'blue'}>
                          {isBn ? (disc.severity === 'high' ? 'উচ্চ মাত্রা' : disc.severity === 'medium' ? 'মাঝারি মাত্রা' : 'স্বল্প মাত্রা') : `${disc.severity} severity`}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-2 text-xs">
                        <div className="bg-white/80 rounded p-2">
                          <div className="text-gray-500 mb-0.5">{isBn ? 'দলিলে উল্লিখিত তথ্য' : 'Document value'}</div>
                          <div className="font-medium text-red-700">{td.docValue}</div>
                        </div>
                        <div className="bg-white/80 rounded p-2">
                          <div className="text-gray-500 mb-0.5">{isBn ? 'রেকর্ডের তথ্য' : 'Record value'}</div>
                          <div className="font-medium text-navy-800">{td.recordValue}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        {td.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="card">
            <div className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              {isBn ? 'মালিকানা ও হস্তান্তরের টাইমলাইন — কৃত্রিম ডেমো' : 'Land History Timeline — SYNTHETIC DEMO'}
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-100" />
              <div className="space-y-4">
                {timeline.map(event => {
                  const te = translateTimelineEvent(event, lang);
                  return (
                    <div key={event.id} className="flex gap-3 relative">
                      <div className={clsx(
                        'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10',
                        event.type === 'discrepancy' ? 'bg-red-100' :
                        event.type === 'mutation' ? 'bg-blue-100' :
                        event.type === 'document_added' ? 'bg-brand-100' : 'bg-gray-100',
                      )}>
                        {event.type === 'discrepancy' ? <XCircle className="w-3.5 h-3.5 text-red-600" /> :
                         event.type === 'mutation' ? <FileSearch className="w-3.5 h-3.5 text-blue-600" /> :
                         event.type === 'document_added' ? <CheckCircle className="w-3.5 h-3.5 text-brand-600" /> :
                         <Clock className="w-3.5 h-3.5 text-gray-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-navy-800">
                            {te.title}
                          </div>
                          <span className="text-xs text-gray-400">{isBn ? toBn(event.date) : event.date}</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5">{te.description}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{isBn ? 'দায়িত্বপ্রাপ্ত:' : 'By:'} {te.actor}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
