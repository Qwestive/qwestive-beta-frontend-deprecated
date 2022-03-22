import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';

export async function getUserInfosByUserName(
  userName: string
): Promise<DocumentData> {
  const userQuery = query(
    collection(Firestore, 'users'),
    where('userName', '==', userName)
  );
  const userSnapshot = await getDocs(userQuery);
  if (userSnapshot.docs.length !== 0) {
    return userSnapshot.docs[0].data();
  }
  throw new Error("User doesn't exist");
}

export async function checkUserNameExist(userName: string): Promise<boolean> {
  const userQuery = query(
    collection(Firestore, 'users'),
    where('userName', '==', userName)
  );
  const userSnapshot = await getDocs(userQuery);
  return userSnapshot.docs.length !== 0;
}
