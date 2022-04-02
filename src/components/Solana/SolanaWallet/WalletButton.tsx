import React from 'react';
import { WalletMultiButton as ReactUIWalletMultiButton } from '@solana/wallet-adapter-react-ui';

import 'style/Components/wallet.css';

/*
TODO:
- make prettier button
*/

export default function WalletButton(): JSX.Element {
  return <ReactUIWalletMultiButton />;
}
