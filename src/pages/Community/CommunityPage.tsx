import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useRecoilValue } from 'recoil';
import LoadingDots from 'components/Util/LoadingDots';
import { userInfoAtom } from 'services/recoil/userInfo';
import { ItokenCommunity, TtokenCommunity } from 'types/types';
import { GetTokenData } from 'services/Solana/GetData/GetTokenData';
import NonMemberCommunityPage from './Components/NonMemberCommunityPage';
import NewCommunityPage from './Components/NewCommunityPage';
import MemberCommunityPage from './MemberCommunityPage';
import { useTokenRegistry } from '../../components/Solana/TokenRegistry';
import { getCommunityInfo } from '../../services/Firebase/GetData/CommunityUtil';
import solanaLogo from '../../assets/solanaLogo.svg';

export default function CommunityPage(): JSX.Element {
  const { cId } = useParams<'cId'>();
  const tokenRegistry = useTokenRegistry();
  const userAccountTokens = useRecoilValue(userInfoAtom)?.accountTokens;
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
        if (
          userAccountTokens?.fungibleAccountTokensByMint.get(cId) !==
            undefined ||
          userAccountTokens?.nonFungibleAccountTokensByCollection.get(cId) !==
            undefined
        ) {
          setHasAccess(true);
        } else {
          throw new Error('You do not have access to this community');
        }
        setTokenCommunity(await getTokenCommunity(cId));
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
      {loadingPage && (
        <div>
          <div
            className="text-color-primary gap-2 items-baseline 
          flex justify-center mt-10">
            <div className="text-center text-2xl font-semibold ">Loading</div>
            <LoadingDots classNameExtend="h-2 w-2" />
          </div>
        </div>
      )}
      {!loadingPage && !hasAccess && (
        <NonMemberCommunityPage community={tokenCommunity} />
      )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        tokenCommunity?.serverData === undefined && (
          <NewCommunityPage community={tokenCommunity} />
        )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        tokenCommunity?.serverData !== undefined && (
          <MemberCommunityPage tokenCommunity={tokenCommunity} />
        )}
    </div>
  );
}
