export function renderSinglePostHeader(container) {
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
    "justify-content-start",
    "align-items-end"
  );
  row.append(secondCol);

  const goBackButton = document.createElement("a");
  goBackButton.setAttribute("href", "home.html");
  goBackButton.classList.add("btn-custom", "d-flex", "text-decoration-none");
  secondCol.append(goBackButton);

  const goBackButtonContent = document.createElement("span");
  goBackButtonContent.classList.add("material-symbols-outlined");
  goBackButtonContent.innerHTML = "arrow_back";
  goBackButton.append(goBackButtonContent);

  const goBackButtonText = document.createElement("span");
  goBackButtonText.innerHTML = "Go back";
  goBackButton.append(goBackButtonText);
}
