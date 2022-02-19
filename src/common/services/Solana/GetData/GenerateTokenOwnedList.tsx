import { TokenInfoMap } from '@solana/spl-token-registry';
import ReadTokenWallet from './ReadTokenWallet';

import { ItokenOwned } from '../../../types';
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
    if (tokenInfos !== undefined) {
      // add to the beginning
      tokenOwnedList.unshift({
        mint: tokenOwned[i].mint,
        name: tokenInfos.symbol,
        memberCount: 0,
        amountHeld: tokenOwned[i].uiAmount,
        imageUrl: tokenInfos.logoURI,
      });
    } else {
      // add to the end
      tokenOwnedList.push({
        mint: tokenOwned[i].mint,
        name: 'Unknown',
        memberCount: 9,
        amountHeld: tokenOwned[i].uiAmount,
        imageUrl: defaultUserProfileImage,
      });
    }
  }

  return tokenOwnedList;
}
