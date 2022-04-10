import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/outline';
import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import { EcommunityType, TtokenCommunity, ICustomCommunity } from 'types/types';
import {
  getCommunitySymbol,
  getCommunityTokensOwnedQuantity,
} from 'types/TypesUtil';

type IownedTokenGrid = {
  ownedTokenCommunities: Array<TtokenCommunity>;
  customCommunities: ICustomCommunity[];
};

export default function OwnedTokenGrid({
  ownedTokenCommunities,
  customCommunities,
}: IownedTokenGrid): JSX.Element {
  return (
    <div className="max-w-3xl mx-auto py-5">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
        {ownedTokenCommunities.map((community) => (
          <Link to={`/c/${community.cid}`} key={community.cid}>
            <li className="col-span-1 card-active border-color-1">
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
                      className="text-color-1 text-lg 
                  font-medium truncate">
                      {community.name}
                    </h3>
                    <span
                      className={ClassNamesLogic(
                        community?.categories ?? false
                          ? 'text-green-800 bg-green-100'
                          : 'bg-pink-100 text-pink-800',
                        'flex-shrink-0 inline-block px-2 py-0.5' +
                          'text-xs font-medium  rounded-full'
                      )}>
                      {community?.categories ? 'Active' : 'New'}
                    </span>
                  </div>
                  <p className="mt-1 text-color-secondary text-sm truncate">
                    {getCommunitySymbol(community)}
                  </p>
                  <p className="mt-1 text-color-secondary text-sm truncate">
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
        {customCommunities.map((community) => (
          <Link to={`/c/${community.cid}`} key={community.cid}>
            <li className="col-span-1 card-active border-color-1 py-1.5">
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
                      className="text-color-1 text-lg 
                  font-medium truncate">
                      {community.name}
                    </h3>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
        <Link to="/new-community" key="new-community">
          <li className="col-span-1 card-active border-color-1 py-1.5">
            <div
              className="w-full flex items-center justify-between 
            p-6 space-x-6">
              <div
                className="h-16 w-16 rounded-full flex-shrink-0 
                border-color-1
              flex items-center justify-center">
                <PlusIcon
                  className="h-10 text-indigo-500 
                dark:text-indigo-400"
                />
              </div>
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3
                    className="text-indigo-500 
                    dark:text-indigo-400 text-lg 
                  font-medium truncate">
                    Add a new space
                  </h3>
                </div>
              </div>
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
}
