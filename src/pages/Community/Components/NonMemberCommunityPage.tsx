import React from 'react';
import { IcommunityTokenInfo } from 'types/types';

type TnonMemberCommunityPage = {
  communityTokenInfo: IcommunityTokenInfo | undefined;
};
// TODO: design
export default function NonMemberCommunityPage({
  communityTokenInfo,
}: TnonMemberCommunityPage): JSX.Element {
  return (
    <div className="mt-10 text-center text-color-primary">
      <div className="font-bold text-xl">
        You do not have access to this community
      </div>
      {communityTokenInfo !== undefined && (
        <div className="space-y-3 mt-3">
          <p>{communityTokenInfo.name}</p>
          <p>{communityTokenInfo.symbol}</p>
          <img
            src={communityTokenInfo.logoUrl}
            className="mx-auto h-32"
            alt="logoUri"
          />
          <p>{communityTokenInfo.address}</p>
        </div>
      )}
    </div>
  );
}
