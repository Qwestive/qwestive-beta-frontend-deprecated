import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { postPreviewConverter } from '../Converters/PostPreviewConverter';
import { FirebaseAuth, Firestore } from '../FirebaseConfig';
import { IpostContentType, IpostPreview } from '../../../types/types';

export default async function WritePost(
  postPreview: IpostPreview,
  postContent: IpostContentType
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const previewPostRef = await addDoc(
      collection(Firestore, 'postPreviews').withConverter(postPreviewConverter),
      postPreview
    );
    const postRef = doc(Firestore, 'posts', previewPostRef.id);
    await setDoc(postRef, postContent);

    return previewPostRef.id;
  }
  throw new Error('User can not be null to write a post');
}
