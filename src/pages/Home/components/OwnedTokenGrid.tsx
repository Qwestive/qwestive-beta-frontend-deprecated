import React from 'react';
import { Link } from 'react-router-dom';

import ClassNamesLogic from '../../../common/components/Util/ClassNamesLogic';

import { ItokenOwned } from '../../../common/types';

type ItokenOwnedList = {
  tokenOwnedList: ItokenOwned[];
};

export default function OwnedTokenGrid({
  tokenOwnedList,
}: ItokenOwnedList): JSX.Element {
  return (
    <div className="mt-5">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
        {tokenOwnedList.map((token) => (
          <Link to={`/c/${token.mint}`} key={token.mint}>
            <li
              className="col-span-1 
            bg-white hover:bg-gray-50
            rounded-lg shadow 
            divide-y divide-gray-200">
              <div
                className="w-full flex items-center justify-between 
            p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3
                      className="text-color-primary text-lg 
                  font-medium truncate">
                      {token.name}
                    </h3>
                    <span
                      className={ClassNamesLogic(
                        token.communityData
                          ? 'bg-pink-100 text-pink-800'
                          : ' text-green-800 bg-green-100',
                        'flex-shrink-0 inline-block px-2 py-0.5' +
                          'text-xs font-medium  rounded-full'
                      )}>
                      {token.communityData ? 'New' : 'Active'}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {token.mint}
                  </p>
                  <p className=" mt-2 text-color-primary text-base truncate">
                    {token.communityData?.memberCount ?? 0} Members
                  </p>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    You have {token.amountHeld} {token.name}
                  </p>
                </div>
                <img
                  className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"
                  src={token.imageUrl}
                  alt=""
                />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
