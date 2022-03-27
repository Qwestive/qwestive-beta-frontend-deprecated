import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'services/recoil/userInfo';
import { Icommunity, IcommunityTokenInfo } from 'types/types';
import NonMemberCommunityPage from './NonMemberCommunityPage';
import NewCommunityPage from './NewCommunityPage';
import MemberCommunityPage from './MemberCommunityPage';
import { useTokenRegistry } from '../../components/Solana/TokenRegistry';
import { getCommunityInfo } from '../../services/Firebase/GetData/CommunityUtil';
import solanaLogo from '../../assets/solanaLogo.svg';

/*
TODO: check credentials
*/
export default function CommunityPage(): JSX.Element {
  const { cId } = useParams<'cId'>();
  const { postId } = useParams<'postId'>();
  const tokenRegistry = useTokenRegistry();
  const userOwnedTokens =
    useRecoilValue(userInfoAtom)?.tokensOwned ?? new Map<string, number>();
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
        if (userOwnedTokens.get(cId) !== undefined) {
          setHasAccess(true);
        } else {
          throw new Error('You do not have access to this community');
        }
        setCommunityTokenInfo(getCommunityTokenInfo(cId));
        setCommunityInfo(await getCommunityInfo(cId));
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
