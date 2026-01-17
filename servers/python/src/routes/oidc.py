from fastapi import APIRouter, HTTPException, Header
from datetime import datetime, timedelta
import jwt
import secrets

router = APIRouter(prefix="/.well-known", tags=["OpenID Connect"])

# OIDC Configuration
ISSUER = "http://localhost:8000"
JWKS_URI = f"{ISSUER}/.well-known/jwks.json"

# Generate a secret key for signing JWTs (in production, use a proper key management system)
JWT_SECRET = secrets.token_urlsafe(32)
JWT_ALGORITHM = "HS256"

@router.get("/openid-configuration")
async def openid_configuration():
    """OpenID Connect Discovery endpoint"""
    return {
        "issuer": ISSUER,
        "authorization_endpoint": f"{ISSUER}/oauth/authorize",
        "token_endpoint": f"{ISSUER}/oauth/token",
        "userinfo_endpoint": f"{ISSUER}/api/userinfo",
        "jwks_uri": JWKS_URI,
        "response_types_supported": ["code", "token", "id_token", "code token", "code id_token", "token id_token", "code token id_token"],
        "subject_types_supported": ["public"],
        "id_token_signing_alg_values_supported": [JWT_ALGORITHM],
        "scopes_supported": ["openid", "profile", "email", "read", "write"],
        "token_endpoint_auth_methods_supported": ["client_secret_post", "client_secret_basic"],
        "claims_supported": ["sub", "iss", "aud", "exp", "iat", "name", "email", "email_verified"]
    }

def generate_id_token(user_id: str, client_id: str, nonce: str = None) -> str:
    """Generate an OpenID Connect ID Token"""
    now = datetime.utcnow()

    payload = {
        "iss": ISSUER,
        "sub": user_id,
        "aud": client_id,
        "exp": int((now + timedelta(hours=1)).timestamp()),
        "iat": int(now.timestamp()),
        "name": f"User {user_id}",
        "email": f"{user_id}@example.com",
        "email_verified": True
    }

    if nonce:
        payload["nonce"] = nonce

    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
