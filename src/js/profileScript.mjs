import { renderProfileHeader } from "./components/userHeader.mjs";
import {
  fetchPosts,
  createPost,
  viewProfile,
  updateProfile,
} from "./commonFunctions/api.mjs";
import { accessToken, loggedUser, userEmail } from "./constants/storedKeys.mjs";
import { Post } from "./components/post.mjs";
import { getRandomImage } from "./tools/imagePicker.mjs";
import logout from "./commonFunctions/logout.mjs";

//fetch only the logged user's posts to display in their timeline
const signedInUser = localStorage.getItem("username");

const userInformation = await viewProfile(accessToken, signedInUser);

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

//render user's posts
const loggedUserPostsContainer = document.querySelector(
  "#logged-user-posts-container"
);

//display if user has yet to publish to timeline
let promptToPublishMessage = `<div class="text-center"> <p> Your timeline is empty</p> <p> Share with your followers what you're thinking </p> </div>`;

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

/**
 *  Creates the html to be displayed
 * on profile page for each post entry
 * using the Post class
 * @param {Array} arr
 */
function renderUserPosts(arr) {
  arr.map((post) => {
    let {
      author: { avatar, name },
      body,
      created,
      media,
      _count: { reactions: totalReactions, comments: totalComments },
      id,
      comments,
      reactions,
      updated,
    } = post;

    //assing random profile pic if no avatar
    if (avatar.length === 0) {
      avatar = assignedProfilePicture;
    }

    const postItem = new Post(
      avatar,
      name,
      created,
      body,
      media,
      totalReactions,
      totalComments,
      comments,
      reactions,
      id,
      updated
    );

    postItem.renderUserTimeline(loggedUserPostsContainer);
  });
}

renderUserPosts(loggedUserPosts);

//create new post from desktop
const POST_BODY_FIELD = document.querySelector("#user-post-desktop");
const IMAGE_UPLOAD_FIELD = document.querySelector("#media-upload");
const CREATE_POST_BUTTON = document.querySelector(
  "#create-post-button-desktop"
);

CREATE_POST_BUTTON.addEventListener("click", (event) => {
  event.preventDefault();

  createPost(accessToken, POST_BODY_FIELD.value, IMAGE_UPLOAD_FIELD.value);
});

//create new post from mobile
const POST_FIELD_MOBILE = document.querySelector("#user-post-mobile");
const MEDIA_UPLOAD_MOBILE = document.querySelector("#media-upload-mobile");
const CREATE_POST_BUTTON_MOBILE = document.querySelector(
  "#create-post-button-mobile"
);

CREATE_POST_BUTTON_MOBILE.addEventListener("click", (event) => {
  event.preventDefault();
  createPost(accessToken, POST_FIELD_MOBILE.value, MEDIA_UPLOAD_MOBILE.value);
});

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

//edit profile
const profilePreferancesForm = document.querySelector("#profile-preferances");

profilePreferancesForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userBanner = document.querySelector("#user-banner");

  const userProfilePicture = document.querySelector("#user-profile-picture");

  updateProfile(
    accessToken,
    userBanner.value,
    userProfilePicture.value,
    loggedUser
  );
});
