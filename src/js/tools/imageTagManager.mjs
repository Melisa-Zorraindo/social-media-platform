export default function imageContainerManager(tag) {
  for (let i = 0; i < tag.length; i++) {
    if (tag[i].currentSrc === "") {
      tag[i].classList.add("d-none");
    }
  }
}
