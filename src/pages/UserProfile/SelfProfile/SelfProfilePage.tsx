import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  userPublicKeyAtom,
  userNameAtom,
  userDisplayNameAtom,
  userProfileImageAtom,
  userCoverImageAtom,
} from '../../../recoil/userInfo';

import SignoutButton from '../../../common/components/SelfProfile/SignoutButton';

/*
TODO:
- style everything
*/

export default function SelfProfilePage(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userName = useRecoilValue(userNameAtom);
  const userDisplayName = useRecoilValue(userDisplayNameAtom);
  const userProfileImage = useRecoilValue(userProfileImageAtom);
  const userCoverImage = useRecoilValue(userCoverImageAtom);

  return (
    <div className="max-w-5xl mx-auto">
      <div>
        <img
          className="h-32 w-full mx-auto object-cover lg:h-48"
          src={userCoverImage}
          alt=""
        />
      </div>
      <div className=" -mt-12 mx-auto px-4">
        <div className="flex">
          <img
            className="h-24 w-24 rounded-full ring-4 ring-white"
            src={userProfileImage}
            alt=""
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {userDisplayName}
          </h1>
          <h3 className="text-slate-400 truncate">@{userName}</h3>
          <h3 className="text-sm text-slate-400 truncate">@{userPublicKey}</h3>
        </div>
      </div>
      <button type="button" className="btn-filled">
        <Link to="/profile/settings">SettingsPage</Link>
      </button>
      <SignoutButton />
    </div>
  );
}
