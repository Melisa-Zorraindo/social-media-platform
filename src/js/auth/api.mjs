const USERNAME_FIELD = document.querySelector("#username");
const EMAIL_FIELD = document.querySelector("#email");
const PASSWORD_FIELD = document.querySelector("#password");

const BASE_URL = "https://nf-api.onrender.com";

export async function authenticateUser() {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
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
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
