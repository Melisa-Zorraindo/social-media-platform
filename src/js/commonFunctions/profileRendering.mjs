import { getRandomImage } from "../tools/imagePicker.mjs";

/**
 * Creates HTML to display
 * a list of users
 * @param {array} arr
 * @param {HTMLDivElement} container
 */
export default async function renderUsers(arr, container) {
  arr.forEach(({ avatar, name }) => {
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
    profilePicture.classList.add("img-fluid", "profile-pic", "rounded-circle");
    imageContainer.append(profilePicture);

    const userName = document.createElement("div");
    userName.classList.add("col-6", "text-small");
    userName.innerHTML = name;
    li.append(userName);
  });
}
