import React, { useState } from 'react';
import { IpostComment } from '../../../../common/types';

type Comment = {
  comment: IpostComment;
  childComments: Array<Comment>;
};

type CommentContainerProps = {
  commentNode: Comment;
};

function CommentContainer({ commentNode }: CommentContainerProps): JSX.Element {
  const [voteCount, setVoteCount] = useState(0);

  const handleComment = () => {
    console.log('Comment');
  };

  const handleSendTip = () => {
    console.log('Send Tip');
  };

  const handleUpvote = () => {
    console.log('Upvote');
  };

  const handleDownVote = () => {
    console.log('Downvote');
  };

  return (
    <div className="mt-5">
      <div className="flex justify-start content-center">
        <img
          className="-ml-3 h-6 w-6 rounded-full"
          src={commentNode.comment.authorProfileImageUrl}
          alt=""
        />
        <div className="text-xs text-color-secondary mx-4">
          {commentNode.comment.authorPublicKey}
        </div>
      </div>
      <div className="border-solid border-l-2 border-gray-300 pl-4">
        <div className="text-sm my-2">{commentNode.comment.body}</div>
        <div className="flex text-xs text-color-secondary">
          <div className="flex mr-6">
            <button
              className="hover:text-qwestive-purple-hover"
              type="button"
              onClick={handleUpvote}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <div className="mx-1">{voteCount}</div>
            <button
              className="hover:text-qwestive-purple-hover"
              type="button"
              onClick={handleDownVote}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <button
            className="mx-6 hover:text-qwestive-purple-hover"
            type="button"
            onClick={handleComment}>
            Comment
          </button>
          <button
            className="mx-6 hover:text-qwestive-purple-hover"
            type="button"
            onClick={handleSendTip}>
            Send a tip
          </button>
        </div>
        <div>
          {(commentNode.childComments ?? []).map((item) => (
            <div key={item.comment.id}>
              <CommentContainer commentNode={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
