import { BASE_URL } from "../../../constants/apiUrl.mjs";
import { handleSubmission } from "../../../auth/singup/submission.mjs";

const USERNAME_FIELD = document.querySelector("#username");
const EMAIL_FIELD = document.querySelector("#email");
const PASSWORD_FIELD = document.querySelector("#password");

const SIGNUP_ERROR_MESSAGE = document.querySelector("#signup-error-message");

/**
 * Calls API to register a new user
 */
export async function authenticateUser() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
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
