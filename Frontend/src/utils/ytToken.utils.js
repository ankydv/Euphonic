import axios from "axios";

const SERVER = process.env.REACT_APP_SERVER2;
export const refreshToken = async () => {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    const expiresAt = parseInt(localStorage.getItem("expiresAt") || "0", 10);
    console.log(currentTime, typeof currentTime)
    console.log(expiresAt, typeof expiresAt)

    if (expiresAt > currentTime) {
        return; // Token is still valid
    }

    const startTime = currentTime - 30;

    // Send request to refresh token
    const response = await axios.get(`${SERVER}api/refreshtoken`);
    const { access_token, expires_in } = response.data;
    const expires = startTime + expires_in;

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("expiresAt", expires.toString());

  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
