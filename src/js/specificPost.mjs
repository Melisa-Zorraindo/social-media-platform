import { renderSinglePostHeader } from "./components/singlePostHeader.mjs";
import { viewSpecificPost } from "./commonFunctions/api.mjs";
import { accessToken } from "./constants/storedKeys.mjs";
import { Post } from "./components/post.mjs";
import { getRandomImage } from "./tools/imagePicker.mjs";
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

const singlePostContainer = document.querySelector("#single-post-container");

postItem.renderSinglePost(singlePostContainer);

//display title dinamically
const newTitle = document.querySelector("title");
newTitle.innerHTML = `Socials | Post by ${postItem.username}`;

//render header
const header = document.querySelector("#header");
renderSinglePostHeader(header, avatar, name);

//logout functionality for desktop
const logoutButton = document.querySelector("#logout");

logoutButton.addEventListener("click", () => {
  logout();
});
