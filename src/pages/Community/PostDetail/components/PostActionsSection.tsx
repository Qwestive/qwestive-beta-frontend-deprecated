import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import {
  UpVotePost,
  DownVotePost,
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

/// Component which allows upvoting/downvoting/tipping a post and viewing data
/// about a post.
function PostActionsSection({
  postId,
  upVotes,
  downVotes,
  numComments,
  authorPublicKey,
  authorUserName,
  tipCallback,
}: PostActionsSectioData): JSX.Element {
  const [upVoteSet, setUpVoteSet] = useState<Set<string>>(new Set());
  const [downVoteSet, setDownVoteSet] = useState<Set<string>>(new Set());
  const userPublicKeyFiller = '_';
  const userPublicKey =
    useRecoilValue(userPublicKeyAtom) ?? userPublicKeyFiller;

  const handleSendTip = () => {
    const authorUserNameStr = authorUserName ?? '';
    const authorPublicKeyStr = authorPublicKey ?? '';
    if (authorPublicKeyStr === '' || authorUserNameStr === '') {
      throw new Error('Invalid author public key or author username');
    }
    tipCallback(authorPublicKeyStr, authorUserNameStr);
  };

  const addUpVote = () => setUpVoteSet(new Set(upVotes).add(userPublicKey));

  const addDownVote = () =>
    setDownVoteSet(new Set(downVotes).add(userPublicKey));

  const removeDownVote = () => {
    setDownVoteSet((votes) => {
      const downVotesUpdate = new Set(votes);

      downVotesUpdate.delete(userPublicKey);

      return downVotesUpdate;
    });
  };

  const removeUpVote = () => {
    setUpVoteSet((votes) => {
      const upVotesUpdate = new Set(votes);

      upVotesUpdate.delete(userPublicKey);

      return upVotesUpdate;
    });
  };

  const handleUpvote = async () => {
    if (
      !upVoteSet.has(userPublicKey) &&
      userPublicKey !== userPublicKeyFiller
    ) {
      const didDownVote = downVoteSet.has(userPublicKey);
      removeDownVote();
      addUpVote();
      try {
        await UpVotePost(postId ?? '');
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
      !downVoteSet.has(userPublicKey) &&
      userPublicKey !== userPublicKeyFiller
    ) {
      const didUpVote = upVoteSet.has(userPublicKey);
      removeUpVote();
      addDownVote();
      try {
        await DownVotePost(postId ?? '');
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
    // TODO: instead of user public key, this should find the user ID.
    // But since currently they are the same, it is ok to look for public
    // key for now. However, this should be addressed.
    setUpVoteSet(new Set(upVotes ?? []));
    setDownVoteSet(new Set(downVotes ?? []));
  }, [postId]);

  return (
    <div
      className="flex flex-row content-center justify-around
      text-sm text-color-secondary my-4 border-t-2 border-top-gray-200 pt-3">
      <div className="flex mr-6">
        <button
          className={ClassNamesLogic(
            upVoteSet.has(userPublicKey)
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
        <div className="mx-1 my-auto">{upVoteSet.size - downVoteSet.size}</div>
        <button
          className={ClassNamesLogic(
            downVoteSet.has(userPublicKey)
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
