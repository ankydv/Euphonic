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
    "User-Agent": "com.google.ios.youtube/19.45.4 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
    "X-YouTube-Client-Name": "5",
    "X-YouTube-Client-Version": "19.45.4",
}
CONTEXT = {
    "client": {
        "clientName": "IOS",
        "clientVersion": "19.45.4",
        "deviceMake": "Apple",
        "deviceModel": "iPhone16,2",
        "userAgent": "com.google.ios.youtube/19.45.4 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
        "osName": "iPhone",
        "osVersion": "18.1.0.22B83",
        "hl": "en",
        "timeZone": "Asia/Kolkata",
        "utcOffsetMinutes": 330,
    }
}
BASE_DATA = {"context": CONTEXT}


def execute_request(url, method="GET", headers=None, data=None):
    """
    Executes an HTTP request with the given parameters.
    """
    headers = headers or {}
    headers.update({
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en",
    })
    response = requests.request(method, url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()


def call_api(endpoint, query_params, data):
    """
    Constructs the API request URL and calls the `execute_request` function.
    """
    endpoint_url = f"{endpoint}?{urlencode(query_params)}"
    response = execute_request(endpoint_url, method="POST", headers=HEADERS, data=data)
    return response


def player(video_id):
    """
    Retrieves metadata from the API.
    """

    # Fetch metadata from API
    endpoint = f"{BASE_URL}/player"
    query_params = {
        "videoId": video_id,
        **BASE_PARAMS,
    }
    result = call_api(endpoint, query_params, BASE_DATA)
    return result