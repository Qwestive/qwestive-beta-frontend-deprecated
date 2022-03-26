import { PublicKey } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { InonFungibleTokenMetadata } from 'types/types';
import axios from 'axios';
import { buildConnection } from '../Functions/SolanaUtil';

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
