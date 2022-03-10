import React, { useState } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';

import ClassNamesLogic from '../../../common/components/Util/ClassNamesLogic';
import { Icategory } from '../../../common/types';

import defaultUserProfileImage from '../../../assets/defaultUserProfileImage.png';

type TcategoriesLarge = {
  tokenInfo: TokenInfo | undefined;
  categoryList: Array<Icategory> | undefined;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
};
export default function CategoriesLarge({
  tokenInfo,
  categoryList,
  setCurrentCategory,
  currentCategory,
}: TcategoriesLarge): JSX.Element {
  const [categoriesViewCounter, setCategoriesViewCounter] = useState(1);
  const [subsetCategoryList, setSubsetCategoryList] = useState(
    categoryList?.slice(0, categoriesViewCounter * 5)
  );

  return (
    <div className="w-full ">
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
            className={
              currentCategory === 'All Topics'
                ? 'bg-gray-300'
                : 'hover:bg-gray-200'
            }>
            <button
              type="button"
              className="w-full"
              onClick={() => setCurrentCategory('All Topics')}>
              <p className="px-4 font-medium text-left">All Topics</p>
            </button>
          </div>
          {subsetCategoryList !== undefined &&
            subsetCategoryList.map((category) => (
              <div
                key={category.name}
                className={ClassNamesLogic(
                  currentCategory === category.name
                    ? 'bg-gray-300'
                    : 'hover:bg-gray-200'
                )}>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setCurrentCategory(category.name)}>
                  <div className="flex">
                    <p
                      className="px-4 w-52 truncate 
                    overflow-hidden font-medium text-left  ">
                      {category.name}
                    </p>
                    <p className="pr-3">{category.count}</p>
                  </div>
                </button>
              </div>
            ))}
          {categoryList !== undefined &&
            subsetCategoryList !== undefined &&
            subsetCategoryList.length < categoryList.length && (
              <button
                type="button"
                className="px-3 text-qwestive-purple font-medium underline"
                onClick={() => {
                  setSubsetCategoryList(
                    categoryList?.slice(0, (categoriesViewCounter + 1) * 5)
                  );
                  setCategoriesViewCounter(categoriesViewCounter + 1);
                }}>
                View more
              </button>
            )}
          {categoryList !== undefined &&
            subsetCategoryList !== undefined &&
            subsetCategoryList.length > 5 &&
            categoriesViewCounter > 1 && (
              <button
                type="button"
                className="px-3 text-qwestive-purple font-medium underline"
                onClick={() => {
                  setSubsetCategoryList(
                    categoryList?.slice(0, (categoriesViewCounter - 1) * 5)
                  );
                  setCategoriesViewCounter(categoriesViewCounter - 1);
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
