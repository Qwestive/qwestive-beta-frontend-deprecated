import React from 'react';
import { Link } from 'react-router-dom';

import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import { EcommunityType, TtokenCommunity } from 'types/types';
import {
  getCommunitySymbol,
  getCommunityTokensOwnedQuantity,
} from 'types/TypesUtil';

type IownedTokenGrid = {
  ownedTokenCommunities: Array<TtokenCommunity>;
};

export default function OwnedTokenGrid({
  ownedTokenCommunities,
}: IownedTokenGrid): JSX.Element {
  return (
    <div className="mt-5">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
        {ownedTokenCommunities.map((community) => (
          <Link to={`/c/${community.cid}`} key={community.cid}>
            <li
              className="col-span-1 
            bg-white hover:bg-gray-50
            rounded-lg shadow 
            divide-y divide-gray-200">
              <div
                className="w-full flex items-center justify-between 
            p-6 space-x-6">
                <img
                  className="h-16 w-16 rounded-full flex-shrink-0"
                  src={community.imageUrl}
                  alt=""
                />
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3
                      className="text-color-primary text-lg 
                  font-medium truncate">
                      {community.name}
                    </h3>
                    <span
                      className={ClassNamesLogic(
                        community?.communityData?.isActive ?? false
                          ? ' text-green-800 bg-green-100'
                          : 'bg-pink-100 text-pink-800',
                        'flex-shrink-0 inline-block px-2 py-0.5' +
                          'text-xs font-medium  rounded-full'
                      )}>
                      {community?.communityData?.isActive ? 'Active' : 'New'}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {getCommunitySymbol(community)}
                  </p>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    You have
                    {` ${getCommunityTokensOwnedQuantity(community)} ${
                      community.type === EcommunityType.fungible
                        ? 'tokens'
                        : 'NFTs.'
                    }`}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
