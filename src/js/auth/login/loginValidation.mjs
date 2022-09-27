import { authoriseUser } from "../../commonFunctions/api.mjs";
import {
  checkEmail,
  displayError,
  removeError,
} from "../../commonFunctions/errorHandling.mjs";

const LOGIN_EMAIL_FIELD = document.querySelector("#login-email");
const LOGIN_EMAIL_ERROR = document.querySelector("#login-email-error");

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
 * @param {submit} event
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
