import { fetchPosts } from "../auth/commonFunctions/api.mjs";
import { createPost } from "../auth/commonFunctions/api.mjs";
import { accessToken, loggedUser } from "../components/apiKey.mjs";
import { Post } from "../components/postClass.mjs";

const allPosts = await fetchPosts(accessToken);
const loggedUserPosts = allPosts.filter(({ author: { name } }) => {
  return name === loggedUser;
});

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

/* const DELETE_POST_BUTTON = document.querySelectorAll("#delete-post-button");
DELETE_POST_BUTTON.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(postId);
  });
}); */
