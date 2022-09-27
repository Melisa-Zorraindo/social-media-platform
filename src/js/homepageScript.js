import { fetchPosts, createPost } from "./commonFunctions/api.mjs";
import { accessToken } from "./constants/storedKeys.mjs";
import { Post } from "./components/post.mjs";

const listOfPosts = await fetchPosts(accessToken);
const listOfPostsContainer = document.querySelector("#list-of-posts-container");

function renderListOfPosts(arr) {
  arr.map((post) => {
    const {
      author: { avatar, name },
      created,
      body,
      media,
      _count: { reactions: totalReactions, comments: totalComments },
      id,
      comments,
      reactions,
      updated,
    } = post;

    const postItem = new Post(
      avatar,
      name,
      created,
      body,
      media,
      totalReactions,
      totalComments,
      reactions,
      comments,
      id,
      updated
    );

    postItem.renderGeneralTimeline(listOfPostsContainer);
  });
}

renderListOfPosts(listOfPosts);

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

const topSearchBar = document.querySelector("#top-search-bar");

topSearchBar.addEventListener("keyup", () => {
  let query = topSearchBar.value;
  searchPosts(query);
});

const sideSearchBar = document.querySelector("#side-search-bar");

sideSearchBar.addEventListener("keyup", () => {
  let query = sideSearchBar.value;
  searchPosts(query);
});

function searchPosts(queryString) {
  const filteredPosts = listOfPosts.filter(({ body, author: { name } }) => {
    return (
      body.toLowerCase().includes(queryString.toLowerCase()) ||
      name.toLowerCase().includes(queryString.toLowerCase())
    );
  });

  listOfPostsContainer.innerHTML = "";

  renderListOfPosts(filteredPosts);
}
