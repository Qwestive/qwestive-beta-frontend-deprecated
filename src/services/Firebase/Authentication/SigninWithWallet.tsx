import { httpsCallable } from 'firebase/functions';
import { PublicKey } from '@solana/web3.js';
import { SetterOrUpdater } from 'recoil';
import { TlogInState } from 'types/types';
import { FirebaseFunctions, FirebaseAuth } from '../FirebaseConfig';
import SignMessageForServer from './SignMessageForServer';
/*
Logic to SignIn an user with custom Auth process
uid is publickey as a string, 
publickey is the Uint8array version, 
signMessage is a wallet function
TODO:
- propagate or Toast if something goes wrong
*/

interface IwalletPropForSignin {
  uid: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

async function SigninWithWalletProcess(
  walletProp: IwalletPropForSignin,
  setLogInState: SetterOrUpdater<TlogInState>
) {
  const userCheckin = httpsCallable(
    FirebaseFunctions,
    'authentication-userCheckIn'
  );
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const result: any = await userCheckin({ uid: walletProp.uid });
  setLogInState('sign');
  if (result.data.message !== undefined) {
    // return nonce to sign if user exist
    await SignMessageForServer(
      {
        uid: walletProp.uid,
        message: result.data.message,
        publicKey: walletProp.publicKey,
        signMessage: walletProp.signMessage,
      },
      setLogInState
    );
  } else {
    throw new Error('Failed to retrieve CustomToken');
  }
}

/*
We check if the user is already auth
and if he is auth with the connected wallet
if not we start the signin process
*/
export default async function SigninWithWallet(
  walletProp: IwalletPropForSignin,
  setLogInState: SetterOrUpdater<TlogInState>
): Promise<void> {
  const user = FirebaseAuth.currentUser;
  if (user) {
    // user is signed in
    if (user.uid !== walletProp.uid) {
      // new wallet connection different from auth one

      await FirebaseAuth.signOut();
      await SigninWithWalletProcess(walletProp, setLogInState);
    }
    // else do nothing account is cached already
  } else {
    await SigninWithWalletProcess(walletProp, setLogInState);
  }
}
