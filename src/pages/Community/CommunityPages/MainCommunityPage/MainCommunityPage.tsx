import React, { useEffect, useState } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';
import { toast } from 'react-toastify';

import { getPostCategories } from '../../../../common/services/Firebase/GetData/CommunityUtil';
import { queryPosts } from '../../../../common/services/Firebase/GetData/PostUtils';

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
  { name: 'home' },
  { name: 'members' },
]; */

/* 

const fakeCategories = [
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
]; */

export default function MainCommunityPage({
  communityInfo,
  tokenInfo,
}: TnotAccessPage): JSX.Element {
  // const [currentTab, setCurrentTab] = useState(0);

  const [categoriesList, setCategoriesList] = useState<
    Array<Icategories> | undefined
  >();

  const [postList, setPostList] = useState<Array<IpostData> | undefined>();
  const [currentPostSorting, setCurrentPostSorting] =
    useState<TpostSorting>('New');

  const [currentCategorie, setCurrentCategorie] = useState('All Topics');

  const [postsLoading, setPostsLoading] = useState(true);

  async function GetPosts() {
    if (communityInfo?.cId !== undefined) {
      setPostsLoading(true);
      try {
        setPostList(
          await queryPosts(
            communityInfo.cId,
            currentPostSorting,
            currentCategorie
          )
        );

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error('Failed to load posts');
      }
      setPostsLoading(false);
    }
  }

  async function GetCategories() {
    if (communityInfo !== undefined) {
      try {
        setCategoriesList(await getPostCategories(communityInfo.cId));
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error('Failed to read post categories');
      }
    }
  }

  useEffect(() => {
    GetPosts();
  }, [currentPostSorting, currentCategorie]);

  useEffect(() => {
    GetCategories();
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
            postList={postList}
            postsLoading={postsLoading}
          />
        </div>
      </div>
    </div>
  );
}
