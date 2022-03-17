import { httpsCallable } from 'firebase/functions';

import { FirebaseFunctions } from './FirebaseConfig';
/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function UpdateTokenOwned(): Promise<any> {
  const verifyTokenOwned = httpsCallable(
    FirebaseFunctions,
    'verifyTokenOwned-verifyTokenOwned'
  );
  return verifyTokenOwned({});
}
