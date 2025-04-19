import requests
from urllib.parse import urlencode

API_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
BASE_URL = "https://www.youtube.com/youtubei/v1"
BASE_PARAMS = {
    "key": API_KEY,
    "contentCheckOk": True,
    "racyCheckOk": True,
}
HEADERS = {
    "User-Agent": "com.google.android.apps.youtube.music/",
    "X-YouTube-Client-Name": "62",
    "X-YouTube-Client-Version": "7.25.52",
}
CONTEXT = {
    "client": {
      "clientName": "ANDROID_MUSIC",
      "clientVersion": "7.25.52",
      "deviceMake": "Samsung",
      "deviceModel": "X910",
      "userAgent": "com.google.android.apps.youtube.music/",
      "osName": "android",
      "osVersion": "12.0",
      "hl": "en",
      "timeZone": "Asia/Kolkata",
      "utcOffsetMinutes": 330
    }
}
BASE_DATA = {"context": CONTEXT}


def execute_request(url, method="GET", headers=None, data=None, accessToken=None):
    """
    Executes an HTTP request with the given parameters.
    """
    headers = headers or {}
    headers.update({
        "Authorization": f"Bearer {accessToken}",
        "Content-Type": "application/json",
    })
    response = requests.request(method, url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()


def call_api(endpoint, query_params, data, accessToken):
    """
    Constructs the API request URL and calls the `execute_request` function.
    """
    endpoint_url = f"{endpoint}?{urlencode(query_params)}"
    response = execute_request(endpoint_url, method="POST", headers=HEADERS, data=data, accessToken=accessToken)
    return response


def player(video_id, accessToken):
    """
    Retrieves metadata from the API.
    """

    # Fetch metadata from API
    endpoint = f"{BASE_URL}/player"
    query_params = {
        "videoId": video_id,
        **BASE_PARAMS,
    }
    result = call_api(endpoint, query_params, BASE_DATA, accessToken)
    return result