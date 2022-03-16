import React, { useState, useEffect } from 'react';
import { IpostComment, IpostCommentSubmission } from '../../../../common/types';
import CommentInputContainer from './CommentInputContainer';
import WriteComment from '../../../../common/services/Firebase/WriteData/WriteComment';

type Comment = {
  comment: IpostComment;
  childComments: Array<Comment>;
};

type CommentContainerProps = {
  commentNode: Comment;
  tipCallback: (arg0: string, arg1: string) => void;
};

/// Component which displays a single comment.
///
/// TODO: add logic to interact with a comment: add sub-comment, send tip,
/// up/downvote.
function CommentContainer({
  commentNode,
  tipCallback,
}: CommentContainerProps): JSX.Element {
  const [downVotes] = useState(commentNode?.comment?.upVoteUserIds ?? []);
  const [upVotes] = useState(commentNode?.comment?.downVoteUserIds ?? []);
  const [childComments, setChildComments] = useState<Array<Comment>>([]);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);

  async function handleAddSubComment(
    comment: IpostCommentSubmission
  ): Promise<void> {
    const id = await WriteComment(comment);
    const newComment = {
      comment: {
        id,
        ...comment,
      },
      childComments: [],
    };
    setChildComments([newComment, ...childComments]);
    setShowCommentInput(false);
  }

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleSendTip = () => {
    const authorUserNameStr = commentNode.comment.authorUserName ?? '';
    const authorPublicKeyStr = commentNode.comment.authorPublicKey ?? '';
    if (authorPublicKeyStr === '' || authorUserNameStr === '') {
      throw new Error('Invalid author public key or author username');
    }
    tipCallback(authorPublicKeyStr, authorUserNameStr);
  };

  const handleUpvote = () => {
    // TODO: add logic
  };

  const handleDownVote = () => {
    // TODO: add logic
  };

  useEffect(() => {
    setChildComments(commentNode?.childComments ?? []);
  }, []);

  return (
    <div className="mt-5">
      <div className="flex justify-start">
        <img
          className="-ml-3 h-6 w-6 rounded-full"
          src={commentNode.comment.authorProfileImageUrl}
          alt=""
        />
        <div className="text-xs text-color-secondary mx-2 my-auto">
          {commentNode.comment.authorUserName}
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
            <div className="mx-1">{upVotes.length - downVotes.length}</div>
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
            onClick={() => handleComment()}>
            {showCommentInput ? 'Cancel' : 'Comment'}
          </button>
          <button
            className="mx-6 hover:text-qwestive-purple-hover"
            type="button"
            onClick={handleSendTip}>
            Send a tip
          </button>
        </div>
        {showCommentInput && (
          <CommentInputContainer
            postId={commentNode.comment.postId}
            depth={commentNode.comment.depth + 1}
            parentCommentId={commentNode.comment.id}
            addComment={(comment) => handleAddSubComment(comment)}
          />
        )}
        <div>
          {childComments.map((item) => (
            <div key={item.comment.id}>
              <CommentContainer commentNode={item} tipCallback={tipCallback} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
