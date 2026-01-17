import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "python-oauth2-server"}

def test_authorize_endpoint():
    """Test OAuth2 authorize endpoint"""
    response = client.get(
        "/oauth/authorize",
        params={
            "response_type": "code",
            "client_id": "test-client",
            "redirect_uri": "http://localhost:3000/callback",
            "scope": "read write",
            "state": "test_state"
        },
        follow_redirects=False
    )
    assert response.status_code == 307
    assert "code=" in response.headers["location"]
    assert "state=test_state" in response.headers["location"]
