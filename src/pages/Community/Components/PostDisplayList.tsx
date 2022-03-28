import React from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import { IpostPreview, TpostSorting } from 'types/types';
import LoadingDots from 'components/Util/LoadingDots';
import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import PostPreviewCard from '../../../components/Posts/PostsReader/PostFeed/PostPreviewCard';

type TpostDisplayList = {
  currentPostSorting: TpostSorting;
  setCurrentPostSorting: React.Dispatch<React.SetStateAction<TpostSorting>>;
  communityId: string | undefined;
  postList: IpostPreview[] | undefined;
  postsLoading: boolean;
};

const postSortingTypes = ['New', 'Top', 'Poll', 'Bounty'] as TpostSorting[];

export default function PostDisplayList({
  currentPostSorting,
  setCurrentPostSorting,
  communityId,
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
                key={sortingType}
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
            <Link to={`/c/${communityId}?post=new-post`}>
              <button type="button" className="btn-filled rounded-3xl py-2.5">
                <div className="flex items-center gap-1 ">
                  <PlusIcon className="h-5" /> Post
                </div>
              </button>
            </Link>
          </div>
        </div>
        {/* Post List */}
        <div className="mt-5 p-2 space-y-2">
          {postsLoading ? (
            <div>
              <div
                className="text-color-primary gap-2 items-baseline 
             flex justify-center mt-10">
                <div className="text-center text-2xl font-semibold ">
                  Loading
                </div>
                <LoadingDots classNameExtend="h-2 w-2" />
              </div>
            </div>
          ) : (
            <div>
              <div className="p-3 flex justify-between">
                <p className="text-sm">Posts</p>
                <div className=" w-24 grid grid-cols-2 text-center">
                  <p className="text-sm">Replies</p>
                </div>
              </div>
              <div className="space-y-3">
                {postList?.map((post) => (
                  <div key={post.creationDate}>
                    <PostPreviewCard post={post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Small screen post button */}
        <div className="block sm:hidden absolute bottom-10 right-5 z-10">
          <Link to={`/c/${communityId}?post=new-post`}>
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
