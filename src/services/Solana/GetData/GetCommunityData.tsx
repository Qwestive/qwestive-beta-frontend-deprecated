import { TokenInfoMap } from '@solana/spl-token-registry';
import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';
import solanaLogo from 'assets/solanaLogo.svg';
import { toast } from 'react-toastify';
import {
  AccountTokensByMintOrCollection,
  EcommunityType,
  IfungibleToken,
  IfungibleTokenCommunity,
  InonFungibleTokenCollection,
  InonFungibleTokenCommunity,
  TtokenCommunity,
} from 'types/types';
import { getCommunityData } from '../../Firebase/GetData/CommunityUtil';
import {
  GetOnChainNftMetadata,
  GetOffChainNftMetadata,
  GetTokenData,
} from './GetTokenData';

export async function GetFungibleCommunityData(
  tokenRegistry: TokenInfoMap,
  token: IfungibleToken
): Promise<IfungibleTokenCommunity> {
  let communityData;
  try {
    communityData = await getCommunityData(token.mint);
  } catch (error) {
    // Do nothing
  }
  if (token.mint === 'SOL') {
    return {
      cid: token.mint,
      type: EcommunityType.fungible,
      name: 'Solana',
      imageUrl: solanaLogo,
      data: communityData,
      tokenData: token,
      symbol: 'SOL',
    };
  }
  const tokenInfo = tokenRegistry.get(token.mint);
  if (tokenInfo !== undefined) {
    return {
      cid: token.mint,
      type: EcommunityType.fungible,
      name: tokenInfo.name,
      imageUrl: tokenInfo.logoURI,
      data: communityData,
      tokenData: token,
      symbol: tokenInfo.symbol,
    };
  }
  return {
    cid: token.mint,
    type: EcommunityType.fungible,
    name: 'Unknown',
    imageUrl: defaultUserProfileImage,
    data: communityData,
    tokenData: token,
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
  let communityData;
  try {
    communityData = await getCommunityData(nftCollection.id);
  } catch (error) {
    // Do nothing
  }
  return {
    cid: nftCollection.id,
    type: EcommunityType.nonfungible,
    name: data.collectionName,
    imageUrl: data.imageUrl,
    data: communityData,
    metadata: nftCollection.metadata,
    tokensOwned: nftCollection.tokensOwned,
  };
}

export async function getTokenCommunityData(
  tokenRegistry: TokenInfoMap,
  userAccountTokens: AccountTokensByMintOrCollection,
  cId: string
): Promise<TtokenCommunity> {
  /// TODO: handle the case where cid === SOL.
  try {
    const tokenData = await GetTokenData(cId, userAccountTokens);
    if (tokenData.isFungible) {
      return GetFungibleCommunityData(tokenRegistry, tokenData);
    }
    // User provided a non-fungible token mint ID as the community ID,
    // which is not valid.
    toast.error('Provided community ID is not valid');
  } catch (error) {
    // Provided ID is not tied to a token, so it must be from an NFT
    // community.
    try {
      const currentUserCollectionNft =
        userAccountTokens.nonFungibleAccountTokensByCollection.get(cId);
      /// User owns an NFT in the provided collection
      if (currentUserCollectionNft) {
        return GetNonFunibleCommunityData(currentUserCollectionNft);
      }

      // TODO(diego): Finalize handling the case where a user tries to access
      // a valid NFT community to which they don't have access.
      /// User does not own an NFT in the provided collection
      // const communityData = await getCommunityData(cId);
      // const relatedNft = await communityData.data.sampleToken;
      // const nftCollectionMeta = await GetOnChainNftMetadata(relatedNft);
      // const data = await GetOffChainNftMetadata(nftCollectionMeta.uri);

      // return {
      //   cid: cId,
      //   type: EcommunityType.nonfungible,
      //   name: data.collectionName,
      //   imageUrl: data.imageUrl,
      //   data: communityData as InonFungibleTokenCommunityData,
      //   metadata: nftCollectionMeta,
      //   tokensOwned: [],
      // };
    } catch (otherError) {
      // Provided CID does not exist in the DB or in the user's wallet,
      // so it is not valid.
    }
  }
  toast.error('Provided community ID is not valid');
  throw Error('Invalid community ID');
}
