import { displayAddPostWindow } from "./components/addPost.js";
import { displayContactsWindow } from "./components/contacts.js";
const ADD_POST_BTN = document.querySelector("#add-post-btn");
const CONTACT_LIST_BTN = document.querySelector("#contacts-btn");
const NAVBAR = [ADD_POST_BTN, CONTACT_LIST_BTN];

ADD_POST_BTN.addEventListener("click", () => {
  displayAddPostWindow();
  updateNavbarStyles(ADD_POST_BTN);
});

CONTACT_LIST_BTN.addEventListener("click", () => {
  displayContactsWindow();
  updateNavbarStyles(CONTACT_LIST_BTN);
});

function updateNavbarStyles(elem) {
  NAVBAR.forEach((item) => {
    item.firstChild.nextSibling.classList.add("text-secondary");
  });
  elem.firstChild.nextSibling.classList.remove("text-secondary");
  elem.firstChild.nextSibling.classList.add("text-primary");
}
