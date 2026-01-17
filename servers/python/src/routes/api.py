from fastapi import APIRouter, HTTPException, Header
from datetime import datetime
from routes.oauth import tokens

router = APIRouter(prefix="/api", tags=["API"])

def verify_token(authorization: str = Header(None)):
    """Verify access token"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.replace("Bearer ", "")

    if token not in tokens:
        raise HTTPException(status_code=401, detail="Invalid token")

    token_data = tokens[token]

    if token_data["expires_at"] < datetime.now():
        del tokens[token]
        raise HTTPException(status_code=401, detail="Token expired")

    return token_data

@router.get("/userinfo")
async def userinfo(authorization: str = Header(None)):
    """Get user information"""
    token_data = verify_token(authorization)

    return {
        "user_id": token_data["user_id"],
        "client_id": token_data["client_id"],
        "scope": token_data["scope"]
    }

@router.get("/protected")
async def protected_resource(authorization: str = Header(None)):
    """Protected resource endpoint"""
    verify_token(authorization)

    return {
        "message": "This is a protected resource",
        "timestamp": datetime.now().isoformat()
    }
