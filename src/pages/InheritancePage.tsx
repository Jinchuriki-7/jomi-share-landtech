import { useState } from 'react';
import { Users, AlertCircle, CheckCircle, Edit3, Save, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Badge, SectionHeader, AlertBox, HeirAvatar, ProgressBar } from '../components/ui';
import { validateEntitlements, calculateEntitlementAreas, calculateEntitlementValues } from '../engine/partitionEngine';
import type { Heir } from '../data/demoData';
import clsx from 'clsx';

export default function InheritancePage() {
  const { landCase, heirs, updateHeirs } = useApp();
  const { lang, t, toBn, formatNumber, formatArea, formatCurrency } = useLanguage();
  const isBn = lang === 'bn';

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftHeirs, setDraftHeirs] = useState<Heir[]>(heirs);
  const [saved, setSaved] = useState(false);

  const validation = validateEntitlements(draftHeirs);
  const total = draftHeirs.reduce((s, h) => s + h.entitlement, 0);
  const entitlementAreas = calculateEntitlementAreas(draftHeirs, landCase.totalArea);
  const entitlementValues = calculateEntitlementValues(draftHeirs, landCase.totalValue);

  const handleSave = () => {
    if (!validation.valid) return;
    updateHeirs(draftHeirs);
    setSaved(true);
    setEditingId(null);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateEntitlement = (id: string, value: number) => {
    setDraftHeirs(prev => prev.map(h => h.id === id ? { ...h, entitlement: value } : h));
  };

  const COLORS = ['#16a34a', '#2563eb', '#d97706'];

  const getHeirDisplayName = (heir: Heir) => {
    if (!isBn) return heir.name;
    if (heir.id === 'heir-a') return 'নুসরাত জাহান (জ্যেষ্ঠ কন্যা — কৃত্রিম)';
    if (heir.id === 'heir-b') return 'কামাল উদ্দিন (পুত্র — কৃত্রিম)';
    if (heir.id === 'heir-c') return 'রহিমা খাতুন (কনিষ্ঠ কন্যা — কৃত্রিম)';
    return heir.name;
  };

  const getHeirRelation = (heir: Heir) => {
    if (!isBn) return heir.relation;
    if (heir.id === 'heir-a') return 'মরহুমের জ্যেষ্ঠ কন্যা';
    if (heir.id === 'heir-b') return 'মরহুমের একমাত্র পুত্র';
    if (heir.id === 'heir-c') return 'মরহুমের কনিষ্ঠ কন্যা';
    return heir.relation;
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title={t.inheritance.title}
        subtitle={t.inheritance.subtitle}
        actions={
          <button onClick={handleSave} disabled={!validation.valid} className="btn-primary text-xs py-1.5">
            <Save className="w-3.5 h-3.5" /> {t.inheritance.saveAndRecalc}
          </button>
        }
      />

      <AlertBox type="warning" title={t.inheritance.legalDisclaimerTitle}>
        {t.inheritance.legalDisclaimer}
      </AlertBox>

      {saved && (
        <div className="flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-lg p-3 text-sm text-brand-700">
          <CheckCircle className="w-4 h-4" /> {t.inheritance.savedSuccess}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Case info */}
        <div className="space-y-4">
          <div className="card">
            <div className="font-semibold text-navy-800 mb-3">{t.inheritance.caseInfo}</div>
            <div className="space-y-2 text-sm">
              {[
                [t.inheritance.caseId, isBn ? toBn(landCase.id) : landCase.id],
                [t.inheritance.caseName, isBn ? 'সোনারগাঁও পারিবারিক ভূমি বণ্টন কেস' : landCase.name],
                [t.inheritance.totalArea, formatArea(landCase.totalArea)],
                [t.inheritance.totalValue, `${formatCurrency(landCase.totalValue)} ${isBn ? '(কৃত্রিম)' : '(SYNTHETIC)'}`],
                [t.inheritance.noHeirs, `${formatNumber(heirs.length)} ${isBn ? 'জন' : ''}`],
                [t.inheritance.noPlots, `${formatNumber(landCase.plots.length)} ${isBn ? 'টি' : ''}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <span className="text-gray-500 text-xs">{k}</span>
                  <span className="text-navy-800 font-medium text-xs text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-amber-600">
              {isBn ? '⚠️ এই কেসটি কৃত্রিম ডেমো ডেটা — আসল কোনো সম্পদ রেকর্ড নয়।' : '⚠️ Case is SYNTHETIC DEMO DATA — not a real estate record.'}
            </div>
          </div>

          {/* Plots in scope */}
          <div className="card">
            <div className="font-semibold text-navy-800 mb-3">{isBn ? 'আওতাভুক্ত দাগসমূহ' : 'DAGs in Scope'}</div>
            <div className="space-y-2">
              {landCase.plots.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-navy-800">{isBn ? toBn(p.dagNumber) : p.dagNumber}</div>
                    <div className="text-xs text-gray-500">{formatArea(p.area)} · {formatCurrency(p.totalValue)}</div>
                  </div>
                  <Badge variant={p.roadAccess === 'direct' ? 'green' : 'yellow'}>
                    {p.roadAccess === 'direct' ? (isBn ? 'সরাসরি রাস্তা' : 'direct') : (isBn ? 'পরোক্ষ পথ' : 'indirect')}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Shared resource */}
          <div className="card">
            <div className="font-semibold text-navy-800 mb-3">{isBn ? 'যৌথ সম্পদ' : 'Shared Resources'}</div>
            {landCase.sharedResources.map(r => (
              <div key={r.id} className="bg-blue-50 rounded-lg p-3 text-sm">
                <div className="font-medium text-navy-800">🐟 {isBn ? 'পারিবারিক পুকুর (কৃত্রিম)' : r.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {isBn ? 'মৎস্য চাষে ব্যবহৃত যৌথ পুকুর। তিনটি দাগের সাথেই সংলগ্ন।' : r.description}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {isBn ? 'জমির পরিমাণ:' : 'Area:'} {formatArea(r.area || 0)} · {isBn ? 'সকল ওয়ারিশের সমান অধিকার' : 'Shared by all heirs'}
                </div>
                <Badge variant="blue" className="mt-2">{isBn ? 'যৌথ ব্যবস্থাপনা' : 'Shared arrangement'}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Heir entitlements */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-navy-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-600" /> {t.inheritance.heirsList}
              </div>
              <div className={clsx('text-sm font-bold', Math.abs(total - 100) < 0.01 ? 'text-brand-600' : 'text-red-600')}>
                {isBn ? `মোট: ${formatNumber(total.toFixed(1))}%` : `Total: ${total.toFixed(1)}%`}
                {Math.abs(total - 100) < 0.01
                  ? <span className="ml-1 text-xs font-normal text-brand-500">{isBn ? '✓ সঠিক' : '✓ Valid'}</span>
                  : <span className="ml-1 text-xs font-normal text-red-500">{isBn ? 'ঠিক ১০০% হতে হবে' : 'Must equal 100%'}</span>
                }
              </div>
            </div>

            {!validation.valid && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">
                <AlertCircle className="w-4 h-4" />
                {isBn ? 'মোট হিস্যা অবশ্যই ১০০% হতে হবে।' : validation.message}
              </div>
            )}

            <div className="space-y-4">
              {draftHeirs.map(heir => (
                <div key={heir.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                  <div className="flex items-start gap-3">
                    <HeirAvatar name={heir.name} initials={heir.avatar} color={heir.color} size="lg" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-navy-800 text-sm">{getHeirDisplayName(heir)}</div>
                          <div className="text-xs text-gray-500">{getHeirRelation(heir)}</div>
                        </div>
                        <button
                          onClick={() => setEditingId(editingId === heir.id ? null : heir.id)}
                          className="text-gray-400 hover:text-brand-600 transition-colors"
                          title={isBn ? 'হিস্যা পরিবর্তন করুন' : 'Edit share'}
                        >
                          {editingId === heir.id
                            ? <X className="w-4 h-4" />
                            : <Edit3 className="w-4 h-4" />
                          }
                        </button>
                      </div>

                      <div className="mt-3">
                        {editingId === heir.id ? (
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={0.5}
                              value={heir.entitlement}
                              onChange={e => updateEntitlement(heir.id, parseFloat(e.target.value))}
                              className="flex-1 accent-brand-600"
                            />
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                step={0.5}
                                value={heir.entitlement}
                                onChange={e => updateEntitlement(heir.id, parseFloat(e.target.value) || 0)}
                                className="input w-20 text-center font-bold"
                              />
                              <span className="text-sm text-gray-500">%</span>
                            </div>
                          </div>
                        ) : (
                          <ProgressBar
                            value={heir.entitlement}
                            label={`${formatNumber(heir.entitlement)}% ${isBn ? 'হিস্যা' : 'entitlement'}`}
                            color="bg-brand-500"
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-500">{isBn ? 'প্রাপ্য হিস্যা' : 'Entitlement'}</div>
                          <div className="text-sm font-bold text-navy-800">{formatNumber(heir.entitlement)}%</div>
                        </div>
                        <div className="bg-brand-50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-500">{isBn ? 'প্রাক্কলিত জমি' : 'Est. Area'}</div>
                          <div className="text-sm font-bold text-brand-700">
                            {formatArea(parseFloat(entitlementAreas[heir.id]?.toFixed(1) || '0'))}
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-500">{isBn ? 'প্রাক্কলিত মূল্য' : 'Est. Value'}</div>
                          <div className="text-sm font-bold text-blue-700">
                            {formatCurrency(Math.round(entitlementValues[heir.id] || 0))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSave}
              disabled={!validation.valid}
              className="btn-primary w-full justify-center mt-4"
            >
              <Save className="w-4 h-4" /> {isBn ? 'হিস্যা সংরক্ষণ ও পরিকল্পনা পুনর্গণনা' : 'Save Entitlements & Recalculate Plans'}
            </button>
          </div>

          {/* Summary table */}
          <div className="card">
            <div className="font-semibold text-navy-800 mb-3">{isBn ? 'হিস্যা ও বরাদ্দের সারসংক্ষেপ টেবিল' : 'Entitlement Summary Table'}</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-500">
                    <th className="text-left py-2">{isBn ? 'ওয়ারিশ' : 'Heir'}</th>
                    <th className="text-right py-2">{isBn ? 'হিস্যা' : 'Entitlement'}</th>
                    <th className="text-right py-2">{isBn ? 'জমির পরিমাণ (শতাংশ)' : 'Area (dec)'}</th>
                    <th className="text-right py-2">{isBn ? 'প্রাক্কলিত মূল্য (৳)' : 'Est. Value (৳)'}</th>
                    <th className="text-right py-2">{isBn ? 'মোট অংশের %' : '% of Portfolio'}</th>
                  </tr>
                </thead>
                <tbody>
                  {draftHeirs.map(h => (
                    <tr key={h.id} className="border-b border-gray-50">
                      <td className="py-2 flex items-center gap-2">
                        <HeirAvatar name={h.name} initials={h.avatar} color={h.color} size="sm" />
                        <span className="text-xs font-medium text-navy-800 truncate max-w-[120px]">
                          {isBn
                            ? (h.id === 'heir-a' ? 'নুসরাত জাহান' : h.id === 'heir-b' ? 'কামাল উদ্দিন' : 'রহিমা খাতুন')
                            : h.name.split('(')[0].trim()}
                        </span>
                      </td>
                      <td className="py-2 text-right font-bold text-navy-800">{formatNumber(h.entitlement)}%</td>
                      <td className="py-2 text-right text-brand-700">{formatNumber(entitlementAreas[h.id]?.toFixed(1) || '0')}</td>
                      <td className="py-2 text-right text-blue-700">{formatCurrency(Math.round(entitlementValues[h.id] || 0))}</td>
                      <td className="py-2 text-right text-gray-500">{formatNumber(h.entitlement)}%</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold text-xs">
                    <td className="py-2 pl-2 text-gray-600">{isBn ? 'সর্বমোট' : 'Total'}</td>
                    <td className="py-2 text-right">{formatNumber(total.toFixed(1))}%</td>
                    <td className="py-2 text-right">{formatArea(landCase.totalArea)}</td>
                    <td className="py-2 text-right">{formatCurrency(landCase.totalValue)}</td>
                    <td className="py-2 text-right">১০০%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {isBn ? '* সকল তথ্য কৃত্রিম ডেমো ডেটা। আনুমানিক মূল্য আসল বাজারদর নয়।' : '* All values are SYNTHETIC DEMO data. Estimated values are not real market prices.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
