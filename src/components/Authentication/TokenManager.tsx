import {
  AccountTokensByMintOrCollection,
  areTokensEqual,
  InonFungibleTokenCollection,
  IfungibleToken,
  InonFungibleToken,
} from 'types/types';
import { dbToNonFungibleTokenCollection } from 'services/Firebase/Converters/TokensOwnedConverter';
import {
  UpdateAccountFungibleTokens,
  UpdateAccountNonFungibleTokens,
} from 'services/Firebase/UpdateAccountTokens';
import ReadUserAccountTokens from 'services/Solana/GetData/ReadUserAccountTokens';
import { areMapsTheSame, objectToMap } from 'functions/Util';

/*
 * Returns the most up-to-date, BE verified versions of a user's balance
 * of fungible tokens.
 */
async function updateUserAccountFungibleTokens(
  dbTokens: Map<string, IfungibleToken>,
  walletTokens: Map<string, IfungibleToken>
): Promise<Map<string, IfungibleToken>> {
  if (!areMapsTheSame(dbTokens, walletTokens, areTokensEqual)) {
    const updatedTokensOwned = await UpdateAccountFungibleTokens();
    return objectToMap(updatedTokensOwned?.data?.tokensOwnedByMint ?? {});
  }
  return dbTokens;
}

/*
 * Returns the most up-to-date, BE verified versions of a user's balance
 * of non-fungible tokens.
 */
async function updateUserAccountNonFungibleTokens(
  dbTokenCollection: Map<string, InonFungibleTokenCollection>,
  walletTokens: Map<string, InonFungibleToken>
): Promise<Map<string, InonFungibleTokenCollection>> {
  const dbTokens = new Map<string, InonFungibleToken>();
  dbTokenCollection.forEach((element) => {
    element.tokensOwned.forEach((token: InonFungibleToken) => {
      dbTokens.set(token.mint, token);
    });
  });
  if (!areMapsTheSame(dbTokens, walletTokens, areTokensEqual)) {
    const updatedTokensOwned = await UpdateAccountNonFungibleTokens();
    return dbToNonFungibleTokenCollection(
      updatedTokensOwned?.data?.tokensOwnedByCollection ?? {}
    );
  }
  return dbTokenCollection;
}

/*
 * Returns the most up-to-date, BE verified versions of a user's balance
 * of fungible and non-fungible tokens.
 */
export async function getUserAccountTokens(
  targetPublicKey: string,
  accountTokens: AccountTokensByMintOrCollection
): Promise<AccountTokensByMintOrCollection> {
  // The DB stored user account tokens.
  const tokensOwnedByMint =
    accountTokens?.fungibleAccountTokensByMint ?? new Map();
  const tokensOwnedByCollection =
    accountTokens.nonFungibleAccountTokensByCollection ?? new Map();

  // The tokens in the user's wallet.
  const { fungibleAccountTokens, nonFungibleAccountTokens } =
    await ReadUserAccountTokens(targetPublicKey);

  // The verified fungible tokens owned by the user.
  const fungibleAccountTokensByMint = await updateUserAccountFungibleTokens(
    tokensOwnedByMint,
    fungibleAccountTokens
  );

  // The verified non-fungible tokens owned by the user and aggregated by NFT
  // collection.
  const nonFungibleAccountTokensByCollection =
    await updateUserAccountNonFungibleTokens(
      tokensOwnedByCollection,
      nonFungibleAccountTokens
    );

  return {
    fungibleAccountTokensByMint,
    nonFungibleAccountTokensByCollection,
  };
}
