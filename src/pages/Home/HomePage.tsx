import React from 'react';
import { useRecoilValue } from 'recoil';
import HomePageExternal from './HomePageExternal';
import HomePageInternal from './HomePageInternal';

import { userInfoAtom } from '../../services/recoil/userInfo';

function HomePage(): JSX.Element {
  const userPublicKey = useRecoilValue(userInfoAtom)?.publicKey;

  return userPublicKey !== undefined ? (
    <HomePageInternal />
  ) : (
    <HomePageExternal />
  );
}

export default HomePage;
