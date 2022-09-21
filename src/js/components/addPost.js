export function displayAddPostWindow() {
  const MAIN = document.querySelector("main");
  const POST_WINDOW = document.createElement("div");
  POST_WINDOW.classList.add("container");

  //clear container to render post window
  MAIN.innerHTML = " ";

  //render post window
  POST_WINDOW.innerHTML = `
    <div class="card my-5 border-0">
      <form action="" class="p-3">
        <div class="form-floating">
          <textarea
            name=""
            id="user-post-mobile"
            class="form-control w-100 h-100"
            placeholder="share your thoughts"
            minlength="10"
            required
          ></textarea>
          <label for="user-post">share your thoughts</label>
        </div>
        <div class="d-flex mt-3 mb-1 justify-content-between">
          <div class="d-flex">
            <button type="button" class="btn-custom text-secondary">
              <span class="material-symbols-outlined">
                add_photo_alternate
              </span>
            </button>
            <button
              type="button"
              class="btn btn-custom text-secondary"
            >
              <span class="material-symbols-outlined"> add_reaction </span>
            </button>
          </div>
          <div>
            <button type="submit" class="btn btn-outline-primary">
              close
            </button>
            <button type="submit" class="btn btn-primary">post</button>
          </div>
        </div>
      </form>
    </div>
  `;

  MAIN.append(POST_WINDOW);
}
