import { BASE_URL } from "../../../constants/apiUrl.mjs";

const LOGIN_EMAIL = document.querySelector("#login-email");
const LOGIN_PASSWORD = document.querySelector("#login-password");

const LOGIN_ERROR_MESSAGE = document.querySelector("#login-error-message");

/**
 * Calls API to get token authorisation
 * for later API requests and the usernaname
 * and save them in local storage
 */
export async function authoriseUser() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      email: LOGIN_EMAIL.value,
      password: LOGIN_PASSWORD.value,
    }),
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/auth/login`,
      options
    );
    const data = await response.json();
    const { name, email, accessToken, message } = data;
    if (response.status === 200) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", name);
      localStorage.setItem("userEmail", email);
      window.location.assign("profile.html");
    } else {
      LOGIN_ERROR_MESSAGE.innerHTML = message;
    }
  } catch (error) {
    console.log(error);
  }
}
