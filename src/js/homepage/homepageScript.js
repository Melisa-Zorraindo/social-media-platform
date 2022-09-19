import { fetchPosts } from "../auth/commonFunctions/api.mjs";
import { createPost } from "../auth/commonFunctions/api.mjs";

const key = localStorage.getItem("accessToken");
if (key) {
  const LIST_OF_POSTS = await fetchPosts(key);
  const LIST_OF_POSTS_CONTAINER = document.querySelector(
    "#list-of-posts-container"
  );

  LIST_OF_POSTS.forEach((post) => {
    const {
      author: { avatar, name },
      body,
      created,
      media,
      _count: { reactions, comments },
    } = post;

    const DATE = new Date(created);

    const FORMATTED_DATE = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(DATE);

    LIST_OF_POSTS_CONTAINER.innerHTML += `<div class="card my-lg-3 my-md-2 my-sm-1 my-1 pe-3">
    <div class="d-flex">
      <div class="col col-md-1 col-sm-2 col-2">
        <img
          src=${avatar}
          class="img-fluid rounded-circle p-1"
          alt="user image"
        />
      </div>
      <div>
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
          src="${media}"
          class="img-fluid"
          alt=" "
        />
        <div class="d-flex gap-5">
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
        </div>
      </div>
    </div>
  </div>
  </div>`;
  });
}

const POST_BODY_FIELD = document.querySelector("#user-post-desktop");
const IMAGE_UPLOAD_FIELD = document.querySelector("#media-upload");
const CREATE_POST_BUTTON = document.querySelector(
  "#create-post-button-desktop"
);

CREATE_POST_BUTTON.addEventListener("click", (event) => {
  event.preventDefault();

  createPost(key, POST_BODY_FIELD.value, IMAGE_UPLOAD_FIELD.value);
});
