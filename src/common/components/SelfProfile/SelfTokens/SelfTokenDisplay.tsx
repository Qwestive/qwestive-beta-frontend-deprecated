import React from 'react';
import { useTokenRegistry } from '../../Solana/TokenRegistry';

export default function SelfTokenDisplay(): JSX.Element {
  const tokenRegistry = useTokenRegistry();
  function dothething() {
    console.log('tokenRegistry');
    console.log(tokenRegistry);
  }
  return (
    <div>
      <p>show tokens</p>
      <button type="button" className="btn-filled" onClick={dothething}>
        show tokens
      </button>
    </div>
  );
}
