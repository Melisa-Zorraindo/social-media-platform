import { displayAddPostWindow } from "./components/addPost.js";
const ADD_POST_BTN = document.querySelector("#add-post-btn");
const CONTACT_LIST_BTN = document.querySelector("#contacts-btn");
const NAVBAR = [ADD_POST_BTN, CONTACT_LIST_BTN];

ADD_POST_BTN.addEventListener("click", () => {
  displayAddPostWindow();
  updateNavbarStyles(ADD_POST_BTN);
});

CONTACT_LIST_BTN.addEventListener("click", () => {
  displayContactsWindow();

  //function
  const MAIN = document.querySelector("main");
  const CONTACTS_WINDOW = document.createElement("div");
  CONTACTS_WINDOW.classList.add("container");

  //clear container to render contacts window
  MAIN.innerHTML = " ";
});

function displayContactsWindow() {
  //update navbar styles
  updateNavbarStyles(CONTACT_LIST_BTN);
}

function updateNavbarStyles(elem) {
  NAVBAR.forEach((item) => {
    item.firstChild.nextSibling.classList.add("text-secondary");
  });
  elem.firstChild.nextSibling.classList.remove("text-secondary");
  elem.firstChild.nextSibling.classList.add("text-primary");
}
