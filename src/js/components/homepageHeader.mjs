/**
 * Creates HTML header for homepage
 * @param {HTMLElement} container
 * @param {string} profilePicture
 */
export function renderHomepageHeader(container, profilePicture) {

  alert("Since you have an HTML parsing utility, you could store this as a string template and use that to turn it into real HTML. This is fine if the content is not coming from the API because you control it.")

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
    "d-flex",
    "justify-content-between",
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
  profileImage.classList.add(
    "profile-pic",
    "img-fluid",
    "rounded-circle",
    "mb-2"
  );
  anchorProfile.append(profileImage);

  const secondNestedCol = document.createElement("div");
  secondNestedCol.classList.add("col", "col-8", "d-lg-none");
  secondCol.append(secondNestedCol);

  const searchForm = document.createElement("form");
  searchForm.classList.add("input-group", "my-0");
  secondNestedCol.append(searchForm);

  const searchBar = document.createElement("input");
  searchBar.setAttribute("type", "search");
  searchBar.setAttribute("id", "top-search-bar");
  searchBar.setAttribute("placeholder", "search");
  searchBar.setAttribute("aria-label", "search");
  searchBar.classList.add("form-control", "search-custom-h");
  searchForm.append(searchBar);

  const searchButton = document.createElement("button");
  searchButton.setAttribute("type", "button");
  searchButton.classList.add(
    "input-group-text",
    "material-symbols-outlined",
    "search-custom-h",
    "bg-primary",
    "text-white"
  );
  searchButton.innerHTML = "search";
  searchForm.append(searchButton);
}
