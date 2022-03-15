import { addDoc, collection } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';
import { IpostCommentSubmission } from '../../../types';

export default async function WriteComment(
  comment: IpostCommentSubmission
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const commentRef = await addDoc(collection(Firestore, 'comments'), comment);
    return commentRef.id;
  }
  throw new Error('User can not be null to write an article');
}
