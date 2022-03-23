import React, { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { userInfoAtom } from 'services/recoil/userInfo';
import { userConverter } from 'services/Firebase/Converters/UserConverter';
import { areMapsTheSame, objectToMap } from 'functions/Util';
import UpdateTokensOwned from 'services/Firebase/UpdateTokensOwned';
import SigninWithWallet from 'services/Firebase/Authentication/SigninWithWallet';
import SignoutWithWallet from 'services/Firebase/Authentication/SignoutWithWallet';
import { FirebaseAuth, Firestore } from 'services/Firebase/FirebaseConfig';

import { userFinishedLoadingAtom } from 'services/recoil/appState';
import ReadUserTokenBalances from 'services/Solana/GetData/ReadUserTokenBalances';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AuthManager({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { publicKey, signMessage, disconnect, connected } = useWallet();

  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [, setUserFinishLoading] = useRecoilState(userFinishedLoadingAtom);

  async function trySigninWithWallet() {
    if (connected && publicKey) {
      try {
        await SigninWithWallet({
          uid: publicKey.toString(),
          publicKey,
          signMessage,
        });
      } catch (error: any) {
        toast.error(`Couldn't sign in: ${error?.message}`);
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
              let unserInfoFetched = userDoc.data();
              const tokensOwnedNow = await ReadUserTokenBalances(user.uid);
              if (
                !areMapsTheSame(tokensOwnedNow, unserInfoFetched.tokensOwned)
              ) {
                try {
                  const updatedTokensOwned = await UpdateTokensOwned();
                  unserInfoFetched = {
                    ...unserInfoFetched,
                    tokensOwned: objectToMap(
                      updatedTokensOwned?.data?.tokensOwned ?? {}
                    ),
                  };
                } catch (error) {
                  toast.error('Failed to update wallet holdings');
                }
              }
              setUserInfo(unserInfoFetched);
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
      }
    });
  }, []);

  return <div>{children}</div>;
}
