import { getRandomImage } from "../tools/imagePicker.mjs";

/**
 * Creates HTML to display
 * a list of users
 * @param {array} arr
 * @param {HTMLDivElement} container
 */
export default async function renderUsers(arr, container) {
  arr.forEach((user) => {
    const li = document.createElement("li");
    li.classList.add("row", "py-2", "align-items-center");
    container.append(li);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("col-3");
    li.append(imageContainer);

    //assign profile picture if user doesn't have one
    let assignedAvatar = getRandomImage();
    if (user.avatar.length === 0) {
      user.avatar = assignedAvatar;
    }

    const profilePicture = document.createElement("img");
    profilePicture.setAttribute("src", user.avatar);
    profilePicture.setAttribute("alt", "user profile picture");
    profilePicture.classList.add("profile-pic", "rounded-circle");
    imageContainer.append(profilePicture);

    const userName = document.createElement("div");
    userName.classList.add("col-6");
    userName.innerHTML = user.name;
    li.append(userName);
  });
}
