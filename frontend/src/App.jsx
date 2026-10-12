import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import WorkloadTable from './components/WorkloadTable';
import AddWorkloadModal from './components/AddWorkloadModal';
import { RefreshCw, Server, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('ar'); // Default to Arabic
  const [workloads, setWorkloads] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync document direction with chosen language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch in parallel
      const [workloadsRes, metricsRes] = await Promise.all([
        fetch('/api/v1/workloads'),
        fetch('/api/v1/metrics')
      ]);

      if (!workloadsRes.ok || !metricsRes.ok) {
        throw new Error('فشل الاتصال بالواجهة الخلفية (Backend API)');
      }

      const workloadsData = await workloadsRes.json();
      const metricsData = await metricsRes.json();

      setWorkloads(workloadsData);
      setMetrics(metricsData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddWorkload = async (newWorkload) => {
    const res = await fetch('/api/v1/workloads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWorkload)
    });

    if (!res.ok) {
      throw new Error('فشل حفظ حمولة العمل');
    }

    await fetchData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner: Cloud Adoption Vision & Framework */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-saudi-950 border border-slate-800 p-6 sm:p-8 mb-6 shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saudi-900/60 border border-saudi-700/60 text-saudi-300 text-xs font-semibold mb-4">
              <Server className="h-3.5 w-3.5" />
              <span>{lang === 'ar' ? 'البنية التحتية السحابية الوطنية المستقلة' : 'Sovereign National Cloud Architecture'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'ar' 
                ? 'تمكين التحول السحابي وحوكمة البيانات السيادية' 
                : 'Accelerating Sovereign Cloud Adoption & Data Governance'}
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'نموذج تطبيقي ثلاثي الطبقات (3-Tier) يبرز مهارات قيادة تبني الحوسبة السحابية (Cloud Adoption Management)، وضمان توطين البيانات داخل مراكز البيانات الوطنية بما يحقق معايير الهيئة الوطنية للأمن السيبراني (NCA) ومكتب إدارة البيانات الوطنية (NDMO).'
                : 'A containerized 3-tier enterprise showcase illustrating cloud adoption leadership, zero vendor-lockin sovereign data residency, and compliance with the National Cybersecurity Authority (NCA) and CST frameworks.'}
            </p>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-saudi-600/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800 flex items-center justify-between text-red-200 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 font-medium transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{lang === 'ar' ? 'إعادة المحاولة' : 'Retry'}</span>
            </button>
          </div>
        )}

        {/* Executive KPIs */}
        <KPICards metrics={metrics} lang={lang} />

        {/* Workloads Table */}
        <WorkloadTable
          workloads={workloads}
          lang={lang}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Architecture Specs Highlight */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-saudi-400 shrink-0">1</div>
            <div>
              <div className="font-semibold text-slate-200">{lang === 'ar' ? 'طبقة العرض والواجهة (Presentation)' : 'Presentation Layer'}</div>
              <p className="mt-1">{lang === 'ar' ? 'React 18 + Tailwind CSS عبر خادم Nginx عالي الأداء مع دعم ثنائي اللغة RTL/LTR.' : 'React 18 + Tailwind CSS hosted on an ultra-light Nginx gateway with RTL/LTR support.'}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-saudi-400 shrink-0">2</div>
            <div>
              <div className="font-semibold text-slate-200">{lang === 'ar' ? 'طبقة منطق الأعمال (Application Logic)' : 'Business Logic Layer'}</div>
              <p className="mt-1">{lang === 'ar' ? 'FastAPI (Python 3.11) مع توثيق Swagger تفاعلي ومستخدم أمني غير جذري (Non-root user).' : 'FastAPI (Python 3.11) with interactive OpenAPI docs, healthchecks, and non-root execution.'}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-saudi-400 shrink-0">3</div>
            <div>
              <div className="font-semibold text-slate-200">{lang === 'ar' ? 'طبقة حفظ البيانات السيادية (Data Tier)' : 'Sovereign Data Tier'}</div>
              <p className="mt-1">{lang === 'ar' ? 'PostgreSQL 16 Alpine مع وحدات تخزين دائمة وعزل كامل داخل شبكة الحاويات الخاصة.' : 'PostgreSQL 16 Alpine with Docker persistent volumes and zero direct external exposure.'}</p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>
          {lang === 'ar' 
            ? 'مشروع المحفظة المهنية: معمارية سحابية ثلاثية الطبقات • متوافق مع معايير الأمن السيبراني وحوكمة البيانات في المملكة العربية السعودية' 
            : 'Portfolio Project: Enterprise Dockerized 3-Tier Sovereign Architecture • KSA Cloud Adoption & Governance Aligned'}
        </p>
      </footer>

      {/* Add Modal */}
      <AddWorkloadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWorkload={handleAddWorkload}
        lang={lang}
      />
    </div>
  );
}
