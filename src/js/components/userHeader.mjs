/**
 * Creates HTML header for profile page
 * @param {HTMLElement} container
 * @param {string} profilePicture
 * @param {string} username
 */
export function renderProfileHeader(container, profilePicture, username) {
  const outestDiv = document.createElement("div");
  outestDiv.classList.add("container", "mt-2");
  container.append(outestDiv);

  const row = document.createElement("div");
  row.classList.add("row");
  outestDiv.append(row);

  const firstCol = document.createElement("div");
  firstCol.classList.add("col", "col-3", "d-lg-block", "d-none");
  row.append(firstCol);

  const anchorHome = document.createElement("a");
  anchorHome.setAttribute("href", "home.html");
  firstCol.append(anchorHome);

  const logoImage = document.createElement("img");
  logoImage.setAttribute("src", "src/img/socials-logo.png");
  logoImage.setAttribute("alt", "logo");
  anchorHome.append(logoImage);

  const secondCol = document.createElement("div");
  secondCol.classList.add(
    "col",
    "col-lg-9",
    "col-md-12",
    "d-sm-flex",
    "justify-content-start",
    "align-items-start"
  );
  row.append(secondCol);

  const firstNestedCol = document.createElement("div");
  firstNestedCol.classList.add("col", "col-sm-1", "col-2");
  secondCol.append(firstNestedCol);

  const anchorProfile = document.createElement("a");
  anchorProfile.setAttribute("href", "profile.html");
  anchorProfile.classList.add("text-decoration-none");
  firstNestedCol.append(anchorProfile);

  const profileImage = document.createElement("img");
  profileImage.setAttribute("src", profilePicture);
  profileImage.setAttribute("alt", "profile picture");
  profileImage.classList.add("img-fluid", "rounded-circle");
  anchorProfile.append(profileImage);

  const secondNestedCol = document.createElement("div");
  secondNestedCol.classList.add(
    "ms-sm-5",
    "col",
    "d-flex",
    "justify-content-between",
    "align-items-end"
  );
  secondCol.append(secondNestedCol);

  const userInfo = document.createElement("div");
  // userInfo.classList.add("d-flex");
  secondNestedCol.append(userInfo);

  const h1 = document.createElement("h1");
  h1.classList.add("h4", "text-primary", "mb-0");
  h1.innerHTML = username;
  userInfo.append(h1);

  const infoLine1 = document.createElement("p");
  infoLine1.classList.add("my-0", "text-black", "fw-light");
  infoLine1.innerHTML = "🐱 lover";
  userInfo.append(infoLine1);

  const infoLine2 = document.createElement("p");
  infoLine2.classList.add("my-0", "text-black", "fw-light");
  infoLine2.innerHTML = "🌎 wanderer";
  userInfo.append(infoLine2);

  const editProfileButtonMobile = document.createElement("button");
  editProfileButtonMobile.setAttribute("type", "button");
  editProfileButtonMobile.setAttribute("data-bs-toggle", "modal");
  editProfileButtonMobile.setAttribute("data-bs-target", "#edit-profile");
  editProfileButtonMobile.setAttribute("aria-label", "edit user");
  editProfileButtonMobile.classList.add("btn-custom", "d-md-none");
  secondNestedCol.append(editProfileButtonMobile);

  const editIcon = document.createElement("span");
  editIcon.classList.add("material-symbols-outlined", "text-secondary");
  editIcon.innerHTML = "edit";
  editProfileButtonMobile.append(editIcon);

  const editProfileButtonDesktop = document.createElement("button");
  editProfileButtonDesktop.setAttribute("type", "button");
  editProfileButtonDesktop.setAttribute("data-bs-toggle", "modal");
  editProfileButtonDesktop.setAttribute("data-bs-target", "#edit-profile");
  editProfileButtonDesktop.setAttribute("aria-label", "edit user");
  editProfileButtonDesktop.classList.add(
    "btn",
    "btn-primary",
    "d-none",
    "d-md-block"
  );
  secondNestedCol.append(editProfileButtonDesktop);

  const editIconDesktop = document.createElement("span");
  editIconDesktop.classList.add("material-symbols-outlined", "me-2");
  editIconDesktop.innerHTML = "edit";
  editProfileButtonDesktop.append(editIconDesktop);

  const editButtonText = document.createElement("span");
  editButtonText.innerHTML = "edit profile";
  editProfileButtonDesktop.append(editButtonText);

  editProfileButtonMobile.addEventListener("click", () => {
    console.log("button mobile is working");
  });

  editProfileButtonDesktop.addEventListener("click", () => {
    console.log("button desktop is working");
  });
}
