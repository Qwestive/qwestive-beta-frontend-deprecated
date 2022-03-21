import React from 'react';
import { useRecoilValue } from 'recoil';

import { userPublicKeyAtom } from '../../services/recoil/userInfo';
import SigninPrompt from './SigninPrompt';

type TonlyAuthRoute = {
  element: JSX.Element;
};

export default function OnlyAuthRoute({
  element,
}: TonlyAuthRoute): JSX.Element {
  // The auth manager ensure that userPublicKeyAtom represent auth state
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  return userPublicKey !== undefined ? element : <SigninPrompt />;
}
