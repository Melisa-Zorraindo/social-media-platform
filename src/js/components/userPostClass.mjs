import parser from "../tools/parser.mjs";
import { accessToken } from "./storedKeys.mjs";
import { deletePost } from "../auth/commonFunctions/api.mjs";

export class UserPost {
  constructor(avatar, username, created, body, media, reactions, comments, id) {
    const date = new Date(created);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);

    this.avatar = avatar;
    this.username = username;
    this.date = formattedDate;
    this.body = body;
    this.media = media;
    this.reactions = reactions;
    this.comments = comments;
    this.id = id;
  }

  cardTemplate() {
    return `<div class="card my-lg-3 my-md-2 my-sm-1 my-1 pe-3" id="post-edit-window">
                <div class="row">
                    <div class="col col-md-2">
                        <img
                        src=${this.avatar}
                        class="img-fluid rounded-circle p-1"
                        alt="user image"
                        />
                    </div>
                    <div class="col col-md-10 col-sm-9 col-9">
                        <p class="fw-bold text-primary mb-0 ps-2">
                        ${this.username}
                        </p>
                        <p class="text-secondary ps-2 text-small">
                        ${this.date}
                        </p>
                        <p class="ps-2">
                        ${this.body}
                        </p>
                        <img
                        src=${this.media}
                        class="img-fluid"
                        alt=" "
                        />
                        <div class="row my-2">
                            <div class="col d-flex justify-content-start gap-lg-5 gap-md-3" id="interaction-buttons">
                                <div class="d-flex flex-column align-items-center">
                                    <button
                                    type="button"
                                    class="btn btn-interaction text-secondary"
                                    >
                                        <span class="material-symbols-outlined">
                                            favorite
                                        </span>
                                    </button>
                                    <span class="text-small text-secondary">${this.reactions}</span>
                                </div>
                                <div class="d-flex flex-column align-items-center">
                                    <button
                                        type="button"
                                        class="btn btn-interaction text-secondary"
                                    >
                                        <span class="material-symbols-outlined">
                                        chat_bubble
                                        </span>
                                    </button>
                                    <span class="text-small text-secondary">${this.comments}</span>
                                </div>
                                <div class="dropup">
                                    <button 
                                    class="btn btn-interaction text-secondary" 
                                    type="button"
                                    id="more actions"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <span class="material-symbols-outlined">
                                        more_horiz
                                    </span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><button
                                             class="dropdown-item"
                                             type="button"
                                             id="open-edition-modal"
                                             >
                                                edit post
                                            </button>
                                        </li>
                                        <li><button class="dropdown-item" id="delete-button">delete post</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
  }

  modaltemplate() {
    const documentScreen = document.querySelector("main");

    documentScreen.innerHTML = `<div class="container custom-w mt-5 py-3">
                                    <div class="d-flex justify-content-between">
                                        <h5 class="">
                                        Edit post
                                        </h5>
                                        <button
                                        type="button"
                                        class="btn-close"
                                        aria-label="Close"
                                        ></button>
                                    </div>
                                    <div>
                                        <form action="" class="p-2">
                                            <div class="form-floating">
                                                <textarea
                                                    name=""
                                                    class="form-control h-100"
                                                    placeholder="share your thoughts"
                                                ></textarea>
                                                <label for="user-post">${this.body}</label>
                                            </div>
                                            <div class="container">
                                                <div class="row mt-2">
                                                    <div class="col input-group">
                                                        <span
                                                            class="material-symbols-outlined input-group-text"
                                                        >
                                                            add_photo_alternate
                                                        </span>
                                                        <input
                                                            type="text"
                                                            placeholder=${this.media}
                                                            class="text-small form-control"
                                                        />
                                                    </div>
                                                    <div class="col">
                                                        <button
                                                        type="button"
                                                        class="btn btn-primary"
                                                        id="edit-button"
                                                        >
                                                        Save changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>`;
  }

  render(container) {
    const postHTML = parser(this.cardTemplate());

    postHTML.querySelector("#delete-button").addEventListener("click", () => {
      this.removePost();
    });

    postHTML
      .querySelector("#open-edition-modal")
      .addEventListener("click", () => {
        this.modaltemplate();
      });

    container.append(postHTML.documentElement);
  }

  removePost() {
    console.log(this.id);
    deletePost(accessToken, this.id);
  }

  editPost() {
    console.log(this.id);
  }
}
