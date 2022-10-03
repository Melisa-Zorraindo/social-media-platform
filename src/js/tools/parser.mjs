const parser = new DOMParser();

/**
 * Parses the HTML element passed in
 * @param {HTMLDivElement} htmlString
 * @returns
 */
export default function (htmlString) {
  return parser.parseFromString(htmlString, "text/html");
}
