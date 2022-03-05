import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';
import { postConverter } from '../Converters/PostConverter';
import { IpostData } from '../../../types';

export async function getPostInfo(postId: string): Promise<IpostData> {
  const docRef = doc(Firestore, 'posts', postId).withConverter(postConverter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error(`Post with provided ID: ${postId}, does not exist`);
}
