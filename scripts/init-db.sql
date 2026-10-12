-- ==============================================================================
-- Sovereign Cloud Adoption Workloads Schema & Seed Dataset
-- Compliance Framework: CST Cloud Classification & NCA ECC Baseline
-- ==============================================================================

CREATE TABLE IF NOT EXISTS workloads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    cst_classification VARCHAR(50) NOT NULL, -- Class A, Class B, Class C
    migration_phase VARCHAR(50) NOT NULL,   -- Discovery, In-Progress, Cutover, Optimized
    data_residency_verified BOOLEAN NOT NULL DEFAULT TRUE,
    nca_ecc_score INTEGER NOT NULL CHECK (nca_ecc_score >= 0 AND nca_ecc_score <= 100),
    hosting_tier VARCHAR(100) NOT NULL DEFAULT 'Sovereign In-Kingdom DC',
    notes_ar TEXT,
    notes_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed realistic enterprise workloads
INSERT INTO workloads (name, sector, cst_classification, migration_phase, data_residency_verified, nca_ecc_score, hosting_tier, notes_ar, notes_en)
VALUES
(
    'منصة السجلات الصحية الوطنية الموحدة (EHR)',
    'Healthcare',
    'Class C',
    'Optimized',
    TRUE,
    98,
    'Sovereign In-Kingdom DC (Tier IV)',
    'بيانات صحية سيادية فائقة الحساسية مستضافة محلياً بالكامل ومطابقة لضوابط الأمن السيبراني الصحية.',
    'Highly sensitive healthcare electronic records fully hosted in-kingdom with strict biometric and audit controls.'
),
(
    'بوابة الخدمات البلدية والتراخيص الرقمية',
    'Government',
    'Class B',
    'Cutover',
    TRUE,
    94,
    'Sovereign In-Kingdom DC (Tier III+)',
    'نظام تراخيص ومعاملات بلدية مؤتمت يقدم خدمات للمواطنين والمقيمين وفق معايير الأمان الوطنية.',
    'Automated municipal and municipal licensing portal serving citizens under national data governance framework.'
),
(
    'نظام المحاسبة والتسويات المالية المركزية',
    'Finance',
    'Class C',
    'In-Progress',
    TRUE,
    92,
    'Sovereign In-Kingdom DC (Tier IV)',
    'ترحيل القيود والعمليات المحاسبية إلى البنية التحتية السحابية المحلية لضمان سرعة المعالجة والامتثال المالي.',
    'Financial reconciliation engine migrating to local cloud infrastructure to guarantee sub-millisecond latency and data localization.'
),
(
    'منظومة المراقبة والاستشعار للطاقة والمرافق',
    'Energy & Utilities',
    'Class B',
    'Optimized',
    TRUE,
    96,
    'Sovereign In-Kingdom DC (Tier IV)',
    'استيعاب تدفق بيانات المستشعرات اللحظية من محطات الطاقة وتخزينها بأمان سيبراني متقدم.',
    'Real-time IoT sensor telemetry ingestion from energy substations hosted securely with NCA OT/ICS cybersecurity compliance.'
),
(
    'بوابة التوظيف وتنمية الموارد البشرية',
    'Government',
    'Class A',
    'Discovery',
    TRUE,
    88,
    'Sovereign In-Kingdom DC (Tier III+)',
    'مرحلة تقييم جاهزية البنية التحتية وترحيل قواعد بيانات الموظفين والمتقدمين إلى السحابة المحلية.',
    'Assessment phase for migrating HR talent acquisition databases to local sovereign cloud compute nodes.'
);
