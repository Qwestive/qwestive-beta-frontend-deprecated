import React, { SetStateAction, Dispatch } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import CoverImageSetting from './UserInfoSetting/CoverImageSetting';
import ProfileImageSetting from './UserInfoSetting/ProfileImageSetting';
import UserInfoForm from './UserInfoSetting/UserInfoForm';

import { userNameAtom } from '../../../../recoil/userInfo';

type TsetUserNameEditing = {
  setIsEditingUserName: Dispatch<SetStateAction<boolean>>;
};

/*
Main page holding the user settings
TODO:
- style
*/

export default function UserInfoSetting({
  setIsEditingUserName,
}: TsetUserNameEditing): JSX.Element {
  const userName = useRecoilValue(userNameAtom);
  return (
    <div>
      <button type="button" className="btn-filled">
        <Link to={`/user/${userName}`}>Back</Link>
      </button>
      <CoverImageSetting />
      <ProfileImageSetting />
      <div className="mt-2 flex items-center gap-2">
        <p className="text-color-primary">@{userName}</p>
        <button
          type="button"
          className="btn-filled"
          onClick={() => setIsEditingUserName(true)}>
          Edit Username
        </button>
      </div>
      <UserInfoForm />
    </div>
  );
}
