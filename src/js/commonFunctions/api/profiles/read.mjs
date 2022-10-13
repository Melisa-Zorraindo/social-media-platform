import { BASE_URL } from "../../../constants/apiUrl.mjs";

/**
 * Makes a GET request to fetch
 * a specific profile from API
 * @param {string} accessToken
 * @param {string} name
 * @returns profile in API that matches the name
 * param passed in
 */
export async function viewProfile(accessToken, name) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/profiles/${name}?_posts=true&_following=true&_followers=true`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
