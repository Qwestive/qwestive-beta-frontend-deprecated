import React from 'react';
import { TokenInfo } from '@solana/spl-token-registry';

type TnonMemberCommunityPage = {
  tokenInfo: TokenInfo | undefined;
};
// TODO: design
export default function NonMemberCommunityPage({
  tokenInfo,
}: TnonMemberCommunityPage): JSX.Element {
  return (
    <div className="mt-10 text-center text-color-primary">
      <div className="font-bold text-xl">
        You do not have access to this community
      </div>
      {tokenInfo !== undefined && (
        <div className="space-y-3 mt-3">
          <p>{tokenInfo.name}</p>
          <p>{tokenInfo.symbol}</p>
          <img src={tokenInfo.logoURI} className="mx-auto h-32" alt="logoUri" />
          <p>{tokenInfo.address}</p>
        </div>
      )}
    </div>
  );
}
