import { createPost } from "../auth/commonFunctions/api.mjs";
import { accessToken } from "./storedKeys.mjs";

export function displayAddPostWindow() {
  const MAIN = document.querySelector("main");
  const POST_WINDOW = document.createElement("div");
  POST_WINDOW.classList.add("container");

  //clear container to render post window
  MAIN.innerHTML = " ";

  //render post window
  POST_WINDOW.innerHTML = ` <div class="card my-5 border-0">
                              <form action="" class="p-3">
                                <div class="form-floating">
                                  <textarea
                                    name=""
                                    id="user-post-mobile"
                                    class="form-control h-100"
                                    placeholder="share your thoughts"
                                  ></textarea>
                                  <label for="user-post">share your thoughts</label>
                                </div>
                              <div class="d-flex mt-3 mb-1 justify-content-between">
                              <div class="input-group">
                                <span
                                  class="material-symbols-outlined input-group-text"
                                >
                                  add_photo_alternate
                                </span>
                                <input
                                  type="text"
                                  placeholder="enter url"
                                  class="text-small form-control"
                                  id="media-upload-mobile"
                                />
                              </div>
                              <div>
                                <button
                                  type="submit"
                                  class="btn btn-primary"
                                  id="create-post-button-mobile"
                                >
                                  post
                                </button>
                              </div>
                            </div>
                            </div>
  `;

  MAIN.append(POST_WINDOW);

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
