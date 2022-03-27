/* eslint-disable @typescript-eslint/no-explicit-any */
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  Commitment,
} from '@solana/web3.js';
import React, { useCallback } from 'react';
import appConfig from '../../../../../config.js';

interface IsendTipButton {
  toPublicKey: string;
  solAmmount: number;
  transactionStartedCallback: () => boolean;
  transactionCompleteCallback: (arg0: boolean) => void;
}

// eslint-disable-next-line react/function-component-definition
export const SendTipButton: any = ({
  toPublicKey,
  solAmmount,
  transactionStartedCallback,
  transactionCompleteCallback,
}: IsendTipButton) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    transactionStartedCallback();
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(toPublicKey),
        lamports: LAMPORTS_PER_SOL * solAmmount,
      })
    );

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(
      signature,
      appConfig.SOLANA_NETWORK_COMMITMENT as Commitment
    );
    transactionCompleteCallback(true);
  }, [publicKey, sendTransaction, connection]);

  return (
    <button
      className={!publicKey ? 'mx-4 bg-gray' : 'btn-filled mx-4'}
      type="button"
      onClick={onClick}
      disabled={!publicKey}>
      {!publicKey ? 'Make sure your wallet is connected' : 'Send!'}
    </button>
  );
};
