import React from 'react';
import { Link } from 'react-router-dom';

import { timeSince } from '../../../common/functions/TimeFunctions';
import { IpostPreview } from '../../../common/types';
import PostVoteButtons from './PostVoteButtons';

type TpostPreviewCard = {
  post: IpostPreview;
};

export default function PostPreviewCard({
  post,
}: TpostPreviewCard): JSX.Element {
  return (
    <div
      className="p-5 bg-white hover:bg-gray-50 flex flex-row w-full
      rounded-xl">
      <PostVoteButtons
        postId={post.id}
        upVotes={post.upVoteUserIds}
        downVotes={post.downVoteUserIds}
      />
      <Link
        to={`/post/${post.id}`}
        className="flex flex-row w-full justify-between my-auto">
        {/* Preview */}
        <div className="overflow-hidden">
          <div className="flex">
            <p className="text-xl font-bold truncate">{post.title}</p>
            <p className="text-gray-500 truncate mx-10 my-auto">
              {timeSince(post.creationDate)} ago
            </p>
          </div>
          {post.category && (
            <div className="flex gap-5 mt-2 items-center">
              <p
                className="bg-qwestive-light-blue px-2 rounded-md truncate
                my-auto">
                {post.category}
              </p>
            </div>
          )}
        </div>
        {/* Stats */}
        <div className="w-24 grid grid-cols-2 text-center">
          <p>{post.numberOfComments}</p>
        </div>
      </Link>
    </div>
  );
}
