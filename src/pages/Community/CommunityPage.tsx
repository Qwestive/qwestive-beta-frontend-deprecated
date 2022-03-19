import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import NonMemberCommunityPage from './NonMemberCommunityPage';
import NewCommunityPage from './NewCommunityPage';
import MemberCommunityPage from './MemberCommunityPage';
import { Icommunity, IcommunityTokenInfo } from '../../common/types';
import { useTokenRegistry } from '../../common/components/Solana/TokenRegistry';
import { getCommunityInfo } from '../../common/services/Firebase/GetData/CommunityUtil';
import solanaLogo from '../../assets/solanaLogo.svg';

/*
TODO: check credentials
*/
export default function CommunityPage(): JSX.Element {
  const { cId } = useParams<'cId'>();
  const tokenRegistry = useTokenRegistry();

  const [hasAccess, setHasAccess] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [communityInfo, setCommunityInfo] = useState<Icommunity | undefined>();
  const [communityTokenInfo, setCommunityTokenInfo] = useState<
    IcommunityTokenInfo | undefined
  >();
  const [tokenRegistryHasLoaded, setTokenRegistryHasLoaded] = useState(false);

  function getCommunityTokenInfo(tokenId: string) {
    if (tokenId === 'SOL') {
      return {
        name: 'Solana',
        symbol: 'SOL',
        logoUrl: solanaLogo,
        address: '',
      };
    }
    const tokenInfo = tokenRegistry.get(tokenId);
    return {
      name: tokenInfo?.name,
      symbol: tokenInfo?.symbol,
      logoUrl: tokenInfo?.logoURI,
      address: tokenInfo?.address,
    };
  }

  async function handleLoadPage() {
    setLoadingPage(true);
    if (cId !== undefined) {
      try {
        // TODO: check credentials.
        setHasAccess(true);

        setCommunityTokenInfo(getCommunityTokenInfo(cId));

        setCommunityInfo(await getCommunityInfo(cId));

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error(error?.message);
        throw error;
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
        <NonMemberCommunityPage communityTokenInfo={communityTokenInfo} />
      )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        communityInfo !== undefined && (
          <MemberCommunityPage
            communityInfo={communityInfo}
            communityTokenInfo={communityTokenInfo}
          />
        )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        communityInfo === undefined && (
          <NewCommunityPage cId={cId} communityTokenInfo={communityTokenInfo} />
        )}
    </div>
  );
}
