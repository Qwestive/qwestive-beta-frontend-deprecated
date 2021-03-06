import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { SearchIcon } from '@heroicons/react/solid';
import OwnedTokenGrid from './OwnedTokenGrid';
import { useTokenRegistry } from '../../../common/components/Solana/TokenRegistry';
import GenerateTokenOwnedList from '../../../common/services/Solana/GetData/GenerateTokenOwnedList';
import { userPublicKeyAtom } from '../../../recoil/userInfo';

import { ItokenOwned } from '../../../common/types';

export default function CommunitiesTab(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const tokenRegistry = useTokenRegistry();
  const [tokenOwnedList, setTokenOwnedList] = useState<ItokenOwned[]>([]);
  const [tokenOwnedSearchedResults, setTokenOwnedSearchedResults] = useState<
    ItokenOwned[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [searchPredicate, setSearchPredicate] = useState('');

  function updateTokenOwnedSearchResults(event: ChangeEvent<HTMLInputElement>) {
    setSearchPredicate(event.target.value);
    setTokenOwnedSearchedResults(
      tokenOwnedList.filter(
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
        const tokenList = await GenerateTokenOwnedList(
          tokenRegistry,
          userPublicKey
        );
        setTokenOwnedList(tokenList);
        setTokenOwnedSearchedResults(tokenList);
        setSearchPredicate('');
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    setLoading(false);
  }
  useEffect(() => {
    if (tokenRegistry.size !== 0) {
      generateTokenOwnedList();
    }
  }, [tokenRegistry]);

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
            value={searchPredicate}
            onChange={(e) => updateTokenOwnedSearchResults(e)}
            type="search"
          />
        </div>
      </div>
      {/* Token Grid  */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <OwnedTokenGrid tokenOwnedList={tokenOwnedSearchedResults} />
      )}
    </div>
  );
}
