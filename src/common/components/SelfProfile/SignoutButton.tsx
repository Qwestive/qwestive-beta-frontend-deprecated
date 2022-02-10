import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import SignoutWithWallet from '../../services/Firebase/Authentication/SignoutWithWallet';
/*
A button to logout of your Firebase account and your wallet
TODO:
- snack error
*/
export default function SignoutButton(): JSX.Element {
  const { disconnect, connected } = useWallet();

  async function disconnectAll() {
    try {
      await SignoutWithWallet({ disconnect, connected });
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      toast.error(`Failed to signout: ${error?.message}`);
    }
  }

  return (
    <button type="button" className="btn-filled" onClick={disconnectAll}>
      Signout
    </button>
  );
}
