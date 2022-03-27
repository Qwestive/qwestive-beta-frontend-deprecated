import React from 'react';

import {
  IfungibleTokenCommunity,
  InonFungibleTokenCommunity,
  TtokenCommunity,
} from 'types/types';

type TnonMemberCommunityPage = {
  community: TtokenCommunity | undefined;
};
// TODO: design
export default function NonMemberCommunityPage({
  community,
}: TnonMemberCommunityPage): JSX.Element {
  return (
    <div className="mt-10 text-center text-color-primary">
      <div className="font-bold text-xl">
        You do not have access to this community
      </div>
      {community !== undefined && (
        <div className="space-y-3 mt-3">
          <p>{community.name}</p>
          <p>
            {community.communityType === 'fungible'
              ? (community as IfungibleTokenCommunity).symbol
              : (community as InonFungibleTokenCommunity).metadata.symbol}
          </p>
          <img
            src={community.imageUrl}
            className="mx-auto h-32"
            alt="logoUri"
          />
          {/* Show cid (public key for tokens - not NFT Collections) */}
          {community.communityType === 'fungible' && <p>{community.cid}</p>}
        </div>
      )}
    </div>
  );
}
