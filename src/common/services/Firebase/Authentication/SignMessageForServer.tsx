import { signInWithCustomToken } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

import { ImessageToSign } from '../../../types';

import { FirebaseFunctions, FirebaseAuth } from '../FirebaseConfig';

import SignMessage from '../../Solana/Functions/SignMessage';

/*
Login the user
TODO:
- decide user database format
- adjust the nonce acordingly
- propagate errors 
*/
export default async function SignMessageForServer(
  messageToSign: ImessageToSign
): Promise<void> {
  const userSignin = httpsCallable(
    FirebaseFunctions,
    'authentication-userSignin'
  );
  const signatures = await SignMessage(messageToSign);
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const result: any = await userSignin(signatures);
  if (result.data.customToken !== undefined) {
    await signInWithCustomToken(FirebaseAuth, result.data.customToken);
    // eslint-disable-next-line no-console
    console.log('user login');
  } else {
    // should never happen
    throw new Error(`Failed to request customToken`);
  }
}
