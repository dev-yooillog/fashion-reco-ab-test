from pydantic import BaseModel
from typing import List, Optional


class ExperimentSummary(BaseModel):
    control_cvr: float
    test_cvr: float
    cvr_lift_pct: float
    z_stat: float
    p_value: float
    significant: bool
    n_eval: Optional[int] = None
    metric: Optional[str] = None
    optimal_alpha: Optional[float] = None
    catalog_coverage_control: Optional[float] = None
    catalog_coverage_hybrid: Optional[float] = None


class SegmentResult(BaseModel):
    segment: str
    control_cvr: float
    test_cvr: float
    lift: float


class AlphaPoint(BaseModel):
    alpha: float
    hit_rate: float
    coverage: float


class ABResultResponse(BaseModel):
    summary: ExperimentSummary
    segments: List[SegmentResult]
    alpha_tradeoff: Optional[List[AlphaPoint]] = None