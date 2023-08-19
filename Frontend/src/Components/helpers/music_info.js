import axios from 'axios';

function executeRequest(url, method = 'GET', headers = {}, data = null, timeout = 0) {
    const baseHeaders = {
        // 'User-Agent': 'Mozilla/5.0',
        'accept-language': 'en-US,en',
        ...headers
    };

    const config = {
        url,
        method,
        headers: baseHeaders,
        timeout
    };

    if (data) {
        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }
        config.data = data;
    }

    return axios(config);
}

const endpoint = '/youtubei/v1/player';
const apiKey = process.env.REACT_APP_YT_API_KEY;  // Replace with your actual API key

const baseQuery = {
    key: apiKey,
    contentCheckOk: true,
    racyCheckOk: true
};

const baseData = {
    context: {
        client: {
            clientName: 'ANDROID_MUSIC',
            clientVersion: '5.16.51',
            androidSdkVersion: 30
        }
    }
};

const headers = {
    'Content-Type': 'application/json',
    // 'User-Agent': 'com.google.android.apps.youtube.music/'
};

const getMusicInfo = (videoId) => {
    const query = {
        'videoId':videoId,
        ...baseQuery
    }
    const endpointUrl = `${endpoint}?${new URLSearchParams(query).toString()}`;
    const res = executeRequest(endpointUrl, 'POST', headers, baseData);
    return res;
}

export default getMusicInfo;