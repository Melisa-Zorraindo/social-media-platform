import { fetchPosts } from "../auth/commonFunctions/api.mjs";
import { createPost } from "../auth/commonFunctions/api.mjs";
import { key } from "../components/apiKey.mjs";

const LOGGED_USER_POSTS = await fetchPosts(key);
const LOGGED_USER_POSTS_CONTAINER = document.querySelector(
  "#logged-user-posts-container"
);

let postId;
LOGGED_USER_POSTS.forEach((post) => {
  const {
    author: { avatar, name },
    body,
    id,
    created,
    media,
    _count: { reactions, comments },
  } = post;

  postId = id;
  console.log(postId);
  console.log(LOGGED_USER_POSTS);
  const DATE = new Date(created);

  const FORMATTED_DATE = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(DATE);

  LOGGED_USER_POSTS_CONTAINER.innerHTML += `<div class="card my-lg-3 my-md-2 my-sm-1 my-1 pe-3">
  <div class="row">
    <div class="col col-md-2">
      <img
        src=${avatar}
        class="img-fluid rounded-circle p-1"
        alt="user image"
      />
    </div>
    <div class="col col-md-10 col-sm-9 col-9">
      <p class="fw-bold text-primary mb-0 ps-2">
        ${name}
      </p>
      <p class="text-secondary ps-2 text-small">
      ${FORMATTED_DATE}
      </p>
      <p class="ps-2">
       ${body}
      </p>
      <img
        src=${media}
        class="img-fluid"
        alt=" "
      />
      <div class="row my-2">
        <div class="col d-flex justify-content-start gap-lg-5 gap-md-3">
          <div class="d-flex flex-column align-items-center">
            <button
            type="button"
            class="btn-interaction text-secondary"
          >
            <span class="material-symbols-outlined">
              favorite
            </span>
          </button>
          <span class="text-small text-secondary">${reactions}</span>
          </div>
          <div class="d-flex flex-column align-items-center">
            <button
              type="button"
              class="btn-interaction text-secondary"
            >
              <span class="material-symbols-outlined">
                chat_bubble
              </span>
            </button>
            <span class="text-small text-secondary">${comments}</span>
          </div>
          <div class="dropdown">
            <button class="btn-interaction text-secondary" type="button" id="more-actions" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="material-symbols-outlined">
                more_horiz
            </span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
              <li><button class="dropdown-item text-small" type="button">edit post</button></li>
              <li><button class="dropdown-item text-small" type="button" id="delete-post-button">delete post</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
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

const DELETE_POST_BUTTON = document.querySelectorAll("#delete-post-button");
DELETE_POST_BUTTON.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(postId);
  });
});
