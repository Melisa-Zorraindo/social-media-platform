import parser from "../tools/parser.mjs";
import { accessToken } from "./storedKeys.mjs";
import {
  deletePost,
  updatePost,
  viewSpecificPost,
} from "../auth/commonFunctions/api.mjs";

export class UserPost {
  constructor(
    avatar,
    username,
    created,
    body,
    media,
    reactions,
    comments,
    id,
    updated
  ) {
    const date = new Date(created);
    const editionDate = new Date(updated);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);

    const formattedEditionDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
    }).format(editionDate);

    this.avatar = avatar;
    this.username = username;
    this.date = formattedDate;
    this.body = body;
    this.media = media;
    this.reactions = reactions;
    this.comments = comments;
    this.id = id;
    this.updated = formattedEditionDate;
  }

  cardTemplate() {
    return `
                <div class="modal .modal-fullscreen-sm-down fade"
                  id="edit-post-modal-window"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="editPostModalWindow"
                  aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit post</h5>
                                <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                                </button>
                            </div>
                            <div class="modal-body">
                                <form action="" class="p-2" id="edit-user-post">
                                    <div class="form-floating">
                                        <textarea
                                            name=""
                                            class="form-control h-100"
                                            placeholder="share your thoughts"
                                            id="edit-post-textarea"
                                        ></textarea>
                                        <label for="user-post"></label>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="col input-group">
                                            <span
                                            class="material-symbols-outlined input-group-text"
                                            >
                                                add_photo_alternate
                                            </span>
                                            <input
                                                type="text"
                                                placeholder=""
                                                class="text-small form-control"
                                                id="input"
                                            />
                                        </div>
                                        <button type="button"
                                        class="btn btn-primary"
                                        id="save-update">
                                          Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card my-lg-3 my-md-2 my-sm-1 my-1 pe-3">
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
                                        <div class="d-sm-flex">
                                            <p class="text-secondary ps-2 mb-0 text-small">
                                            ${this.date}
                                            </p>
                                            <p class="text-secondary ps-2  text-small">
                                            <b>·</b>
                                            edited ${this.updated}
                                            </p>
                                        </div>
                                        <a href="#" class="text-body" id="view-post">
                                            <p class="ps-2">
                                                ${this.body}
                                            </p>
                                        </a>
                                        <img
                                        src=${this.media}
                                        class="img-fluid"
                                        alt=" "
                                        />
                                        <div class="row my-2">
                                            <div class="col d-flex justify-content-start gap-lg-5 gap-md-3">
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
                                                            id="edit-button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#edit-post-modal-window"
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

  render(container) {
    const postHTML = parser(this.cardTemplate());

    postHTML.querySelector("#delete-button").addEventListener("click", () => {
      this.removePost();
    });

    postHTML.querySelector("#edit-button").addEventListener("click", () => {
      const editPostTextarea = document.querySelector("#edit-post-textarea");
      const editPostPhoto = document.querySelector("#input");
      const saveButton = document.querySelector("#save-update");

      editPostTextarea.innerHTML = this.body;
      editPostPhoto.value = this.media;

      saveButton.addEventListener("click", () => {
        const editedText = editPostTextarea.value;
        const editedPhoto = editPostPhoto.value;
        const postIdentifier = this.id;

        this.editPost(editedText, editedPhoto, postIdentifier);
      });
    });

    postHTML.querySelector("#view-post").addEventListener("click", () => {
      this.displayPost(this.id);
    });

    container.append(postHTML.documentElement);
  }

  removePost() {
    deletePost(accessToken, this.id);
  }

  editPost(editedText, editedPhoto, id) {
    updatePost(accessToken, editedText, editedPhoto, id);
  }

  async displayPost(id) {
    const singlePost = await viewSpecificPost(accessToken, id);
    console.log(singlePost);
  }
}
