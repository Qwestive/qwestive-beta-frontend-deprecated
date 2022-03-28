import {
  EcommunityType,
  IfungibleTokenCommunity,
  InonFungibleTokenCommunity,
  TtokenCommunity,
} from 'types/types';

export function getCommunitySymbol(
  community: TtokenCommunity | undefined
): string {
  if (community === undefined) return '';
  if (community?.type === EcommunityType.fungible) {
    return (community as IfungibleTokenCommunity).tokenData.mint;
  }
  return (community as InonFungibleTokenCommunity).metadata.symbol;
}

export function getCommunityTokensOwnedQuantity(
  community: TtokenCommunity | undefined
): number {
  if (community === undefined) return 0;
  if (community?.type === EcommunityType.fungible) {
    return (community as IfungibleTokenCommunity).tokenData.ammountOwned;
  }
  return (community as InonFungibleTokenCommunity).tokensOwned.length;
}
