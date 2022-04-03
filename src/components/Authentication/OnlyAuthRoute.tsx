import LoginPage from 'pages/Common/LoginPage';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'services/recoil/userInfo';

type TonlyAuthRoute = {
  element: JSX.Element;
};

export default function OnlyAuthRoute({
  element,
}: TonlyAuthRoute): JSX.Element {
  // The auth manager ensure that userPublicKeyAtom represent auth state
  const userInfo = useRecoilValue(userInfoAtom);
  return userInfo !== undefined ? element : <LoginPage />;
}
