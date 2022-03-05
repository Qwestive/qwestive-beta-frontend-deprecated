import React from 'react';
import { PlusIcon } from '@heroicons/react/solid';

import ClassNamesLogic from '../../../../common/components/Util/ClassNamesLogic';
import {
  Icommunity,
  IpostData,
  Icategories,
  TpostSorting,
} from '../../../../common/types';

type TpostDisplayList = {
  currentPostSorting: TpostSorting;
  setCurrentPostSorting: React.Dispatch<React.SetStateAction<TpostSorting>>;
};

const postSortingTypes = ['New', 'Top', 'Poll', 'Bounty'] as TpostSorting[];

export default function PostDisplayList({
  currentPostSorting,
  setCurrentPostSorting,
}: TpostDisplayList): JSX.Element {
  return (
    <div className="mt-5 px-3">
      {/* Filters */}
      <div className=" flex justify-between items-center">
        <div className="space-x-3 flex overflow-auto hideScrollBar">
          {postSortingTypes.map((sortinType) => (
            <button
              type="button"
              className={ClassNamesLogic(
                currentPostSorting === sortinType
                  ? ' bg-gray-900 text-white'
                  : 'bg-gray-300 text-color-primary hover:bg-gray-400',
                'rounded-3xl px-4 py-1 font-medium'
              )}
              onClick={() => setCurrentPostSorting(sortinType)}>
              {sortinType}
            </button>
          ))}
        </div>
        <div className="hidden sm:block">
          <button
            type="button"
            className="btn-filled rounded-3xl py-2.5"
            onClick={() => console.log('newpost')}>
            <p className="flex items-center gap-1 ">
              <PlusIcon className="h-5" /> Post
            </p>
          </button>
        </div>
      </div>
      <p>Post </p>
      <div className="block sm:hidden absolute bottom-10 right-5 z-40">
        <button
          type="button"
          className="btn-filled rounded-3xl py-2.5"
          onClick={() => console.log('newpost')}>
          <p className="flex items-center gap-1 ">
            <PlusIcon className="h-5" /> Post
          </p>
        </button>
      </div>
    </div>
  );
}
