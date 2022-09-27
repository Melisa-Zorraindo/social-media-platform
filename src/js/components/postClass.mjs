import parser from "../tools/parser.mjs";
import formatDate from "../tools/dateStyler.mjs";
import { accessToken } from "../constants/storedKeys.mjs";
import { viewSpecificPost } from "../commonFunctions/api.mjs";

export class Post {
  constructor(
    avatar,
    username,
    created,
    body,
    media,
    totalReactions,
    totalComments,
    reactions,
    comments,
    id,
    updated
  ) {
    const date = new Date(created);
    const editionDate = new Date(updated);

    const formattedDate = formatDate(date);

    const formattedEditionDate = formatDate(editionDate);

    this.avatar = avatar;
    this.username = username;
    this.date = formattedDate;
    this.body = body;
    this.media = media;
    this.totalReactions = totalReactions;
    this.totalComments = totalComments;
    this.reactions = reactions;
    this.comments = comments;
    this.id = id;
    this.updated = formattedEditionDate;
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
                        <a href="#" class="text-decoration-none text-body">
                            <p class="ps-2" id="view-single-post">
                            ${this.body}
                            </p>
                        </a>
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
                                    class="btn-custom text-secondary"
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
                                        class="btn-custom text-secondary"
                                    >
                                        <span class="material-symbols-outlined">
                                        chat_bubble
                                        </span>
                                    </button>
                                    <span class="text-small text-secondary">${this.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
  }

  specificPostTemplate(symbol = "", comments = "") {
    return `    
   <div class="container my-5 custom-w">

    <div class="bg-light py-2">
    <a href="home.html" class="text-decoration-none">
    <span class="material-symbols-outlined text-primary fw-bold">
    arrow_back
    </span></a></div>
    

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
                        <a href="#" class="text-decoration-none text-body">
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
                                    <span class="text-small text-secondary">${symbol}</span>
                                <div class="d-flex flex-column align-items-center">
                                    <span class="text-small text-secondary">${comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>`;
  }

  render(container) {
    const postHTML = parser(this.template());

    postHTML
      .querySelector("#view-single-post")
      .addEventListener("click", () => {
        this.displayPost(this.id);
      });

    container.append(postHTML.documentElement);
  }

  async displayPost(id) {
    const { symbol = "", comments } = await viewSpecificPost(accessToken, id);

    const main = document.querySelector("main");

    main.innerHTML = "";

    const specificPost = parser(this.specificPostTemplate(symbol, comments));
    main.append(specificPost.documentElement);
  }
}
