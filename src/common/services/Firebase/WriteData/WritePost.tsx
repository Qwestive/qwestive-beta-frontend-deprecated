import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';
import {
  IpostPreviewSubmission,
  IpostArticleSubmission,
  IpostPollSubmission,
} from '../../../types';

export default async function WritePost(
  postPreview: IpostPreviewSubmission,
  post: IpostArticleSubmission | IpostPollSubmission
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const previewPostRef = await addDoc(
      collection(Firestore, 'postPreviews'),
      postPreview
    );
    const postRef = doc(Firestore, 'posts', previewPostRef.id);
    await setDoc(postRef, post);

    return previewPostRef.id;
  }
  throw new Error('User can not be null to write a post');
}
