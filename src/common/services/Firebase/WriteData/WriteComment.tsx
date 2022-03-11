import { addDoc, collection } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';
import { IpostCommentSubmission } from '../../../types';

export default async function WriteComment(
  comment: IpostCommentSubmission
): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    await addDoc(collection(Firestore, 'comments'), comment);
  } else {
    throw new Error('User can not be null to write an article');
  }
}
