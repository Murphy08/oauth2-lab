from fastapi import APIRouter, Request, Form, HTTPException, Depends
from fastapi.responses import RedirectResponse, JSONResponse
from authlib.integrations.starlette_client import OAuth
from authlib.oauth2.rfc6749 import grants
from datetime import datetime, timedelta
import secrets
import hashlib
from routes.oidc import generate_id_token

router = APIRouter(prefix="/oauth", tags=["OAuth2"])

# Temporary in-memory storage
authorization_codes = {}
tokens = {}
clients = {
    "test-client": {
        "client_secret": "test-secret",
        "redirect_uris": ["http://localhost:3000/callback", "http://127.0.0.1:3000/callback"],
        "grants": ["authorization_code", "refresh_token", "client_credentials"],
        "scopes": ["read", "write", "openid"]
    }
}

@router.get("/authorize")
async def authorize(
    response_type: str,
    client_id: str,
    redirect_uri: str,
    scope: str = "",
    state: str = "",
    nonce: str = ""
):
    """Authorization endpoint"""
    if response_type != "code":
        raise HTTPException(status_code=400, detail="Unsupported response_type")

    if client_id not in clients:
        raise HTTPException(status_code=400, detail="Invalid client_id")

    if redirect_uri not in clients[client_id]["redirect_uris"]:
        raise HTTPException(status_code=400, detail="Invalid redirect_uri")

    # Generate authorization code
    code = secrets.token_urlsafe(32)
    authorization_codes[code] = {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "scope": scope,
        "user_id": "user123",  # Mock user
        "nonce": nonce,  # Store nonce for ID token
        "expires_at": datetime.now() + timedelta(minutes=10)
    }

    # Redirect back with code
    redirect_url = f"{redirect_uri}?code={code}"
    if state:
        redirect_url += f"&state={state}"

    return RedirectResponse(url=redirect_url)

@router.post("/token")
async def token(
    grant_type: str = Form(...),
    code: str = Form(None),
    client_id: str = Form(...),
    client_secret: str = Form(...),
    redirect_uri: str = Form(None),
    refresh_token: str = Form(None)
):
    """Token endpoint"""
    # Validate client credentials
    if client_id not in clients or clients[client_id]["client_secret"] != client_secret:
        raise HTTPException(status_code=401, detail="Invalid client credentials")

    if grant_type == "authorization_code":
        if not code or code not in authorization_codes:
            raise HTTPException(status_code=400, detail="Invalid authorization code")

        auth_code = authorization_codes[code]

        # Validate code
        if auth_code["expires_at"] < datetime.now():
            del authorization_codes[code]
            raise HTTPException(status_code=400, detail="Authorization code expired")

        if auth_code["client_id"] != client_id:
            raise HTTPException(status_code=400, detail="Client mismatch")

        if auth_code["redirect_uri"] != redirect_uri:
            raise HTTPException(status_code=400, detail="Redirect URI mismatch")

        # Generate tokens
        access_token = secrets.token_urlsafe(32)
        refresh_token_value = secrets.token_urlsafe(32)

        tokens[access_token] = {
            "client_id": client_id,
            "user_id": auth_code["user_id"],
            "scope": auth_code["scope"],
            "expires_at": datetime.now() + timedelta(hours=1)
        }

        tokens[refresh_token_value] = {
            "client_id": client_id,
            "user_id": auth_code["user_id"],
            "scope": auth_code["scope"],
            "expires_at": datetime.now() + timedelta(days=7)
        }

        # Delete used authorization code
        del authorization_codes[code]

        # Prepare response
        response = {
            "access_token": access_token,
            "token_type": "Bearer",
            "expires_in": 3600,
            "refresh_token": refresh_token_value,
            "scope": auth_code["scope"]
        }

        # Add ID Token if openid scope is requested
        if "openid" in auth_code["scope"]:
            id_token = generate_id_token(
                user_id=auth_code["user_id"],
                client_id=client_id,
                nonce=auth_code.get("nonce")
            )
            response["id_token"] = id_token

        return response

    elif grant_type == "client_credentials":
        # Generate access token
        access_token = secrets.token_urlsafe(32)

        tokens[access_token] = {
            "client_id": client_id,
            "user_id": None,
            "scope": "read write",
            "expires_at": datetime.now() + timedelta(hours=1)
        }

        return {
            "access_token": access_token,
            "token_type": "Bearer",
            "expires_in": 3600,
            "scope": "read write"
        }

    elif grant_type == "refresh_token":
        if not refresh_token or refresh_token not in tokens:
            raise HTTPException(status_code=400, detail="Invalid refresh token")

        token_data = tokens[refresh_token]

        if token_data["expires_at"] < datetime.now():
            del tokens[refresh_token]
            raise HTTPException(status_code=400, detail="Refresh token expired")

        # Generate new access token
        access_token = secrets.token_urlsafe(32)

        tokens[access_token] = {
            "client_id": client_id,
            "user_id": token_data["user_id"],
            "scope": token_data["scope"],
            "expires_at": datetime.now() + timedelta(hours=1)
        }

        return {
            "access_token": access_token,
            "token_type": "Bearer",
            "expires_in": 3600,
            "scope": token_data["scope"]
        }

    else:
        raise HTTPException(status_code=400, detail="Unsupported grant_type")
