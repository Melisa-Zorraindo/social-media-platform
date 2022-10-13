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
