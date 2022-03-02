import React from 'react';
import { PostComment } from './Types';
import CommentContainer from './CommentContainer';
import CommentInputContainer from './CommentInputContainer';

type PostComments = {
  comments: Array<PostComment>;
};

function CommentSection({ comments }: PostComments): JSX.Element {
  return (
    <div>
      <CommentInputContainer />
      {comments.map((item) => (
        <div key={item.id}>
          <CommentContainer comment={item} />
        </div>
      ))}
      <button
        type="button"
        className="mt-2 ml-1 text-xs hover:text-qwestive-purple-hover">
        10 more replies
      </button>
    </div>
  );
}

export default CommentSection;
