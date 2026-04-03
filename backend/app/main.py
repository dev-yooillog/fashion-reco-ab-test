from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.dependencies import load_all
from app.routers import recommend, experiments, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_all()
    yield


app = FastAPI(title="Fashion Reco API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend.router, prefix="/api")
app.include_router(experiments.router, prefix="/api")
app.include_router(users.router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok"}