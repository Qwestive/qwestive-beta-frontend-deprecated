import React from 'react';

import { EcommunityType, TtokenCommunity } from 'types/types';
import { getCommunitySymbol } from 'types/TypesUtil';

type TnonMemberCommunityPage = {
  community: TtokenCommunity | undefined;
};
// TODO: design
export default function NonMemberCommunityPage({
  community,
}: TnonMemberCommunityPage): JSX.Element {
  return (
    <div className="mt-10 text-center text-color-0">
      <div className="font-bold text-xl">
        You do not have access to this community
      </div>
      {community !== undefined && (
        <div className="space-y-3 mt-3">
          <p>{community.name}</p>
          <p>{getCommunitySymbol(community)}</p>
          <img
            src={community.imageUrl}
            className="mx-auto h-32"
            alt="logoUri"
          />
          {/* Show cid (public key for tokens - not NFT Collections) */}
          {community.type === EcommunityType.fungible && <p>{community.cid}</p>}
        </div>
      )}
    </div>
  );
}
