import React from 'react';
import { TokenRegistryProvider } from '../../Solana/TokenRegistry';
import SelfTokenDisplay from './SelfTokenDisplay';

export default function SelfTokenContext(): JSX.Element {
  return (
    <div>
      <TokenRegistryProvider>
        <SelfTokenDisplay />
      </TokenRegistryProvider>
    </div>
  );
}
