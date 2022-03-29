import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { queryPostPreviews } from 'services/Firebase/GetData/PostUtils';
import { IpostPreview, TpostSorting, ItokenCommunity } from 'types/types';
import CategoriesLarge from './Categories/CategoriesLarge';
import CategoriesSmall from './Categories/CategoriesSmall';
import PostDisplayList from './Components/PostDisplayList';
import NewPostPage from './NewPost/NewPostPage';
import PostDetailPage from './PostDetail/PostDetailPage';

type TmemberCommunityPage = {
  community: ItokenCommunity | undefined;
};

export default function MemberCommunityPage({
  community,
}: TmemberCommunityPage): JSX.Element {
  const [searchParams] = useSearchParams({});
  const [postId, setPostId] = useState(searchParams.get('post'));

  const [postList, setPostList] = useState<Array<IpostPreview> | undefined>();
  const [currentPostSorting, setCurrentPostSorting] =
    useState<TpostSorting>('New');
  const [currentCategory, setCurrentCategory] = useState('All Topics');

  const [postsLoading, setPostsLoading] = useState(true);

  async function getPosts() {
    if (community?.cid !== undefined) {
      setPostsLoading(true);
      try {
        const qResult = await queryPostPreviews(
          community.cid,
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
    <div className="w-max-100">
      <div className="items-center w-full block md:hidden">
        <CategoriesSmall
          community={community}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      </div>
      <div className="flex mx-auto gap-5 my-2">
        <div className="items-center hidden md:block">
          <CategoriesLarge
            community={community}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
        <div className="flex mx-auto gap-5 my-2">
          {!postId && (
            <PostDisplayList
              currentPostSorting={currentPostSorting}
              setCurrentPostSorting={setCurrentPostSorting}
              communityId={community?.cid}
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
