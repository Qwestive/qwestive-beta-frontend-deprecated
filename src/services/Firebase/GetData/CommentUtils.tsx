import { query, collection, where, getDocs } from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';
import { commentConverter } from '../Converters/CommentConverter';
import { IpostComment } from '../../../types/types';

// Fetch all comments for a post.
// TODO: move into cloud function in order to increase privacy of comments.
export async function getCommentsForPost(
  postId: string
): Promise<Array<IpostComment>> {
  const q = query(
    collection(Firestore, 'comments'),
    where('postId', '==', postId)
  ).withConverter(commentConverter);
  const snap = await getDocs(q);
  return snap.docs.map((item) => item.data());
}
