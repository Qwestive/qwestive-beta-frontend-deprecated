/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { objectToMap } from 'functions/Util';
import {
  InonFungibleToken,
  InonFungibleTokenCollection,
} from '../../../types/types';

export function dbToNonFungibleTokenCollection(
  obj: any
): Map<string, InonFungibleTokenCollection> {
  const map: Map<string, any> = objectToMap(obj ?? {});
  const dbTokens = new Map<string, InonFungibleTokenCollection>();
  map.forEach((value, key) => {
    const collectionTokens: InonFungibleToken[] = [];
    value.tokensOwned.forEach((mint: string) => {
      collectionTokens.push({
        isFungible: false,
        mint,
        ammountOwned: 1,
      });
    });
    dbTokens.set(key, {
      id: value.collectionId,
      metadata: {
        symbol: value.symbol,
        creators: value.creatorMints,
      },
      tokensOwned: collectionTokens,
    });
  });
  return dbTokens;
}
