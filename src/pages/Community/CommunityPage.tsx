import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'services/recoil/userInfo';
import { getTokenCommunityData } from 'services/Solana/GetData/GetCommunityData';
import { toggleReloadCommunityAtom } from 'services/recoil/appState';
import LoadingDots from 'components/Util/LoadingDots';
import { getCustomCommunityData } from 'services/Firebase/GetData/CommunityUtil';
import {
  IfungibleToken,
  InonFungibleTokenCollection,
  TtokenCommunity,
  ICustomCommunity,
} from 'types/types';

import NonMemberCommunityPage from './Components/NonMemberCommunityPage';
import NewCommunityPage from './Components/NewCommunityPage';
import MemberCommunityPage from './MemberCommunityPage';
import { useTokenRegistry } from '../../components/Solana/TokenRegistry';

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
  const toggleReloadCommunity = useRecoilValue(toggleReloadCommunityAtom);
  const [hasAccess, setHasAccess] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const [community, setCommunity] = useState<
    TtokenCommunity | ICustomCommunity | undefined
  >();
  const [tokenRegistryHasLoaded, setTokenRegistryHasLoaded] = useState(false);

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
          setCommunity(
            await getTokenCommunityData(tokenRegistry, userAccountTokens, cId)
          );
        } else {
          const customCommunityData = await getCustomCommunityData(cId);
          if (customCommunityData !== undefined) {
            if (
              Array.from(
                userAccountTokens?.fungibleAccountTokensByMint.keys()
              ).some((ai) => customCommunityData.tokens.includes(ai)) ||
              Array.from(
                userAccountTokens?.nonFungibleAccountTokensByCollection.keys()
              ).some((ai) => customCommunityData.tokens.includes(ai))
            ) {
              setHasAccess(true);
              setCommunity(customCommunityData);
            } else {
              throw new Error('You do not have access to this community');
            }
          } else {
            throw new Error('You do not have access to this community');
          }
        }
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
  }, [cId, tokenRegistryHasLoaded, toggleReloadCommunity]);

  return (
    <div className="page-frame max-w-7xl">
      {loadingPage && (
        <div>
          <div
            className="text-color-0 gap-2 items-baseline 
          flex justify-center mt-10">
            <div className="text-center text-2xl font-semibold">Loading</div>
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
        community?.categories === undefined && (
          <NewCommunityPage community={community} />
        )}
      {!loadingPage &&
        hasAccess &&
        cId !== undefined &&
        community?.categories !== undefined && (
          <MemberCommunityPage community={community} />
        )}
    </div>
  );
}
