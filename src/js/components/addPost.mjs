import { createPost } from "../auth/commonFunctions/api.mjs";
import { accessToken } from "./storedKeys.mjs";

export function addPostWindow() {
  const POST_FIELD_MOBILE = document.querySelector("#user-post-mobile");
  const MEDIA_UPLOAD_MOBILE = document.querySelector("#media-upload-mobile");
  const CREATE_POST_BUTTON_MOBILE = document.querySelector(
    "#create-post-button-mobile"
  );

  CREATE_POST_BUTTON_MOBILE.addEventListener("click", (event) => {
    event.preventDefault();

    createPost(accessToken, POST_FIELD_MOBILE.value, MEDIA_UPLOAD_MOBILE.value);
  });
}
