import random
from fastapi import APIRouter
from app.dependencies import get_store

router = APIRouter()


@router.get("/users/random")
def random_user():
    store = get_store()
    hybrid_recs = store["hybrid_recs"]
    user_id = random.choice(list(hybrid_recs.keys()))
    return {"user_id": user_id}


@router.get("/users/{user_id}")
def user_info(user_id: str):
    store = get_store()
    hybrid_recs = store["hybrid_recs"]
    has_history = user_id in hybrid_recs
    return {
        "user_id": user_id,
        "has_history": has_history,
        "rec_count": len(hybrid_recs.get(user_id, [])),
    }