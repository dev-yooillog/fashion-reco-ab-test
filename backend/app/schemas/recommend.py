from pydantic import BaseModel
from typing import List, Optional


class ItemCard(BaseModel):
    article_id: str
    product_type_name: Optional[str] = None
    colour_group_name: Optional[str] = None
    department_name: Optional[str] = None
    price_tier: Optional[str] = None
    popularity_rank: Optional[int] = None


class RecommendResponse(BaseModel):
    user_id: str
    model: str
    items: List[ItemCard]