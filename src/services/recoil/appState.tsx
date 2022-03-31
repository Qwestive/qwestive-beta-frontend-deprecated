import { atom } from 'recoil';

export const userFinishedLoadingAtom = atom<boolean>({
  key: 'finishedLoading',
  default: false,
});

export const loadingAppAtom = atom<boolean>({
  key: 'loadingApp',
  default: true,
});
