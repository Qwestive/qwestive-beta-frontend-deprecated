import { FirebaseAuth } from '../FirebaseConfig';

/*
A button to logout of your Firebase account and your wallet
TODO:
- logs
*/

interface IsignoutWithWallet {
  disconnect: () => Promise<void>;
  connected: boolean;
}

export default async function SignoutWithWallet({
  disconnect,
  connected,
}: IsignoutWithWallet): Promise<void> {
  if (connected) {
    if (!disconnect) throw new Error('Wallet does not support disconnect!');

    await disconnect();
  }
  await FirebaseAuth.signOut();
}
