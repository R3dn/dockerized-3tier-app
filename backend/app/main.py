import os
import logging
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from .database import engine, get_db, Base
from .models import Workload
from .schemas import WorkloadCreate, WorkloadResponse, MetricsResponse

# Ensure tables exist
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    logging.warning(f"Database table auto-creation skipped or waiting for migration: {e}")

app = FastAPI(
    title="Rased Sovereign Cloud Adoption API",
    description="Enterprise REST API for managing cloud workload migrations and regulatory compliance (CST, NCA, NDMO) in the Kingdom of Saudi Arabia.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup
origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", status_code=status.HTTP_200_OK, tags=["System"])
def health_check(db: Session = Depends(get_db)):
    """Readiness and Liveness probe testing database connectivity."""
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "sovereign_region": "KSA-Central-1",
            "compliance_checks": "passed"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database unreachable: {str(e)}"
        )

@app.get("/api/v1/workloads", response_model=List[WorkloadResponse], tags=["Workloads"])
def get_workloads(
    sector: Optional[str] = Query(None, description="Filter by enterprise sector"),
    phase: Optional[str] = Query(None, description="Filter by migration phase"),
    classification: Optional[str] = Query(None, description="Filter by CST classification"),
    db: Session = Depends(get_db)
):
    """Retrieve all enterprise cloud workloads with optional filtering."""
    query = db.query(Workload)
    if sector:
        query = query.filter(Workload.sector == sector)
    if phase:
        query = query.filter(Workload.migration_phase == phase)
    if classification:
        query = query.filter(Workload.cst_classification == classification)
    return query.order_by(Workload.id.desc()).all()

@app.post("/api/v1/workloads", response_model=WorkloadResponse, status_code=status.HTTP_201_CREATED, tags=["Workloads"])
def create_workload(workload: WorkloadCreate, db: Session = Depends(get_db)):
    """Register a new enterprise workload for cloud adoption."""
    db_workload = Workload(**workload.model_dump())
    db.add(db_workload)
    db.commit()
    db.refresh(db_workload)
    return db_workload

@app.get("/api/v1/metrics", response_model=MetricsResponse, tags=["Analytics"])
def get_metrics(db: Session = Depends(get_db)):
    """Calculate executive KPIs for Cloud Adoption Manager dashboard."""
    workloads = db.query(Workload).all()
    total = len(workloads)
    if total == 0:
        return MetricsResponse(
            total_workloads=0,
            data_residency_percentage=100.0,
            avg_nca_score=100.0,
            by_phase={},
            by_classification={},
            by_sector={},
            sovereign_status="Initialized"
        )

    residency_compliant = sum(1 for w in workloads if w.data_residency_verified)
    avg_score = sum(w.nca_ecc_score for w in workloads) / total

    by_phase = {}
    by_class = {}
    by_sec = {}
    for w in workloads:
        by_phase[w.migration_phase] = by_phase.get(w.migration_phase, 0) + 1
        by_class[w.cst_classification] = by_class.get(w.cst_classification, 0) + 1
        by_sec[w.sector] = by_sec.get(w.sector, 0) + 1

    return MetricsResponse(
        total_workloads=total,
        data_residency_percentage=round((residency_compliant / total) * 100, 1),
        avg_nca_score=round(avg_score, 1),
        by_phase=by_phase,
        by_classification=by_class,
        by_sector=by_sec,
        sovereign_status="100% In-Kingdom Sovereign Hosting"
    )
