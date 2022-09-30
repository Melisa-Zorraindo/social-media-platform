import { viewSpecificPost } from "../commonFunctions/api.mjs";
import { accessToken } from "../constants/storedKeys.mjs";
import { Post } from "../components/post.mjs";
import { getRandomImage } from "../tools/imagePicker.mjs";

const parameterString = window.location.search;
const searchParams = new URLSearchParams(parameterString);

const postId = searchParams.get("id");

let {
  author: { avatar, name },
  body,
  created,
  media,
  _count: { reactions: totalReactions, comments: totalComments },
  id,
  comments,
  reactions,
  updated,
} = await viewSpecificPost(accessToken, postId);

let assignedProfilePicture = getRandomImage();

if (avatar.length === 0) {
  avatar = assignedProfilePicture;
}

const postItem = new Post(
  avatar,
  name,
  created,
  body,
  media,
  totalReactions,
  totalComments,
  comments,
  reactions,
  id,
  updated
);

const main = document.querySelector("main");

postItem.renderSinglePost(main);
