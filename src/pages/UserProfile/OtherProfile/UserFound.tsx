import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';

import defaultUserProfileImage from '../../../assets/defaultUserProfileImage.png';

/*
TODO:
- Populate
*/
export default function UserFound({ userData }: DocumentData): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto">
      <div>
        <img
          className="h-32 w-full mx-auto object-cover lg:h-48"
          src={userData.coverImage ?? ''}
          alt=""
        />
      </div>
      <div className=" -mt-12 mx-auto px-4">
        <div className="flex">
          <img
            className="h-24 w-24 rounded-full ring-4 ring-gray-100"
            src={userData.profileImage ?? defaultUserProfileImage}
            alt=""
          />
        </div>
        <div className="space-y-2 px-2">
          <p className="text-2xl font-bold text-color-primary truncate">
            {userData.displayName ?? ''}
          </p>
          <p className="text-color-secondary truncate">
            @{userData.userName ?? ''}
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto text-center mt-10 ">
        <div className="mt-5">
          <Link to="/">
            <button type="button" className="btn-filled">
              Navigate Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
