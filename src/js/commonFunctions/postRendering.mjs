import { Post } from "../components/post.mjs";
import { getRandomImage } from "../tools/imagePicker.mjs";
/**
 * Creates the html to be displayed
 * on homepage for each post entry using
 * the Post class
 * @param {array} arr
 */
export function renderListOfPosts(arr, container) {
  arr.map((post) => {
    let {
      author: { avatar, name },
      created,
      body,
      media,
      _count: { reactions: totalReactions, comments: totalComments },
      id,
      comments,
      reactions,
      updated,
    } = post;

    //select avatar randomly if user's avatar is an empty string
    let assignedProfilePicture = getRandomImage();

    if (!avatar) {
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
      reactions,
      comments,
      id,
      updated
    );

    postItem.renderPost(container);
  });
}
