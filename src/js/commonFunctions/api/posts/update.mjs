import { BASE_URL } from "../../../constants/apiUrl.mjs";

/**
 * Sends a PUT request to edit
 * a post on the API
 * @param {string} accessToken
 * @param {string} editedContent
 * @param {url} editedMedia
 * @param {number} id
 */
export async function updatePost(accessToken, editedContent, editedMedia, id) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: " ",
      body: `${editedContent}`,
      tags: [" "],
      media:
        `${editedMedia}` ||
        "https://i.picsum.photos/id/1048/200/1.jpg?hmac=KGIl00eqsBbeWUGyRK2yCG5FWAJrl_7Ecq_Vf-cxXMo",
    }),
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts/${id}`,
      options
    );
    await response.json();
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Makes a POST request to
 * allow the user to comment on
 * an existing post entry
 * @param {string} accessToken
 * @param {string} commentBody
 * @param {number} id
 */
export async function commentOnPost(accessToken, commentBody, id) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      body: commentBody,
    }),
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts/${id}/comment`,
      options
    );
    await response.json();
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Sends a PUT request to
 * allow the user to react to
 * a post entry
 * @param {string} accessToken
 * @param {number} id
 * @param {string} symbol
 */
export async function reactToPost(accessToken, id, symbol) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      body: symbol,
    }),
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts/${id}/react/${symbol}`,
      options
    );
    await response.json();
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
