import { renderHomepageHeader } from "./components/homepageHeader.mjs";
import { renderListOfPosts } from "./commonFunctions/postRendering.mjs";
import * as posts from "./commonFunctions/api/posts/index.mjs";
import { viewProfile } from "./commonFunctions/api/profiles/read.mjs";
import { accessToken } from "./constants/storedKeys.mjs";
import { getRandomImage } from "./tools/imagePicker.mjs";
import logout from "./commonFunctions/logout.mjs";

const listOfPosts = await posts.fetchPosts(accessToken);
const listOfPostsContainer = document.querySelector("#list-of-posts-container");

//destructure user to display information in the header
const signedInUser = localStorage.getItem("username");
let { avatar } = await viewProfile(accessToken, signedInUser);

//select avatar randomly if user's avatar is an empty string
let assignedProfilePicture = getRandomImage();
if (avatar.length === 0) {
  avatar = assignedProfilePicture;
}

//render header
const header = document.querySelector("#header");
renderHomepageHeader(header, avatar);

//render posts
renderListOfPosts(listOfPosts, listOfPostsContainer);

//create a new post from desktop
const POST_FORM_DESKTOP = document.querySelector("#post-form-desktop");
const POST_BODY_FIELD = document.querySelector("#post-body-desktop");
const IMAGE_UPLOAD_FIELD = document.querySelector("#media-upload");

POST_FORM_DESKTOP.addEventListener("submit", (event) => {
  event.preventDefault();
  posts.createPost(
    accessToken,
    POST_BODY_FIELD.value,
    IMAGE_UPLOAD_FIELD.value
  );
});

//create a new post from mobile
const POST_FORM_MOBILE = document.querySelector("#post-form-mobile");
const POST_FIELD_MOBILE = document.querySelector("#post-body-mobile");
const MEDIA_UPLOAD_MOBILE = document.querySelector("#media-upload-mobile");

POST_FORM_MOBILE.addEventListener("submit", (event) => {
  event.preventDefault();
  posts.createPost(
    accessToken,
    POST_FIELD_MOBILE.value,
    MEDIA_UPLOAD_MOBILE.value
  );
});

//search posts from mobile
const topSearchBar = document.querySelector("#top-search-bar");

topSearchBar.addEventListener("keyup", () => {
  let query = topSearchBar.value;
  searchPosts(query);
});

//search posts from desktop
const sideSearchBar = document.querySelector("#side-search-bar");

sideSearchBar.addEventListener("keyup", () => {
  let query = sideSearchBar.value;
  searchPosts(query);
});

/**
 * Uses the string passed in by the user
 * in the search bar to filter posts which
 * include the string either in the body
 * or in the username
 * @param {string} queryString
 */
function searchPosts(queryString) {
  const filteredPosts = listOfPosts.filter(({ body, author: { name } }) => {
    return (
      body.toLowerCase().includes(queryString.toLowerCase()) ||
      name.toLowerCase().includes(queryString.toLowerCase())
    );
  });

  listOfPostsContainer.innerHTML = "";

  renderListOfPosts(filteredPosts, listOfPostsContainer);
}

//filter functionality (available only on desktop)
const todaysPostsRadioBtn = document.querySelector("#todays-posts");
const yesterdaysPostsRadioBtn = document.querySelector("#yesterdays-posts");
const lastWeeksPostsRadioBtn = document.querySelector("#last-weeks-posts");
const olderPostsRadioBtn = document.querySelector("#older-posts");
const clearFiltersRadioBtn = document.querySelector("#clear-filter");

const day = 1000 * 60 * 60 * 24;
const week = day * 7;
const fortnight = day * 14;

const today = new Date();

todaysPostsRadioBtn.addEventListener("change", () => {
  filterByDate(today);
});

yesterdaysPostsRadioBtn.addEventListener("change", () => {
  const yesterday = new Date(today - day);
  filterByDate(yesterday);
});

lastWeeksPostsRadioBtn.addEventListener("change", () => {
  const lastWeek = new Date(today - week);
  filterByDate(lastWeek);
});

olderPostsRadioBtn.addEventListener("change", () => {
  const twoWeeks = new Date(today - fortnight);
  filterByDate(twoWeeks);
});

clearFiltersRadioBtn.addEventListener("change", () => {
  listOfPostsContainer.innerHTML = "";
  renderListOfPosts(listOfPosts, listOfPostsContainer);
});

/**
 * Filters posts according to
 * the date passed in
 * @param {string} searchDate
 */
function filterByDate(searchDate) {
  const filteredPostsByDate = listOfPosts.filter(({ created, updated }) => {
    const creationDate = new Date(created);
    const updatedDate = new Date(updated);
    return searchDate - creationDate <= day || searchDate - updatedDate <= day;
  });

  //display older posts first by reversing the array (mostly for user experience, there are so many posts that it'll be hard to realise your filter worked if you're still seeing the latests posts)
  const reversedFilteredPostsByDate = filteredPostsByDate.reverse();
  listOfPostsContainer.innerHTML = "";
  renderListOfPosts(reversedFilteredPostsByDate, listOfPostsContainer);
}

//logout functionality for desktop
const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", () => {
  logout();
});

//logout functionality for mobile view
const logoutMobile = document.querySelector("#logout-mobile");
logoutMobile.addEventListener("click", () => {
  logout();
});
