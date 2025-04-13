import axios from "axios";

/**
 * Fetches user information from Google using the access token.
 * @param {string} token - Google access token.
 * @returns {Promise<Object>} - Returns user info (id, name, picture, email).
 * @throws {Error} - Throws an error if the token is invalid.
 */
export const getGoogleUserInfo = async (token) => {
  try {
    const { data } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      id: data.id,
      name: data.name,
      picture: data.picture,
      email: data.email
    };
  } catch (error) {
    throw new Error("Invalid Google token");
  }
};
