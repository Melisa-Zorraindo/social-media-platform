import { authenticateUser } from "../../commonFunctions/api.mjs";
import {
  checkUsername,
  checkEmail,
  checkPasswordLength,
  checkPasswordsMatch,
  removeError,
  displayError,
} from "../../commonFunctions/errorHandling.mjs";
import { handleSubmission } from "./submission.mjs";

//display errors or hide error messages on key up
const USERNAME_FIELD = document.querySelector("#username");
const USERNAME_ERROR = document.querySelector("#username-error");

const EMAIL_FIELD = document.querySelector("#email");
const EMAIL_ERROR = document.querySelector("#email-error");

const PASSWORD_FIELD = document.querySelector("#password");
const PASSWORD_ERROR = document.querySelector("#pass-error");

const PASSWORD_REPEAT_FIELD = document.querySelector("#password-repeat");
const PASSWORD_MATCH_ERROR = document.querySelector("#pass-match-error");

USERNAME_FIELD.addEventListener("keyup", () => {
  if (checkUsername(USERNAME_FIELD.value)) {
    removeError(USERNAME_FIELD, USERNAME_ERROR);
  }
});

EMAIL_FIELD.addEventListener("keyup", () => {
  if (checkEmail(EMAIL_FIELD.value)) {
    removeError(EMAIL_FIELD, EMAIL_ERROR);
  }
});

PASSWORD_FIELD.addEventListener("keyup", () => {
  if (checkPasswordLength(PASSWORD_FIELD.value)) {
    removeError(PASSWORD_FIELD, PASSWORD_ERROR);
  }
});

PASSWORD_REPEAT_FIELD.addEventListener("keyup", () => {
  if (checkPasswordsMatch(PASSWORD_FIELD.value, PASSWORD_REPEAT_FIELD.value)) {
    PASSWORD_REPEAT_FIELD.classList.remove("border-danger");
    PASSWORD_MATCH_ERROR.classList.add("hidden");
  }
});

/**
 * If values entered pass validation,
 * it calls API to register new user
 * @param {*} event
 */
export function validateSignup(event) {
  event.preventDefault();

  if (
    checkUsername(USERNAME_FIELD.value) &&
    checkEmail(EMAIL_FIELD.value) &&
    checkPasswordLength(PASSWORD_FIELD.value) &&
    checkPasswordsMatch(PASSWORD_FIELD.value, PASSWORD_REPEAT_FIELD.value)
  ) {
    authenticateUser();
    handleSubmission();
  } else {
    if (checkUsername(USERNAME_FIELD.value)) {
      removeError(USERNAME_FIELD, USERNAME_ERROR);
    } else {
      displayError(USERNAME_FIELD, USERNAME_ERROR);
    }

    if (checkEmail(EMAIL_FIELD.value)) {
      removeError(EMAIL_FIELD, EMAIL_ERROR);
    } else {
      displayError(EMAIL_FIELD, EMAIL_ERROR);
    }

    if (checkPasswordLength(PASSWORD_FIELD.value)) {
      removeError(PASSWORD_FIELD, PASSWORD_ERROR);
    } else {
      displayError(PASSWORD_FIELD, PASSWORD_ERROR);
    }

    if (
      checkPasswordsMatch(PASSWORD_FIELD.value, PASSWORD_REPEAT_FIELD.value)
    ) {
      PASSWORD_REPEAT_FIELD.classList.remove("border-danger");
      PASSWORD_MATCH_ERROR.classList.add("hidden");
    } else {
      PASSWORD_REPEAT_FIELD.classList.add("border-danger");
      PASSWORD_MATCH_ERROR.classList.remove("hidden");
    }
  }
}
