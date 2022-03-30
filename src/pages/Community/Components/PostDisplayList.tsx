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
  postBatchList: Array<IpostPreview[]>;
  hasMorePost: boolean;
  postsLoading: boolean;
  getPostBatch: () => Promise<void>;
};

const postSortingTypes = ['New', 'Top', 'Poll', 'Bounty'] as TpostSorting[];

export default function PostDisplayList({
  currentPostSorting,
  setCurrentPostSorting,
  communityId,
  postBatchList,
  hasMorePost,
  postsLoading,
  getPostBatch,
}: TpostDisplayList): JSX.Element {
  return (
    <div className="w-full">
      <div className="w-full">
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
                <div className="flex items-center gap-1 -ml-1 ">
                  <PlusIcon className="h-5" /> Post
                </div>
              </button>
            </Link>
          </div>
        </div>
        {/* Post List */}
        <div className="mt-5 p-2 space-y-2">
          {postsLoading && postBatchList.length === 0 ? (
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
                <div className="grid grid-cols-2 text-center">
                  <p className="text-sm">Replies</p>
                </div>
              </div>
              {postBatchList.length !== 0 && (
                <div className="space-y-3">
                  {postBatchList.map(
                    (postList) =>
                      postList.length !== 0 && (
                        <div key={postList[0].id} className="my-3 space-y-3">
                          {postList?.map((post) => (
                            <div key={post.id}>
                              <PostPreviewCard post={post} />
                            </div>
                          ))}
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          )}
          {/* Load More Posts Button */}
          {hasMorePost && (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                className="btn-filled"
                onClick={getPostBatch}
                disabled={postsLoading}>
                {postsLoading ? (
                  <div
                    className="text-color-primary gap-2 items-baseline 
             flex justify-center mt-10">
                    <div className="text-center">Loading</div>
                    <LoadingDots classNameExtend="h-1 w-1" />
                  </div>
                ) : (
                  <p>Load More Posts</p>
                )}
              </button>
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
