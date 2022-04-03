import React from 'react';
import { Link } from 'react-router-dom';

import { timeSince } from 'functions/TimeFunctions';
import { IpostPreview } from 'types/types';
import PostVoteButtons from './PostVoteButtons';

type TpostPreviewCard = {
  post: IpostPreview;
};

export default function PostPreviewCard({
  post,
}: TpostPreviewCard): JSX.Element {
  return (
    <div className="p-5 w-full flex flex-row card-active">
      <PostVoteButtons
        postId={post.id}
        upVotes={post.upVoteUserIds}
        downVotes={post.downVoteUserIds}
      />
      <Link
        to={`/c/${post.accessId}?post=${post.id}`}
        className="flex flex-row w-full my-auto">
        {/* Preview */}
        <div className="flex flex-col w-10/12">
          <div className="px-2">
            <span className="text-lg md:text-xl font-bold text-clip mr-2">
              {post.title}
            </span>{' '}
            <span className="text-gray-500 text-xs whitespace-nowrap">
              {timeSince(post.creationDate)} ago
            </span>
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
        <div className="text-center justify-self-end">
          <p>{post.numberOfComments}</p>
        </div>
      </Link>
    </div>
  );
}
