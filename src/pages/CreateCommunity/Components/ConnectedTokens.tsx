import React, { useState, useEffect } from 'react';
import { CheckIcon, SelectorIcon, TrashIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'services/recoil/userInfo';
import { IfungibleToken, InonFungibleTokenCollection } from 'types/types';
import { useTokenRegistry } from 'components/Solana/TokenRegistry';
import solanaLogo from 'assets/solanaLogo.svg';
import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';
import {
  GetOnChainNftMetadata,
  GetOffChainNftMetadata,
} from 'services/Solana/GetData/GetTokenData';

type TtokenListItem = {
  id: string;
  name: string;
  imageUrl: string;
  symbol: string;
  isNFT: boolean;
};

type TconnectedTokens = {
  setRequirements: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export default function ConnectedTokens({
  setRequirements,
}: TconnectedTokens): JSX.Element {
  const [query, setQuery] = useState('');
  const [selectedTokenList, setSelectedTokenList] = useState<TtokenListItem[]>(
    []
  );

  const [tokenList, setTokenList] = useState<TtokenListItem[]>([]);

  const userInfo = useRecoilValue(userInfoAtom);
  const tokenRegistry = useTokenRegistry();
  const [tokenRegistryHasLoaded, setTokenRegistryHasLoaded] = useState(false);

  async function generateTokenOwnedList() {
    const fungibleAccountTokensByMint =
      userInfo?.accountTokens.fungibleAccountTokensByMint ??
      new Map<string, IfungibleToken>();

    const nonFungibleAccountTokensByCollection =
      userInfo?.accountTokens.nonFungibleAccountTokensByCollection ??
      new Map<string, InonFungibleTokenCollection>();

    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }

    nonFungibleAccountTokensByCollection.forEach(async (nftCollection) => {
      const collectionToken =
        nftCollection.tokensOwned[
          getRandomInt(nftCollection.tokensOwned.length)
        ];
      const { uri } = await GetOnChainNftMetadata(collectionToken.mint);
      const data = await GetOffChainNftMetadata(uri);
      setTokenList((prev) => [
        ...prev,
        {
          id: nftCollection.id,
          name: data.collectionName,
          imageUrl: data.imageUrl ?? defaultUserProfileImage,
          symbol: data.collectionName,
          isNFT: true,
        },
      ]);
    });

    fungibleAccountTokensByMint.forEach((token) => {
      if (token.mint === 'SOL') {
        setTokenList((prev) => [
          ...prev,
          {
            id: token.mint,
            name: 'Solana',
            imageUrl: solanaLogo,
            symbol: 'SOL',
            isNFT: false,
          },
        ]);
      } else {
        const tokenInfo = tokenRegistry.get(token.mint);
        if (tokenInfo !== undefined) {
          setTokenList((prev) => [
            ...prev,
            {
              id: token.mint,
              name: tokenInfo.name,
              imageUrl: tokenInfo.logoURI ?? defaultUserProfileImage,
              symbol: tokenInfo.symbol,
              isNFT: false,
            },
          ]);
        } else {
          setTokenList((prev) => [
            ...prev,
            {
              id: token.mint,
              name: 'Unknown',
              imageUrl: defaultUserProfileImage,
              symbol: 'Unknown',
              isNFT: false,
            },
          ]);
        }
      }
    });
  }

  useEffect(() => {
    if (tokenRegistry.size !== 0 && !tokenRegistryHasLoaded) {
      setTokenRegistryHasLoaded(true);
    }
  }, [tokenRegistry]);

  useEffect(() => {
    if (tokenRegistryHasLoaded) {
      generateTokenOwnedList();
    }
  }, [tokenRegistryHasLoaded]);

  const filteredToken =
    query === ''
      ? tokenList
      : tokenList.filter((token) => {
          return token.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-color-1 text-lg font-bold">Connected Tokens</h2>
        <h3 className="text-sm font-medium text-color-secondary">
          People who hold any token below will be able to access
        </h3>
      </div>
      {selectedTokenList.map((se, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={idx} className="flex gap-2 items-center">
          <div className="w-full max-w-md">
            <Combobox
              as="div"
              value={selectedTokenList[idx]}
              onChange={(val) => {
                setSelectedTokenList((prev) => {
                  const temp = prev;
                  temp[idx].name = val.name; // .name;
                  temp[idx].id = val.id;
                  temp[idx].imageUrl = val.imageUrl;
                  temp[idx].isNFT = val.isNFT;
                  temp[idx].symbol = val.symbol;
                  setRequirements((prevReq) => {
                    const tReq = prevReq;
                    tReq.add(val.id);
                    return tReq;
                  });
                  return temp;
                });
              }}>
              <div className="relative ">
                <Combobox.Input
                  className="
            text-field-input
            w-full rounded-xl border 
             py-2 pl-3 pr-10 shadow-sm text-base sm:text-sm"
                  onChange={(event) => setQuery(event.target.value)}
                  displayValue={(person: any) => person.name}
                />
                <Combobox.Button
                  className="absolute inset-y-0 
          right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </Combobox.Button>

                {filteredToken.length > 0 && (
                  <Combobox.Options
                    className="absolute z-10 
            mt-1 max-h-56 w-full overflow-auto rounded-xl 
            surface-color-0 border-color-0
            py-1 shadow-lg ring-1 ring-black ring-opacity-5 
            focus:outline-none text-base sm:text-sm">
                    {filteredToken.map((token) => (
                      <Combobox.Option
                        key={token.id}
                        value={token}
                        className={({ active }) =>
                          ClassNamesLogic(
                            'relative select-none py-2 pl-3 pr-9',
                            active ? 'bg-indigo-600 text-white' : 'text-color-1'
                          )
                        }>
                        {({ active, selected }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={token.imageUrl}
                                alt=""
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                              />
                              <div
                                className="flex gap-2 items-baseline 
                              truncate">
                                <span
                                  className={ClassNamesLogic(
                                    'ml-3',
                                    selected && 'font-semibold'
                                  )}>
                                  {token.name}
                                </span>
                                {!token.isNFT && (
                                  <span
                                    className="font-normal text-xs truncate 
                                text-color-secondary">
                                    {token.id}
                                  </span>
                                )}
                                {token.isNFT && (
                                  <span
                                    className="font-normal text-xs truncate 
                                text-color-secondary">
                                    NFT
                                  </span>
                                )}
                              </div>
                            </div>
                            {selected && (
                              <span
                                className={ClassNamesLogic(
                                  'absolute inset-y-0 right-0' +
                                    ' flex items-center pr-4',
                                  active ? 'text-white' : 'text-indigo-600'
                                )}>
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>
          <div>
            <button
              type="button"
              className="text-color-1 hover:text-red-700 
                dark:hover:text-red-700"
              onClick={() => {
                setSelectedTokenList((prev) => {
                  const temp = prev.filter((item, id) => id !== idx);
                  return temp;
                });
              }}>
              <TrashIcon className="h-6 my-auto mx-2" />
            </button>
          </div>
        </div>
      ))}

      <div>
        <button
          type="button"
          className="button-neutral px-3 h-9"
          onClick={() =>
            setSelectedTokenList((prev) => [
              ...prev,
              {
                id: '',
                name: '',
                imageUrl: '',
                symbol: '',
                isNFT: false,
              },
            ])
          }>
          + add a token or NFT
        </button>
      </div>
    </div>
  );
}
