import {
  clusterApiUrl,
  Connection,
  PublicKey,
  ParsedAccountData,
  Cluster,
  Commitment,
} from '@solana/web3.js';
import appConfig from '../../../config.js';

const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

/// Builds a map of {token_mint_id: balance} for a each SPL token owned by
/// provided public key.
async function ReadSplTokenBalances(
  connection: Connection,
  publickey: string
): Promise<Map<string, number>> {
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

  const filteredAccountTokens = new Map<string, number>();
  for (let i = 0; i < accountTokens.length; i += 1) {
    const parsedAccountToken = accountTokens[i].account
      .data as ParsedAccountData;
    if (
      parsedAccountToken.parsed?.info?.mint &&
      (parsedAccountToken.parsed.info?.tokenAmount?.uiAmount ?? 0) !== 0
    )
      filteredAccountTokens.set(
        parsedAccountToken.parsed.info.mint,
        parsedAccountToken.parsed.info.tokenAmount.uiAmount
      );
  }
  return filteredAccountTokens;
}

/// Builds a map of {token_mint_id: balance} for a provided public key.
export default async function ReadUserTokenBalances(
  publicKey: string
): Promise<Map<string, number>> {
  const connection = new Connection(
    clusterApiUrl(appConfig.SOLANA_NETWORK as Cluster),
    appConfig.SOLANA_NETWORK_COMMITMENT as Commitment
  );
  // Fetch SOL balance
  const solBalance = await connection.getBalance(new PublicKey(publicKey));

  // Fetch SPL token balances
  const tokenBalances = await ReadSplTokenBalances(connection, publicKey);

  return tokenBalances.set('SOL', solBalance);
}
