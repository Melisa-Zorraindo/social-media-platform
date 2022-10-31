import { renderListOfPosts } from "./postRendering.mjs";

const day = 1000 * 60 * 60 * 24;

/**
 * Filters posts according to
 * the date passed in
 * @param {string} searchDate
 */
export default function filterByDate(arr, searchDate, container) {
  const filteredPostsByDate = arr.filter(({ created, updated }) => {
    const creationDate = new Date(created);
    const updatedDate = new Date(updated);
    return searchDate - creationDate <= day || searchDate - updatedDate <= day;
  });

  //display older posts first by reversing the array (mostly for user experience, there are so many posts that it'll be hard to realise your filter worked if you're still seeing the latests posts)
  const reversedFilteredPostsByDate = filteredPostsByDate.reverse();
  container.innerHTML = "";
  renderListOfPosts(reversedFilteredPostsByDate, container);
}
