import React from 'react';
import { useRecoilValue } from 'recoil';
import HomePageExternal from './HomePageExternal';
import HomePageInternal from './HomePageInternal';

import { userPublicKeyAtom } from '../../services/recoil/userInfo';

function HomePage(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  return userPublicKey ? <HomePageInternal /> : <HomePageExternal />;
}

export default HomePage;
