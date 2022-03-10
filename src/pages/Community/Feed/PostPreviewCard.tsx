import React from 'react';
import { Link } from 'react-router-dom';

import { timeSince } from '../../../common/functions/TimeFunctions';
import { IpostPreview } from '../../../common/types';

type TpostPreviewCard = {
  post: IpostPreview;
};

export default function PostPreviewCard({
  post,
}: TpostPreviewCard): JSX.Element {
  return (
    <Link
      to={`/post/${post.id}`}
      className="p-5 bg-white hover:bg-gray-50 flex 
        justify-between items-center w-full">
      {/* Preview */}
      <div className="overflow-hidden">
        <p className="text-xl font-bold truncate">{post.title}</p>
        <div className="flex gap-5 mt-2 items-center   ">
          <p
            className="bg-gray-300 px-1.5 py-px rounded-md truncate
          ">
            {post.category}
          </p>
          <p className="text-gray-500 truncate ">
            {timeSince(post.creationDate)} ago
          </p>
        </div>
      </div>
      {/* Stats */}
      <div className="w-24 grid grid-cols-2 text-center">
        <p>{post.upVoteUserIds.length - post.downVoteUserIds.length}</p>
        <p>{post.numberOfComments}</p>
      </div>
    </Link>
  );
}
