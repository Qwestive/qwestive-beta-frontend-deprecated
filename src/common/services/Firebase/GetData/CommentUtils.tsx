import { query, collection, where, getDocs } from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';
import { commentConverter } from '../converters/CommentConverter';
import { IpostComment } from '../../../types';

// Fetch all comments for a post.
// TODO: move into cloud function in order to increase privacy of comments.
export async function getCommentsForPost(
  postId: string
): Promise<Array<IpostComment>> {
  const userQuery = query(
    collection(Firestore, 'comments'),
    where('postId', '==', postId)
  ).withConverter(commentConverter);
  const userSnapshot = await getDocs(userQuery);
  if (userSnapshot.docs.length !== 0) {
    return userSnapshot.docs.map((item) => item.data());
  }
  throw new Error("User doesn't exist");
}
