import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  UpVote,
  DownVote,
} from '../../../../common/services/Firebase/WriteData/WriteVote';
import { userPublicKeyAtom } from '../../../../recoil/userInfo';
import ClassNamesLogic from '../../../../common/components/Util/ClassNamesLogic';

type PostActionsSectioData = {
  postId: string | undefined;
  upVotes: Array<string> | undefined;
  downVotes: Array<string> | undefined;
  numComments: number | undefined;
  authorPublicKey: string | undefined;
  authorUserName: string | undefined;
  tipCallback: (arg0: string, arg1: string) => void;
};

/// Component which allows upvoting/downvoting/tipping a post and viwing data
/// about a post.
///
/// TODO:
/// - Add styling and logic to handle up/downvote.
/// - Add logic to send tip
function PostActionsSection({
  postId,
  upVotes,
  downVotes,
  numComments,
  authorPublicKey,
  authorUserName,
  tipCallback,
}: PostActionsSectioData): JSX.Element {
  const [didDownVote, setDidDownVote] = useState(false);
  const [didUpVote, setDidUpVote] = useState(false);
  const userPublicKeyFiller = '_';
  const userPublicKey =
    useRecoilValue(userPublicKeyAtom) ?? userPublicKeyFiller;
  const [voteCount, setVoteCount] = useState(0);

  const handleSendTip = () => {
    const authorUserNameStr = authorUserName ?? '';
    const authorPublicKeyStr = authorPublicKey ?? '';
    if (authorPublicKeyStr === '' || authorUserNameStr === '') {
      throw new Error('Invalid author public key or author username');
    }
    tipCallback(authorPublicKeyStr, authorUserNameStr);
  };

  const handleUpvote = () => {
    if (!didUpVote && userPublicKey !== userPublicKeyFiller) {
      UpVote(postId ?? '');
      // TODO: if voting fails, these values should not be updated.
      setDidUpVote(true);
      setDidDownVote(false);
      setVoteCount(voteCount + 1);
    }
  };

  const handleDownVote = () => {
    if (!didDownVote && userPublicKey !== userPublicKeyFiller) {
      DownVote(postId ?? '');
      // TODO: if voting fails, these values should not be updated.
      setDidDownVote(true);
      setDidUpVote(false);
      downVotes?.push(userPublicKey);
      setVoteCount(voteCount - 1);
    }
  };

  useEffect(() => {
    // TODO: instead of user public key, this should find the user ID.
    // But since currently they are the same, it is ok to look for public
    // key for now. However, this should be addressed.
    setDidUpVote(upVotes?.includes(userPublicKey) ?? false);
    setDidDownVote(downVotes?.includes(userPublicKey) ?? false);
    setVoteCount((upVotes?.length ?? 0) - (downVotes?.length ?? 0));
  }, [postId]);

  return (
    <div
      className="flex flex-row content-center justify-around
      text-sm text-color-secondary my-4">
      <div className="flex mr-6">
        <button
          className={ClassNamesLogic(
            didUpVote
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
        <div className="mx-1 my-auto">{voteCount}</div>
        <button
          className={ClassNamesLogic(
            didDownVote
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
        onClick={handleSendTip}>
        Send a tip
      </button>
      <div className="mx-1 my-auto">{numComments} comments</div>
    </div>
  );
}

export default PostActionsSection;
