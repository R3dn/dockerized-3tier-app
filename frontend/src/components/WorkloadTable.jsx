import React from 'react';
import { Database, ShieldCheck, CheckCircle2, Clock, Activity, FileText, ArrowUpDown } from 'lucide-react';

export default function WorkloadTable({ workloads, lang, onOpenAddModal }) {
  const getPhaseBadge = (phase) => {
    switch (phase) {
      case 'Optimized':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800">{lang === 'ar' ? 'مكتمل ومُحسّن' : 'Optimized'}</span>;
      case 'Cutover':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-950/80 text-blue-300 border border-blue-800">{lang === 'ar' ? 'نقل التشغيل (Cutover)' : 'Cutover'}</span>;
      case 'In-Progress':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-950/80 text-amber-300 border border-amber-800">{lang === 'ar' ? 'قيد الترحيل' : 'In-Progress'}</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">{lang === 'ar' ? 'تقييم واستكشاف' : 'Discovery'}</span>;
    }
  };

  const getCstBadge = (cst) => {
    const colors = {
      'Class C': 'bg-purple-950/70 text-purple-300 border-purple-800',
      'Class B': 'bg-indigo-950/70 text-indigo-300 border-indigo-800',
      'Class A': 'bg-slate-800 text-slate-300 border-slate-700'
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-md border ${colors[cst] || colors['Class A']}`}>
        {cst}
      </span>
    );
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur my-6">
      <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-saudi-500" />
            <span>{lang === 'ar' ? 'سجل حمولات العمل والأنظمة السحابية' : 'Enterprise Cloud Workloads Registry'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'ar'
              ? 'متابعة مسار ترحيل الأنظمة المؤسسية وتصنيف الحساسية وفق هيئة الاتصالات والفضاء والتقنية'
              : 'Tracking enterprise workload migration stages and CST data classification tiers'}
          </p>
        </div>
        
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-saudi-700 hover:bg-saudi-600 text-white transition-all shadow-lg shadow-saudi-950/40"
        >
          <span>{lang === 'ar' ? '+ تسجيل حمولة عمل جديدة' : '+ Register New Workload'}</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase text-[11px] font-semibold tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3.5 text-start">
                {lang === 'ar' ? 'اسم النظام / حمولة العمل' : 'Workload Name'}
              </th>
              <th scope="col" className="px-4 py-3.5 text-start">
                {lang === 'ar' ? 'القطاع' : 'Sector'}
              </th>
              <th scope="col" className="px-4 py-3.5 text-center">
                {lang === 'ar' ? 'تصنيف هيئة الاتصالات (CST)' : 'CST Class'}
              </th>
              <th scope="col" className="px-4 py-3.5 text-center">
                {lang === 'ar' ? 'مرحلة الترحيل' : 'Phase'}
              </th>
              <th scope="col" className="px-4 py-3.5 text-center">
                {lang === 'ar' ? 'درجة الأمن السيبراني' : 'NCA Score'}
              </th>
              <th scope="col" className="px-4 py-3.5 text-start">
                {lang === 'ar' ? 'ملاحظات وحوكمة' : 'Governance & Notes'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-normal">
            {workloads && workloads.length > 0 ? (
              workloads.map((w) => (
                <tr key={w.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white">{w.name}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-saudi-500" />
                      <span>{w.hosting_tier || 'Sovereign In-Kingdom DC'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs">
                      {w.sector}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {getCstBadge(w.cst_classification)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {getPhaseBadge(w.migration_phase)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                      <ShieldCheck className="h-4 w-4" />
                      <span>{w.nca_ecc_score}/100</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-400 max-w-xs text-xs">
                    {lang === 'ar' ? (w.notes_ar || w.notes_en) : (w.notes_en || w.notes_ar)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-500">
                  {lang === 'ar' ? 'لا توجد حمولات عمل مسجلة حتى الآن' : 'No workloads registered yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
