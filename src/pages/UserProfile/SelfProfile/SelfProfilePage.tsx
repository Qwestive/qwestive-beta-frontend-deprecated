import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import SignoutWithWallet from '../../../common/services/Firebase/Authentication/SignoutWithWallet';
import {
  userPublicKeyAtom,
  userNameAtom,
  userDisplayNameAtom,
  userProfileImageAtom,
  userCoverImageAtom,
} from '../../../recoil/userInfo';

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

  const { disconnect, connected } = useWallet();

  async function disconnectAll() {
    try {
      await SignoutWithWallet({ disconnect, connected });
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      toast.error(`Failed to signout: ${error?.message}`);
    }
  }

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
            className="h-24 w-24 rounded-full ring-4 ring-gray-100"
            src={userProfileImage}
            alt=""
          />
        </div>
        <div className="space-y-2 px-2">
          <p className="text-2xl font-bold text-color-primary truncate">
            {userDisplayName}
          </p>
          <p className="text-color-secondary truncate">@{userName}</p>
          <p className="text-sm text-color-secondary truncate">
            {userPublicKey}
          </p>
        </div>
      </div>
      <div className="flex gap-3 mt-5 px-5">
        <Link to="/profile/settings">
          <button type="button" className="btn-filled rounded-3xl w-28">
            Settings
          </button>
        </Link>
        <button
          type="button"
          className="btn-transparent bg-white w-28 rounded-3xl"
          onClick={disconnectAll}>
          Signout
        </button>
      </div>
    </div>
  );
}
