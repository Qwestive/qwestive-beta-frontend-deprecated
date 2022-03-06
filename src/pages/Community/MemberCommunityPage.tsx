import React, { useEffect, useState } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';
import { toast } from 'react-toastify';

import { getPostCategories } from '../../common/services/Firebase/GetData/CommunityUtil';
import { queryPosts } from '../../common/services/Firebase/GetData/PostUtils';
import CategoriesLarge from './components/CategoriesLarge';
import CategoriesSmall from './components/CategoriesSmall';
import PostDisplayList from './Feed/PostDisplayList';

import {
  Icommunity,
  IpostData,
  Icategories,
  TpostSorting,
} from '../../common/types';

type TmemberCommunityPage = {
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

export default function MemberCommunityPage({
  communityInfo,
  tokenInfo,
}: TmemberCommunityPage): JSX.Element {
  const [categoryList, setCategoryList] = useState<
    Array<Icategories> | undefined
  >();

  const [postList, setPostList] = useState<Array<IpostData> | undefined>();
  const [currentPostSorting, setCurrentPostSorting] =
    useState<TpostSorting>('New');

  const [currentCategory, setCurrentCategory] = useState('All Topics');

  const [postsLoading, setPostsLoading] = useState(true);

  async function GetPosts() {
    if (communityInfo?.cId !== undefined) {
      setPostsLoading(true);
      try {
        setPostList(
          await queryPosts(
            communityInfo.cId,
            currentPostSorting,
            currentCategory
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
        setCategoryList(await getPostCategories(communityInfo.cId));
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error('Failed to read post categories');
      }
    }
  }

  useEffect(() => {
    GetPosts();
  }, [currentPostSorting, currentCategory]);

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <div>
      <div className="items-center w-full block md:hidden">
        <CategoriesSmall
          tokenInfo={tokenInfo}
          categoryList={categoryList}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      </div>
      <div className="flex mx-auto gap-5 mt-2 mb-2 ">
        <div className="items-center w-56 hidden md:block">
          <CategoriesLarge
            tokenInfo={tokenInfo}
            categoryList={categoryList}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
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
