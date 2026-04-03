from app.dependencies import get_store
from app.config import RECOMMEND_N


def get_popular_items(n: int = RECOMMEND_N):
    store = get_store()
    popular = store["popular_items"].head(n)
    item_features = store["item_features"]

    result = popular.merge(
        item_features[[
            "article_id", "product_type_name",
            "colour_group_name", "department_name",
            "price_tier", "popularity_rank",
        ]],
        on="article_id",
        how="left",
    )
    result["price_tier"] = result["price_tier"].astype(str).replace("nan", None)
    return result.to_dict(orient="records")