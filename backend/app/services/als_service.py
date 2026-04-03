from app.dependencies import get_store
from app.config import RECOMMEND_N


def get_als_recommendations(user_id: str, n: int = RECOMMEND_N):
    store = get_store()
    als_recs = store["als_recs"]
    item_features = store["item_features"]
    popular_items = store["popular_items"]

    article_ids = als_recs.get(user_id)

    if not article_ids:
        article_ids = popular_items["article_id"].head(n).tolist()

    article_ids = article_ids[:n]

    result = (
        item_features[item_features["article_id"].isin(article_ids)][[
            "article_id", "product_type_name",
            "colour_group_name", "department_name",
            "price_tier", "popularity_rank",
        ]]
        .set_index("article_id")
        .reindex(article_ids)
        .reset_index()
    )
    result["price_tier"] = result["price_tier"].astype(str).replace("nan", None)
    return result.to_dict(orient="records")