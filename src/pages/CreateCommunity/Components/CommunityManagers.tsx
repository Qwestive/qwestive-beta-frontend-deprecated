import React from 'react';
import { userInfoAtom } from 'services/recoil/userInfo';
import { useRecoilValue } from 'recoil';
import { TrashIcon } from '@heroicons/react/solid';
import { ICustomCommunity } from 'types/types';

type TcommunityManagers = {
  community: ICustomCommunity;
  setCommunity: React.Dispatch<React.SetStateAction<ICustomCommunity>>;
};

export default function CommunityManagers({
  community,
  setCommunity,
}: TcommunityManagers): JSX.Element {
  const userInfo = useRecoilValue(userInfoAtom);

  return (
    <div className="space-y-5">
      <h2 className="text-color-1 text-lg font-bold">Community managers</h2>
      <div>
        <div className="flex flex-row my-4">
          <p className="text-color-1 text-md px-3">{userInfo?.publicKey}</p>
        </div>
        {community.managers.map((mana, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx}>
            <div className="flex flex-row my-4">
              <input
                type="text"
                name="option"
                className="
        text-field-input shadow-md 
        block w-full max-w-md text-md px-3 rounded-xl"
                placeholder="Manager public key"
                maxLength={100}
                value={mana}
                onChange={(e) =>
                  setCommunity((prev) => {
                    const temp = prev.managers;
                    temp[idx] = e.target.value;
                    return { ...prev, managers: temp };
                  })
                }
              />
              <button
                type="button"
                className="text-color-1 hover:text-red-700 
                dark:hover:text-red-700"
                onClick={() => {
                  setCommunity((prev) => {
                    const temp = prev.managers.filter((item, id) => id !== idx);
                    return { ...prev, managers: temp };
                  });
                }}>
                <TrashIcon className="h-6 my-auto mx-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          className="button-neutral px-3 h-9"
          onClick={() => {
            setCommunity((prev) => ({
              ...prev,
              managers: [...prev.managers, ''],
            }));
          }}>
          + manager address
        </button>
      </div>
    </div>
  );
}
