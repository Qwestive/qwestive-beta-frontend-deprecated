import { atom } from 'recoil';

export const userFinishedLoadingAtom = atom<boolean>({
  key: 'finishedLoading',
  default: false,
});
