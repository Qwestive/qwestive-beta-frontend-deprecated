import React from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { userNameAtom } from '../../recoil/userInfo';
import SelfProfilePage from './SelfProfile/SelfProfilePage';
import OtherProfilePage from './OtherProfile/OtherProfilePage';

/*
Checking if the asked user page match the currently
logged in user, display user page accordingly
*/
export default function UserProfilePage(): JSX.Element {
  const [userNameRecoil] = useRecoilState(userNameAtom);
  const { userName } = useParams<'userName'>();

  return userName === userNameRecoil ? (
    <SelfProfilePage />
  ) : (
    <OtherProfilePage userName={userName} />
  );
}
