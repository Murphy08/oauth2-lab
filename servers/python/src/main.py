from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from routes.oauth import router as oauth_router
from routes.api import router as api_router
from routes.client import router as client_router
from routes.oidc import router as oidc_router

load_dotenv()

app = FastAPI(title="OAuth 2.0 Lab - Python Server")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(oauth_router)
app.include_router(api_router)
app.include_router(client_router)
app.include_router(oidc_router)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "python-oauth2-server"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PYTHON_SERVER_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
