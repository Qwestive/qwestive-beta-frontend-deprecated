import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { queryPostPreviews } from '../../services/Firebase/GetData/PostUtils';
import CategoriesLarge from './components/CategoriesLarge';
import CategoriesSmall from './components/CategoriesSmall';
import PostDisplayList from './Feed/PostDisplayList';
import {
  IcommunityInfo,
  IpostPreview,
  TpostSorting,
  ItokenCommunity,
} from '../../types/types';

type TmemberCommunityPage = {
  tokenCommunity: ItokenCommunity | undefined;
};

export default function MemberCommunityPage({
  tokenCommunity,
}: TmemberCommunityPage): JSX.Element {
  const [postList, setPostList] = useState<Array<IpostPreview> | undefined>();

  const [currentPostSorting, setCurrentPostSorting] =
    useState<TpostSorting>('New');

  const [currentCategory, setCurrentCategory] = useState('All Topics');

  const [postsLoading, setPostsLoading] = useState(true);

  async function getPosts() {
    if (tokenCommunity?.cid !== undefined) {
      setPostsLoading(true);
      try {
        const qResult = await queryPostPreviews(
          tokenCommunity.cid,
          currentPostSorting,
          currentCategory
        );
        setPostList(qResult);

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error(error?.message);
      }
      setPostsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, [currentPostSorting, currentCategory]);

  return (
    <div>
      <div className="items-center w-full block md:hidden">
        <CategoriesSmall
          community={undefined}
          categoryList={tokenCommunity?.serverData?.categories}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      </div>
      <div className="flex mx-auto gap-5 mt-2 mb-2 ">
        <div className="items-center w-56 hidden md:block">
          <CategoriesLarge
            community={undefined}
            categoryList={tokenCommunity?.serverData?.categories}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
        <div className="w-full ">
          <PostDisplayList
            currentPostSorting={currentPostSorting}
            setCurrentPostSorting={setCurrentPostSorting}
            communityId={tokenCommunity?.cid}
            postList={postList}
            postsLoading={postsLoading}
          />
        </div>
      </div>
    </div>
  );
}
