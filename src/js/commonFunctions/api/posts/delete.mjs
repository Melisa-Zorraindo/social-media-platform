import { BASE_URL } from "../../../constants/apiUrl.mjs";
/**
 * Makes a DELETE request to
 * remove a post from the API
 * @param {string} accessToken
 * @param {number} id
 */
export async function deletePost(accessToken, id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts/${id}`,
      options
    );
    await response.json();
    if (response.status === 200) {
      location.reload();
    } else {
      alert("An error ocurred, try later");
    }
  } catch (error) {
    console.log(error);
  }
}
