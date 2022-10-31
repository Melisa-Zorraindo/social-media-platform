import { authenticateUser } from "../../commonFunctions/api/auth/signup.mjs";
import * as validation from "../../commonFunctions/errorHandling/index.mjs";
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
  if (validation.checkUsername(USERNAME_FIELD.value)) {
    validation.removeError(USERNAME_FIELD, USERNAME_ERROR);
  }
});

EMAIL_FIELD.addEventListener("keyup", () => {
  if (validation.checkEmail(EMAIL_FIELD.value)) {
    validation.removeError(EMAIL_FIELD, EMAIL_ERROR);
  }
});

PASSWORD_FIELD.addEventListener("keyup", () => {
  if (validation.checkPasswordLength(PASSWORD_FIELD.value)) {
    validation.removeError(PASSWORD_FIELD, PASSWORD_ERROR);
  }
});

PASSWORD_REPEAT_FIELD.addEventListener("keyup", () => {
  if (
    validation.checkPasswordsMatch(
      PASSWORD_FIELD.value,
      PASSWORD_REPEAT_FIELD.value
    )
  ) {
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
    validation.checkUsername(USERNAME_FIELD.value) &&
    validation.checkEmail(EMAIL_FIELD.value) &&
    validation.checkPasswordLength(PASSWORD_FIELD.value) &&
    validation.checkPasswordsMatch(
      PASSWORD_FIELD.value,
      PASSWORD_REPEAT_FIELD.value
    )
  ) {
    authenticateUser();
    handleSubmission();
  } else {
    if (validation.checkUsername(USERNAME_FIELD.value)) {
      validation.removeError(USERNAME_FIELD, USERNAME_ERROR);
    } else {
      validation.displayError(USERNAME_FIELD, USERNAME_ERROR);
    }

    if (validation.checkEmail(EMAIL_FIELD.value)) {
      validation.removeError(EMAIL_FIELD, EMAIL_ERROR);
    } else {
      validation.displayError(EMAIL_FIELD, EMAIL_ERROR);
    }

    if (validation.checkPasswordLength(PASSWORD_FIELD.value)) {
      validation.removeError(PASSWORD_FIELD, PASSWORD_ERROR);
    } else {
      validation.displayError(PASSWORD_FIELD, PASSWORD_ERROR);
    }

    if (
      validation.checkPasswordsMatch(
        PASSWORD_FIELD.value,
        PASSWORD_REPEAT_FIELD.value
      )
    ) {
      PASSWORD_REPEAT_FIELD.classList.remove("border-danger");
      PASSWORD_MATCH_ERROR.classList.add("hidden");
    } else {
      PASSWORD_REPEAT_FIELD.classList.add("border-danger");
      PASSWORD_MATCH_ERROR.classList.remove("hidden");
    }
  }
}
