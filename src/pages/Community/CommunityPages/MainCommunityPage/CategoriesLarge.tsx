import React, { useState } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';

import ClassNamesLogic from '../../../../common/components/Util/ClassNamesLogic';
import { Icategories } from '../../../../common/types';

import defaultUserProfileImage from '../../../../assets/defaultUserProfileImage.png';

type TcategoriesLarge = {
  tokenInfo: TokenInfo | undefined;
  categoriesList: Array<Icategories> | undefined;
  setCurrentCategorie: React.Dispatch<React.SetStateAction<string>>;
  currentCategorie: string;
};
export default function CategoriesLarge({
  tokenInfo,
  categoriesList,
  setCurrentCategorie,
  currentCategorie,
}: TcategoriesLarge): JSX.Element {
  const [categoriesViewCounter, setCategorieViewCounter] = useState(1);
  const [subsetCategoriesList, setSubsetCategoriesList] = useState(
    categoriesList?.slice(0, categoriesViewCounter * 5)
  );

  return (
    <div className=" w-full ">
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
      <div className="text-base text-color-primary mt-8">
        <p className="font-bold px-4">CATEGORIES</p>
        <div className="mt-3 space-y-1.5">
          <div
            className={ClassNamesLogic(
              currentCategorie === 'All Topics'
                ? 'bg-gray-300'
                : 'hover:bg-gray-200'
            )}>
            <button
              type="button"
              className="w-full"
              onClick={() => setCurrentCategorie('All Topics')}>
              <p className="px-4 font-medium text-left ">All Topics</p>
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
      </div>
    </div>
  );
}
