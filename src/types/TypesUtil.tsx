import {
  EcommunityType,
  IfungibleTokenCommunity,
  InonFungibleTokenCommunity,
  TtokenCommunity,
  ICustomCommunity,
} from 'types/types';

export function getCommunitySymbol(
  community: TtokenCommunity | ICustomCommunity | undefined
): string {
  if (community === undefined) return '';
  if (community?.type === EcommunityType.fungible) {
    return (community as IfungibleTokenCommunity).symbol;
  }
  return (community as InonFungibleTokenCommunity).collectionData.metadata
    .symbol;
}

export function getCommunityTokensOwnedQuantity(
  community: TtokenCommunity | undefined
): number {
  if (community === undefined) return 0;
  if (community?.type === EcommunityType.fungible) {
    return (community as IfungibleTokenCommunity).tokenData.ammountOwned;
  }
  return (community as InonFungibleTokenCommunity).collectionData.tokensOwned
    .length;
}
