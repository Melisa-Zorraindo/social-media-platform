/**
 * Checks if username entered matches
 * the regEx pattern
 * @param {string} username
 * @returns true if patterns match, false if don't
 */
export function checkUsername(username) {
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
export function checkEmail(email) {
  const pattern = /^[\w\-.]+@(stud.)?noroff.no$/;
  const patternMatches = pattern.test(email);
  return patternMatches;
}

/**
 * Checks the password entered is at least 8 characters long
 * @param {string} password
 * @returns true if password is long enough, false if don't
 */
export function checkPasswordLength(password) {
  return password.trim().length >= 8;
}

/**
 * Checks if passwords entered are the same
 * @param {string} passwordOne
 * @param {string} passwordTwo
 * @returns true if passwords are the same, false if not
 */
export function checkPasswordsMatch(passwordOne, passwordTwo) {
  return passwordOne === passwordTwo;
}

/**
 * Updates field styles to convey
 * field is free of errors
 * @param {HTMLInputElement} inputFieldOne
 * @param {HTMLParagraphElement} inputFieldTwo
 */
export function removeError(inputFieldOne, inputFieldTwo) {
  inputFieldOne.classList.remove("border-danger");
  inputFieldTwo.classList.remove("text-danger");
}

/**
 * Changes field styles to convey
 * field contains errors
 * @param {HTMLInputElement} inputFieldOne
 * @param {HTMLParagraphElement} inputFieldTwo
 */
export function displayError(inputFieldOne, inputFieldTwo) {
  inputFieldOne.classList.add("border-danger");
  inputFieldTwo.classList.add("text-danger");
}
