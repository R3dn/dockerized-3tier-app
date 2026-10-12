from datetime import datetime
from typing import Optional, List, Dict
from pydantic import BaseModel, Field

class WorkloadBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=255, description="Workload Name / اسم حمولة العمل")
    sector: str = Field(..., description="Sector / القطاع (Government, Healthcare, Finance, Energy)")
    cst_classification: str = Field(..., description="CST Classification (Class A, Class B, Class C)")
    migration_phase: str = Field("Discovery", description="Migration Phase (Discovery, In-Progress, Cutover, Optimized)")
    data_residency_verified: bool = Field(True, description="Strict in-kingdom data residency confirmation")
    nca_ecc_score: int = Field(90, ge=0, le=100, description="NCA ECC Cybersecurity Score (0-100)")
    hosting_tier: str = Field("Sovereign In-Kingdom DC", description="Target Sovereign Data Center Tier")
    notes_ar: Optional[str] = Field(None, description="Arabic notes on workload migration")
    notes_en: Optional[str] = Field(None, description="English notes on workload migration")

class WorkloadCreate(WorkloadBase):
    pass

class WorkloadResponse(WorkloadBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class MetricsResponse(BaseModel):
    total_workloads: int
    data_residency_percentage: float
    avg_nca_score: float
    by_phase: Dict[str, int]
    by_classification: Dict[str, int]
    by_sector: Dict[str, int]
    sovereign_status: str
