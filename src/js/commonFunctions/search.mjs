import { renderListOfPosts } from "./postRendering.mjs";

/**
 * Uses the string passed in by the user
 * in the search bar to filter posts which
 * include the string either in the body
 * or in the username
 * @param {string} queryString
 */
export default function searchPosts(arr, queryString, container) {
  const filteredPosts = arr.filter(({ body, author: { name } }) => {
    return (
      body.toLowerCase().includes(queryString.toLowerCase()) ||
      name.toLowerCase().includes(queryString.toLowerCase())
    );
  });

  container.innerHTML = "";

  renderListOfPosts(filteredPosts, container);
}
