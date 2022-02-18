import { TokenInfoMap } from '@solana/spl-token-registry';
import ReadTokenWallet from './ReadTokenWallet';

export default async function GenerateTokenOwnedList(
  tokenRegistry: TokenInfoMap
): Promise<void> {
  await ReadTokenWallet();
  console.log('tokenRegistry', tokenRegistry);
}
