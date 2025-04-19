import requests
import os
from dotenv import load_dotenv

load_dotenv()

def refresh_token():
    token_url = 'https://oauth2.googleapis.com/token'

    client_id = os.getenv("GOOGLE_CLIENT_ID")
    refresh_token = os.getenv("GOOGLE_REFRESH_TOKEN")

    if not client_id or not refresh_token:
        raise ValueError("Missing GOOGLE_CLIENT_ID or Refresh token environment variables.")

    payload = {
        'client_id': client_id,
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token',
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    try:
        response = requests.post(token_url, data=payload, headers=headers)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Error refreshing token: {e}")
        raise
