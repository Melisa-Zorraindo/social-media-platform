import { validateSignup } from "./signupValidation.mjs";

const REGISTRATION_FORM = document.querySelector("#registration-form");

REGISTRATION_FORM.addEventListener("submit", validateSignup);
