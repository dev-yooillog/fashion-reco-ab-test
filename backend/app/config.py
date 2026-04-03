import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"
DATA_DIR = BASE_DIR.parent / "data" / "processed"

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
HF_REPO_ID = os.getenv("HF_REPO_ID", "")

RECOMMEND_N = 12