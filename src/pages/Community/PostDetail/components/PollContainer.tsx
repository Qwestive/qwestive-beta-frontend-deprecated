import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import CKeditorReader from '../../../../common/components/Posts/CKeditor/CKeditorReader';
import { IpollOption } from '../../../../common/types';
import { userPublicKeyAtom } from '../../../../recoil/userInfo';
import ProgressBar from './ProgressBar';

type IpollContainer = {
  title: string | undefined;
  author: string | undefined;
  creationDate: number | undefined;
  contents: string | undefined;
  options: Array<IpollOption> | undefined;
};

/// Components which displays the rich text contents of a post.
function PollContainer({
  title,
  author,
  creationDate,
  contents,
  options,
}: IpollContainer): JSX.Element {
  const [formattedDate, setFormattedDate] = useState('Unknown');
  const [pollOptions, setPollOptions] = useState<Array<IpollOption>>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const userPublicKeyFiller = '_';
  const userPublicKey =
    useRecoilValue(userPublicKeyAtom) ?? userPublicKeyFiller;

  useEffect(() => {
    let voteFound = false;
    let voteCount = 0;
    options?.forEach((option) => {
      if (!voteFound) {
        voteFound = option?.voteUserIds?.indexOf(userPublicKey) !== -1;
      }
      voteCount += option?.voteUserIds?.length ?? 0;
    });
    setHasVoted(voteFound);
    setTotalVotes(voteCount);
    if (creationDate !== undefined) {
      setFormattedDate(new Date(creationDate ?? 0).toLocaleDateString());
    }
    setPollOptions(options ?? []);
  }, []);

  /// Remove public key of current user from the voter array of all options.
  const removeVote = () => {
    setPollOptions((currentPollOptions) => {
      currentPollOptions.forEach((option) => {
        option.voteUserIds.filter((id) => id !== userPublicKey);
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
        voteUserIds: [userPublicKey, ...currentPollOptions[idx].voteUserIds],
      });
      return filteredOptions;
    });
  };

  const handleCastVote = (optionId: string): void => {
    const option = options?.find((item) => item.id === optionId);
    if (option === undefined) {
      throw new Error('Could not cast vote, invalid option ID');
    }
    const voters = option?.voteUserIds ?? [];
    if (
      userPublicKey !== userPublicKeyFiller &&
      voters.indexOf(userPublicKey ?? '') === -1
    ) {
      /// TODO(diego): add backend logic and error handling.
      setTotalVotes(totalVotes + 1);
      setHasVoted(true);
      removeVote();
      addVote(option.id);
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
        <CKeditorReader content={contents} />
      </div>
      {!hasVoted && (
        <div>
          {options?.map((item) => (
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
