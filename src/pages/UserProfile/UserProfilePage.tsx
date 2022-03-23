import React from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfoAtom } from 'services/recoil/userInfo';
import SelfProfilePage from './SelfProfile/SelfProfilePage';
import OtherProfilePage from './OtherProfile/OtherProfilePage';

/*
Checking if the asked user page match the currently
logged in user, display user page accordingly
*/
export default function UserProfilePage(): JSX.Element {
  const userNameRecoil = useRecoilValue(userInfoAtom)?.userName;
  const { userName } = useParams<'userName'>();

  return userName === userNameRecoil ? (
    <SelfProfilePage />
  ) : (
    <OtherProfilePage userName={userName} />
  );
}
