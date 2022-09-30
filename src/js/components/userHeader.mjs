export function renderProfileHeader(
  container,
  profilePicture,
  username,
  userinfoOne,
  userInfoTwo
) {
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
  secondCol.classList.add("col", "col-9", "d-sm-flex");
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
  secondNestedCol.classList.add("ms-sm-5");
  secondCol.append(secondNestedCol);

  const userInfo = document.createElement("div");
  userInfo.classList.add("d-flex");
  secondNestedCol.append(userInfo);

  const h1 = document.createElement("h1");
  h1.classList.add("h4", "text-primary", "mb-0");
  h1.innerHTML = username;
  userInfo.append(h1);

  const editProfileButton = document.createElement("button");
  editProfileButton.setAttribute("type", "button");
  editProfileButton.setAttribute("id", "edit-user-btn");
  editProfileButton.setAttribute("aria-label", "edit user");
  editProfileButton.classList.add("btn-custom");
  userInfo.append(editProfileButton);

  const editIcon = document.createElement("span");
  editIcon.classList.add("material-symbols-outlined", "text-secondary");
  editIcon.innerHTML = "edit";
  editProfileButton.append(editIcon);

  const infoLine1 = document.createElement("p");
  infoLine1.classList.add("my-0", "text-black", "fw-light");
  infoLine1.innerHTML = "🐱 lover";
  secondNestedCol.append(infoLine1);

  const infoLine2 = document.createElement("p");
  infoLine2.classList.add("my-0", "text-black", "fw-light");
  infoLine2.innerHTML = "🌎 wanderer";
  secondNestedCol.append(infoLine2);
}
