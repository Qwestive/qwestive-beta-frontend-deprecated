import React, { useEffect } from 'react';
import { WalletMultiButton as ReactUIWalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import SigninWithWallet from '../../services/Firebase/Authentication/SigninWithWallet';

/*
TODO:
- snack error
*/
export function WalletConnection(): JSX.Element {
  const { publicKey, signMessage, connected } = useWallet();

  async function trySigninWithWallet() {
    if (connected && publicKey) {
      try {
        await SigninWithWallet({
          uid: publicKey.toString(),
          publicKey,
          signMessage,
        });
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error(`Couldn't Signin: ${error?.message}`);
      }
    }
  }

  useEffect(() => {
    trySigninWithWallet();
  }, [connected]);

  return <ReactUIWalletMultiButton />;
}

export default WalletConnection;
