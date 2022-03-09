import React from 'react';
import { PlusIcon } from '@heroicons/react/solid';

import { Link } from 'react-router-dom';
import PostPreviewCard from './PostPreviewCard';
import ClassNamesLogic from '../../../common/components/Util/ClassNamesLogic';
import { Icommunity, IpostData, TpostSorting } from '../../../common/types';

type TpostDisplayList = {
  currentPostSorting: TpostSorting;
  setCurrentPostSorting: React.Dispatch<React.SetStateAction<TpostSorting>>;
  communityInfo: Icommunity | undefined;
  postList: IpostData[] | undefined;
  postsLoading: boolean;
};

const postSortingTypes = ['New', 'Top', 'Poll', 'Bounty'] as TpostSorting[];

export default function PostDisplayList({
  currentPostSorting,
  setCurrentPostSorting,
  communityInfo,
  postList,
  postsLoading,
}: TpostDisplayList): JSX.Element {
  return (
    <div>
      <div className="mt-5 px-3">
        {/* Filters buttons */}
        <div className="flex justify-between items-center">
          <div className="space-x-3 flex overflow-auto hideScrollBar">
            {postSortingTypes.map((sortingType) => (
              <button
                type="button"
                className={ClassNamesLogic(
                  currentPostSorting === sortingType
                    ? ' bg-gray-900 text-white'
                    : 'bg-gray-300 text-color-primary hover:bg-gray-400',
                  'rounded-3xl px-4 py-1 font-medium'
                )}
                onClick={() => setCurrentPostSorting(sortingType)}>
                {sortingType}
              </button>
            ))}
          </div>
          {/* Large screen post button */}
          <div className="hidden sm:block">
            <Link to={`/new-post/${communityInfo?.cId}`}>
              <button type="button" className="btn-filled rounded-3xl py-2.5">
                <div className="flex items-center gap-1 ">
                  <PlusIcon className="h-5" /> Post
                </div>
              </button>
            </Link>
          </div>
        </div>
        {/* Post List */}
        <div>
          {postsLoading ? (
            <p>Loading</p>
          ) : (
            postList?.map((post) => <PostPreviewCard post={post} />)
          )}
        </div>
        {/* Small screen post button */}
        <div className="block sm:hidden absolute bottom-10 right-5 z-10">
          <Link to={`/new-post/${communityInfo?.cId}`}>
            <button type="button" className="btn-filled rounded-3xl py-2.5">
              <div className="flex items-center gap-1 ">
                <PlusIcon className="h-5" /> Post
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
