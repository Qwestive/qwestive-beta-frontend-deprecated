import React, { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { areMapsTheSame } from '../../functions/Util';
import ReadTokenWallet from '../../services/Solana/GetData/ReadTokenWallet';
import UpdateTokenOwned from '../../services/Firebase/UpdateTokenOwned';
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
} from '../../../recoil/userInfo';

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
  const [userPublicKey, setUserPublickey] = useRecoilState(userPublicKeyAtom);
  const [, setUserName] = useRecoilState(userNameAtom);
  const [, setDisplayName] = useRecoilState(userDisplayNameAtom);
  const [, setProfileImage] = useRecoilState(userProfileImageAtom);
  const [, setCoverImageAtom] = useRecoilState(userCoverImageAtom);
  const [, setBio] = useRecoilState(userBioAtom);
  const [, setPersonalLink] = useRecoilState(userPersonalLinkAtom);
  const [, setUserTokensOwned] = useRecoilState(userTokensOwnedAtom);

  async function trySigninWithWallet() {
    if (connected && publicKey) {
      try {
        await SigninWithWallet({
          uid: publicKey.toString(),
          publicKey,
          signMessage,
        });
      } catch (error: any) {
        toast.error(`Couldn't Signin: ${error?.message}`);
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
              const tokensOwnedFetchedMap = new Map(
                Object.entries(userDoc.data().tokensOwned)
              );
              const tokensOwnedNow = await ReadTokenWallet(user.uid);

              if (!areMapsTheSame(tokensOwnedNow, tokensOwnedFetchedMap)) {
                try {
                  const updateResult = await UpdateTokenOwned();
                  setUserTokensOwned(updateResult.data.filteredAccountTokens);
                } catch (error: any) {
                  toast.error(error?.message);
                  setUserTokensOwned(userDoc.data().tokensOwned);
                }
              }
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
        setUserPublickey(undefined);
        setUserName(undefined);
        setDisplayName(undefined);
        setProfileImage(undefined);
        setCoverImageAtom(undefined);
        setBio(undefined);
        setPersonalLink(undefined);
      }
    });
  }, []);

  return <div>{children}</div>;
}
