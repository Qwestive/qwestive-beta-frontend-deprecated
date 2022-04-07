import React from 'react';

export default function ConnectedTokens(): JSX.Element {
  return (
    <div className="space-y-5">
      <h2 className="text-color-1 text-lg font-bold">Connected Tokens</h2>
      <div>
        <button type="button" className="button-neutral px-3 h-9">
          + add a token or NFT
        </button>
      </div>
    </div>
  );
}
