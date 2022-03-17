import {
  clusterApiUrl,
  Connection,
  PublicKey,
  ParsedAccountData,
  Cluster,
  Commitment,
} from '@solana/web3.js';
import { ItokenOwned } from '../../../types.js';
import appConfig from '../../../../config.js';

const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

export default async function ReadTokenWallet(
  publickey: string
): Promise<ItokenOwned[]> {
  const connection = new Connection(
    clusterApiUrl(appConfig.SOLANA_NETWORK as Cluster),
    appConfig.SOLANA_NETWORK_COMMITMENT as Commitment
  );

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
        amountHeld: parsedAccountToken.parsed.info.tokenAmount.uiAmount,
      });
  }
  return filteredAccountTokens;
}
