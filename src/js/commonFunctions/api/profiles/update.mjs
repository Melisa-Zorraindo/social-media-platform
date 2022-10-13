import { BASE_URL } from "../../../constants/apiUrl.mjs";

/**
 * Sends a PUT request to
 * allow the user to update
 * their profile picture
 * Sets a default banner image required
 * by the API, but it won't be used
 * @param {string} accessToken
 * @param {url} urlOne
 * @param {string} name
 */
export async function updateProfile(accessToken, urlOne, name) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      banner:
        "https://i.picsum.photos/id/1048/200/1.jpg?hmac=KGIl00eqsBbeWUGyRK2yCG5FWAJrl_7Ecq_Vf-cxXMo",
      avatar: urlOne,
    }),
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/profiles/${name}/media`,
      options
    );
    await response.json();
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
