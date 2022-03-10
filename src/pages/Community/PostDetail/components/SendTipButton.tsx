/* eslint-disable @typescript-eslint/no-explicit-any */
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import React, { FC, useCallback } from 'react';

interface IsendTipButton {
  toPublicKey: string;
  solAmmount: number;
}

// eslint-disable-next-line react/function-component-definition
export const SendTipButton: any = ({
  toPublicKey,
  solAmmount,
}: IsendTipButton) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    console.log(solAmmount);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(toPublicKey),
        lamports: LAMPORTS_PER_SOL * solAmmount,
      })
    );

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, 'processed');
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
