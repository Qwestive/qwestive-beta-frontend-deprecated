import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { SearchIcon } from '@heroicons/react/solid';
import { useTokenRegistry } from 'components/Solana/TokenRegistry';
import LoadingDots from 'components/Util/LoadingDots';
import { TtokenCommunity } from 'types/types';
import { userFinishedLoadingAtom } from 'services/recoil/appState';
import { userInfoAtom } from 'services/recoil/userInfo';
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
  }

  async function generateTokenOwnedList() {
    setLoading(true);
    if (userPublicKey !== undefined) {
      try {
        const communityDataPromises: Promise<TtokenCommunity>[] = [];
        userAccountTokens?.fungibleAccountTokensByMint?.forEach((value) => {
          communityDataPromises.push(
            GetFungibleCommunityData(tokenRegistry, value)
          );
        });
        userAccountTokens?.nonFungibleAccountTokensByCollection?.forEach(
          (value) => {
            communityDataPromises.push(GetNonFunibleCommunityData(value));
          }
        );
        const communityData: TtokenCommunity[] = await Promise.all(
          communityDataPromises
        );
        setTokenCommunities(communityData);
        setTokenCommunitySearchResults(communityData);
        setSearchPredicate('');
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    setLoading(false);
  }
  useEffect(() => {
    if (userFinishedLoading) {
      generateTokenOwnedList();
    }
  }, [tokenRegistry.size, userFinishedLoading, userAccountTokens]);

  return (
    <div>
      {/* Search Bar  */}
      <div className="flex-1 flex items-center justify-center mt-6">
        <div className="w-full relative">
          <div
            className="absolute inset-y-0 left-0 pl-3 flex 
            items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            name="search"
            className="text-lg block w-full pl-10 pr-3 py-3 border 
              border-gray-300 rounded-md leading-5 bg-white 
              placeholder-gray-500 focus:outline-none 
              focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 
              focus:border-gray-500 "
            placeholder="Search"
            autoComplete="off"
            value={searchPredicate}
            onChange={(e) => updateTokenOwnedSearchResults(e)}
            type="search"
          />
        </div>
      </div>
      {/* Token Grid  */}
      {loading ? (
        <div>
          <div
            className="text-color-primary gap-2 items-baseline 
          flex justify-center mt-10">
            <div className="text-center text-2xl font-semibold ">
              Scanning your wallet
            </div>
            <LoadingDots classNameExtend="h-2 w-2" />
          </div>
        </div>
      ) : (
        <OwnedTokenGrid ownedTokenCommunities={tokenCommunitySearchResults} />
      )}
    </div>
  );
}
