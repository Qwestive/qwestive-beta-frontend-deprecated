import React, { useState } from 'react';
import { PostComment } from './Types';
import upArrow from '../../../../assets/upArrow.svg';
import downArrow from '../../../../assets/downArrow.svg';

type Comment = {
  comment: PostComment;
};

function CommentContainer({ comment }: Comment): JSX.Element {
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
    <div className="mt-5 border-solid pl-4 border-l-2 border-gray-300">
      <div className="text-xs text-color-secondary">
        {comment.authorPublicKey}
      </div>
      <div className="text-sm my-2">{comment.body}</div>
      <div className="flex text-xs text-color-secondary">
        <div className="flex justify-around mr-6">
          <button type="button" onClick={handleUpvote}>
            <img
              className="w-4 mx-1 hover:text-qwestive-purple-hover"
              src={upArrow}
              alt=""
            />
          </button>
          <div>{voteCount}</div>
          <button type="button" onClick={handleDownVote}>
            <img
              className="w-4 mx-1 hover:text-qwestive-purple-hover"
              src={downArrow}
              alt=""
            />
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
        {(comment?.comments ?? []).map((item) => (
          <div key={item.id}>
            <CommentContainer comment={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentContainer;
