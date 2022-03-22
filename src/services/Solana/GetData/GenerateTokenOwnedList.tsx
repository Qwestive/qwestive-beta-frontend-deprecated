import { TokenInfoMap } from '@solana/spl-token-registry';
import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';
import solanaLogo from 'assets/solanaLogo.svg';
import { ItokenOwnedCommunity, Icommunity } from '../../../types/types';
import { getCommunityInfo } from '../../Firebase/GetData/CommunityUtil';

const LAMPORTS_PER_SOL = 1000000000;

/* TODO:
Once you get the community db design 
Fetch the community member count
*/
export default async function GenerateTokenOwnedList(
  tokenRegistry: TokenInfoMap,
  tokenOwned: Map<string, number>
): Promise<ItokenOwnedCommunity[]> {
  const tokenOwnedList = new Array<ItokenOwnedCommunity>();
  if (tokenOwned.size === 0) {
    return tokenOwnedList;
  }

  // const communityInfoPromises: Array<Promise<Icommunity | undefined>> = [];
  // tokenOwned.forEach((amountHeld, mint) => {
  //   communityInfoPromises.push(getCommunityInfo(mint));
  // });
  // const communityInfoArray = await Promise.all(communityInfoPromises);
  tokenOwned.forEach((amountHeld, mint) => {
    if (mint === 'SOL') {
      tokenOwnedList.push({
        mint,
        name: 'Solana',
        amountHeld: amountHeld / LAMPORTS_PER_SOL,
        imageUrl: solanaLogo,
      });
    } else {
      const tokenInfos = tokenRegistry.get(mint);
      if (tokenInfos !== undefined) {
        tokenOwnedList.unshift({
          mint,
          name: tokenInfos.symbol,
          amountHeld,
          imageUrl: tokenInfos.logoURI,
        });
      } else {
        tokenOwnedList.push({
          mint,
          name: 'Unknown',
          amountHeld,
          imageUrl: defaultUserProfileImage,
        });
      }
    }
  });

  return tokenOwnedList;
}
