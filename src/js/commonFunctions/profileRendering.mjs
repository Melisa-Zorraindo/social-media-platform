import { getRandomImage } from "../tools/imagePicker.mjs";
import { viewProfile } from "./api/profiles/read.mjs";
import { accessToken, loggedUser } from "../constants/storedKeys.mjs";
import { followProfile, unfollowProfile } from "./api/profiles/update.mjs";

/**
 * Creates HTML to display
 * a list of users
 * @param {array} arr
 * @param {HTMLDivElement} container
 */
export default async function renderUsers(arr, container) {
  arr.forEach(async ({ avatar, name }) => {
    const li = document.createElement("li");
    li.classList.add("row", "py-2", "align-items-center");
    container.append(li);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("col-3");
    li.append(imageContainer);

    //assign profile picture if user doesn't have one
    let assignedAvatar = getRandomImage();
    if (avatar.length === 0) {
      avatar = assignedAvatar;
    }

    const profilePicture = document.createElement("img");
    profilePicture.setAttribute("src", avatar);
    profilePicture.setAttribute("alt", "user profile picture");
    profilePicture.classList.add("profile-pic", "img-fluid", "rounded-circle");
    imageContainer.append(profilePicture);

    const userName = document.createElement("div");
    userName.classList.add("col-6", "text-small");
    userName.innerHTML = name;
    li.append(userName);

    await renderAppropriateButton(name, li);
  });
}

//find followed users
const user = await viewProfile(accessToken, loggedUser);
const following = [];
/**
 * Creates an array of the
 * users being followed by the logged in user
 */
function findFollowing() {
  user.following.forEach((person) => {
    following.push(person.name);
  });
}

findFollowing();

/**
 * Renders either an add person button
 * or a remove person button depending
 * on said person being found in an array
 * @param {string} name
 * @param {HTMLLIElement} container
 */
async function renderAppropriateButton(name, container) {
  const userBeingFollowed = following.find((element) => element === name);
  if (userBeingFollowed) {
    const removeUserButton = document.createElement("button");
    removeUserButton.setAttribute("type", "button");
    removeUserButton.setAttribute("id", "unfollow-user");
    removeUserButton.classList.add("btn-custom", "text-primary", "col-3");
    container.append(removeUserButton);

    const removeUserIcon = document.createElement("span");
    removeUserIcon.classList.add("material-symbols-outlined");
    removeUserIcon.innerHTML = "person_remove";
    removeUserButton.append(removeUserIcon);

    removeUserButton.addEventListener("click", async () => {
      await unfollowProfile(accessToken, name);
    });
  } else {
    const addUserButton = document.createElement("button");
    addUserButton.setAttribute("type", "button");
    addUserButton.setAttribute("id", "follow-user");
    addUserButton.classList.add("btn-custom", "text-primary", "col-3");
    container.append(addUserButton);

    const addUserIcon = document.createElement("span");
    addUserIcon.classList.add("material-symbols-outlined");
    addUserIcon.innerHTML = "person_add";
    addUserButton.append(addUserIcon);

    addUserButton.addEventListener("click", async () => {
      await followProfile(accessToken, name);
    });
  }
}
