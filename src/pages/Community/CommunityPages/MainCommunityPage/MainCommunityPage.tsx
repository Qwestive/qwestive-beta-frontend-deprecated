import React, { useEffect, useState } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';

import { getPostCategories } from '../../../../common/services/Firebase/GetData/CommunityUtil';

import CategoriesLarge from './CategoriesLarge';
import CategoriesSmall from './CategoriesSmall';
import PostDisplayList from './PostDisplayList';

import {
  Icommunity,
  IpostData,
  Icategories,
  TpostSorting,
} from '../../../../common/types';

type TnotAccessPage = {
  communityInfo: Icommunity | undefined;
  tokenInfo: TokenInfo | undefined;
};

/* 
for when we have members 
const tabs = [
  { name: 'home', idx: 0 },
  { name: 'members', idx: 1 },
]; */

const falseCategories = [
  { name: 'Ideas', count: 10 },
  { name: 'eeee', count: 10 },
  { name: 'svsvdvdfsv', count: 10 },
  { name: 'sdvsdvsvsd', count: 10 },
  { name: 'fssdvsdv', count: 10 },
  { name: 'ffvddfvf', count: 10 },
  { name: 'ddd', count: 10 },
  { name: 'eeere', count: 10 },
  { name: 'fhfght', count: 10 },
  { name: 'ddrgytd', count: 10 },
  { name: 'eeerrrre', count: 10 },
  { name: 'fhfwqght', count: 10 },
  {
    name: 'fijfohffffffffffffffffffffffffffffijhdfffssssffovihdfovi',
    count: 10,
  },
  { name: 'Finance', count: 10 },
  { name: 'Pooo', count: 10 },
];

export default function MainCommunityPage({
  communityInfo,
  tokenInfo,
}: TnotAccessPage): JSX.Element {
  // const [currentTab, setCurrentTab] = useState(0);

  const [categoriesList, setCategoriesList] = useState<
    Array<Icategories> | undefined
  >(falseCategories);

  const [postList, setPostList] = useState<Array<IpostData> | undefined>();
  const [currentPostSorting, setCurrentPostSorting] =
    useState<TpostSorting>('New');

  const [currentCategorie, setCurrentCategorie] = useState('All Topics');

  async function GetPosts() {
    // fetch posts
    console.log('getting posts');
  }

  async function GetCategories() {
    if (communityInfo !== undefined) {
      setCategoriesList(await getPostCategories(communityInfo.cId));
    }
  }

  useEffect(() => {
    GetCategories();
    GetPosts();
  }, []);

  return (
    <div>
      <div className="items-center w-full block md:hidden">
        <CategoriesSmall
          tokenInfo={tokenInfo}
          categoriesList={categoriesList}
          setCurrentCategorie={setCurrentCategorie}
          currentCategorie={currentCategorie}
        />
      </div>
      <div className="flex mx-auto gap-5 mt-2 mb-2 ">
        <div className="items-center w-56 hidden md:block">
          <CategoriesLarge
            tokenInfo={tokenInfo}
            categoriesList={categoriesList}
            setCurrentCategorie={setCurrentCategorie}
            currentCategorie={currentCategorie}
          />
        </div>

        <div className="w-full ">
          <PostDisplayList
            currentPostSorting={currentPostSorting}
            setCurrentPostSorting={setCurrentPostSorting}
            communityInfo={communityInfo}
          />
        </div>
      </div>
    </div>
  );
}
