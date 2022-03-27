import { TokenInfoMap } from '@solana/spl-token-registry';
import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';
import solanaLogo from 'assets/solanaLogo.svg';
import {
  IfungibleToken,
  IfungibleTokenCommunity,
  InonFungibleTokenCollection,
  InonFungibleTokenCommunity,
  TtokenCommunity,
} from 'types/types';
import { getCommunityInfo } from '../../Firebase/GetData/CommunityUtil';
import { GetOnChainNftMetadata, GetOffChainNftMetadata } from './GetTokenData';

// export async function getCommunityData() : Promise<TtokenCommunity> {

// }

export async function GetFungibleCommunityData(
  tokenRegistry: TokenInfoMap,
  token: IfungibleToken
): Promise<IfungibleTokenCommunity> {
  let communityInfo;
  try {
    communityInfo = await getCommunityInfo(token.mint);
  } catch (error) {
    // Do nothing
  }
  if (token.mint === 'SOL') {
    return {
      cid: token.mint,
      name: 'Solana',
      imageUrl: solanaLogo,
      serverData: communityInfo,
      tokenData: token,
      communityType: 'fungible',
      symbol: 'SOL',
    };
  }
  const tokenInfo = tokenRegistry.get(token.mint);
  if (tokenInfo !== undefined) {
    return {
      cid: token.mint,
      name: tokenInfo.name,
      imageUrl: tokenInfo.logoURI,
      serverData: communityInfo,
      tokenData: token,
      communityType: 'fungible',
      symbol: tokenInfo.symbol,
    };
  }
  return {
    cid: token.mint,
    name: 'Unknown',
    imageUrl: defaultUserProfileImage,
    serverData: communityInfo,
    tokenData: token,
    communityType: 'fungible',
    symbol: 'Unknown',
  };
}

export async function GetNonFunibleCommunityData(
  nftCollection: InonFungibleTokenCollection
): Promise<InonFungibleTokenCommunity> {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const collectionToken =
    nftCollection.tokensOwned[getRandomInt(nftCollection.tokensOwned.length)];
  const { uri } = await GetOnChainNftMetadata(collectionToken.mint);
  const data = await GetOffChainNftMetadata(uri);
  let communityInfo;
  try {
    communityInfo = await getCommunityInfo(nftCollection.id);
  } catch (error) {
    // Do nothing
  }
  return {
    cid: nftCollection.id,
    name: data.collectionName,
    imageUrl: data.imageUrl,
    serverData: communityInfo,
    metadata: nftCollection.metadata,
    tokensOwned: nftCollection.tokensOwned,
    communityType: 'nonfungible',
  };
}
