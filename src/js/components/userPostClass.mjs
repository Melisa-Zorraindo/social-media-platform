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

  template() {
    return `<div class="card my-lg-3 my-md-2 my-sm-1 my-1 pe-3">
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
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><button class="dropdown-item">edit post</button></li>
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
    const postHTML = parser(this.template());

    postHTML.querySelector("#delete-button").addEventListener("click", () => {
      this.removePost();
    });

    container.append(postHTML.documentElement);
  }

  removePost() {
    console.log(this.id);
    deletePost(accessToken, this.id);
  }
}
