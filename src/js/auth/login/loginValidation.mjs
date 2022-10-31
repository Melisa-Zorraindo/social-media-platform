import { authoriseUser } from "../../commonFunctions/api/auth/login.mjs";
import { checkEmail } from "../../commonFunctions/errorHandling/checks.mjs";
import { displayError } from "../../commonFunctions/errorHandling/display.mjs";
import { removeError } from "../../commonFunctions/errorHandling/remove.mjs";

const LOGIN_EMAIL_FIELD = document.querySelector("#login-email");
const LOGIN_EMAIL_ERROR = document.querySelector("#login-email-error");

//display errors or hide error messages on key up
LOGIN_EMAIL_FIELD.addEventListener("keyup", () => {
  if (checkEmail(LOGIN_EMAIL_FIELD.value)) {
    removeError(LOGIN_EMAIL_FIELD, LOGIN_EMAIL_ERROR);
  } else {
    displayError(LOGIN_EMAIL_FIELD, LOGIN_EMAIL_ERROR);
  }
});

/**
 * Authorises user if login data
 * passes validation, displays errors
 * if it doesn't
 * @param {SubmitEvent} event
 */
export function validateLogin(event) {
  event.preventDefault();

  if (checkEmail(LOGIN_EMAIL_FIELD.value)) {
    removeError(LOGIN_EMAIL_FIELD, LOGIN_EMAIL_ERROR);
    authoriseUser();
  } else {
    displayError(LOGIN_EMAIL_FIELD, LOGIN_EMAIL_ERROR);
  }
}
