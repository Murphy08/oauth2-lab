from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, RedirectResponse
import httpx
import os

router = APIRouter(prefix="/client", tags=["Client"])

CLIENT_ID = os.getenv("OAUTH2_CLIENT_ID", "test-client")
CLIENT_SECRET = os.getenv("OAUTH2_CLIENT_SECRET", "test-secret")
REDIRECT_URI = os.getenv("OAUTH2_REDIRECT_URI", "http://localhost:8000/client/callback")
AUTHORIZATION_ENDPOINT = "http://localhost:8000/oauth/authorize"
TOKEN_ENDPOINT = "http://localhost:8000/oauth/token"

@router.get("/", response_class=HTMLResponse)
async def client_home():
    """Client application home page"""
    html_content = f"""
    <html>
        <head><title>OAuth2 Client</title></head>
        <body>
            <h1>OAuth2 Client Application</h1>
            <p>Client ID: {CLIENT_ID}</p>
            <p>Redirect URI: {REDIRECT_URI}</p>
            <a href="/client/login">Login with OAuth2</a>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@router.get("/login")
async def client_login():
    """Initiate OAuth2 authorization flow"""
    auth_url = f"{AUTHORIZATION_ENDPOINT}?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=read write&state=random_state"
    return RedirectResponse(url=auth_url)

@router.get("/callback")
async def client_callback(code: str = None, state: str = None, error: str = None):
    """Handle OAuth2 callback"""
    if error:
        return HTMLResponse(content=f"<h1>Error: {error}</h1>")

    if not code:
        return HTMLResponse(content="<h1>Error: No authorization code received</h1>")

    # Exchange code for token
    async with httpx.AsyncClient() as client:
        response = await client.post(
            TOKEN_ENDPOINT,
            data={
                "grant_type": "authorization_code",
                "code": code,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uri": REDIRECT_URI
            }
        )

    if response.status_code == 200:
        token_data = response.json()
        html_content = f"""
        <html>
            <head><title>OAuth2 Success</title></head>
            <body>
                <h1>Authorization Successful!</h1>
                <p>Access Token: {token_data.get('access_token')}</p>
                <p>Token Type: {token_data.get('token_type')}</p>
                <p>Expires In: {token_data.get('expires_in')} seconds</p>
                <p>Refresh Token: {token_data.get('refresh_token')}</p>
            </body>
        </html>
        """
        return HTMLResponse(content=html_content)
    else:
        return HTMLResponse(content=f"<h1>Error: {response.text}</h1>")
