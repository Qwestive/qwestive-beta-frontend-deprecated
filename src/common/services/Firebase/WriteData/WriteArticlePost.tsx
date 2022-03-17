import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';
import { IpostPreviewSubmission, IpostArticleSubmission } from '../../../types';

export default async function WriteArticlePost(
  postPreview: IpostPreviewSubmission,
  postArticle: IpostArticleSubmission
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const previewPostRef = await addDoc(
      collection(Firestore, 'postPreviews'),
      postPreview
    );
    const postArticleRef = doc(Firestore, 'posts', previewPostRef.id);
    await setDoc(postArticleRef, postArticle);

    return previewPostRef.id;
  }
  throw new Error('User can not be null to write an article');
}
