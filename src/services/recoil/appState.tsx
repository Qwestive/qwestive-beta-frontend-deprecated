import { atom } from 'recoil';
import { TlogInState } from 'types/types';

export const userFinishedLoadingAtom = atom<boolean>({
  key: 'finishedLoading',
  default: false,
});

export const loadingAppAtom = atom<boolean>({
  key: 'loadingApp',
  default: true,
});

export const logInStateAtom = atom<TlogInState>({
  key: 'logInState',
  default: '',
});

export const toggleReloadCommunityAtom = atom<boolean>({
  key: 'toggleReloadCommunity',
  default: false,
});
