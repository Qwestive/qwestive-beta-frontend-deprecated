import { atom } from 'recoil';

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

export const userBioAtom = atom<string | undefined>({
  key: 'userBio',
  default: undefined,
});

export const userPersonalLinkAtom = atom<string | undefined>({
  key: 'userPersonalLink',
  default: undefined,
});
