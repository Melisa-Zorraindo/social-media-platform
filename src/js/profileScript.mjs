import { renderProfileHeader } from "./components/userHeader.mjs";
import { renderListOfPosts } from "./commonFunctions/postRendering.mjs";
import { fetchPosts } from "./commonFunctions/api/posts/read.mjs";
import { createPost } from "./commonFunctions/api/posts/create.mjs";
import * as profiles from "./commonFunctions/api/profiles/read.mjs";
import { updateProfile } from "./commonFunctions/api/profiles/update.mjs";
import { accessToken, loggedUser } from "./constants/storedKeys.mjs";
import { getRandomImage } from "./tools/imagePicker.mjs";
import renderUsers from "./commonFunctions/profileRendering.mjs";
import logout from "./commonFunctions/logout.mjs";

const users = await profiles.fetchProfiles();

//fetch only the logged user's posts to display in their timeline
const signedInUser = localStorage.getItem("username");
const userInformation = await profiles.viewProfile(accessToken, signedInUser);
const allPosts = await fetchPosts(accessToken);
const loggedUserPosts = allPosts.filter(({ author: { name } }) => {
  return name === loggedUser;
});

//add button animation if no posts are found to prompt user to publish
if (loggedUserPosts.length === 0) {
  //for mobile
  const addPostAnimatedButton = document.querySelector("#add-post-btn");
  const addPostSpan = document.querySelector("#add-post-btn-span");
  addPostAnimatedButton.classList.add("blinking-btn");
  addPostSpan.classList.remove("text-primary");
  addPostSpan.classList.add("span-btn");

  //for desktop
  const addPostAnimatedButtonDesktop = document.querySelector(
    "#create-post-button-desktop"
  );
  addPostAnimatedButtonDesktop.classList.remove("btn-primary");
  addPostAnimatedButtonDesktop.classList.add("blinking-btn-desktop");
}

//destructure user to display information in the header
let { avatar, name, posts } = userInformation;

//display if user has yet to publish to timeline
let promptToPublishMessage = `<div class="text-center">
                                 <p> Your timeline is empty</p>
                                 <p> Share with your followers what you're thinking </p>
                              </div>`;

const loggedUserPostsContainer = document.querySelector(
  "#logged-user-posts-container"
);

if (posts.length === 0) {
  loggedUserPostsContainer.innerHTML = promptToPublishMessage;
}

//select avatar randomly if user's avatar is an empty string
let assignedProfilePicture = getRandomImage();

if (avatar.length === 0) {
  avatar = assignedProfilePicture;
}

//render header
const header = document.querySelector("#header");
renderProfileHeader(header, avatar, name);

//render posts
renderListOfPosts(loggedUserPosts, loggedUserPostsContainer);

//create new post from desktop
const POST_FORM_DESKTOP = document.querySelector("#post-form-desktop");
const POST_BODY_FIELD = document.querySelector("#post-body-desktop");
const IMAGE_UPLOAD_FIELD = document.querySelector("#media-upload");

POST_FORM_DESKTOP.addEventListener("submit", (event) => {
  event.preventDefault();
  createPost(accessToken, POST_BODY_FIELD.value, IMAGE_UPLOAD_FIELD.value);
});

//create new post from mobile
const POST_FORM_MOBILE = document.querySelector("#post-form-mobile");
const POST_FIELD_MOBILE = document.querySelector("#post-body-mobile");
const MEDIA_UPLOAD_MOBILE = document.querySelector("#media-upload-mobile");

POST_FORM_MOBILE.addEventListener("submit", (event) => {
  event.preventDefault();
  createPost(accessToken, POST_FIELD_MOBILE.value, MEDIA_UPLOAD_MOBILE.value);
});

//edit profile
const profilePreferancesForm = document.querySelector("#profile-preferances");

profilePreferancesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userProfilePicture = document.querySelector("#user-profile-picture");
  updateProfile(accessToken, userProfilePicture.value, loggedUser);
});

//render contacts dynamically
const SOCIALS_USERS_CONTAINER = document.querySelector(
  "#socials-users-container"
);

await renderUsers(users, SOCIALS_USERS_CONTAINER);

//render followers dynamically
const FOLLOWERS_CONTAINER = document.querySelector("#followers-container");
const { followers } = userInformation;

await renderUsers(followers, FOLLOWERS_CONTAINER);

//render following dynamically
const FOLLOWING_CONTAINER = document.querySelector("#following-container");
const { following } = userInformation;

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
