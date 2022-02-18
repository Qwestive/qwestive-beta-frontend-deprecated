import React from 'react';

import ClassNamesLogic from '../../../common/components/Util/ClassNamesLogic';

import { ItokenOwnedList } from '../../../common/types';

export default function OwnedTokenGrid({
  tokenOwnedList,
}: ItokenOwnedList): JSX.Element {
  return (
    <div className="mt-5">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
        {tokenOwnedList.map((token) => (
          <li
            key={token.name}
            className="col-span-1 bg-white rounded-lg shadow 
            divide-y divide-gray-200">
            <div
              className="w-full flex items-center justify-between 
            p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 text-lg font-medium truncate">
                    {token.name}
                  </h3>
                  <span
                    className={ClassNamesLogic(
                      token.memberCount === 0
                        ? 'bg-pink-100 text-pink-800'
                        : ' text-green-800 bg-green-100',
                      'flex-shrink-0 inline-block px-2 py-0.5' +
                        'text-xs font-medium  rounded-full'
                    )}>
                    {token.memberCount === 0 ? 'New' : 'Active'}
                  </span>
                </div>
                <p className=" text-gray-900 text-base truncate">
                  {token.memberCount} Members
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
        ))}
      </ul>
    </div>
  );
}
