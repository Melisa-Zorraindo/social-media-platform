const profileImages = [
  "../../img/profileImages/alien.png",
  "../../img/profileImages/bat.png",
  "../../img/profileImages/cat.png",
  "../../img/profileImages/diabolic-cat.png",
  "../../img/profileImages/eye.png",
  "../../img/profileImages/ghost.png",
  "../../img/profileImages/mommy.png",
  "../../img/profileImages/red-bat.png",
  "../../img/profileImages/skeleton.png",
  "../../img/profileImages/zombie.png",
];

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

export function getRandomImage() {
  return profileImages[getRandomNumber()];
}
