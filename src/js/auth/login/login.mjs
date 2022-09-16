import { validateLogin } from "./loginValidation.mjs";

const LOGIN_FORM = document.querySelector("#login-form");

LOGIN_FORM.addEventListener("submit", validateLogin);
