import { doc, updateDoc } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';

export default async function SaveUserInfo(
  displayName: string,
  bio: string,
  personalLink: string
): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const userRef = doc(Firestore, 'users', FirebaseAuth.currentUser.uid);

    await updateDoc(userRef, {
      displayName,
      bio,
      personalLink,
    });
  } else {
    throw new Error('User can not be null to update info');
  }
}
