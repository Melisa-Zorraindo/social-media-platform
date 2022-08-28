import { displayAddPostWindow } from "./components/addPost.js";
const ADD_POST_BTN = document.querySelector("#add-post-btn");

ADD_POST_BTN.addEventListener("click", () => {
  displayAddPostWindow();
});
