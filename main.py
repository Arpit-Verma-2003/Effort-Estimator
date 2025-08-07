# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(
    title="Effort Estimator API",
    description="API to process project documents and estimate software effort",
    version="1.0.0"
)

# Optional: Add CORS if frontend will run on different port (e.g., React on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev use only; in prod, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the router
app.include_router(router)

