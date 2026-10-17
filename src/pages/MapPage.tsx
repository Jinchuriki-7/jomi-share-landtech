import { useState, useRef } from 'react';
import { Upload, Layers, Navigation, Eye, EyeOff, Info, CheckCircle, XCircle } from 'lucide-react';
import LandMap from '../components/map/LandMap';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Badge, SectionHeader, AlertBox } from '../components/ui';
import clsx from 'clsx';

export default function MapPage() {
  const { landCase, selectedPlotId, selectPlot, setUploadedMapFile, uploadedMapFile } = useApp();
  const { lang, t, toBn, formatNumber, formatArea, formatCurrency } = useLanguage();
  const isBn = lang === 'bn';

  const [showLabels, setShowLabels] = useState(true);
  const [showRoads, setShowRoads] = useState(true);
  const [showShared, setShowShared] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedPlot = landCase.plots.find(p => p.id === selectedPlotId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      setUploadError(t.map.uploadErrorType);
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setUploadError(t.map.uploadErrorSize);
      return;
    }
    setUploadError(null);
    setUploadedMapFile(file);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title={t.map.title}
        subtitle={t.map.subtitle}
        actions={<Badge variant="yellow">{isBn ? 'ডেমো মৌজা' : 'Demo Mouza'}</Badge>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Map controls + map */}
        <div className="lg:col-span-3 space-y-4">
          {/* Toolbar */}
          <div className="card py-3 flex flex-wrap gap-3 items-center">
            <div className="font-semibold text-sm text-navy-800 flex items-center gap-2">
              <Layers className="w-4 h-4" /> {t.map.layers}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={clsx('btn-secondary text-xs py-1', showLabels && 'bg-brand-50 text-brand-700 border-brand-200')}
              >
                {showLabels ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />} {t.map.labels}
              </button>
              <button
                onClick={() => setShowRoads(!showRoads)}
                className={clsx('btn-secondary text-xs py-1', showRoads && 'bg-brand-50 text-brand-700 border-brand-200')}
              >
                <Navigation className="w-3 h-3" /> {t.map.roads}
              </button>
              <button
                onClick={() => setShowShared(!showShared)}
                className={clsx('btn-secondary text-xs py-1', showShared && 'bg-blue-50 text-blue-700 border-blue-200')}
              >
                {t.map.shared}
              </button>
            </div>
            <div className="ml-auto">
              <button onClick={() => fileRef.current?.click()} className="btn-secondary text-xs py-1 gap-1.5">
                <Upload className="w-3 h-3" /> {t.map.uploadMap}
              </button>
              <input ref={fileRef} type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} />
            </div>
          </div>

          {uploadError && (
            <AlertBox type="error">{uploadError}</AlertBox>
          )}

          {uploadedMapFile && (
            <AlertBox type="info" title={t.map.fileUploadAlertTitle}>
              <b>{uploadedMapFile.name}</b> ({formatNumber((uploadedMapFile.size / 1024).toFixed(0))} KB) {t.map.fileUploadAlertDesc}
            </AlertBox>
          )}

          <LandMap
            showLabels={showLabels}
            showRoads={showRoads}
            showShared={showShared}
            height="500px"
            onPlotClick={selectPlot}
          />

          {/* Legend */}
          <div className="card py-3">
            <div className="text-xs font-semibold text-gray-600 mb-2">{t.map.legend}</div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              {[
                { color: '#86efac', border: '#16a34a', label: isBn ? 'কৃষি জমি (নাল)' : 'Agricultural Plot' },
                { color: '#93c5fd', border: '#2563eb', label: isBn ? 'বসতভিটা (বাড়ি)' : 'Homestead Plot' },
                { color: '#fcd34d', border: '#d97706', label: isBn ? 'বাগান' : 'Orchard Plot' },
                { color: '#67e8f9', border: '#0891b2', label: isBn ? 'যৌথ পুকুর' : 'Shared Pond' },
                { color: '#d1d5db', border: '#6b7280', label: isBn ? 'রাস্তা' : 'Road' },
              ].map(({ color, border, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="w-4 h-3 rounded-sm border" style={{ background: color, borderColor: border }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plot detail panel */}
        <div className="space-y-4">
          {/* Plot list */}
          <div className="card">
            <div className="font-semibold text-sm text-navy-800 mb-3">{isBn ? 'দাগ তালিকা' : 'DAG List'}</div>
            <div className="space-y-2">
              {landCase.plots.map(plot => (
                <button
                  key={plot.id}
                  onClick={() => selectPlot(plot.id)}
                  className={clsx(
                    'w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all duration-150',
                    selectedPlotId === plot.id
                      ? 'border-brand-300 bg-brand-50'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50',
                  )}
                >
                  <div className="font-medium text-navy-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: plot.color }} />
                    {isBn ? toBn(plot.dagNumber) : plot.dagNumber}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {formatArea(plot.area)} · {t.status[plot.classification] || plot.classification}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant={
                      plot.roadAccess === 'direct' ? 'green' :
                      plot.roadAccess === 'indirect' ? 'yellow' : 'red'
                    }>
                      {plot.roadAccess === 'direct'
                        ? (isBn ? 'সরাসরি রাস্তা' : 'direct access')
                        : (isBn ? 'পরোক্ষ পথ' : 'indirect access')}
                    </Badge>
                    <Badge variant={
                      plot.recordStatus === 'verified' ? 'green' :
                      plot.recordStatus === 'mismatch' ? 'red' : 'yellow'
                    }>
                      {t.status[plot.recordStatus] || plot.recordStatus}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected plot details */}
          {selectedPlot && (
            <div className="card space-y-3 animate-fade-in">
              <div className="font-semibold text-navy-800 flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-600" />
                {isBn ? toBn(selectedPlot.dagNumber) : selectedPlot.dagNumber}
              </div>
              <div className="space-y-2 text-sm">
                {[
                  [t.map.dagNumber, isBn ? toBn(selectedPlot.dagNumber) : selectedPlot.dagNumber],
                  [isBn ? 'মৌজা' : 'Mouza', selectedPlot.mouzaName],
                  [isBn ? 'মৌজা কোড' : 'Mouza Code', isBn ? toBn(selectedPlot.mouzaCode) : selectedPlot.mouzaCode],
                  [isBn ? 'জমির পরিমাণ' : 'Area', `${formatArea(selectedPlot.area)} (${formatNumber(selectedPlot.areaAcres)} ${isBn ? 'একর' : 'acres'})`],
                  [isBn ? 'জমির শ্রেণী' : 'Classification', t.status[selectedPlot.classification] || selectedPlot.classification],
                  [isBn ? 'মাটির ধরন' : 'Soil Type', selectedPlot.soilType],
                  [isBn ? 'বর্তমান ব্যবহার' : 'Current Use', isBn
                    ? (selectedPlot.id === 'plot-001' ? 'আমন ধান চাষাবাদ' : selectedPlot.id === 'plot-002' ? 'পারিবারিক বসতভিটা ও বাগান' : 'মিশ্র ফলের বাগান (আম, কাঁঠাল)')
                    : selectedPlot.currentUse],
                  [isBn ? 'রাস্তা প্রবেশাধিকার' : 'Road Access', isBn ? (selectedPlot.roadAccess === 'direct' ? 'সরাসরি' : 'পরোক্ষ') : selectedPlot.roadAccess],
                  [isBn ? 'আনুমানিক মূল্য/শতাংশ' : 'Est. Value/decimal', `${formatCurrency(selectedPlot.relativeValue)} ${isBn ? '(কৃত্রিম)' : '(SYNTHETIC)'}`],
                  [isBn ? 'মোট আনুমানিক মূল্য' : 'Total Est. Value', `${formatCurrency(selectedPlot.totalValue)} ${isBn ? '(কৃত্রিম)' : '(SYNTHETIC)'}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-gray-500 text-xs">{label}</span>
                    <span className="font-medium text-navy-800 text-xs text-right">{value}</span>
                  </div>
                ))}
              </div>

              {/* Access indicator */}
              <div className={clsx(
                'rounded-lg px-3 py-2 text-xs flex items-center gap-2',
                selectedPlot.roadAccess === 'direct' ? 'bg-brand-50 text-brand-700' : 'bg-amber-50 text-amber-700',
              )}>
                {selectedPlot.roadAccess === 'direct'
                  ? <><CheckCircle className="w-3.5 h-3.5" /> {isBn ? 'মৌজাপুর গ্রাম্য পাকা রাস্তার সাথে সরাসরি সংযোগ বিদ্যমান' : 'Direct road access to Mouzapur Village Road'}</>
                  : <><XCircle className="w-3.5 h-3.5" /> {isBn ? (selectedPlot.accessVia || 'শুধুমাত্র পরোক্ষ চলাচলের পথ') : (selectedPlot.accessVia || 'Indirect access only')}</>
                }
              </div>

              {/* Discrepancy indicator */}
              {selectedPlot.discrepancies.length > 0 && (
                <div className="bg-red-50 text-red-700 rounded-lg px-3 py-2 text-xs">
                  {isBn
                    ? `⚠️ ${formatNumber(selectedPlot.discrepancies.length)}টি রেকর্ডে অসঙ্গতি শনাক্ত হয়েছে`
                    : `⚠️ ${selectedPlot.discrepancies.length} record discrepanc${selectedPlot.discrepancies.length > 1 ? 'ies' : 'y'} detected`}
                </div>
              )}
            </div>
          )}

          {/* Demo note */}
          <AlertBox type="warning">
            <div className="font-semibold mb-1">{isBn ? 'ডেমো মোড — মানচিত্র বিশ্লেষণ' : 'Demo Mode — Map Processing'}</div>
            {isBn
              ? 'প্রদর্শিত প্লটের সীমানা এবং দাগ নম্বর সম্পূর্ণ কৃত্রিম ডেমো ডেটা। এই ডেমোতে আপলোডকৃত ফাইল বাস্তব কোনো সার্ভারে সংরক্ষিত বা অপটিক্যাল মডেল দ্বারা প্রক্রিয়াজাত করা হয় না।'
              : 'Plot boundaries and DAG numbers shown are fictional synthetic data. Uploaded maps are not processed by real OCR/CV models in this demo. Geolocation is approximate and for visualization only.'}
          </AlertBox>
        </div>
      </div>
    </div>
  );
}
