import React from 'react';
import { ShieldCheck, Cloud, Globe, Database, Server } from 'lucide-react';

export default function Header({ lang, setLang }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Title & Brand */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-saudi-600 to-saudi-800 flex items-center justify-center text-white shadow-lg shadow-saudi-900/50">
              <Cloud className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {lang === 'ar' ? 'منصة راصد السحابية' : 'Rased Cloud Hub'}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-saudi-900/80 text-saudi-200 border border-saudi-700/50">
                  {lang === 'ar' ? 'السحابة السيادية الوطنية' : 'Sovereign Cloud'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {lang === 'ar' 
                  ? 'بوابة متابعة ترحيل حمولات العمل والامتثال للضوابط الوطنية (CST / NCA / NDMO)' 
                  : 'Enterprise Workload Migration & Regulatory Compliance Portal (CST / NCA / NDMO)'}
              </p>
            </div>
          </div>

          {/* Standards Badges & Language Switcher */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="h-4 w-4 text-saudi-500" />
              <span>NCA ECC-1:2018</span>
              <span className="text-slate-600">•</span>
              <span>CST Tier IV</span>
              <span className="text-slate-600">•</span>
              <span>NDMO Sovereign Data</span>
            </div>

            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors shadow-sm"
              title="Toggle Language / تبديل اللغة"
            >
              <Globe className="h-3.5 w-3.5 text-saudi-500" />
              <span>{lang === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
