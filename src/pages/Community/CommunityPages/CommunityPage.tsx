import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TokenInfo } from '@solana/spl-token-registry';

import NotAccessPage from './Components/NotAccessPage';
import NewCommunityPage from './MainCommunityPage/NewCommunityPage';
import MainCommunityPage from './MainCommunityPage/MainCommunityPage';
import { Icommunity } from '../../../common/types';

import { useTokenRegistry } from '../../../common/components/Solana/TokenRegistry';

import { getCommunityInfo } from '../../../common/services/Firebase/GetData/CommunityUtil';

/*
TODO: check credentials
*/

export default function CommunityPage(): JSX.Element {
  const { cId } = useParams<'cId'>();
  const tokenRegistry = useTokenRegistry();

  const [hasAccess, setHasAccess] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const [communityInfo, setCommunityInfo] = useState<Icommunity | undefined>();

  const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>();
  const [tokenRegistryHasLoaded, setTokenRegistryHasLoaded] = useState(false);

  async function handleLoadPage() {
    setLoadingPage(true);
    if (cId !== undefined) {
      try {
        // check credentials
        setHasAccess(true);
        setTokenInfo(tokenRegistry.get(cId));
        setCommunityInfo(await getCommunityInfo(cId));

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    setLoadingPage(false);
  }

  useEffect(() => {
    if (tokenRegistry.size !== 0 && !tokenRegistryHasLoaded) {
      setTokenRegistryHasLoaded(true);
    }
  }, [tokenRegistry]);

  useEffect(() => {
    if (tokenRegistryHasLoaded) {
      handleLoadPage();
    }
  }, [cId, tokenRegistryHasLoaded]);

  return (
    <div className="max-w-5xl mx-auto px-2">
      {loadingPage && <p>Loading ...</p>}
      {!loadingPage && !hasAccess && (
        <NotAccessPage communityInfo={communityInfo} tokenInfo={tokenInfo} />
      )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        communityInfo !== undefined && (
          <MainCommunityPage
            communityInfo={communityInfo}
            tokenInfo={tokenInfo}
          />
        )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        communityInfo === undefined && (
          <NewCommunityPage cId={cId} tokenInfo={tokenInfo} />
        )}
    </div>
  );
}
