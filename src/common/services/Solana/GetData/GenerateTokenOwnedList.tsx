import { TokenInfoMap } from '@solana/spl-token-registry';
import ReadTokenWallet from './ReadTokenWallet';

import { ItokenOwned } from '../../../types';
import defaultUserProfileImage from '../../../../assets/defaultUserProfileImage.png';

export default async function GenerateTokenOwnedList(
  tokenRegistry: TokenInfoMap,
  publicKey: string
): Promise<ItokenOwned[]> {
  const tokenOwned = await ReadTokenWallet(publicKey);
  console.log('tokenOwned', tokenOwned);
  const tokenOwnedList = new Array<ItokenOwned>();

  for (let i = 0; i < tokenOwned.length; i += 1) {
    console.log(tokenRegistry.get(tokenOwned[i].mint));
    // add at the end logoURI
    const tokenInfos = tokenRegistry.get(tokenOwned[i].mint);
    if (tokenInfos !== undefined) {
      // add to the end
      tokenOwnedList.unshift({
        mint: tokenOwned[i].mint,
        name: tokenInfos.symbol,
        memberCount: 0,
        amountHeld: tokenOwned[i].uiAmount,
        imageUrl: tokenInfos.logoURI,
      });
    } else {
      // add to the beginning
      tokenOwnedList.push({
        mint: tokenOwned[i].mint,
        name: 'Undefined Token',
        memberCount: 9,
        amountHeld: tokenOwned[i].uiAmount,
        imageUrl: defaultUserProfileImage,
      });
    }
  }

  const temptokenOwnedList = [
    {
      mint: '5vHjWRc2hys4XwZkMktg35N8oALt5d1ZXYkwCXXX3JHm',
      name: '$PRINTS',
      memberCount: 0,
      amountHeld: 5000,
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      mint: 'ddhahdbWRc2hys4XwZkMktg35N8oALt5d1ZXYkwCXXX3JHm',
      name: '$PEACE',
      memberCount: 458,
      amountHeld: 5000,
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      mint: 'yuioiRc2hys4XwZkMktg35N8oALt5d1ZXYkwCXXX3JHm',
      name: '$SQUIG',
      memberCount: 458,
      amountHeld: 5000,
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ];
  // tokenOwnedList = temptokenOwnedList;

  return tokenOwnedList;
}
