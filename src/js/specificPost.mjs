import { renderSinglePostHeader } from "./components/singlePostHeader.mjs";
import { viewSpecificPost } from "./commonFunctions/api/posts/read.mjs";
import { accessToken } from "./constants/storedKeys.mjs";
import * as profiles from "./commonFunctions/api/profiles/read.mjs";
import { Post } from "./components/post.mjs";
import { getRandomImage } from "./tools/imagePicker.mjs";
import renderUsers from "./commonFunctions/profileRendering.mjs";
import logout from "./commonFunctions/logout.mjs";

//get string param to display single post
const parameterString = window.location.search;
const searchParams = new URLSearchParams(parameterString);

const postId = searchParams.get("id");

//create and display single post from class
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
} = await viewSpecificPost(accessToken, postId);

//assign random profile picture if avatar is an empty string
let assignedProfilePicture = getRandomImage();

if (!avatar) {
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

const singlePostContainer = document.querySelector("#single-post-container");

postItem.renderPost(singlePostContainer);
postItem.renderSinglePostComponents();

//display title dinamically
const newTitle = document.querySelector("title");
newTitle.innerHTML = `Socials | Post by ${postItem.username}`;

//render header
const header = document.querySelector("#header");
renderSinglePostHeader(header, avatar, name);

//fetch information to display followers
const users = await profiles.fetchProfiles();

const signedInUser = localStorage.getItem("username");
const userInformation = await profiles.viewProfile(accessToken, signedInUser);

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
