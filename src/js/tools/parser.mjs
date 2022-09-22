const parser = new DOMParser();

export default function (htmlString) {
  return parser.parseFromString(htmlString, "text/html");
}
