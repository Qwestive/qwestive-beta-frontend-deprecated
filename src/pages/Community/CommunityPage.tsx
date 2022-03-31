import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useRecoilValue } from 'recoil';
import LoadingDots from 'components/Util/LoadingDots';
import { userInfoAtom } from 'services/recoil/userInfo';
import {
  EcommunityType,
  IfungibleToken,
  InonFungibleTokenCollection,
  TtokenCommunity,
} from 'types/types';
import { getTokenCommunityData } from 'services/Solana/GetData/GetCommunityData';
import NonMemberCommunityPage from './Components/NonMemberCommunityPage';
import NewCommunityPage from './Components/NewCommunityPage';
import MemberCommunityPage from './MemberCommunityPage';
import { useTokenRegistry } from '../../components/Solana/TokenRegistry';
import solanaLogo from '../../assets/solanaLogo.svg';

export default function CommunityPage(): JSX.Element {
  const { cId } = useParams<'cId'>();
  const tokenRegistry = useTokenRegistry();
  const userAccountTokens = useRecoilValue(userInfoAtom)?.accountTokens ?? {
    fungibleAccountTokensByMint: new Map<string, IfungibleToken>(),
    nonFungibleAccountTokensByCollection: new Map<
      string,
      InonFungibleTokenCollection
    >(),
  };
  const [hasAccess, setHasAccess] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [reloadToggle, setReloadToggle] = useState(false);

  const [community, setCommunity] = useState<TtokenCommunity | undefined>();
  const [tokenRegistryHasLoaded, setTokenRegistryHasLoaded] = useState(false);

  async function getTokenCommunity(cid: string): Promise<TtokenCommunity> {
    if (cid === 'SOL') {
      return {
        cid,
        type: EcommunityType.fungible,
        name: 'Solana',
        imageUrl: solanaLogo,
        communityData: undefined,
        symbol: 'SOL',
        tokenData: { isFungible: true, mint: 'SOL', ammountOwned: 0 },
      };
    }
    return getTokenCommunityData(tokenRegistry, userAccountTokens, cid);
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
        setCommunity(await getTokenCommunity(cId));
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
  }, [cId, tokenRegistryHasLoaded, reloadToggle]);

  return (
    <div className="w-10/12 mx-auto py-10">
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
        <NonMemberCommunityPage community={community} />
      )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        community?.communityData === undefined && (
          <NewCommunityPage
            community={community}
            setReloadToggle={setReloadToggle}
          />
        )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        community?.communityData !== undefined && (
          <MemberCommunityPage
            community={community}
            setReloadToggle={setReloadToggle}
          />
        )}
    </div>
  );
}
