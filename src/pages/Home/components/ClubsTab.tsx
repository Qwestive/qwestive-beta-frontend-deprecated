import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SearchIcon } from '@heroicons/react/solid';
import OwnedTokenGrid from './OwnedTokenGrid';
import { useTokenRegistry } from '../../../common/components/Solana/TokenRegistry';
import GenerateTokenOwnedList from '../../../common/services/Solana/GetData/GenerateTokenOwnedList';
import { userPublicKeyAtom } from '../../../recoil/userInfo';

import { ItokenOwned } from '../../../common/types';

export default function ClubsTab(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const tokenRegistry = useTokenRegistry();
  const [tokenOwnedList, setTokenOwnedList] = useState<ItokenOwned[]>([]);

  const [loading, setLoading] = useState(false);

  async function generateList() {
    setLoading(true);
    if (userPublicKey !== undefined) {
      setTokenOwnedList(
        await GenerateTokenOwnedList(tokenRegistry, userPublicKey)
      );
    }
    setLoading(false);
  }
  return (
    <div>
      {/* Search Bar  */}
      <div className="flex-1 flex items-center justify-center mt-6">
        <div className=" w-full ">
          <div className="relative">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex 
            items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="text-lg block w-full pl-10 pr-3 py-3 border 
              border-gray-300 rounded-md leading-5 bg-white 
              placeholder-gray-500 focus:outline-none 
              focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 
              focus:border-gray-500 "
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
      {/* Token Grid  */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <OwnedTokenGrid tokenOwnedList={tokenOwnedList} />
      )}
      <button type="button" className="btn-filled" onClick={generateList}>
        GenerateTokenOwnedList
      </button>
    </div>
  );
}
