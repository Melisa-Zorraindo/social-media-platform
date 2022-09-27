import { renderProfileHeader } from "./components/userHeader.mjs";
import { fetchPosts, createPost } from "./commonFunctions/api.mjs";
import { accessToken, loggedUser } from "./constants/storedKeys.mjs";
import { Post } from "./components/post.mjs";
import { getRandomImage } from "./tools/imagePicker.mjs";

//fetch only the logged user's posts to display in their timeline
const allPosts = await fetchPosts(accessToken);
const loggedUserPosts = allPosts.filter(({ author: { name } }) => {
  return name === loggedUser;
});

//destructure user to display information in the header
let {
  author: { avatar, name },
} = loggedUserPosts[0];

//select avatar randomly if user's avatar is an empty string
let assignedProfilePicture = getRandomImage();

if (avatar.length === 0) {
  avatar = assignedProfilePicture;
}

//render header
const header = document.querySelector("#header");
renderProfileHeader(header, avatar, name);

//render user's posts
const loggedUserPostsContainer = document.querySelector(
  "#logged-user-posts-container"
);

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

const POST_BODY_FIELD = document.querySelector("#user-post-desktop");
const IMAGE_UPLOAD_FIELD = document.querySelector("#media-upload");
const CREATE_POST_BUTTON = document.querySelector(
  "#create-post-button-desktop"
);

CREATE_POST_BUTTON.addEventListener("click", (event) => {
  event.preventDefault();

  createPost(accessToken, POST_BODY_FIELD.value, IMAGE_UPLOAD_FIELD.value);
});

const POST_FIELD_MOBILE = document.querySelector("#user-post-mobile");
const MEDIA_UPLOAD_MOBILE = document.querySelector("#media-upload-mobile");
const CREATE_POST_BUTTON_MOBILE = document.querySelector(
  "#create-post-button-mobile"
);

CREATE_POST_BUTTON_MOBILE.addEventListener("click", (event) => {
  event.preventDefault();

  createPost(accessToken, POST_FIELD_MOBILE.value, MEDIA_UPLOAD_MOBILE.value);
});
