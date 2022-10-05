/**
 * Hides from interface
 * HTML elements whose
 * currentScr attributes are empty
 * @param {string} tag
 */
export default function imageContainerManager(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].currentSrc === "") {
      arr[i].classList.add("d-none");
    }
  }
}
