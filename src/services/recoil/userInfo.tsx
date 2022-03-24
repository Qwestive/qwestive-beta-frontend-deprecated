import { atom } from 'recoil';
import { IuserInfo } from 'types/types';

export const userInfoAtom = atom<IuserInfo | undefined>({
  key: 'userInfo',
  default: undefined,
});
