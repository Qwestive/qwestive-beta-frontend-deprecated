import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';
import { IpostPreview, IpostArticle } from '../../../types';

export default async function WriteArticlePost(
  postPreview: IpostPreview,
  postArticle: IpostArticle
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    // no need to check credentials here
    // the rules shoold be in firestore
    const previewPostRef = await addDoc(
      collection(Firestore, 'postPreviews'),
      postPreview
    );
    const postArticleRef = doc(Firestore, 'posts', previewPostRef.id);
    await setDoc(postArticleRef, postArticle);

    // maybe display the link
    return previewPostRef.id;
  }
  throw new Error('User can not be null to write an article');
}
