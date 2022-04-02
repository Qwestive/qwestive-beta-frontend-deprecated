import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { userInfoAtom } from 'services/recoil/userInfo';
import SignoutWithWallet from 'services/Firebase/Authentication/SignoutWithWallet';

/*
TODO:
- style everything
*/

export default function SelfProfilePage(): JSX.Element {
  const userInfo = useRecoilValue(userInfoAtom);

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
    <div className="page-frame">
      <div>
        <img
          className="h-32 w-full mx-auto object-cover lg:h-48"
          src={userInfo?.coverImage}
          alt=""
        />
      </div>
      <div className=" -mt-12 mx-auto px-4">
        <div className="flex">
          <img
            className="h-24 w-24 rounded-full ring-4 ring-gray-100"
            src={userInfo?.profileImage}
            alt=""
          />
        </div>
        <div className="space-y-2 px-2">
          <p className="text-2xl font-bold text-color-primary truncate">
            {userInfo?.displayName}
          </p>
          <p className="text-color-secondary truncate">@{userInfo?.userName}</p>
          <p className="text-sm text-color-secondary truncate">
            {userInfo?.publicKey}
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
