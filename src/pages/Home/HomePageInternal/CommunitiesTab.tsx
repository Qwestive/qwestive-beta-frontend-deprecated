import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { SearchIcon } from '@heroicons/react/solid';
import { useTokenRegistry } from 'components/Solana/TokenRegistry';
import LoadingDots from 'components/Util/LoadingDots';
import { TtokenCommunity, ICustomCommunity } from 'types/types';
import { userFinishedLoadingAtom } from 'services/recoil/appState';
import { userInfoAtom } from 'services/recoil/userInfo';
import { getCustomCommunities } from 'services/Firebase/GetData/CommunityUtil';
import {
  GetFungibleCommunityData,
  GetNonFunibleCommunityData,
} from 'services/Solana/GetData/GetCommunityData';
import OwnedTokenGrid from './OwnedTokenGrid';

export default function CommunitiesTab(): JSX.Element {
  const userFinishedLoading = useRecoilValue(userFinishedLoadingAtom);
  const userPublicKey = useRecoilValue(userInfoAtom)?.publicKey;
  const userAccountTokens = useRecoilValue(userInfoAtom)?.accountTokens;

  const tokenRegistry = useTokenRegistry();
  const [tokenCommunities, setTokenCommunities] = useState<TtokenCommunity[]>(
    []
  );
  const [tokenCommunitySearchResults, setTokenCommunitySearchResults] =
    useState<TtokenCommunity[]>([]);

  const [customCommunities, setCustomCommunities] = useState<
    ICustomCommunity[]
  >([]);
  const [customCommunitySearchResults, setCustomCommunitySearchResults] =
    useState<ICustomCommunity[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchPredicate, setSearchPredicate] = useState('');

  function updateTokenOwnedSearchResults(event: ChangeEvent<HTMLInputElement>) {
    setSearchPredicate(event.target.value);
    setTokenCommunitySearchResults(
      tokenCommunities.filter(
        (token) =>
          token.name
            ?.toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1 ?? false
      )
    );
    setCustomCommunitySearchResults(
      customCommunities.filter(
        (token) =>
          token.name
            ?.toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1 ?? false
      )
    );
  }

  async function generateCommunityList() {
    setLoading(true);
    if (userPublicKey !== undefined) {
      try {
        const communityDataPromises: Promise<TtokenCommunity>[] = [];
        const holdingIds: string[] = [];
        userAccountTokens?.fungibleAccountTokensByMint?.forEach((value) => {
          communityDataPromises.push(
            GetFungibleCommunityData(tokenRegistry, value)
          );
          holdingIds.push(value.mint);
        });
        userAccountTokens?.nonFungibleAccountTokensByCollection?.forEach(
          (value) => {
            communityDataPromises.push(GetNonFunibleCommunityData(value));
            holdingIds.push(value.id);
          }
        );
        const communityData: TtokenCommunity[] = await Promise.all(
          communityDataPromises
        );
        setTokenCommunities(communityData);
        setTokenCommunitySearchResults(communityData);
        const customCommunityData = await getCustomCommunities(holdingIds);
        setCustomCommunitySearchResults(customCommunityData);
        setCustomCommunities(customCommunityData);
        setSearchPredicate('');
      } catch (error) {
        /// TODO: Make the user log in if their public key is undefined.
        toast.error('Failed to load your communities, please log-in again');
        throw error;
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (userFinishedLoading) {
      generateCommunityList();
    }
  }, [tokenRegistry.size, userFinishedLoading, userAccountTokens]);

  return (
    <div>
      {/* Search Bar  */}
      <div className="flex-1 flex items-center justify-center mt-5">
        <div className="w-full max-w-2xl relative">
          <div
            className="absolute inset-y-0 left-0 pl-3 flex 
            items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </div>
          <input
            name="search"
            className="
            w-full pl-10 pr-3 py-2
            rounded-3xl text-field-input"
            placeholder="Search"
            autoComplete="off"
            value={searchPredicate}
            onChange={(e) => updateTokenOwnedSearchResults(e)}
            type="search"
          />
        </div>
      </div>
      {/* Token Grid  */}
      <div className="mt-5">
        {loading ? (
          <div>
            <div
              className="text-color-0 gap-2 items-baseline 
          flex justify-center mt-10">
              <div className="text-center text-2xl font-semibold ">
                Scanning your wallet
              </div>
              <LoadingDots classNameExtend="h-2 w-2" />
            </div>
          </div>
        ) : (
          <OwnedTokenGrid
            ownedTokenCommunities={tokenCommunitySearchResults}
            customCommunities={customCommunitySearchResults}
          />
        )}
      </div>
    </div>
  );
}
