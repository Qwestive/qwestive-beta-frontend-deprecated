import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { IpostContentType, IpostPreviewSubmission } from 'types/types';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';

export default async function WritePost(
  postPreviewSubmission: IpostPreviewSubmission,
  postContent: IpostContentType
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const previewPostRef = await addDoc(
      collection(Firestore, 'postPreviews'),
      postPreviewSubmission
    );
    const postRef = doc(Firestore, 'posts', previewPostRef.id);
    await setDoc(postRef, postContent);

    return previewPostRef.id;
  }
  throw new Error('User can not be null to write a post');
}
