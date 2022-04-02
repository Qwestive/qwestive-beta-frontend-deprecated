import React, { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { userInfoAtom } from 'services/recoil/userInfo';
import { userConverter } from 'services/Firebase/Converters/UserConverter';
import SigninWithWallet from 'services/Firebase/Authentication/SigninWithWallet';
import SignoutWithWallet from 'services/Firebase/Authentication/SignoutWithWallet';
import { FirebaseAuth, Firestore } from 'services/Firebase/FirebaseConfig';
import {
  userFinishedLoadingAtom,
  loadingAppAtom,
  logInStateAtom,
} from 'services/recoil/appState';
import { getUserAccountTokens } from 'components/Authentication/TokenManager';

export default function AuthManager({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { publicKey, signMessage, disconnect, connected } = useWallet();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [, setUserFinishLoading] = useRecoilState(userFinishedLoadingAtom);
  const [, setLoadingApp] = useRecoilState(loadingAppAtom);
  const [, setLogInState] = useRecoilState(logInStateAtom);

  async function trySigninWithWallet() {
    if (connected && publicKey) {
      try {
        setLogInState('receive');
        await SigninWithWallet(
          {
            uid: publicKey.toString(),
            publicKey,
            signMessage,
          },
          setLogInState
        );
      } catch (error: any) {
        toast.error(`Couldn't sign in: ${error?.message}`);
        setLogInState('');
      }
    }
  }

  useEffect(() => {
    trySigninWithWallet();
  }, [connected]);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (user) {
        if (user.uid !== userInfo?.uid) {
          try {
            const userRef = doc(Firestore, 'users', user.uid).withConverter(
              userConverter
            );
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              let { accountTokens } = userDoc.data();
              try {
                accountTokens = await getUserAccountTokens(
                  userDoc.data().publicKey,
                  userDoc.data().accountTokens
                );
              } catch (error) {
                toast.error('Failed to update wallet holdings');
              }
              setUserInfo({
                ...userDoc.data(),
                accountTokens,
              });
              setUserFinishLoading(true);
            } else {
              throw new Error('User information not found');
            }
          } catch (error: any) {
            toast.error(error?.message);
            try {
              await SignoutWithWallet({ disconnect, connected });
            } catch (errorSignout: any) {
              toast.error(errorSignout?.message);
            }
          }
        }
      } else {
        setUserInfo(undefined);
        setUserFinishLoading(true);
        setLogInState('');
      }
      setLoadingApp(false);
    });
  }, []);

  return <div>{children}</div>;
}
