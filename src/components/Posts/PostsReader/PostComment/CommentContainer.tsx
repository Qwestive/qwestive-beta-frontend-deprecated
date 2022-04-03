import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';

import { userInfoAtom } from 'services/recoil/userInfo';
import { IpostComment, IpostCommentSubmission } from 'types/types';
import WriteComment from 'services/Firebase/WriteData/WriteComment';
import {
  UpVoteComment,
  DownVoteComment,
} from 'services/Firebase/WriteData/WriteCommentVote';
import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import CommentInputContainer from './CommentInputContainer';

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
  const userIdFiller = '_';
  const userId = useRecoilValue(userInfoAtom)?.uid ?? userIdFiller;

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

  const addUpVote = () => setUpVotes(new Set(upVotes).add(userId));

  const addDownVote = () => setDownVotes(new Set(downVotes).add(userId));

  const removeDownVote = () => {
    setDownVotes((votes) => {
      const downVotesUpdate = new Set(votes);

      downVotesUpdate.delete(userId);

      return downVotesUpdate;
    });
  };

  const removeUpVote = () => {
    setUpVotes((votes) => {
      const upVotesUpdate = new Set(votes);

      upVotesUpdate.delete(userId);

      return upVotesUpdate;
    });
  };

  const handleUpvote = async () => {
    if (!upVotes.has(userId) && userId !== userIdFiller) {
      const didDownVote = downVotes.has(userId);
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
    if (!downVotes.has(userId) && userId !== userIdFiller) {
      const didUpVote = upVotes.has(userId);
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
    <div>
      <div className="mt-5 p-4 card">
        <div className="flex justify-start">
          <img
            className="h-6 w-6 rounded-full"
            src={commentNode.comment.authorProfileImageUrl}
            alt=""
          />
          <div className="text-xs text-color-secondary mx-2 my-auto">
            {commentNode.comment.authorUserName}
          </div>
        </div>
        <div className="pl-4">
          <div className="text-sm my-2 whitespace-pre-wrap ">
            {commentNode.comment.body}
          </div>
          <div className="flex text-xs text-color-secondary">
            <div className="flex mr-6">
              <button
                className={ClassNamesLogic(
                  upVotes.has(userId)
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
                  downVotes.has(userId)
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
        </div>
      </div>
      <div
        className="mx-2 pl-6 border-solid border-l-8 border-qwestive-purple-1
         rounded-sm hover:border-qwestive-purple">
        {childComments.map((item) => (
          <div key={item.comment.id}>
            <CommentContainer commentNode={item} tipCallback={tipCallback} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentContainer;
