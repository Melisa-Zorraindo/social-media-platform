const profileImages = [
  "src/img/profileImages/alien.png",
  "src/img/profileImages/bat.png",
  "src/img/profileImages/cat.png",
  "src/img/profileImages/diabolic-cat.png",
  "src/img/profileImages/eye.png",
  "src/img/profileImages/ghost.png",
  "src/img/profileImages/mommy.png",
  "src/img/profileImages/red-bat.png",
  "src/img/profileImages/skeleton.png",
  "src/img/profileImages/zombie.png",
];

/**
 * Picks a number between 0 and 10 at random
 * @returns a random number between 0 and 10
 */
function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

/**
 * Uses the number returned from
 * previous function to select an image from
 * array "profileImages"
 * @returns an image
 */
export function getRandomImage() {
  return profileImages[getRandomNumber()];
}
