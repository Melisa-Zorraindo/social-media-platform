import { fetchPosts } from "../auth/commonFunctions/api.mjs";
import { createPost } from "../auth/commonFunctions/api.mjs";
import { accessToken, loggedUser } from "../components/storedKeys.mjs";
import { UserPost } from "../components/userPostClass.mjs";

const allPosts = await fetchPosts(accessToken);
const loggedUserPosts = allPosts.filter(({ author: { name } }) => {
  return name === loggedUser;
});

console.log(loggedUserPosts);

const loggedUserPostsContainer = document.querySelector(
  "#logged-user-posts-container"
);

loggedUserPosts.forEach((post) => {
  const {
    author: { avatar, name },
    body,
    created,
    media,
    _count: { reactions, comments },
    id,
    updated,
  } = post;

  const postItem = new UserPost(
    avatar,
    name,
    created,
    body,
    media,
    reactions,
    comments,
    id,
    updated
  );

  postItem.render(loggedUserPostsContainer);
});

const POST_BODY_FIELD = document.querySelector("#user-post-desktop");
const IMAGE_UPLOAD_FIELD = document.querySelector("#media-upload");
const CREATE_POST_BUTTON = document.querySelector(
  "#create-post-button-desktop"
);

CREATE_POST_BUTTON.addEventListener("click", (event) => {
  event.preventDefault();

  createPost(accessToken, POST_BODY_FIELD.value, IMAGE_UPLOAD_FIELD.value);
});
