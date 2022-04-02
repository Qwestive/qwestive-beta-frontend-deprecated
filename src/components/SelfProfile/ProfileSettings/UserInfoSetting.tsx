import React, { SetStateAction, Dispatch } from 'react';
import { useRecoilValue } from 'recoil';

import { userInfoAtom } from 'services/recoil/userInfo';

import CoverImageSetting from './UserInfoSetting/CoverImageSetting';
import ProfileImageSetting from './UserInfoSetting/ProfileImageSetting';
import UserInfoForm from './UserInfoSetting/UserInfoForm';

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
  const userInfo = useRecoilValue(userInfoAtom);
  return (
    <div className="max-w-5xl mx-auto">
      <CoverImageSetting />
      <ProfileImageSetting />
      <div className="mt-2 flex items-center gap-2">
        <p className="text-color-0 truncate">@{userInfo?.userName}</p>
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
