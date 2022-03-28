import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { queryPostPreviews } from 'services/Firebase/GetData/PostUtils';
import { IpostPreview, TpostSorting, ItokenCommunity } from 'types/types';
import CategoriesLarge from './Categories/CategoriesLarge';
import CategoriesSmall from './Categories/CategoriesSmall';
import PostDisplayList from './Components/PostDisplayList';
import NewPostPage from './NewPost/NewPostPage';
import PostDetailPage from './PostDetail/PostDetailPage';

const BATCHLENGHT = 8;

type TmemberCommunityPage = {
  community: ItokenCommunity | undefined;
  setReloadToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MemberCommunityPage({
  community,
  setReloadToggle,
}: TmemberCommunityPage): JSX.Element {
  const [searchParams] = useSearchParams({});
  const [postId, setPostId] = useState(searchParams.get('post'));
  const [postBatchList, setPostBatchList] = useState<Array<IpostPreview[]>>([]);
  const [lastVisible, setLastVisible] = useState<
    QueryDocumentSnapshot<IpostPreview> | undefined
  >();
  const [hasMorePost, setHasMorePost] = useState(false);

  const [currentPostSorting, setCurrentPostSorting] =
    useState<TpostSorting>('New');
  const [currentCategory, setCurrentCategory] = useState('All Topics');

  const [postsLoading, setPostsLoading] = useState(true);

  async function getPostBatch() {
    if (community?.cid !== undefined) {
      setPostsLoading(true);
      try {
        const [qBatchResult, lastVisibleFetch] = await queryPostPreviews(
          community.cid,
          currentPostSorting,
          currentCategory,
          lastVisible,
          BATCHLENGHT
        );
        setLastVisible(lastVisibleFetch);
        if (qBatchResult.length === BATCHLENGHT) {
          setPostBatchList([...postBatchList, qBatchResult.slice(0, -1)]);
          setHasMorePost(true);
        } else {
          setPostBatchList([...postBatchList, qBatchResult]);
          setHasMorePost(false);
        }
      } catch (error: any) {
        toast.error(error?.message);
      }
      setPostsLoading(false);
    }
  }

  useEffect(() => {
    console.log(postBatchList.length);
    getPostBatch();
  }, [currentPostSorting, currentCategory]);

  useEffect(() => {
    setPostId(searchParams.get('post'));
  }, [searchParams]);

  return (
    <div>
      <div className="items-center w-full block md:hidden">
        <CategoriesSmall
          community={community}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      </div>
      <div className="flex mx-auto gap-5 mt-2 mb-2 ">
        <div className="items-center w-56 hidden md:block">
          <CategoriesLarge
            community={community}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
        <div className="w-full ">
          {!postId && (
            <PostDisplayList
              currentPostSorting={currentPostSorting}
              setCurrentPostSorting={setCurrentPostSorting}
              communityId={community?.cid}
              postBatchList={postBatchList}
              hasMorePost={hasMorePost}
              postsLoading={postsLoading}
              getPostBatch={() => getPostBatch()}
            />
          )}
          {postId === 'new-post' && (
            <NewPostPage setReloadCommunityPageToggle={setReloadToggle} />
          )}
          {postId && postId !== 'new-post' && (
            <PostDetailPage postId={postId} />
          )}
        </div>
      </div>
    </div>
  );
}
