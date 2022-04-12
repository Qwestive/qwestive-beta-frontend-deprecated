import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'services/recoil/userInfo';
import {
  TtokenCommunity,
  ICustomCommunity,
  IfungibleToken,
  InonFungibleTokenCollection,
} from 'types/types';
import NotAccessNewPost from './Components/NotAccessNewPost';
import NewPostTabs from './NewPostTabs';

type TnewPostPage = {
  community: TtokenCommunity | ICustomCommunity | undefined;
};

export default function NewPostPage({ community }: TnewPostPage): JSX.Element {
  const { cId } = useParams<'cId'>();

  const [hasAccess, setHasAccess] = useState(false);
  const userAccountTokens = useRecoilValue(userInfoAtom)?.accountTokens ?? {
    fungibleAccountTokensByMint: new Map<string, IfungibleToken>(),
    nonFungibleAccountTokensByCollection: new Map<
      string,
      InonFungibleTokenCollection
    >(),
  };

  async function handleLoadPage() {
    if (cId !== undefined) {
      const tokenBalance =
        userAccountTokens?.fungibleAccountTokensByMint?.get(cId)
          ?.ammountOwned ?? 0;
      const collectionTokens =
        userAccountTokens?.nonFungibleAccountTokensByCollection?.get(cId)
          ?.tokensOwned ?? [];
      setHasAccess(tokenBalance > 0 || collectionTokens.length > 0);
      if (community !== undefined) {
        if ('tokens' in community) {
          if (
            Array.from(
              userAccountTokens?.fungibleAccountTokensByMint.keys()
            ).some((ai) => community.tokens.includes(ai)) ||
            Array.from(
              userAccountTokens?.nonFungibleAccountTokensByCollection.keys()
            ).some((ai) => community.tokens.includes(ai))
          ) {
            setHasAccess(true);
          }
        }
      }
    }
  }

  useEffect(() => {
    handleLoadPage();
  }, [cId]);

  return (
    <div className="max-w-5xl mx-auto px-2 mt-5">
      {hasAccess && cId !== undefined && <NewPostTabs cId={cId} />}
      {!hasAccess && <NotAccessNewPost />}
    </div>
  );
}
