import React, { SetStateAction, Dispatch } from 'react';
import { useRecoilValue } from 'recoil';

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
    <div className="max-w-5xl">
      <CoverImageSetting />
      <ProfileImageSetting />
      <div className="mt-2 flex items-center gap-2">
        <p className="text-color-primary">@{userName}</p>
        <button
          type="button"
          className="btn-filled rounded-3xl"
          onClick={() => setIsEditingUserName(true)}>
          Edit username
        </button>
      </div>
      <UserInfoForm />
    </div>
  );
}
