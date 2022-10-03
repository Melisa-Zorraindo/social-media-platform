import { validateLogin } from "./loginValidation.mjs";

//select log in form and apply validation on submission
const LOGIN_FORM = document.querySelector("#login-form");

LOGIN_FORM.addEventListener("submit", validateLogin);
