import React, { useState } from 'react';
import { X, PlusCircle, Check } from 'lucide-react';

export default function AddWorkloadModal({ isOpen, onClose, onAddWorkload, lang }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    sector: 'Government',
    cst_classification: 'Class B',
    migration_phase: 'Discovery',
    nca_ecc_score: 92,
    data_residency_verified: true,
    hosting_tier: 'Sovereign In-Kingdom DC (Tier IV)',
    notes_ar: '',
    notes_en: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onAddWorkload(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-2">
          {lang === 'ar' ? 'تسجيل حمولة عمل جديدة للترحيل السحابي' : 'Register New Cloud Workload'}
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          {lang === 'ar' 
            ? 'إدراج نظام مؤسسي جديد ضمن خطة التحول الرقمي والتوطين السحابي السيادي'
            : 'Add enterprise system to the sovereign cloud adoption and compliance pipeline'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'ar' ? 'اسم النظام / حمولة العمل' : 'Workload Name'} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: منصة الفوترة الموحدة' : 'e.g., Unified Invoicing Gateway'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-saudi-600 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'ar' ? 'القطاع المؤسسي' : 'Sector'}
              </label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-saudi-600 transition-colors"
              >
                <option value="Government">{lang === 'ar' ? 'القطاع الحكومي (Government)' : 'Government'}</option>
                <option value="Healthcare">{lang === 'ar' ? 'القطاع الصحي (Healthcare)' : 'Healthcare'}</option>
                <option value="Finance">{lang === 'ar' ? 'القطاع المالي (Finance)' : 'Finance'}</option>
                <option value="Energy & Utilities">{lang === 'ar' ? 'الطاقة والمرافق (Energy)' : 'Energy & Utilities'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'ar' ? 'تصنيف هيئة الاتصالات (CST)' : 'CST Classification'}
              </label>
              <select
                value={formData.cst_classification}
                onChange={(e) => setFormData({ ...formData, cst_classification: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-saudi-600 transition-colors"
              >
                <option value="Class C">Class C (بيانات حساسة للغاية / Extremely Sensitive)</option>
                <option value="Class B">Class B (بيانات مقيدة / Restricted)</option>
                <option value="Class A">Class A (بيانات عامة / Public)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'ar' ? 'مرحلة الترحيل السحابي' : 'Migration Phase'}
              </label>
              <select
                value={formData.migration_phase}
                onChange={(e) => setFormData({ ...formData, migration_phase: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-saudi-600 transition-colors"
              >
                <option value="Discovery">Discovery (تقييم وجدوى)</option>
                <option value="In-Progress">In-Progress (قيد الترحيل والتكامل)</option>
                <option value="Cutover">Cutover (نقل التشغيل النهائي)</option>
                <option value="Optimized">Optimized (مستقر ومحسن أداءً)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'ar' ? 'درجة الأمن السيبراني (NCA ECC 0-100)' : 'NCA Score (0-100)'}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.nca_ecc_score}
                onChange={(e) => setFormData({ ...formData, nca_ecc_score: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-saudi-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'ar' ? 'ملاحظات المعمارية والامتثال' : 'Architecture & Compliance Notes'}
            </label>
            <textarea
              rows="2"
              value={lang === 'ar' ? formData.notes_ar : formData.notes_en}
              onChange={(e) => {
                if (lang === 'ar') setFormData({ ...formData, notes_ar: e.target.value, notes_en: e.target.value });
                else setFormData({ ...formData, notes_en: e.target.value, notes_ar: e.target.value });
              }}
              placeholder={lang === 'ar' ? 'ملاحظات حول أمن البيانات وموقع الاستضافة...' : 'Notes regarding data localization, security controls...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-saudi-600 transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-saudi-700 hover:bg-saudi-600 rounded-xl transition-all shadow-lg shadow-saudi-950/40 disabled:opacity-50"
            >
              {submitting ? (lang === 'ar' ? 'جارٍ الحفظ...' : 'Saving...') : (lang === 'ar' ? 'حفظ وإدراج' : 'Save Workload')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
