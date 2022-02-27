import {
  clusterApiUrl,
  Connection,
  PublicKey,
  ParsedAccountData,
} from '@solana/web3.js';

import { SolanaNetwork } from '../NetworkConfig';

const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

type ItokenOwned = {
  mint: string;
  uiAmount: number;
};

export default async function ReadTokenWallet(
  publickey: string
): Promise<ItokenOwned[]> {
  const connection = new Connection(clusterApiUrl(SolanaNetwork), 'confirmed');

  const accountTokens = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: publickey, // base58 encoded string
          },
        },
      ],
    }
  );

  const filteredAccountTokens = new Array<ItokenOwned>();
  for (let i = 0; i < accountTokens.length; i += 1) {
    const parsedAccountToken = accountTokens[i].account
      .data as ParsedAccountData;
    if (
      parsedAccountToken.parsed !== undefined &&
      parsedAccountToken.parsed.info.mint !== undefined &&
      parsedAccountToken.parsed.info.tokenAmount.uiAmount !== undefined &&
      parsedAccountToken.parsed.info.tokenAmount.uiAmount !== 0
    )
      filteredAccountTokens.push({
        mint: parsedAccountToken.parsed.info.mint,
        uiAmount: parsedAccountToken.parsed.info.tokenAmount.uiAmount,
      });
  }
  return filteredAccountTokens;
}
