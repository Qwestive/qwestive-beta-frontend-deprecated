import { ParsedAccountData, PublicKey } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import {
  IfungibleToken,
  InonFungibleToken,
  InonFungibleTokenMetadata,
} from 'types/types';
import axios from 'axios';
import { buildConnection } from '../Functions/SolanaUtil';

/// Returns basic data about a provided mint ID or undefined if provided
/// mint ID is not associated with a token.
export async function GetTokenData(
  mint: string
): Promise<IfungibleToken | InonFungibleToken> {
  const connection = buildConnection();
  const res = await connection.getParsedAccountInfo(new PublicKey(mint));
  const parsedAccountToken = res.value?.data as ParsedAccountData;
  const ammountOwned =
    parsedAccountToken.parsed.info?.tokenAmount?.uiAmount ?? 0;
  const { ammount, decimals } = parsedAccountToken.parsed.info.tokenAmount;
  return {
    isFungible: ammount !== '1' && decimals !== 0,
    mint,
    ammountOwned,
  };
}

export async function GetOnChainNftMetadata(
  mint: string
): Promise<InonFungibleTokenMetadata> {
  const connection = buildConnection();
  const tokenMetaPubkey = await Metadata.getPDA(new PublicKey(mint));
  const tokenMeta = await Metadata.load(connection, tokenMetaPubkey);

  const name = tokenMeta.data.data.name ?? '';
  const creators =
    tokenMeta.data.data.creators?.map((item) => item.address) ?? [];
  const symbol = tokenMeta.data.data.symbol ?? '';
  const uri = tokenMeta.data.data.uri ?? '';

  return {
    name,
    creators,
    symbol,
    uri,
  };
}

export async function GetOffChainNftMetadata(uri: string): Promise<{
  collectionName: string;
  imageUrl: string | undefined;
}> {
  try {
    const response = await axios.get(uri);
    return {
      collectionName: response.data.collection.name,
      imageUrl: response.data.image,
    };
  } catch (error) {
    return { collectionName: 'Unknown', imageUrl: undefined };
  }
}
