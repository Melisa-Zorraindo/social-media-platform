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
