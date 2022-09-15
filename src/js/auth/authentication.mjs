import { validateForm } from "./validation.mjs";

const REGISTRATION_FORM = document.querySelector("#registration-form");

REGISTRATION_FORM.addEventListener("submit", validateForm);

const NEW_USER_PAGE_CONTAINER = document.querySelector("#new-user-page");

/**
 * Renders a success message for the user
 * and instructions if redirection fails
 * Redirects the user to the login page in 5 seconds
 */
export function handleSubmission() {
  NEW_USER_PAGE_CONTAINER.innerHTML = "";

  NEW_USER_PAGE_CONTAINER.innerHTML = `<h1 class="text-center m-5">Welcome to Socials</h1>
                                       <p class="text-center">You'll be now redirected to the login page</p>
                                       <p class="text-center">
                                            Please <a href="index.html">click here</a> if you're not redirected
                                            within 5 seconds
                                       </p>`;

  setTimeout(() => {
    window.location.assign("index.html");
  }, 5000);
}
