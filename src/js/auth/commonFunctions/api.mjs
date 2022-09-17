import { handleSubmission } from "../singup/submission.mjs";

const USERNAME_FIELD = document.querySelector("#username");
const EMAIL_FIELD = document.querySelector("#email");
const PASSWORD_FIELD = document.querySelector("#password");

const SIGNUP_ERROR_MESSAGE = document.querySelector("#signup-error-message");

const BASE_URL = "https://nf-api.onrender.com";

/**
 * Calls API to register a new user
 */
export async function authenticateUser() {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      name: USERNAME_FIELD.value,
      email: EMAIL_FIELD.value,
      password: PASSWORD_FIELD.value,
    }),
  };
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/auth/register`,
      options
    );
    const { status, message } = await response.json();
    if (status === 200) {
      handleSubmission();
    } else {
      SIGNUP_ERROR_MESSAGE.innerHTML = message;
    }
  } catch (error) {
    console.log(error);
  }
}

const LOGIN_EMAIL = document.querySelector("#login-email");
const LOGIN_PASSWORD = document.querySelector("#login-password");

const LOGIN_ERROR_MESSAGE = document.querySelector("#login-error-message");

/**
 * Calls API to get token authorisation
 * for later API requests
 */
export async function authoriseUser() {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
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
    if (response.status === 200) {
      localStorage.setItem("accessToken", data.accessToken);
      window.location.assign("profile.html");
    } else {
      LOGIN_ERROR_MESSAGE.innerHTML = data.message;
    }
  } catch (error) {
    console.log(error);
  }
}
