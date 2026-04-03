from fastapi import APIRouter
from app.dependencies import get_store
from app.schemas.experiment import ABResultResponse, ExperimentSummary, SegmentResult, AlphaPoint

router = APIRouter()


@router.get("/ab-results", response_model=ABResultResponse)
def ab_results():
    store = get_store()
    data = store["ab_results"]
    s = data["summary"]

    # segments 없으면 빈 리스트
    segments = []
    if "segments" in data and "frequency" in data["segments"]:
        segments = [
            SegmentResult(
                segment=seg["segment"],
                control_cvr=seg["control_cvr"],
                test_cvr=seg["test_cvr"],
                lift=seg["lift(%)"],
            )
            for seg in data["segments"]["frequency"]
        ]

    alpha_tradeoff = [
        AlphaPoint(**pt)
        for pt in data.get("alpha_tradeoff", [])
    ]

    valid_fields = ExperimentSummary.model_fields.keys()
    filtered = {k: v for k, v in s.items() if k in valid_fields}

    return ABResultResponse(
        summary=ExperimentSummary(**filtered),
        segments=segments,
        alpha_tradeoff=alpha_tradeoff if alpha_tradeoff else None,
    )