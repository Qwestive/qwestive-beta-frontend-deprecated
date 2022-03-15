import {
  useConnection,
  useAnchorWallet,
  useWallet,
  AnchorWallet,
} from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import React, { useState, useEffect } from 'react';
import initializeVote from '../../../../common/services/Solana/SmartContracts/AnchorSetup';

type IvoteContainer = {
  title: string | undefined;
  author: string | undefined;
  creationDate: number | undefined;
  votePublicKey: string | undefined;
};

/// Components which displays the rich text contents of a post.
function VoteContainer({
  title,
  author,
  creationDate,
  votePublicKey,
}: IvoteContainer): JSX.Element {
  const [formattedDate, setFormattedDate] = useState('Unknown');
  const wallet = useAnchorWallet();
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    if (creationDate !== undefined) {
      setFormattedDate(new Date(creationDate ?? 0).toLocaleDateString());
    }
  });

  const handleCastVote = (optionId: string): void => {
    if (publicKey === undefined) {
      throw new Error('Initializer Public Key is undefined');
    }
    if (wallet === undefined) {
      throw new Error('Wallet context is undefined');
    }
    initializeVote(publicKey as PublicKey, wallet as AnchorWallet);
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
      <div>Cast your vote:</div>
      <button
        className={!publicKey ? 'mx-4 bg-gray' : 'btn-filled mx-4'}
        type="button"
        onClick={() => handleCastVote('')}
        disabled={!publicKey}>
        {!publicKey ? 'Make sure your wallet is connected' : 'Send!'}
      </button>
    </div>
  );
}

export default VoteContainer;
