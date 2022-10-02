export default function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
  location.replace("index.html");
}
