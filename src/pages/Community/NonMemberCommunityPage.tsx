import React from 'react';
import { TokenInfo } from '@solana/spl-token-registry';

import { Icommunity } from '../../common/types';

type TnonMemberCommunityPage = {
  communityInfo: Icommunity | undefined;
  tokenInfo: TokenInfo | undefined;
};
// TODO: design
export default function NonMemberCommunityPage({
  communityInfo,
  tokenInfo,
}: TnonMemberCommunityPage): JSX.Element {
  return (
    <div className=" mt-10 text-center text-color-primary">
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
      {communityInfo !== undefined && (
        <div className="mt-3">
          <p>{communityInfo.memberCount} members</p>
        </div>
      )}
    </div>
  );
}
