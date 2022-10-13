import { BASE_URL } from "../../../constants/apiUrl.mjs";
/**
 * Sends a POST request to create a new
 * post on the API
 * @param {string} accessToken
 * @param {string} postText
 * @param {string} mediaUrl
 */
export async function createPost(accessToken, postText, mediaUrl) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: " ",
      body: postText,
      tags: [" "],
      media:
        mediaUrl ||
        "https://i.picsum.photos/id/1048/200/1.jpg?hmac=KGIl00eqsBbeWUGyRK2yCG5FWAJrl_7Ecq_Vf-cxXMo",
    }),
  };

  try {
    const response = await fetch(`${BASE_URL}/api/v1/social/posts/`, options);
    await response.json();
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
