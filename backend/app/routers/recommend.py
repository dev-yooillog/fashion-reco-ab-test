from fastapi import APIRouter, Query
from app.schemas.recommend import RecommendResponse, ItemCard
from app.services import hybrid_service, als_service, popular_service

router = APIRouter()


@router.get("/recommend/{user_id}", response_model=RecommendResponse)
def recommend(
    user_id: str,
    model: str = Query(default="hybrid", pattern="^(hybrid|als|popular)$"),
):
    if model == "popular":
        items = popular_service.get_popular_items()
    elif model == "als":
        items = als_service.get_als_recommendations(user_id)
    else:
        items = hybrid_service.get_hybrid_recommendations(user_id)

    return RecommendResponse(
        user_id=user_id,
        model=model,
        items=[ItemCard(**item) for item in items],
    )