import React from 'react';
import { Layers, ShieldAlert, CheckCircle2, Server, Award } from 'lucide-react';

export default function KPICards({ metrics, lang }) {
  if (!metrics) return null;

  const cards = [
    {
      title: lang === 'ar' ? 'إجمالي حمولات العمل' : 'Total Workloads',
      value: metrics.total_workloads || 0,
      subtitle: lang === 'ar' ? 'أنظمة مؤسسية قيد الترحيل' : 'Enterprise Systems Tracked',
      icon: Layers,
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400'
    },
    {
      title: lang === 'ar' ? 'توطين البيانات داخل المملكة' : 'In-Kingdom Data Residency',
      value: `${metrics.data_residency_percentage || 100}%`,
      subtitle: lang === 'ar' ? 'امتثال سيادي كامل (NDMO)' : '100% In-Kingdom Hosted',
      icon: CheckCircle2,
      color: 'from-saudi-500/20 to-saudi-600/10 border-saudi-500/30 text-saudi-400'
    },
    {
      title: lang === 'ar' ? 'مؤشر الامتثال السيبراني (NCA)' : 'NCA Cybersecurity Index',
      value: `${metrics.avg_nca_score || 0}/100`,
      subtitle: lang === 'ar' ? 'متوسط درجات ضوابط ECC' : 'Avg ECC-1:2018 Score',
      icon: Award,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400'
    },
    {
      title: lang === 'ar' ? 'حالة البنية التحتية' : 'Sovereign Infrastructure',
      value: lang === 'ar' ? 'مراكز بيانات محلية' : 'Tier IV / III+ Local DC',
      subtitle: lang === 'ar' ? 'سحابة وطنية مرخصة من CST' : 'CST Certified Sovereign DC',
      icon: Server,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border bg-slate-900/60 backdrop-blur shadow-sm hover:border-slate-600 transition-all`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <IconComponent className="h-5 w-5" />
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
