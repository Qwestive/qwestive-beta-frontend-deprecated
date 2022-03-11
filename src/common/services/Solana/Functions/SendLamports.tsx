import {
  PublicKey,
  Connection,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
} from '@solana/web3.js';

interface IsendLamports {
  fromPublicKey: string;
  toPublicKey: string;
  solAmmount: number;
}

export default async function SendLamports(
  transactionData: IsendLamports
): Promise<boolean> {
  const network = 'devnet';

  const connection = new Connection(network);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(transactionData.fromPublicKey),
      toPubkey: new PublicKey(transactionData.toPublicKey),
      lamports: LAMPORTS_PER_SOL * transactionData.solAmmount,
    })
  );
  // const { signature } = await window.solana.signAndSendTransaction(transaction);
  // await connection.confirmTransaction(signature);

  return true;
}
