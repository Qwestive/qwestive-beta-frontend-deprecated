import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { IpostComment, IpostCommentSubmission } from '../../../../common/types';
import CommentInputContainer from './CommentInputContainer';
import WriteComment from '../../../../common/services/Firebase/WriteData/WriteComment';
import { userPublicKeyAtom } from '../../../../recoil/userInfo';
import {
  UpVoteComment,
  DownVoteComment,
} from '../../../../common/services/Firebase/WriteData/WriteCommentVote';
import ClassNamesLogic from '../../../../common/components/Util/ClassNamesLogic';

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
  const [downVotes, setDownVotes] = useState<Set<string>>(new Set());
  const [upVotes, setUpVotes] = useState<Set<string>>(new Set());
  const [childComments, setChildComments] = useState<Array<Comment>>([]);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const userPublicKeyFiller = '_';
  const userPublicKey =
    useRecoilValue(userPublicKeyAtom) ?? userPublicKeyFiller;

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

  const addUpVote = () => setUpVotes(new Set(upVotes).add(userPublicKey));

  const addDownVote = () => setDownVotes(new Set(downVotes).add(userPublicKey));

  const removeDownVote = () => {
    setDownVotes((votes) => {
      const downVotesUpdate = new Set(votes);

      downVotesUpdate.delete(userPublicKey);

      return downVotesUpdate;
    });
  };

  const removeUpVote = () => {
    setUpVotes((votes) => {
      const upVotesUpdate = new Set(votes);

      upVotesUpdate.delete(userPublicKey);

      return upVotesUpdate;
    });
  };

  const handleUpvote = async () => {
    if (!upVotes.has(userPublicKey) && userPublicKey !== userPublicKeyFiller) {
      const didDownVote = downVotes.has(userPublicKey);
      addUpVote();
      removeDownVote();
      try {
        await UpVoteComment(commentNode?.comment?.id ?? '');
      } catch (exception) {
        if (didDownVote) {
          addDownVote();
        }
        removeUpVote();
        toast.error('Failed to cast vote');
      }
    }
  };

  const handleDownVote = async () => {
    if (
      !downVotes.has(userPublicKey) &&
      userPublicKey !== userPublicKeyFiller
    ) {
      const didUpVote = upVotes.has(userPublicKey);
      addDownVote();
      removeUpVote();
      try {
        await DownVoteComment(commentNode?.comment?.id ?? '');
      } catch (exception) {
        if (didUpVote) {
          addUpVote();
        }
        removeDownVote();
        toast.error('Failed to cast vote');
      }
    }
  };

  useEffect(() => {
    setChildComments(commentNode?.childComments ?? []);
    setUpVotes(new Set(commentNode?.comment?.upVoteUserIds ?? []));
    setDownVotes(new Set(commentNode?.comment?.downVoteUserIds ?? []));
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
              className={ClassNamesLogic(
                upVotes.has(userPublicKey)
                  ? 'text-qwestive-purple-hover'
                  : 'hover:text-qwestive-purple-hover',
                'my-auto'
              )}
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
            <div className="mx-1">{upVotes.size - downVotes.size}</div>
            <button
              className={ClassNamesLogic(
                downVotes.has(userPublicKey)
                  ? 'text-qwestive-purple-hover'
                  : 'hover:text-qwestive-purple-hover',
                'my-auto'
              )}
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
