import {
  Connection,
  PublicKey,
  ParsedAccountData,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  buildConnection,
  TOKEN_PROGRAM_ID,
} from 'services/Solana/Functions/SolanaUtil';
import { AccountTokens, IfungibleToken, InonFungibleToken } from 'types/types';

/// Builds a map of {token_mint_id: balance} for a each SPL token owned by
/// provided public key.
async function BuildUserSplTokenBalancesFromWallet(
  connection: Connection,
  publickey: string
): Promise<AccountTokens> {
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

  const fungibleAccountTokens = new Map<string, IfungibleToken>();
  const nonFungibleAccountTokens = new Map<string, InonFungibleToken>();
  for (let i = 0; i < accountTokens.length; i += 1) {
    const parsedAccountToken = accountTokens[i].account
      .data as ParsedAccountData;
    const { mint } = parsedAccountToken.parsed.info;
    const ammountOwned =
      parsedAccountToken.parsed.info?.tokenAmount?.uiAmount ?? 0;
    const { ammount, decimals } = parsedAccountToken.parsed.info.tokenAmount;
    console.log(parsedAccountToken);
    if (mint && ammountOwned !== 0) {
      const isFungible = ammount !== '1' && decimals !== 0;
      if (isFungible) {
        fungibleAccountTokens.set(mint, {
          isFungible: true,
          mint,
          ammountOwned,
        });
      } else {
        nonFungibleAccountTokens.set(mint, {
          isFungible: false,
          mint,
          ammountOwned,
        });
      }
    }
  }
  return { fungibleAccountTokens, nonFungibleAccountTokens };
}

/// Builds a map of {token_mint_id: balance} for a provided public key.
export default async function ReadUserAccountTokens(
  publicKey: string
): Promise<AccountTokens> {
  const connection = buildConnection();

  // Fetch SPL token balances
  const { fungibleAccountTokens, nonFungibleAccountTokens } =
    await BuildUserSplTokenBalancesFromWallet(connection, publicKey);

  // Include SOL balance in fungible account tokens.
  const solBalance = await connection.getBalance(new PublicKey(publicKey));
  const fungibleAccountTokensWithSol = fungibleAccountTokens.set('SOL', {
    isFungible: true,
    mint: 'SOL',
    ammountOwned: solBalance / LAMPORTS_PER_SOL,
  });

  return {
    fungibleAccountTokens: fungibleAccountTokensWithSol,
    nonFungibleAccountTokens,
  };
}
