import { signInWithCustomToken } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { SetterOrUpdater } from 'recoil';
import { TlogInState, ImessageToSign } from 'types/types';
import SignMessage from 'services/Solana/Functions/SignMessage';

import { FirebaseFunctions, FirebaseAuth } from '../FirebaseConfig';

/*
Login the user
TODO:
- decide user database format
- adjust the nonce acordingly
- propagate errors 
*/
export default async function SignMessageForServer(
  messageToSign: ImessageToSign,
  setLogInState: SetterOrUpdater<TlogInState>
): Promise<void> {
  const userSignin = httpsCallable(
    FirebaseFunctions,
    'authentication-userSignin'
  );
  const signatures = await SignMessage(messageToSign);
  setLogInState('verify');
  const result: any = await userSignin(signatures);
  if (result.data.customToken !== undefined) {
    await signInWithCustomToken(FirebaseAuth, result.data.customToken);
    setLogInState('authed');
  } else {
    // should never happen
    throw new Error(`Failed to request customToken`);
  }
}
