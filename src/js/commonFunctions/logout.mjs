/**
 * Logs the user out of
 * the app by removing key value pairs
 * stored in local storage.
 * Redirects user to login page
 * after removing items from storage.
 */
export default function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
  localStorage.removeItem("userEmail");
  location.replace("index.html");
}
