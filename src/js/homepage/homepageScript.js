import { fetchPosts } from "../auth/commonFunctions/api.mjs";
import { createPost } from "../auth/commonFunctions/api.mjs";
import { key } from "../components/apiKey.mjs";
import { Post } from "../components/postClass.mjs";

const listOfPosts = await fetchPosts(key);
const listOfPostsContainer = document.querySelector("#list-of-posts-container");

listOfPosts.forEach((post) => {
  const {
    author: { avatar, name },
    created,
    body,
    media,
    _count: { reactions, comments },
  } = post;

  const postItem = new Post(
    avatar,
    name,
    created,
    body,
    media,
    reactions,
    comments
  );

  postItem.render(listOfPostsContainer);
});

const POST_BODY_FIELD = document.querySelector("#user-post-desktop");
const IMAGE_UPLOAD_FIELD = document.querySelector("#media-upload");
const CREATE_POST_BUTTON = document.querySelector(
  "#create-post-button-desktop"
);

CREATE_POST_BUTTON.addEventListener("click", (event) => {
  event.preventDefault();

  createPost(key, POST_BODY_FIELD.value, IMAGE_UPLOAD_FIELD.value);
});
