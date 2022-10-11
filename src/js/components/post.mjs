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
import imageContainerManager from "../tools/imageTagManager.mjs";

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

  //create html for post
  renderPost(container) {
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
    profilePic.classList.add("profile-pic", "rounded-circle", "p-1");
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

    const linkToSinglePost = document.createElement("a");
    linkToSinglePost.setAttribute("href", `specific-post.html?id=${this.id}`);
    linkToSinglePost.classList.add("text-decoration-none", "text-body");
    secondCol.append(linkToSinglePost);

    const postBody = document.createElement("p");
    postBody.classList.add("ps-2", "mt-2");
    postBody.innerHTML = this.body;
    linkToSinglePost.append(postBody);

    const image = document.createElement("img");
    image.setAttribute("src", this.media);
    image.setAttribute("alt", "image uploaded by user");
    if (!this.media) {
      image.classList.add("d-none");
    }
    image.classList.add("img-fluid");
    linkToSinglePost.append(image);

    const insideRow = document.createElement("div");
    insideRow.classList.add("row", "my-2");
    secondCol.append(insideRow);

    const interactionsContainer = document.createElement("div");
    interactionsContainer.classList.add(
      "col",
      "d-flex",
      "justify-content-start",
      "gap-lg-5",
      "gap-md-3"
    );
    insideRow.append(interactionsContainer);

    const reactionsCountWrapper = document.createElement("div");
    reactionsCountWrapper.classList.add(
      "d-flex",
      "flex-column",
      "align-items-center",
      "me-2"
    );
    interactionsContainer.append(reactionsCountWrapper);

    const reactionsIcon = document.createElement("span");
    reactionsIcon.classList.add("text-secondary", "material-symbols-outlined");
    reactionsIcon.innerHTML = "emoji_flags";
    reactionsCountWrapper.append(reactionsIcon);

    const reactionsCount = document.createElement("span");
    reactionsCount.classList.add("text-small", "text-secondary");
    reactionsCount.innerHTML = this.totalReactions;
    reactionsCountWrapper.append(reactionsCount);

    const commentsCountWrapper = document.createElement("div");
    commentsCountWrapper.classList.add(
      "d-flex",
      "flex-column",
      "align-items-center",
      "me-2"
    );
    interactionsContainer.append(commentsCountWrapper);

    const commentsIcon = document.createElement("span");
    commentsIcon.classList.add("text-secondary", "material-symbols-outlined");
    commentsIcon.innerHTML = "chat_bubble";
    commentsCountWrapper.append(commentsIcon);

    const commentsCount = document.createElement("span");
    commentsCount.classList.add("text-small", "text-secondary");
    commentsCount.innerHTML = this.totalComments;
    commentsCountWrapper.append(commentsCount);

    //hide the entire dropup if user is on homepage
    const userLocation = window.location.pathname;

    const dropupContainer = document.createElement("div");
    userLocation === "/home.html"
      ? dropupContainer.classList.add("hidden")
      : dropupContainer.classList.add("dropup");
    interactionsContainer.append(dropupContainer);

    const dropupButton = document.createElement("button");
    dropupButton.setAttribute("type", "button");
    dropupButton.setAttribute("data-bs-toggle", "dropdown");
    dropupButton.setAttribute("aria-expanded", "false");
    dropupButton.setAttribute("id", "more-actions");
    dropupButton.classList.add("btn", "btn-custom", "text-secondary");
    dropupContainer.append(dropupButton);

    const dropupIcon = document.createElement("span");
    dropupIcon.classList.add(
      "material-symbols-outlined",
      "text-primary",
      "fw-bold"
    );
    dropupIcon.innerHTML = "more_horiz";
    dropupButton.append(dropupIcon);

    const ulDropup = document.createElement("ul");
    ulDropup.setAttribute("aria-labelledby", "dropdownMenuButton");
    ulDropup.classList.add("dropdown-menu");
    dropupContainer.append(ulDropup);

    const liOne = document.createElement("li");
    liOne.classList.add("my-2", "text-small");
    ulDropup.append(liOne);

    const editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#edit-post-modal-window");
    editButton.setAttribute("id", "edit-button");
    editButton.classList.add("dropdown-item", "d-flex", "align-items-center");
    liOne.append(editButton);

    const editButtonIcon = document.createElement("span");
    editButtonIcon.classList.add("material-symbols-outlined", "me-2");
    editButtonIcon.innerHTML = "edit";
    editButton.append(editButtonIcon);

    const editButtonText = document.createElement("span");
    editButtonText.innerHTML = "edit post";
    editButton.append(editButtonText);

    const liTwo = document.createElement("li");
    liTwo.classList.add("my-2", "text-small");
    ulDropup.append(liTwo);

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.classList.add("dropdown-item", "d-flex", "align-items-center");
    liTwo.append(deleteButton);

    const deleteButtonIcon = document.createElement("span");
    deleteButtonIcon.classList.add("material-symbols-outlined", "me-2");
    deleteButtonIcon.innerHTML = "delete";
    deleteButton.append(deleteButtonIcon);

    const deleteButtonText = document.createElement("span");
    deleteButtonText.innerHTML = "delete post";
    deleteButton.append(deleteButtonText);

    //edit button functionality
    editButton.addEventListener("click", () => {
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

    //delete button functionality
    deleteButton.addEventListener("click", () => {
      this.removePost();
    });
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
    profilePic.classList.add("profile-pic", "rounded-circle", "p-1");
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
    postBody.classList.add("ps-2", "mt-2");
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
    addCommentButton.setAttribute("type", "submit");
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

  //call API to delete post
  removePost() {
    deletePost(accessToken, this.id);
  }

  //call API to edit post
  editPost(editedText, editedPhoto, id) {
    updatePost(accessToken, editedText, editedPhoto, id);
  }
}
