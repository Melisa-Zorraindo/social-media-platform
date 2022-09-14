import { validateForm } from "./validation.mjs";
const REGISTRATION_FORM = document.querySelector("#registration-form");

REGISTRATION_FORM.addEventListener("submit", validateForm);
