import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TokenInfo } from '@solana/spl-token-registry';

import NonMemberCommunityPage from './NonMemberCommunityPage';
import NewCommunityPage from './NewCommunityPage';
import MemberCommunityPage from './MemberCommunityPage';
import { Icommunity } from '../../common/types';
import { useTokenRegistry } from '../../common/components/Solana/TokenRegistry';
import { getCommunityInfo } from '../../common/services/Firebase/GetData/CommunityUtil';

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
        // TODO: check credentials.
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
        <NonMemberCommunityPage
          communityInfo={communityInfo}
          tokenInfo={tokenInfo}
        />
      )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        communityInfo !== undefined && (
          <MemberCommunityPage
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
