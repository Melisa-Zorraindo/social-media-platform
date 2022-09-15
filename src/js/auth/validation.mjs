import { authenticateUser } from "./api.mjs";
import { handleSubmission } from "./authentication.mjs";

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
    USERNAME_FIELD.classList.remove("border-danger");
    USERNAME_ERROR.classList.remove("text-danger");
  }
});

EMAIL_FIELD.addEventListener("keyup", () => {
  if (checkEmail(EMAIL_FIELD.value)) {
    EMAIL_FIELD.classList.remove("border-danger");
    EMAIL_ERROR.classList.remove("text-danger");
  }
});

PASSWORD_FIELD.addEventListener("keyup", () => {
  if (checkPasswordLength(PASSWORD_FIELD.value)) {
    PASSWORD_FIELD.classList.remove("border-danger");
    PASSWORD_ERROR.classList.remove("text-danger");
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
export function validateForm(event) {
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
      USERNAME_FIELD.classList.remove("border-danger");
      USERNAME_ERROR.classList.remove("text-danger");
    } else {
      USERNAME_FIELD.classList.add("border-danger");
      USERNAME_ERROR.classList.add("text-danger");
    }

    if (checkEmail(EMAIL_FIELD.value)) {
      EMAIL_FIELD.classList.remove("border-danger");
      EMAIL_ERROR.classList.remove("text-danger");
    } else {
      EMAIL_FIELD.classList.add("border-danger");
      EMAIL_ERROR.classList.add("text-danger");
    }

    if (checkPasswordLength(PASSWORD_FIELD.value)) {
      PASSWORD_FIELD.classList.remove("border-danger");
      PASSWORD_ERROR.classList.remove("text-danger");
    } else {
      PASSWORD_FIELD.classList.add("border-danger");
      PASSWORD_ERROR.classList.add("text-danger");
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

/**
 * Checks if username entered matches
 * the regEx pattern
 * @param {string} username
 * @returns true if patterns match, false if don't
 */
function checkUsername(username) {
  const pattern = /^[\w]+$/;
  const patternMatches = pattern.test(username.trim());
  return patternMatches;
}

/**
 * Checks if email entered matches
 * regEx patter
 * @param {string} email
 * @returns true if patterns match, false if don't
 */
function checkEmail(email) {
  const pattern = /^[\w\-.]+@(stud.)?noroff.no$/;
  const patternMatches = pattern.test(email);
  return patternMatches;
}

/**
 * Checks the password entered is at least 8 characters long
 * @param {string} password
 * @returns true if password is long enough, false if don't
 */
function checkPasswordLength(password) {
  return password.trim().length >= 8;
}

/**
 * Checks if passwords entered are the same
 * @param {string} passwordOne
 * @param {string} passwordTwo
 * @returns true if passwords are the same, false if not
 */
function checkPasswordsMatch(passwordOne, passwordTwo) {
  return passwordOne === passwordTwo;
}
