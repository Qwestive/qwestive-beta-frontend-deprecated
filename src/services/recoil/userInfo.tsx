import { atom } from 'recoil';
import {
  InonFungibleTokenCollection,
  AccountTokensByMintOrCollection,
  Itoken,
  IfungibleToken,
} from 'types/types';

export const userIdAtom = atom<string | undefined>({
  key: 'id',
  default: undefined,
});

export const userPublicKeyAtom = atom<string | undefined>({
  key: 'userPublicKey',
  default: undefined,
});

export const userNameAtom = atom<string | undefined>({
  key: 'userName',
  default: undefined,
});

export const userDisplayNameAtom = atom<string | undefined>({
  key: 'userDisplayName',
  default: undefined,
});

export const userProfileImageAtom = atom<string | undefined>({
  key: 'userProfileImage',
  default: undefined,
});

export const userCoverImageAtom = atom<string | undefined>({
  key: 'userCoverImage',
  default: undefined,
});

export const userAccountTokensAtom = atom<AccountTokensByMintOrCollection>({
  key: 'userTokensOwned',
  default: {
    fungibleAccountTokensByMint: new Map<string, IfungibleToken>(),
    nonFungibleAccountTokensByCollection: new Map<
      string,
      InonFungibleTokenCollection
    >(),
  },
});

export const userBioAtom = atom<string | undefined>({
  key: 'userBio',
  default: undefined,
});

export const userPersonalLinkAtom = atom<string | undefined>({
  key: 'userPersonalLink',
  default: undefined,
});
