import joblib
import json
import pandas as pd
import os
from app.config import MODELS_DIR, DATA_DIR, ENVIRONMENT, HF_REPO_ID


_store = {}


def _load_from_local():
    _store["als_model"] = joblib.load(MODELS_DIR / "als_model.pkl")
    _store["als_recs"] = joblib.load(MODELS_DIR / "als_recommendations.pkl")
    _store["hybrid_recs"] = joblib.load(MODELS_DIR / "hybrid_recommendations.pkl")
    _store["user_idx"] = joblib.load(MODELS_DIR / "user_idx.pkl")
    _store["item_idx"] = joblib.load(MODELS_DIR / "item_idx.pkl")
    _store["user_item_sparse"] = joblib.load(MODELS_DIR / "user_item_sparse.pkl")


def _load_from_hub():
    from huggingface_hub import hf_hub_download

    files = {
        "als_model": "als_model.pkl",
        "als_recs": "als_recommendations.pkl",
        "hybrid_recs": "hybrid_recommendations.pkl",
        "user_idx": "user_idx.pkl",
        "item_idx": "item_idx.pkl",
        "user_item_sparse": "user_item_sparse.pkl",
    }

    for key, filename in files.items():
        path = hf_hub_download(repo_id=HF_REPO_ID, filename=filename)
        _store[key] = joblib.load(path)


def load_all():
    if ENVIRONMENT == "production" and HF_REPO_ID:
        _load_from_hub()
    else:
        _load_from_local()

    _store["item_features"] = pd.read_parquet(DATA_DIR / "item_features.parquet")
    _store["popular_items"] = pd.read_parquet(DATA_DIR / "popular_items.parquet")

    with open(DATA_DIR / "ab_results.json", encoding="utf-8") as f:
        _store["ab_results"] = json.load(f)


def get_store():
    return _store