import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'services/recoil/userInfo';

import NotAccessNewPost from './Components/NotAccessNewPost';
import NewPostTabs from './NewPostTabs';

type TnewPostPage = {
  setReloadCommunityPageToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPostPage({
  setReloadCommunityPageToggle,
}: TnewPostPage): JSX.Element {
  const { cId } = useParams<'cId'>();

  const [hasAccess, setHasAccess] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const userAccountTokens = useRecoilValue(userInfoAtom)?.accountTokens;

  async function handleLoadPage() {
    setLoadingPage(true);
    if (cId !== undefined) {
      const tokenBalance =
        userAccountTokens?.fungibleAccountTokensByMint?.get(cId)
          ?.ammountOwned ?? 0;
      const collectionTokens =
        userAccountTokens?.nonFungibleAccountTokensByCollection?.get(cId)
          ?.tokensOwned ?? [];
      setHasAccess(tokenBalance > 0 || collectionTokens.length > 0);
    }
    setLoadingPage(false);
  }

  useEffect(() => {
    handleLoadPage();
  }, [cId]);

  return (
    <div className="max-w-5xl mx-auto px-2 mt-5">
      {loadingPage && <p>Loading..</p>}
      {!loadingPage && hasAccess && cId !== undefined && (
        <NewPostTabs
          cId={cId}
          setReloadCommunityPageToggle={setReloadCommunityPageToggle}
        />
      )}
      {!loadingPage && !hasAccess && <NotAccessNewPost />}
    </div>
  );
}
