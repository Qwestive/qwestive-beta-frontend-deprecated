import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { userInfoAtom } from 'services/recoil/userInfo';
import CKeditorReader from 'components/Posts/PostsReader/PostReaderContent/CKeditorReader';
import { IpollOption, IpostPoll } from 'types/types';
import {
  AddPollVote,
  RemovePollVote,
} from 'services/Firebase/WriteData/UpdatePollVote';
import { toast } from 'react-toastify';
import ProgressBar from './ProgressBar';

type IpollContainer = {
  postId: string | undefined;
  title: string | undefined;
  author: string | undefined;
  creationDate: number | undefined;
  poll: IpostPoll;
};

/// Components which displays the rich text contents of a post.
/// TODO(diego): perform input validation, for example, verify that the postId
/// field is NEVER null, and if it is, show some error message in the UI.
function PollContainer({
  postId,
  title,
  author,
  creationDate,
  poll,
}: IpollContainer): JSX.Element {
  const [pollOptions, setPollOptions] = useState<Array<IpollOption>>([]);
  const [formattedDate, setFormattedDate] = useState('Unknown');
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const userIdFiller = '_';
  const userId = useRecoilValue(userInfoAtom)?.uid ?? userIdFiller;

  const createPoll = () => {
    let voteFound = false;
    let voteCount = 0;
    poll.options?.forEach((option) => {
      if (!voteFound) {
        voteFound = option?.voteUserIds?.indexOf(userId) !== -1;
      }
      voteCount += option?.voteUserIds?.length ?? 0;
    });
    setHasVoted(voteFound);
    setTotalVotes(voteCount);
    if (creationDate !== undefined) {
      setFormattedDate(new Date(creationDate ?? 0).toLocaleDateString());
    }
    setPollOptions(poll.options ?? []);
  };

  useEffect(() => {
    createPoll();
  }, [poll]);

  /// Remove public key of current user from the voter array of all options.
  const removeVote = () => {
    setPollOptions((currentPollOptions) => {
      currentPollOptions.forEach((option) => {
        option.voteUserIds.filter((id) => id !== userId);
      });
      return currentPollOptions;
    });
  };

  /// Add public key of current user to the voter array of the option with
  /// the provided ID.
  const addVote = (optionId: string) => {
    setPollOptions((currentPollOptions) => {
      const idx = currentPollOptions?.findIndex(
        (item: IpollOption) => item.id === optionId
      );

      const filteredOptions = currentPollOptions?.filter(
        (item) => item.id !== optionId
      );

      filteredOptions?.splice(idx, 0, {
        id: currentPollOptions[idx].id,
        name: currentPollOptions[idx].name,
        voteUserIds: [userId, ...currentPollOptions[idx].voteUserIds],
      });

      return filteredOptions;
    });
  };

  const handleCastVote = async (optionId: string): Promise<void> => {
    const option = pollOptions?.find((item) => item.id === optionId);
    if (option === undefined) {
      throw new Error('Could not cast vote, invalid option ID');
    }
    const voters = option?.voteUserIds ?? [];
    if (userId !== userIdFiller && voters.indexOf(userId ?? '') === -1) {
      setTotalVotes(totalVotes + 1);
      setHasVoted(true);
      removeVote();
      addVote(option.id);
    }
    try {
      await RemovePollVote(userId, postId as string);
      await AddPollVote(userId, postId as string, option.id);
    } catch (error: any) {
      setTotalVotes(totalVotes - 1);
      setHasVoted(false);
      removeVote();
      toast.error(`Failed to cast vote: ${error?.message}`);
    }
  };

  return (
    <div>
      <div className="text-4xl font-bold">{title ?? ''}</div>
      <div className="text-color-secondary text-xs mt-2">
        Author: {author ?? ''}
      </div>
      <div className="text-color-secondary text-xs">
        Created on: {formattedDate}
      </div>
      <div className="my-6">
        <CKeditorReader content={poll.content} />
      </div>
      {!hasVoted && (
        <div>
          {pollOptions?.map((item) => (
            <button
              key={item.id}
              className="py-2 px-4 my-1 w-full bg-gray-300 text-white
              font-semibold rounded-lg hover:bg-qwestive-purple 
              focus:outline-none focus:ring-2 focus:ring-qwestive-purple"
              type="button"
              onClick={() => handleCastVote(item.id)}>
              {item.name}
            </button>
          ))}
        </div>
      )}
      {hasVoted && (
        <div>
          {pollOptions?.map((item) => (
            <ProgressBar
              key={item.id}
              name={item.name}
              percentProgress={
                ((item?.voteUserIds?.length ?? 0) * 100) / totalVotes
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PollContainer;
