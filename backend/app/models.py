from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from .database import Base

class Workload(Base):
    __tablename__ = "workloads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    sector = Column(String(100), nullable=False)
    cst_classification = Column(String(50), nullable=False) # Class A, Class B, Class C
    migration_phase = Column(String(50), nullable=False)   # Discovery, In-Progress, Cutover, Optimized
    data_residency_verified = Column(Boolean, nullable=False, default=True)
    nca_ecc_score = Column(Integer, nullable=False, default=90)
    hosting_tier = Column(String(100), nullable=False, default="Sovereign In-Kingdom DC")
    notes_ar = Column(Text, nullable=True)
    notes_en = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
