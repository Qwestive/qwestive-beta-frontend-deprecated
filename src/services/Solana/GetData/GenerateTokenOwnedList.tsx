import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TokenInfoMap } from '@solana/spl-token-registry';
import { getCommunityInfo } from 'services/Firebase/GetData/CommunityUtil';
import { ItokenOwnedCommunity, Icommunity } from 'types/types';
import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';
import solanaLogo from 'assets/solanaLogo.svg';

export default async function GenerateTokenOwnedList(
  tokenRegistry: TokenInfoMap,
  tokenOwned: Map<string, number>
): Promise<ItokenOwnedCommunity[]> {
  const tokenOwnedList = new Array<ItokenOwnedCommunity>();
  if (tokenOwned.size === 0) {
    return tokenOwnedList;
  }

  const communityInfoPromises: Array<Promise<Icommunity | undefined>> = [];
  tokenOwned.forEach((amountHeld, mint) => {
    communityInfoPromises.push(getCommunityInfo(mint));
  });
  const communityInfoArray = await Promise.all(communityInfoPromises);

  let i = 0;
  tokenOwned.forEach((amountHeld, mint) => {
    if (mint === 'SOL') {
      tokenOwnedList.push({
        mint,
        name: 'Solana',
        amountHeld: amountHeld / LAMPORTS_PER_SOL,
        imageUrl: solanaLogo,
        communityData: communityInfoArray[i],
      });
    } else {
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
    }
    i += 1;
  });

  return tokenOwnedList;
}
