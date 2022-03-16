import {
  // useConnection,
  useAnchorWallet,
  useWallet,
  // AnchorWallet,
} from '@solana/wallet-adapter-react';
// import { PublicKey, VoteInstruction } from '@solana/web3.js';
import React, { useState, useEffect } from 'react';
// import initializeVote from '../../../../common/services/Solana/SmartContracts/AnchorSetup';
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
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const userPublicKeyFiller = '_';
  const userPublicKey =
    useRecoilValue(userPublicKeyAtom) ?? userPublicKeyFiller;

  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();

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
  }, [options]);

  // const handleCastVote = (optionId: string): void => {
  //   if (publicKey === undefined) {
  //     throw new Error('Initializer Public Key is undefined');
  //   }
  //   if (wallet === undefined) {
  //     throw new Error('Wallet context is undefined');
  //   }
  //   initializeVote(publicKey as PublicKey, wallet as AnchorWallet);
  // };

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
      option.voteUserIds = [userPublicKey, ...voters];
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
          {options?.map((item) => (
            <ProgressBar
              key={item.id}
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
