import { TokenInfoMap } from '@solana/spl-token-registry';
import ReadTokenWallet from './ReadTokenWallet';

import { ItokenOwnedCommunity, Icommunity } from '../../../types';
import { getCommunityInfo } from '../../Firebase/GetData/CommunityUtil';
import defaultUserProfileImage from '../../../../assets/defaultUserProfileImage.png';

/* TODO:
Once you get the community db design 
Fetch the community member count
*/
export default async function GenerateTokenOwnedList(
  tokenRegistry: TokenInfoMap,
  publicKey: string
): Promise<ItokenOwnedCommunity[]> {
  const tokenOwned = await ReadTokenWallet(publicKey);
  const tokenOwnedList = new Array<ItokenOwnedCommunity>();

  const communityInfoPromises: Array<Promise<Icommunity | undefined>> = [];
  tokenOwned.forEach((amountHeld, mint) => {
    communityInfoPromises.push(getCommunityInfo(mint));
  });

  const communityInfoArray = await Promise.all(communityInfoPromises);
  let i = 0;
  tokenOwned.forEach((amountHeld, mint) => {
    const tokenInfos = tokenRegistry.get(mint);
    if (tokenInfos !== undefined) {
      tokenOwnedList.unshift({
        mint,
        name: tokenInfos.symbol,
        amountHeld,
        imageUrl: tokenInfos.logoURI,
        communityData: communityInfoArray[i],
      });
    } else {
      tokenOwnedList.push({
        mint,
        name: 'Unknown',
        amountHeld,
        imageUrl: defaultUserProfileImage,
        communityData: communityInfoArray[i],
      });
    }
    i += 1;
  });

  return tokenOwnedList;
}
