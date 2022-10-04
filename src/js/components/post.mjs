import parser from "../tools/parser.mjs";
import formatDate from "../tools/dateStyler.mjs";
import { accessToken } from "../constants/storedKeys.mjs";
import {
  deletePost,
  updatePost,
  commentOnPost,
  reactToPost,
} from "../commonFunctions/api.mjs";
import { getRandomImage } from "../tools/imagePicker.mjs";
import { EmojiPicker } from "../tools/vanillaEmojiPicker.mjs";

//create template for post entry
//with all functions related to it
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
    //format dates
    const date = new Date(created);
    const editionDate = new Date(updated);

    const formattedDate = formatDate(date);

    const formattedEditionDate = formatDate(editionDate);

    //assign random profile picture if avatar is an empty string
    let assignedProfilePicture = getRandomImage();
    if (avatar.length === 0) {
      avatar = assignedProfilePicture;
    }

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

  //html template for homepage
  generalPostTemplate() {
    return `<div class="card my-lg-3 my-md-2 my-sm-1 my-1 pe-3">
                  <div class="row">
                      <div class="col col-md-2">
                          <img
                          src="${this.avatar}"
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
                          <a href="specific-post.html?id=${this.id}" class="text-decoration-none text-body">
                              <p class="ps-2" id="view-single-post">
                              ${this.body}
                              </p>
                              <img
                              src="${this.media}"
                              class="img-fluid"
                              alt=" "
                              />
                          </a>
                          <div class="row my-2">
                              <div class="col d-flex justify-content-start gap-lg-5 gap-md-3" id="interaction-buttons">
                                  <div class="d-flex flex-column align-items-center">
                                      <span
                                      class="text-secondary me-2"
                                      >
                                        <span class="material-symbols-outlined">
                                              favorite
                                        </span>
                                      </span>
                                      <span class="text-small text-secondary">${this.totalReactions}</span>
                                  </div>
                                  <div class="d-flex flex-column align-items-center">
                                    <span
                                      class="text-secondary mx-2"
                                  >
                                        <span class="material-symbols-outlined">
                                        chat_bubble
                                        </span>
                                    </span>
                                    <span class="text-small text-secondary">${this.totalComments}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`;
  }

  //html template for profile page
  userPostTemplate() {
    return `
                <div class="modal fade"
                  id="edit-post-modal-window"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="editPostModalWindow"
                  aria-hidden="true"
                >
                    <div class="modal-dialog modal-fullscreen-sm-down">
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
                                        src="${this.avatar}"
                                        class="img-fluid rounded-circle p-1"
                                        alt="user image"
                                        />
                                    </div>
                                    <div class="col col-md-10 col-sm-9 col-9">
                                        <p class="fw-bold text-primary mb-0 ps-2">
                                        ${this.username}
                                        </p>
                                            <p class="text-secondary ps-2 mb-0 text-small">
                                            ${this.date}
                                            </p>
                                        <a href="specific-post.html?id=${this.id}" class="text-decoration-none text-body" id="view-post">
                                            <p class="ps-2">
                                                ${this.body}
                                            </p>
                                            <img
                                            src="${this.media}"
                                            class="img-fluid"
                                            alt=" "
                                            />
                                        </a>
                                        <div class="row my-2">
                                            <div class="col d-flex justify-content-start">
                                                <div class="d-flex flex-column align-items-center">
                                                    <span
                                                    class="text-secondary me-2"
                                                    >
                                                      <span class="material-symbols-outlined">
                                                            favorite
                                                      </span>
                                                    </span>
                                                    <span class="text-small text-secondary">${this.totalReactions}</span>
                                                </div>
                                                <div class="d-flex flex-column align-items-center">
                                                    <span
                                                        class="text-secondary mx-2"
                                                    >
                                                        <span class="material-symbols-outlined">
                                                        chat_bubble
                                                        </span>
                                                    </span>
                                                    <span class="text-small text-secondary">${this.totalComments}</span>
                                                </div>
                                                <div class="dropup">
                                                    <button 
                                                    class="btn btn-custom text-secondary" 
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

  //html for single post page
  renderSinglePost(container) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("container", "mt-5");
    container.append(cardContainer);

    const card = document.createElement("div");
    card.classList.add("card", "my-lg-3", "my-md-2", "my-sm-1", "my-1", "pe-3");
    cardContainer.append(card);

    const row = document.createElement("div");
    row.classList.add("row");
    card.append(row);

    const firstCol = document.createElement("div");
    firstCol.classList.add("col", "col-md-2");
    row.append(firstCol);

    const profilePic = document.createElement("img");
    profilePic.setAttribute("src", this.avatar);
    profilePic.setAttribute("alt", "profile picture");
    profilePic.classList.add("img-fluid", "rounded-circle", "p-1");
    firstCol.append(profilePic);

    const secondCol = document.createElement("div");
    secondCol.classList.add("col", "col-md-10", "col-sm-9", "col-9");
    row.append(secondCol);

    const name = document.createElement("p");
    name.classList.add("fw-bold", "text-primary", "mb-0", "ps-2");
    name.innerHTML = this.username;
    secondCol.append(name);

    const dates = document.createElement("div");
    dates.classList.add("d-sm-flex");
    secondCol.append(dates);

    const published = document.createElement("p");
    published.classList.add("text-secondary", "ps-2", "mb-0", "text-small");
    published.innerHTML = this.date;
    dates.append(published);

    const edited = document.createElement("p");
    edited.innerHTML = this.updated;
    if (edited.innerHTML === published.innerHTML) {
      edited.classList.add("hidden");
    } else {
      edited.classList.add("text-secondary", "ps-2", "text-small");
      edited.innerHTML = `<b> · </b> edited ${this.updated}`;
    }
    dates.append(edited);

    const postBody = document.createElement("p");
    postBody.classList.add("ps-2");
    postBody.innerHTML = this.body;
    secondCol.append(postBody);

    const image = document.createElement("img");
    image.setAttribute("src", this.media);
    image.setAttribute("alt", "image uploaded by user");
    if (!this.media) {
      image.classList.add("d-none");
    }
    image.classList.add("img-fluid");
    secondCol.append(image);

    const addEmojiBox = document.createElement("div");
    secondCol.append(addEmojiBox);

    const wrapper = document.createElement("form");
    wrapper.classList.add("input-group");
    addEmojiBox.append(wrapper);

    const addEmojiButton = document.createElement("button");
    addEmojiButton.setAttribute("type", "button");
    addEmojiButton.setAttribute("aria-label", "react to this post");
    addEmojiButton.classList.add(
      "first-btn",
      "input-group-text",
      "material-symbols-outlined",
      "bg-primary",
      "text-white",
      "mt-4"
    );
    addEmojiButton.innerHTML = "add_reaction";
    wrapper.append(addEmojiButton);

    const addEmojiInput = document.createElement("input");
    addEmojiInput.setAttribute("type", "text");
    addEmojiInput.classList.add("one", "text-small", "form-control", "mt-4");
    wrapper.append(addEmojiInput);

    const addCommentBox = document.createElement("div");
    secondCol.append(addCommentBox);

    const addCommentForm = document.createElement("form");
    addCommentForm.classList.add("input-group", "my-4");
    addCommentBox.append(addCommentForm);

    const addCommentInput = document.createElement("input");
    addCommentInput.setAttribute("type", "text");
    addCommentInput.setAttribute("placeholder", "leave a comment");
    addCommentInput.setAttribute("aria-label", "leave a comment");
    addCommentInput.setAttribute("id", "comment-text");
    addCommentInput.classList.add("text-small", "form-control");
    addCommentForm.append(addCommentInput);

    const addCommentButton = document.createElement("button");
    addCommentButton.setAttribute("type", "button");
    addCommentButton.classList.add(
      "input-group-text",
      "material-symbols-outlined",
      "bg-primary",
      "text-white"
    );
    addCommentButton.innerHTML = "send";
    addCommentForm.append(addCommentButton);

    const emojis = document.createElement("div");
    emojis.classList.add("text-small", "my-3");
    this.comments.map(({ symbol }) => {
      emojis.innerHTML += symbol;
    });
    secondCol.append(emojis);

    const commentsBox = document.createElement("div");
    commentsBox.classList.add("my-3");
    //sort comments by newest with reverse() applied to copy of reactions array
    const reactionsCopy = [...this.reactions];
    reactionsCopy.reverse();
    reactionsCopy.map(({ body, owner, created }) => {
      const creationDate = new Date(created);
      const styledDate = formatDate(creationDate);

      const userComment = document.createElement("div");
      userComment.classList.add("mt-3", "border-top", "text-small");
      userComment.innerHTML = `<b>${owner}</b> ${body}`;
      commentsBox.append(userComment);

      const commentDate = document.createElement("div");
      commentDate.classList.add("text-small", "text-secondary");
      commentDate.innerHTML = styledDate;
      userComment.append(commentDate);
    });
    secondCol.append(commentsBox);

    //emoji picker
    new EmojiPicker({
      trigger: [
        {
          selector: ".first-btn",
          insertInto: [".one"],
        },
      ],
      closeButton: true,
    });

    //send reaction to API
    wrapper.addEventListener("submit", (e) => {
      e.preventDefault();
      reactToPost(accessToken, this.id, addEmojiInput.value);
    });

    //call API to comment on post entry
    addCommentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      commentOnPost(accessToken, addCommentInput.value, this.id);
    });
  }

  //render html template for homepage
  renderGeneralTimeline(container) {
    const postHTML = parser(this.generalPostTemplate());

    container.append(postHTML.documentElement);
  }

  //render html template for profile page
  renderUserTimeline(container) {
    const postHTML = parser(this.userPostTemplate());

    //call function to remove post from API
    postHTML.querySelector("#delete-button").addEventListener("click", () => {
      this.removePost();
    });

    //call function to edit an existing post
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

    container.append(postHTML.documentElement);
  }

  //call API to delete post
  removePost() {
    deletePost(accessToken, this.id);
  }

  //call API to edit post
  editPost(editedText, editedPhoto, id) {
    updatePost(accessToken, editedText, editedPhoto, id);
  }
}
