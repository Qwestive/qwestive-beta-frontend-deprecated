import { TokenInfoMap } from '@solana/spl-token-registry';
import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';
import solanaLogo from 'assets/solanaLogo.svg';
import {
  IfungibleToken,
  IfungibleTokenCommunity,
  InonFungibleTokenCollection,
  InonFungibleTokenCommunity,
} from 'types/types';

import { getCommunityInfo } from '../../Firebase/GetData/CommunityUtil';
import {
  GetOnChainNftMetadata,
  GetOffChainNftMetadata,
} from './GetNftMetadata';

async function isCommunityActive(cid: string): Promise<boolean> {
  const communityInfo = await getCommunityInfo(cid);
  return (communityInfo?.categories?.length ?? 0) > 0;
}

export async function GetFungibleCommunityData(
  tokenRegistry: TokenInfoMap,
  token: IfungibleToken
): Promise<IfungibleTokenCommunity> {
  const isActive = await isCommunityActive(token.mint);
  if (token.mint === 'SOL') {
    return {
      cid: token.mint,
      name: 'Sol',
      imageUrl: solanaLogo,
      isActive,
      tokenData: token,
      communityType: 'fungible',
    };
  }
  const tokenInfo = tokenRegistry.get(token.mint);
  if (tokenInfo !== undefined) {
    return {
      cid: token.mint,
      name: tokenInfo.symbol,
      imageUrl: tokenInfo.logoURI,
      isActive,
      tokenData: token,
      communityType: 'fungible',
    };
  }
  return {
    cid: token.mint,
    name: 'Unknown',
    imageUrl: defaultUserProfileImage,
    isActive,
    tokenData: token,
    communityType: 'fungible',
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
  const isActive = await isCommunityActive(nftCollection.id);

  return {
    cid: nftCollection.id,
    name: data.collectionName,
    imageUrl: data.imageUrl,
    isActive,
    metadata: nftCollection.metadata,
    tokensOwned: nftCollection.tokensOwned,
    communityType: 'nonfungible',
  };
}
