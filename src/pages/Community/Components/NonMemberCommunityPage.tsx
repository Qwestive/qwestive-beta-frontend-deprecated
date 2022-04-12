import { defaultUserProfileImage } from 'assets/userImages';
import React from 'react';

import {
  EcommunityType,
  InonFungibleTokenCommunity,
  TtokenCommunity,
  ICustomCommunity,
} from 'types/types';
import { getCommunitySymbol } from 'types/TypesUtil';

type TnonMemberCommunityPage = {
  community: TtokenCommunity | ICustomCommunity | undefined;
};
// TODO: improve design
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
          <p className="text-3xl">{community.name}</p>
          <img
            src={
              community.imageUrl === ''
                ? defaultUserProfileImage
                : community.imageUrl
            }
            className="mx-auto h-32 w-32 rounded-full"
            alt="logoUri"
          />
        </div>
      )}
      <div className="max-w-sm my-6 mx-auto">
        <p className="text-color-0">
          To gain access to a Qwestive community, your wallet balance must
          contain the underlying token to which the community is associated.
        </p>
        <div className="flex flex-col content-start my-2 text-color-secondary">
          <p className="font-bold">Token Details:</p>
          {community?.type === EcommunityType.fungible && (
            <>
              <div>
                <span className="font-semibold">Type:</span> Fungible
              </div>
              <div>
                <span className="font-semibold">Name:</span> {community?.name}
              </div>
              <div>
                <span className="font-semibold">Symbol:</span>{' '}
                {getCommunitySymbol(community)}
              </div>

              <div className="break-all">
                <span className="font-semibold">Mint ID:</span>
                <br /> {community?.cid}
              </div>
            </>
          )}

          {community?.type === EcommunityType.nonfungible && (
            <>
              <div>
                <span className="font-semibold">Type:</span> Non-Fungible
              </div>
              <div>
                <span className="font-semibold">Name:</span> {community?.name}
              </div>
              <div>
                <span className="font-semibold">Symbol:</span>{' '}
                {getCommunitySymbol(community)}
              </div>
              <div className="break-all">
                <span className="font-semibold">Creator Public Keys:</span>
                <br />
                {(
                  community as InonFungibleTokenCommunity
                ).collectionData.metadata.creators.map((item) => (
                  <h1>{item}</h1>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
