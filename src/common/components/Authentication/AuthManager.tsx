import React, { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

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
} from '../../../recoil/userInfo';

/* 
It is used as a component
TODO:
- handle errors better ?
*/

export default function AuthManager({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { disconnect, connected } = useWallet();
  const [userPublicKey, setUserPublickey] = useRecoilState(userPublicKeyAtom);
  const [, setUserName] = useRecoilState(userNameAtom);
  const [, setDisplayName] = useRecoilState(userDisplayNameAtom);
  const [, setProfileImage] = useRecoilState(userProfileImageAtom);
  const [, setCoverImageAtom] = useRecoilState(userCoverImageAtom);
  const [, setBio] = useRecoilState(userBioAtom);
  const [, setPersonalLink] = useRecoilState(userPersonalLinkAtom);

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
            } else {
              throw new Error('User information not found');
            }
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          } catch (error: any) {
            toast.error(error?.message);
            try {
              await SignoutWithWallet({ disconnect, connected });
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
