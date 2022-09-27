import { fetchPosts, createPost } from "./commonFunctions/api.mjs";
import { accessToken, loggedUser } from "./constants/storedKeys.mjs";
import { Post } from "./components/post.mjs";

//fetch only the logged user's posts to display in their timeline
const allPosts = await fetchPosts(accessToken);
const loggedUserPosts = allPosts.filter(({ author: { name } }) => {
  return name === loggedUser;
});

//destructure user to display information in the header
const {
  author: { name },
} = loggedUserPosts[0];

//render header
const header = document.querySelector("#header");
header.innerHTML = `<div class="container mt-2">
                      <div class="row">
                        <div class="col col-3 d-none d-lg-block">
                          <a href="home.html"
                            ><img src="src/img/socials-logo.png" alt="logo"
                          /></a>
                        </div>
                        <div class="col col-9 d-sm-flex">
                          <div class="col col-sm-1 col-2">
                            <a href="profile.html" class="text-decoration-none">
                              <img
                                src="src/img/kirill-balobanov-2rIs8OH5ng0-unsplash.png"
                                class="img-fluid"
                                alt="user placeholder"
                              />
                            </a>
                          </div>
                          <div class="ms-sm-5">
                            <div class="d-flex">
                              <h1 class="h4 text-primary mb-0">${name}</h1>
                              <button
                                type="button"
                                class="btn-custom"
                                aria-label="edit user"
                                id="edit-user-btn"
                              >
                                <span class="material-symbols-outlined text-secondary">
                                  edit
                                </span>
                              </button>
                            </div>
                            <p class="my-0 text-black fw-light">🐱 lover</p>
                            <p class="my-0 text-black fw-light">🌎 wanderer</p>
                          </div>
                        </div>
                      </div>
                      </div>`;

//render user's posts
const loggedUserPostsContainer = document.querySelector(
  "#logged-user-posts-container"
);

function renderUserPosts(arr) {
  arr.forEach((post) => {
    const {
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
