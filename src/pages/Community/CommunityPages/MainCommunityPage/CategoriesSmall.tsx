import React, { useState, Fragment } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import ClassNamesLogic from '../../../../common/components/Util/ClassNamesLogic';
import { Icategories } from '../../../../common/types';

import defaultUserProfileImage from '../../../../assets/defaultUserProfileImage.png';

type TcategoriesSmall = {
  tokenInfo: TokenInfo | undefined;
  categoriesList: Array<Icategories> | undefined;
  setCurrentCategorie: React.Dispatch<React.SetStateAction<string>>;
  currentCategorie: string;
};
export default function CategoriesSmall({
  tokenInfo,
  categoriesList,
  setCurrentCategorie,
  currentCategorie,
}: TcategoriesSmall): JSX.Element {
  const [categoriesViewCounter, setCategorieViewCounter] = useState(1);
  const [subsetCategoriesList, setSubsetCategoriesList] = useState(
    categoriesList?.slice(0, categoriesViewCounter * 5)
  );

  return (
    <div
      className=" w-full  px-3
    flex justify-between items-center">
      {/* Token Infos */}
      <div>
        <div className="flex items-center py-2 gap-2 justify-left">
          <img
            src={tokenInfo?.logoURI ?? defaultUserProfileImage}
            className="h-12"
            alt="tokenImage"
          />
          <p className="text-color-primary text-xl font-extrabold truncate">
            {tokenInfo?.name ?? 'Unknown'}
          </p>
        </div>
      </div>
      {/* Community Categories */}

      <div className="">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex justify-center w-full 
            rounded-md   px-4 py-2  text-sm 
            font-medium text-gray-700 ">
              <ChevronDownIcon
                className="mr-1 ml-2  h-5 w-5"
                aria-hidden="true"
              />
              {currentCategorie}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md 
            shadow-lg bg-white ring-1 
            ring-black ring-opacity-5
             focus:outline-none
             max-h-60 overflow-auto hideScrollBar
             ">
              <div className="py-1">
                <Menu.Items
                  className={ClassNamesLogic(
                    currentCategorie === 'All'
                      ? 'bg-gray-200'
                      : 'hover:bg-gray-100',
                    'py-1'
                  )}>
                  <button
                    type="button"
                    className="w-full"
                    onClick={() => setCurrentCategorie('All')}>
                    <div className="flex">
                      <p
                        className="px-4 w-52 truncate 
                    overflow-hidden  text-left  ">
                        All Topics
                      </p>
                    </div>
                  </button>
                </Menu.Items>
                {subsetCategoriesList !== undefined &&
                  subsetCategoriesList.map((categorie) => (
                    <Menu.Items
                      key={categorie.name}
                      className={ClassNamesLogic(
                        currentCategorie === categorie.name
                          ? 'bg-gray-200'
                          : 'hover:bg-gray-100',
                        'py-1'
                      )}>
                      <button
                        type="button"
                        className="w-full"
                        onClick={() => setCurrentCategorie(categorie.name)}>
                        <div className="flex">
                          <p
                            className="px-4 w-52 truncate 
                    overflow-hidden  text-left  ">
                            {categorie.name}
                          </p>
                          <p className="pr-3"> {categorie.count}</p>
                        </div>
                      </button>
                    </Menu.Items>
                  ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {/* <div className="text-base text-color-primary mt-8">
        <p className="font-bold px-4">CATEGORIES</p>
        <div className="mt-3 space-y-1.5">
          <div
            className={ClassNamesLogic(
              currentCategorie === 'All' ? 'bg-gray-300' : 'hover:bg-gray-200'
            )}>
            <button type="button" className="w-full">
              <p className="px-4 font-medium text-left ">All</p>
            </button>
          </div>
          {subsetCategoriesList !== undefined &&
            subsetCategoriesList.map((categorie) => (
              <div
                key={categorie.name}
                className={ClassNamesLogic(
                  currentCategorie === categorie.name
                    ? 'bg-gray-300'
                    : 'hover:bg-gray-200'
                )}>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setCurrentCategorie(categorie.name)}>
                  <div className="flex">
                    <p
                      className="px-4 w-52 truncate 
                    overflow-hidden font-medium text-left  ">
                      {categorie.name}
                    </p>
                    <p className="pr-3"> {categorie.count}</p>
                  </div>
                </button>
              </div>
            ))}
          {categoriesList !== undefined &&
            subsetCategoriesList !== undefined &&
            subsetCategoriesList.length < categoriesList.length && (
              <button
                type="button"
                className="px-3 text-qwestive-purple font-medium underline"
                onClick={() => {
                  setSubsetCategoriesList(
                    categoriesList?.slice(0, (categoriesViewCounter + 1) * 5)
                  );
                  setCategorieViewCounter(categoriesViewCounter + 1);
                }}>
                View more
              </button>
            )}
          {categoriesList !== undefined &&
            subsetCategoriesList !== undefined &&
            subsetCategoriesList.length > 5 &&
            categoriesViewCounter > 1 && (
              <button
                type="button"
                className="px-3 text-qwestive-purple font-medium underline"
                onClick={() => {
                  setSubsetCategoriesList(
                    categoriesList?.slice(0, (categoriesViewCounter - 1) * 5)
                  );
                  setCategorieViewCounter(categoriesViewCounter - 1);
                }}>
                View Less
              </button>
            )}
        </div>

        <div className="border-b border-gray-900 pt-3" />
      </div> */}
    </div>
  );
}
