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

/**
 * Updates field styles to convey
 * field is free of errors
 * @param {HTMLInputElement} inputFieldOne
 * @param {HTMLParagraphElement} inputFieldTwo
 */
function removeError(inputFieldOne, inputFieldTwo) {
  inputFieldOne.classList.remove("border-danger");
  inputFieldTwo.classList.remove("text-danger");
}

/**
 * Changes field styles to convey
 * field contains errors
 * @param {HTMLInputElement} inputFieldOne
 * @param {HTMLParagraphElement} inputFieldTwo
 */
function displayError(inputFieldOne, inputFieldTwo) {
  inputFieldOne.classList.add("border-danger");
  inputFieldTwo.classList.add("text-danger");
}
