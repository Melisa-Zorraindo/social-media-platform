import { BASE_URL } from "../../../constants/apiUrl.mjs";
/**
 * Makes a GET request to fetch
 * all posts from API
 * @param {string} accessToken
 * @returns posts from API
 */
export async function fetchPosts(accessToken) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts?_author=true&_comments=true&_reactions=true`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Makes a GET request to
 * fetch a single post from API
 * @param {string} accessToken
 * @param {number} id
 * @returns post in API which matches the id passed in
 */
export async function viewSpecificPost(accessToken, id) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
