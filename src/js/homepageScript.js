import { renderHomepageHeader } from "./components/homepageHeader.mjs";
import { renderListOfPosts } from "./commonFunctions/postRendering.mjs";
import * as posts from "./commonFunctions/api/posts/index.mjs";
import * as profiles from "./commonFunctions/api/profiles/read.mjs";
import { accessToken } from "./constants/storedKeys.mjs";
import { getRandomImage } from "./tools/imagePicker.mjs";
import searchPosts from "./commonFunctions/search.mjs";
import filterByDate from "./commonFunctions/filter.mjs";
import renderUsers from "./commonFunctions/profileRendering.mjs";
import logout from "./commonFunctions/logout.mjs";

const listOfPosts = await posts.fetchPosts(accessToken);
const listOfPostsContainer = document.querySelector("#list-of-posts-container");

const users = await profiles.fetchProfiles();

//destructure user to display information in the header
const signedInUser = localStorage.getItem("username");
let { avatar, followers, following } = await profiles.viewProfile(
  accessToken,
  signedInUser
);

//select avatar randomly if user's avatar is an empty string
let assignedProfilePicture = getRandomImage();
if (!avatar) {
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
  searchPosts(listOfPosts, query, listOfPostsContainer);
});

//search posts from desktop
const sideSearchBar = document.querySelector("#side-search-bar");

sideSearchBar.addEventListener("keyup", () => {
  let query = sideSearchBar.value;
  searchPosts(listOfPosts, query, listOfPostsContainer);
});

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
  filterByDate(listOfPosts, today, listOfPostsContainer);
});

yesterdaysPostsRadioBtn.addEventListener("change", () => {
  const yesterday = new Date(today - day);
  filterByDate(listOfPosts, yesterday, listOfPostsContainer);
});

lastWeeksPostsRadioBtn.addEventListener("change", () => {
  const lastWeek = new Date(today - week);
  filterByDate(listOfPosts, lastWeek, listOfPostsContainer);
});

olderPostsRadioBtn.addEventListener("change", () => {
  const twoWeeks = new Date(today - fortnight);
  filterByDate(listOfPosts, twoWeeks, listOfPostsContainer);
});

clearFiltersRadioBtn.addEventListener("change", () => {
  listOfPostsContainer.innerHTML = "";
  renderListOfPosts(listOfPosts, listOfPostsContainer);
});

//render contacts dinamically
const SOCIALS_USERS_CONTAINER = document.querySelector(
  "#socials-users-container"
);

await renderUsers(users, SOCIALS_USERS_CONTAINER);

//render followers dynamically
const FOLLOWERS_CONTAINER = document.querySelector("#followers-container");

await renderUsers(followers, FOLLOWERS_CONTAINER);

//render following dynamically
const FOLLOWING_CONTAINER = document.querySelector("#following-container");

await renderUsers(following, FOLLOWING_CONTAINER);

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
