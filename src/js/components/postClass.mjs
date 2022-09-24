import parser from "../tools/parser.mjs";

export class Post {
  constructor(avatar, username, created, body, media, reactions, comments) {
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
                        <a href="" class="text-body">
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
                            <div class="col d-flex justify-content-start gap-lg-5 gap-md-3" id="interaction-buttons">
                                <div class="d-flex flex-column align-items-center">
                                    <button
                                    type="button"
                                    class="btn-interaction text-secondary"
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
                                        class="btn-interaction text-secondary"
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

  render(container) {
    const postHTML = parser(this.template());

    container.append(postHTML.documentElement);
  }
}
