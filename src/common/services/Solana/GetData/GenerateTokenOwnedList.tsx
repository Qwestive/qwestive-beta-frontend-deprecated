import { TokenInfoMap } from '@solana/spl-token-registry';
import ReadTokenWallet from './ReadTokenWallet';

export default async function GenerateTokenOwnedList(
  tokenRegistry: TokenInfoMap,
  publicKey: string
): Promise<void> {
  const tokenOwned = await ReadTokenWallet(publicKey);
  console.log('tokenOwned', tokenOwned);
  console.log('tokenRegistry', tokenRegistry);
}
