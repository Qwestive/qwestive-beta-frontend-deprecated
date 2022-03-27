import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import HomePageExternal from './HomePageExternal/HomePageExternal';
import HomePageInternal from './HomePageInternal/HomePageInternal';

import { userInfoAtom } from '../../services/recoil/userInfo';

function HomePage(): JSX.Element {
  const userPublicKey = useRecoilValue(userInfoAtom)?.publicKey;
  const [showInternalView, setShowInternalView] = useState(false);

  useEffect(() => {
    setShowInternalView(userPublicKey !== undefined);
  }, [userPublicKey]);

  return showInternalView ? <HomePageInternal /> : <HomePageExternal />;
}

export default HomePage;
