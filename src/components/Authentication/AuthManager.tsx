import React, { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import {
  AccountTokensByMintOrCollection,
  areTokensEqual,
  InonFungibleTokenCollection,
  IfungibleToken,
  InonFungibleToken,
} from 'types/types';
import { dbToNonFungibleTokenCollection } from 'services/Firebase/Converters/TokensOwnedConverter';
import { areMapsTheSame, objectToMap } from '../../functions/Util';
import {
  UpdateAccountFungibleTokens,
  UpdateAccountNonFungibleTokens,
} from '../../services/Firebase/UpdateAccountTokens';
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
  userAccountTokensAtom,
  userIdAtom,
} from '../../services/recoil/userInfo';

import { userFinishedLoadingAtom } from '../../services/recoil/appState';
import ReadUserAccountTokens from '../../services/Solana/GetData/ReadUserAccountTokens';

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
  const [, setUserAccountTokens] = useRecoilState(userAccountTokensAtom);
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

  async function updateUserAccountFungibleTokens(
    dbTokens: Map<string, IfungibleToken>,
    walletTokens: Map<string, IfungibleToken>
  ): Promise<Map<string, IfungibleToken>> {
    if (!areMapsTheSame(dbTokens, walletTokens, areTokensEqual)) {
      try {
        const updatedTokensOwned = await UpdateAccountFungibleTokens();
        return objectToMap(updatedTokensOwned?.data?.tokensOwnedByMint ?? {});
      } catch (error) {
        toast.error('Failed to update wallet holdings');
      }
    }
    return dbTokens;
  }

  async function updateUserAccountNonFungibleTokens(
    dbTokenCollection: Map<string, InonFungibleTokenCollection>,
    walletTokens: Map<string, InonFungibleToken>
  ): Promise<Map<string, InonFungibleTokenCollection>> {
    const dbTokens = new Map<string, InonFungibleToken>();
    dbTokenCollection.forEach((element) => {
      element.tokensOwned.forEach((token: InonFungibleToken) => {
        dbTokens.set(token.mint, token);
      });
    });
    if (!areMapsTheSame(dbTokens, walletTokens, areTokensEqual)) {
      try {
        const updatedTokensOwned = await UpdateAccountNonFungibleTokens();
        return dbToNonFungibleTokenCollection(
          updatedTokensOwned?.data?.tokensOwnedByCollection ?? {}
        );
      } catch (error) {
        toast.error('Failed to update wallet holdings');
      }
    }
    return dbTokenCollection;
  }

  async function getUserAccountTokens(
    targetPublicKey: string,
    tokensOwnedByMint: any,
    tokensOwnedByCollection: Map<string, InonFungibleTokenCollection>
  ): Promise<AccountTokensByMintOrCollection> {
    const { fungibleAccountTokens, nonFungibleAccountTokens } =
      await ReadUserAccountTokens(targetPublicKey);

    const fungibleAccountTokensByMint = await updateUserAccountFungibleTokens(
      objectToMap(tokensOwnedByMint ?? {}),
      fungibleAccountTokens
    );
    const nonFungibleAccountTokensByCollection =
      await updateUserAccountNonFungibleTokens(
        tokensOwnedByCollection,
        nonFungibleAccountTokens
      );

    return {
      fungibleAccountTokensByMint,
      nonFungibleAccountTokensByCollection,
    };
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
              const accountTokens = await getUserAccountTokens(
                user.uid,
                userDoc.data().tokensOwnedByMint,
                dbToNonFungibleTokenCollection(
                  userDoc.data().tokensOwnedByCollection ?? {}
                )
              );
              setUserAccountTokens(accountTokens);
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
