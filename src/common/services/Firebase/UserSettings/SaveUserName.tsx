import { httpsCallable } from 'firebase/functions';
import { FirebaseFunctions, FirebaseAuth } from '../FirebaseConfig';

export default async function SaveUserName(userName: string): Promise<void> {
  const editUserName = httpsCallable(
    FirebaseFunctions,
    'userSettings-editUserName'
  );

  if (FirebaseAuth.currentUser != null) {
    await editUserName(userName);
  } else {
    throw new Error('User can not be null to update username');
  }
}
