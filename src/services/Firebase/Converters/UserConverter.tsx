/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { AccountTokensByMintOrCollection, IuserInfo } from 'types/types';
import { objectToMap } from 'functions/Util';
import { dbToNonFungibleTokenCollection } from './TokensOwnedConverter';

function buildAccountTokensFromDb(
  dbTokensOwnedByMint: any,
  dbTokensOwnedByCollection: any
): AccountTokensByMintOrCollection {
  return {
    fungibleAccountTokensByMint: objectToMap(dbTokensOwnedByMint ?? {}),
    nonFungibleAccountTokensByCollection: dbToNonFungibleTokenCollection(
      dbTokensOwnedByCollection ?? {}
    ),
  };
}

export const userConverter = {
  toFirestore(userInfo: IuserInfo): DocumentData {
    return {
      displayName: userInfo.displayName,
      profileImage: userInfo.profileImage,
      coverImage: userInfo.coverImage,
      bio: userInfo.bio,
      personalLink: userInfo.personalLink,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): IuserInfo {
    const data = snapshot.data();
    return {
      uid: snapshot.id,
      publicKey: snapshot.id,
      userName: data.userName,
      displayName: data.displayName,
      profileImage: data.profileImage,
      coverImage: data.coverImage,
      bio: data.bio,
      personalLink: data.personalLink,
      accountTokens: buildAccountTokensFromDb(
        data.tokensOwnedByMint,
        data.tokensOwnedByCollection
      ),
    } as IuserInfo;
  },
};
