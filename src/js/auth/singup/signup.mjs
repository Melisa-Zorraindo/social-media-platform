import { validateSignup } from "./signupValidation.mjs";

//select registration form and validate on submission
const REGISTRATION_FORM = document.querySelector("#registration-form");

REGISTRATION_FORM.addEventListener("submit", validateSignup);
