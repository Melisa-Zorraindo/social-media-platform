import { BASE_URL } from "../constants/apiUrl.mjs";
import { handleSubmission } from "../auth/singup/submission.mjs";

const USERNAME_FIELD = document.querySelector("#username");
const EMAIL_FIELD = document.querySelector("#email");
const PASSWORD_FIELD = document.querySelector("#password");

const SIGNUP_ERROR_MESSAGE = document.querySelector("#signup-error-message");

/**
 * Calls API to register a new user
 */
export async function authenticateUser() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      name: USERNAME_FIELD.value,
      email: EMAIL_FIELD.value,
      password: PASSWORD_FIELD.value,
    }),
  };
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/auth/register`,
      options
    );
    const { status, message } = await response.json();
    if (status === 200) {
      handleSubmission();
    } else {
      SIGNUP_ERROR_MESSAGE.innerHTML = message;
    }
  } catch (error) {
    console.log(error);
  }
}

const LOGIN_EMAIL = document.querySelector("#login-email");
const LOGIN_PASSWORD = document.querySelector("#login-password");

const LOGIN_ERROR_MESSAGE = document.querySelector("#login-error-message");

/**
 * Calls API to get token authorisation
 * for later API requests and the usernaname
 * and save them in local storage
 */
export async function authoriseUser() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      email: LOGIN_EMAIL.value,
      password: LOGIN_PASSWORD.value,
    }),
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/auth/login`,
      options
    );
    const data = await response.json();
    const { name, accessToken, message } = data;
    if (response.status === 200) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", name);
      window.location.assign("profile.html");
    } else {
      LOGIN_ERROR_MESSAGE.innerHTML = message;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Makes a GET request to fetch
 * all posts from API
 * @param {string} accessToken
 * @returns
 */
export async function fetchPosts(accessToken) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts?_author=true&_comments=true&_reactions=true`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(accessToken, postText, mediaUrl) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: " ",
      body: postText,
      tags: [" "],
      media: mediaUrl,
    }),
  };

  try {
    const response = await fetch(`${BASE_URL}/api/v1/social/posts/`, options);
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Makes a DELETE request to
 * remove a post from the API
 * @param {string} accessToken
 * @param {number} id
 */
export async function deletePost(accessToken, id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts/${id}`,
      options
    );
    await response.json();
    if (response.status === 200) {
      location.reload();
    } else {
      alert("An error ocurred, try later");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(accessToken, editedContent, editedMedia, id) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: " ",
      body: `${editedContent}`,
      tags: [" "],
      media: `${editedMedia}`,
    }),
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts/${id}`,
      options
    );
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Makes a GET request to
 * fetch a single post from API
 * @param {string} accessToken
 * @param {number} id
 * @returns post in API which matches the id passed in
 */
export async function viewSpecificPost(accessToken, id) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
      options
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function viewProfile(accessToken, name) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/social/profiles/${name}?_posts=true&_following=true&_followers=true`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}