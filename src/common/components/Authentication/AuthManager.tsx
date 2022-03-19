import React, { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { objectToMap } from '../../functions/Util';
import UpdateTokensOwned from '../../services/Firebase/UpdateTokensOwned';
import SigninWithWallet from '../../services/Firebase/Authentication/SigninWithWallet';
import SignoutWithWallet from '../../services/Firebase/Authentication/SignoutWithWallet';
import {
  FirebaseAuth,
  Firestore,
} from '../../services/Firebase/FirebaseConfig';
import {
  userPublicKeyAtom,
  userNameAtom,
  userDisplayNameAtom,
  userProfileImageAtom,
  userCoverImageAtom,
  userBioAtom,
  userPersonalLinkAtom,
  userTokensOwnedAtom,
  userIdAtom,
} from '../../../recoil/userInfo';

import { userFinishedLoadingAtom } from '../../../recoil/appState';

/* 
It is used as a component
TODO:
- handle errors better ?
*/
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AuthManager({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { publicKey, signMessage, disconnect, connected } = useWallet();
  const [, setUserId] = useRecoilState(userIdAtom);
  const [userPublicKey, setUserPublickey] = useRecoilState(userPublicKeyAtom);
  const [, setUserName] = useRecoilState(userNameAtom);
  const [, setDisplayName] = useRecoilState(userDisplayNameAtom);
  const [, setProfileImage] = useRecoilState(userProfileImageAtom);
  const [, setCoverImageAtom] = useRecoilState(userCoverImageAtom);
  const [, setBio] = useRecoilState(userBioAtom);
  const [, setPersonalLink] = useRecoilState(userPersonalLinkAtom);
  const [, setUserTokensOwned] = useRecoilState(userTokensOwnedAtom);
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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (user.uid !== userPublicKey) {
          try {
            setUserId(user.uid);
            setUserPublickey(user.uid);

            // get firestore, set user recoil
            const userRef = doc(Firestore, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
              setUserName(userDoc.data().userName);
              setDisplayName(userDoc.data().displayName);
              setProfileImage(userDoc.data().profileImage);
              setCoverImageAtom(userDoc.data().coverImage);
              setBio(userDoc.data().bio);
              setPersonalLink(userDoc.data().personalLink);

              /// Try fetching most up to date token balance from server, and,
              /// if this fails, fetch most recent token balance from DB.
              try {
                const tokensOwned = await UpdateTokensOwned();
                setUserTokensOwned(
                  objectToMap(tokensOwned?.data?.tokensOwned ?? {})
                );
              } catch (error) {
                setUserTokensOwned(
                  objectToMap(userDoc.data()?.tokensOwned ?? {})
                );
              }
              setUserFinishLoading(true);
              // console.log('DB tokens owned are:');
              // console.log(tokensOwnedFetchedMap);

              // const tokensOwnedNow = await ReadUserTokenBalances(user.uid);
              // console.log('Wallet tokens owned are:');
              // console.log(tokensOwnedNow);
              // if (!areMapsTheSame(tokensOwnedNow, tokensOwnedFetchedMap)) {
              //   console.log('Maps are not the same');
              //   try {
              //     const updateResult = await UpdateTokensOwned();
              //     const newUpdate = objectToMap(
              //       updateResult.data?.filteredAccountTokens ?? {}
              //     );
              //     console.log('Updated tokens owned are');
              //     console.log(updateResult.data?.filteredAccountTokens);

              //     setUserTokensOwned(newUpdate);
              //   } catch (error) {
              //     toast.error('Failed to update wallet holdings');
              //     setUserTokensOwned(tokensOwnedFetchedMap);
              //   }
              // } else {
              //   setUserTokensOwned(tokensOwnedNow);
              // }
              // setUserFinishLoading(true);
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
        setUserId(undefined);
        setUserPublickey(undefined);
        setUserName(undefined);
        setDisplayName(undefined);
        setProfileImage(undefined);
        setCoverImageAtom(undefined);
        setBio(undefined);
        setPersonalLink(undefined);
        setUserFinishLoading(false);
      }
    });
  }, []);

  return <div>{children}</div>;
}
