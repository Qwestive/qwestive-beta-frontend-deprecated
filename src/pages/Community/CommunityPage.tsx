import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IcommunityInfo, ItokenCommunity, TtokenCommunity } from 'types/types';
import { GetTokenData } from 'services/Solana/GetData/GetTokenData';
import NonMemberCommunityPage from './NonMemberCommunityPage';
import NewCommunityPage from './NewCommunityPage';
import MemberCommunityPage from './MemberCommunityPage';
import { useTokenRegistry } from '../../components/Solana/TokenRegistry';
import { getCommunityInfo } from '../../services/Firebase/GetData/CommunityUtil';
import solanaLogo from '../../assets/solanaLogo.svg';
// import { GetFungibleCommunityData } from 'services/Solana/GetData/GetTokenData';

/*
TODO: check credentials
*/
export default function CommunityPage(): JSX.Element {
  const { cId } = useParams<'cId'>();
  const tokenRegistry = useTokenRegistry();

  const [hasAccess, setHasAccess] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const [tokenCommunity, setTokenCommunity] = useState<
    TtokenCommunity | undefined
  >();
  const [tokenRegistryHasLoaded, setTokenRegistryHasLoaded] = useState(false);

  async function getTokenCommunity(cid: string): Promise<TtokenCommunity> {
    // const community = await GetFungibleCommunityData(tokenRegistry, cid);
    if (cid === 'SOL') {
      // return {
      //   name: 'Solana',
      //   symbol: 'SOL',
      //   logoUrl: solanaLogo,
      //   address: '',
      // };
      return {
        cid,
        name: 'Solana',
        imageUrl: solanaLogo,
        serverData: undefined,
        communityType: 'fungible',
        symbol: 'SOL',
        tokenData: { isFungible: true, mint: 'SOL', ammountOwned: 0 },
      };
    }
    const tokenInfo = tokenRegistry.get(cid);
    // const token = await GetTokenData(cid);

    return {
      cid,
      name: tokenInfo?.name ?? '',
      imageUrl: tokenInfo?.logoURI ?? '',
      serverData: undefined,
      communityType: 'fungible',
      symbol: 'SOL',
      tokenData: { isFungible: true, mint: 'SOL', ammountOwned: 0 },
    };
  }

  async function handleLoadPage() {
    setLoadingPage(true);
    if (cId !== undefined) {
      try {
        // TODO: check credentials.
        setHasAccess(true);

        setTokenCommunity(await getTokenCommunity(cId));

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
        <NonMemberCommunityPage community={tokenCommunity} />
      )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        tokenCommunity?.serverData !== undefined && (
          <MemberCommunityPage tokenCommunity={tokenCommunity} />
        )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        tokenCommunity?.serverData === undefined && (
          <NewCommunityPage community={tokenCommunity} />
        )}
    </div>
  );
}
