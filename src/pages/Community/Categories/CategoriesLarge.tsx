import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import { Icategory, ItokenCommunity } from 'types/types';

import defaultUserProfileImage from 'assets/defaultUserProfileImage.png';

type TcategoriesLarge = {
  community: ItokenCommunity | undefined;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
};

export default function CategoriesLarge({
  community,
  setCurrentCategory,
  currentCategory,
}: TcategoriesLarge): JSX.Element {
  const [, setSearchParams] = useSearchParams({});
  const [categoriesViewCounter, setCategoriesViewCounter] = useState(1);
  const [categories, setCategories] = useState<Array<Icategory>>([]);
  const [categoriesSubset, setCategoriesSubset] = useState<Array<Icategory>>(
    []
  );

  useEffect(() => {
    setCategories(community?.communityData?.categories ?? []);
    setCategoriesSubset(
      community?.communityData?.categories?.slice(
        0,
        categoriesViewCounter * 5
      ) ?? []
    );
  }, [community?.communityData?.categories]);

  return (
    <div className="w-full ">
      {/* Token Infos */}
      <div>
        <div className="flex items-center py-2 gap-2 justify-left">
          <img
            src={community?.imageUrl ?? defaultUserProfileImage}
            className="h-12"
            alt="tokenImage"
          />
          <p className="text-color-0 text-xl font-extrabold truncate">
            {community?.name ?? 'Unknown'}
          </p>
        </div>
      </div>
      {/* Community Categories */}
      <div className="text-base text-color-0 mt-8">
        <p className="font-bold px-4">CATEGORIES</p>
        <div className="mt-3 space-y-1.5">
          <div
            className={ClassNamesLogic(
              currentCategory === 'All'
                ? 'bg-qwestive-gray-2 dark:bg-gray-700'
                : 'hover:bg-gray-200 dark:hover:bg-gray-800',
              'rounded-md'
            )}>
            <button
              type="button"
              className="w-full"
              onClick={() => {
                setCurrentCategory('All');
                setSearchParams('');
              }}>
              <p className="px-4 font-bold text-left">All</p>
            </button>
          </div>
          {categoriesSubset.map((category) => (
            <div
              key={category.name}
              className={ClassNamesLogic(
                currentCategory === category.name
                  ? 'rounded-lg bg-qwestive-gray-2 dark:bg-gray-700'
                  : 'rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800',
                'rounded-md'
              )}>
              <button
                type="button"
                className="w-full"
                onClick={() => {
                  setCurrentCategory(category.name);
                  setSearchParams('');
                }}>
                <div className="flex">
                  <p
                    className="px-4 w-52 truncate 
                  overflow-hidden text-left">
                    {category.name}
                  </p>
                  <p className="pr-3">{category.count}</p>
                </div>
              </button>
            </div>
          ))}
          {categoriesSubset.length < categories.length && (
            <button
              type="button"
              className="px-3 text-qwestive-purple underline"
              onClick={() => {
                setCategoriesSubset(
                  categories?.slice(0, (categoriesViewCounter + 1) * 5)
                );
                setCategoriesViewCounter(categoriesViewCounter + 1);
              }}>
              View more
            </button>
          )}
          {categoriesSubset.length > 5 && categoriesViewCounter > 1 && (
            <button
              type="button"
              className="px-3 text-qwestive-purple font-medium underline"
              onClick={() => {
                setCategoriesSubset(
                  categories?.slice(0, (categoriesViewCounter - 1) * 5)
                );
                setCategoriesViewCounter(categoriesViewCounter - 1);
              }}>
              View Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
