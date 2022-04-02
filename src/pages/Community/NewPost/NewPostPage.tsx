import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'services/recoil/userInfo';

import NotAccessNewPost from './Components/NotAccessNewPost';
import NewPostTabs from './NewPostTabs';

export default function NewPostPage(): JSX.Element {
  const { cId } = useParams<'cId'>();

  const [hasAccess, setHasAccess] = useState(false);
  const userAccountTokens = useRecoilValue(userInfoAtom)?.accountTokens;

  async function handleLoadPage() {
    if (cId !== undefined) {
      const tokenBalance =
        userAccountTokens?.fungibleAccountTokensByMint?.get(cId)
          ?.ammountOwned ?? 0;
      const collectionTokens =
        userAccountTokens?.nonFungibleAccountTokensByCollection?.get(cId)
          ?.tokensOwned ?? [];
      setHasAccess(tokenBalance > 0 || collectionTokens.length > 0);
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
