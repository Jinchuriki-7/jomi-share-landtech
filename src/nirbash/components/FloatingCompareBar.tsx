import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Scale } from 'lucide-react';
import { useNirbash } from '../context/NirbashContext';
import { useLanguage } from '../../context/LanguageContext';

export default function FloatingCompareBar() {
  const { comparedIds, properties, removeFromCompare, clearCompare } = useNirbash();
  const { lang } = useLanguage();

  if (comparedIds.length === 0) return null;

  const comparedProperties = properties.filter(p => comparedIds.includes(p.id));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl bg-gray-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-4 border border-gray-800 animate-slide-up">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-600/20 border border-green-500/30 flex items-center justify-center text-green-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {lang === 'bn'
                ? `সম্পত্তি তুলনা (${comparedIds.length}/৪)`
                : `Compare Properties (${comparedIds.length}/4)`}
            </h4>
            <p className="text-xs text-gray-400">
              {lang === 'bn'
                ? 'পাশাপাশি তুলনা করতে এগিয়ে যান'
                : 'Compare specifications side-by-side'}
            </p>
          </div>
        </div>

        {/* Center: Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-xs sm:max-w-md py-1">
          {comparedProperties.map(prop => {
            const primaryImg = prop.images.find(img => img.isPrimary) || prop.images[0];
            return (
              <div
                key={prop.id}
                className="relative group w-14 h-14 rounded-lg overflow-hidden border border-gray-700 flex-shrink-0 bg-gray-800"
              >
                {primaryImg ? (
                  <img
                    src={primaryImg.url}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-950 flex items-center justify-center text-[10px] text-green-300">
                    Prop
                  </div>
                )}
                <button
                  onClick={() => removeFromCompare(prop.id)}
                  className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-red-600 rounded-full p-0.5 text-white transition-colors"
                  title="Remove from comparison"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearCompare}
            className="text-xs text-gray-400 hover:text-white px-2 py-1.5 transition-colors"
          >
            {lang === 'bn' ? 'মুছুন' : 'Clear'}
          </button>
          <Link
            to="/nirbash/compare"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-green-600/30"
          >
            <span>{lang === 'bn' ? 'তুলনা দেখুন' : 'Compare Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
