import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { userInfoAtom } from 'services/recoil/userInfo';
import {
  UpVotePost,
  DownVotePost,
} from 'services/Firebase/WriteData/WriteVote';
import ClassNamesLogic from '../../../Util/ClassNamesLogic';

type TpostVoteButtons = {
  postId: string | undefined;
  upVotes: Array<string> | undefined;
  downVotes: Array<string> | undefined;
};

/// Component which allows upvoting/downvoting/tipping a post and viewing data
/// about a post.
function PostVoteButtons({
  postId,
  upVotes,
  downVotes,
}: TpostVoteButtons): JSX.Element {
  const [upVoteSet, setUpVoteSet] = useState<Set<string>>(new Set());
  const [downVoteSet, setDownVoteSet] = useState<Set<string>>(new Set());
  const userIdFiller = '_';
  const userId = useRecoilValue(userInfoAtom)?.uid ?? userIdFiller;

  const addUpVote = () => setUpVoteSet(new Set(upVotes).add(userId));

  const addDownVote = () => setDownVoteSet(new Set(downVotes).add(userId));

  const removeDownVote = () => {
    setDownVoteSet((votes) => {
      const downVotesUpdate = new Set(votes);

      downVotesUpdate.delete(userId);

      return downVotesUpdate;
    });
  };

  const removeUpVote = () => {
    setUpVoteSet((votes) => {
      const upVotesUpdate = new Set(votes);

      upVotesUpdate.delete(userId);

      return upVotesUpdate;
    });
  };

  const handleUpvote = async () => {
    if (!upVoteSet.has(userId) && userId !== userIdFiller) {
      const didDownVote = downVoteSet.has(userId);
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
    if (!downVoteSet.has(userId) && userId !== userIdFiller) {
      const didUpVote = upVoteSet.has(userId);
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
    setUpVoteSet(new Set(upVotes ?? []));
    setDownVoteSet(new Set(downVotes ?? []));
  }, [postId]);

  return (
    <div className="flex text-sm text-color-secondary">
      <div className="flex flex-col mr-6">
        <button
          className={ClassNamesLogic(
            upVoteSet.has(userId)
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
        <div className="mx-auto my-auto">
          {upVoteSet.size - downVoteSet.size}
        </div>
        <button
          className={ClassNamesLogic(
            downVoteSet.has(userId)
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
    </div>
  );
}

export default PostVoteButtons;
