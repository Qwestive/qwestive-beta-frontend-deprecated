import { TokenInfoMap } from '@solana/spl-token-registry';
import ReadTokenWallet from './ReadTokenWallet';

import { ItokenOwned } from '../../../types';
import { getCommunityInfo } from '../../Firebase/GetData/CommunityUtil';
import defaultUserProfileImage from '../../../../assets/defaultUserProfileImage.png';

/* TODO:
Once you get the community db design 
Fetch the community member count
*/
export default async function GenerateTokenOwnedList(
  tokenRegistry: TokenInfoMap,
  publicKey: string
): Promise<ItokenOwned[]> {
  const tokenOwned = await ReadTokenWallet(publicKey);
  const tokenOwnedList = new Array<ItokenOwned>();

  for (let i = 0; i < tokenOwned.length; i += 1) {
    const tokenInfos = tokenRegistry.get(tokenOwned[i].mint);
    const communityData = getCommunityInfo(tokenOwned[i].mint);
    if (tokenInfos !== undefined) {
      // add to the beginning
      tokenOwnedList.unshift({
        mint: tokenOwned[i].mint,
        name: tokenInfos.symbol,
        amountHeld: tokenOwned[i].uiAmount,
        imageUrl: tokenInfos.logoURI,
        communityData,
      });
    } else {
      // add to the end
      tokenOwnedList.push({
        mint: tokenOwned[i].mint,
        name: 'Unknown',
        amountHeld: tokenOwned[i].uiAmount,
        imageUrl: defaultUserProfileImage,
        communityData,
      });
    }
  }

  return tokenOwnedList;
}
