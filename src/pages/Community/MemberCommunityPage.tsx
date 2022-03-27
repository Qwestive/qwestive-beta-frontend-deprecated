import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { queryPostPreviews } from 'services/Firebase/GetData/PostUtils';
import {
  Icommunity,
  IpostPreview,
  TpostSorting,
  IcommunityTokenInfo,
} from 'types/types';
import CategoriesLarge from './Categories/CategoriesLarge';
import CategoriesSmall from './Categories/CategoriesSmall';
import PostDisplayList from './Components/PostDisplayList';
import NewPostPage from './NewPost/NewPostPage';
import PostDetailPage from './PostDetail/PostDetailPage';

type TmemberCommunityPage = {
  communityInfo: Icommunity;
  communityTokenInfo: IcommunityTokenInfo | undefined;
};

export default function MemberCommunityPage({
  communityInfo,
  communityTokenInfo,
}: TmemberCommunityPage): JSX.Element {
  const [searchParams] = useSearchParams({});
  const [postId, setPostId] = useState(searchParams.get('post'));

  const [postList, setPostList] = useState<Array<IpostPreview> | undefined>();
  const [currentPostSorting, setCurrentPostSorting] =
    useState<TpostSorting>('New');
  const [currentCategory, setCurrentCategory] = useState('All Topics');

  const [postsLoading, setPostsLoading] = useState(true);

  async function getPosts() {
    if (communityInfo?.cId !== undefined) {
      setPostsLoading(true);
      try {
        const qResult = await queryPostPreviews(
          communityInfo.cId,
          currentPostSorting,
          currentCategory
        );
        setPostList(qResult);
      } catch (error: any) {
        toast.error(error?.message);
      }
      setPostsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, [currentPostSorting, currentCategory]);

  useEffect(() => {
    setPostId(searchParams.get('post'));
  }, [searchParams]);

  return (
    <div>
      <div className="items-center w-full block md:hidden">
        <CategoriesSmall
          communityTokenInfo={communityTokenInfo}
          categoryList={communityInfo?.categories}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      </div>
      <div className="flex mx-auto gap-5 mt-2 mb-2 ">
        <div className="items-center w-56 hidden md:block">
          <CategoriesLarge
            communityTokenInfo={communityTokenInfo}
            categoryList={communityInfo?.categories}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
        <div className="w-full ">
          {!postId && (
            <PostDisplayList
              currentPostSorting={currentPostSorting}
              setCurrentPostSorting={setCurrentPostSorting}
              communityInfo={communityInfo}
              postList={postList}
              postsLoading={postsLoading}
            />
          )}
          {postId === 'new-post' && <NewPostPage />}
          {postId && postId !== 'new-post' && (
            <PostDetailPage postId={postId} />
          )}
        </div>
      </div>
    </div>
  );
}
