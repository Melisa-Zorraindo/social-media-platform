export function displayAddPostWindow() {
  const MAIN = document.querySelector("main");
  const POST_WINDOW = document.createElement("div");
  POST_WINDOW.classList.add("container");

  //clear container to render post window
  MAIN.innerHTML = " ";

  //render post window
  POST_WINDOW.innerHTML = `<div class="card my-1">
                                <form action="" class="p-2">
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
                                    <div class="container">
                                        <div class="row mt-3 mb-1">
                                            <div class="col col-2">
                                                <button type="button" class="btn btn-custom text-secondary">
                                                    <span class="material-symbols-outlined">
                                                      add_photo_alternate
                                                    </span>
                                                </button>
                                            </div>
                                            <div class="col text-end">
                                                <button type="submit" class="btn btn-outline-primary">
                                                  close
                                                </button>
                                                <button type="submit" class="btn btn-primary">post</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>`;
  MAIN.append(POST_WINDOW);
}
