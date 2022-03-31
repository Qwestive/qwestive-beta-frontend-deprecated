import { atom } from 'recoil';
import { TloggingState } from 'types/types';

export const userFinishedLoadingAtom = atom<boolean>({
  key: 'finishedLoading',
  default: false,
});

export const loadingAppAtom = atom<boolean>({
  key: 'loadingApp',
  default: true,
});

export const loggingStateAtom = atom<TloggingState>({
  key: 'loggingState',
  default: '',
});
