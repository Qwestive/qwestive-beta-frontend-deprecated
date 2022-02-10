import { doc, updateDoc } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';
import UploadFile from '../UploadFile';

export default async function SaveCoverImage(
  fileToUpload: File
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const filePath = `users/${FirebaseAuth.currentUser.uid}/coverImage.jpeg`;
    const [imageUrl] = await UploadFile(filePath, fileToUpload);
    const userRef = doc(Firestore, 'users', FirebaseAuth.currentUser.uid);

    await updateDoc(userRef, {
      coverImage: imageUrl,
    });
    return imageUrl;
  }
  throw new Error('User can not be null to update cover image');
}
