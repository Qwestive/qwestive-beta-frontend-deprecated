import { FirebaseAuth } from '../FirebaseConfig';

import { IsignoutWithWallet } from '../../../types';
/*
A button to logout of your Firebase account and your wallet
TODO:
- logs
*/
export default async function SignoutWithWallet({
  disconnect,
  connected,
}: IsignoutWithWallet): Promise<void> {
  if (connected) {
    if (!disconnect) throw new Error('Wallet does not support disconnect!');

    await disconnect();
    // eslint-disable-next-line no-console
    console.log('wallet disconnected');
  }
  await FirebaseAuth.signOut();
}
