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
};

export default function MemberCommunityPage({
  community,
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

  /// Builds a list of post previews for current state of the component.
  async function getPostPreviews(
    useStartSnap: boolean
  ): Promise<
    [IpostPreview[], QueryDocumentSnapshot<IpostPreview> | undefined]
  > {
    try {
      return queryPostPreviews(
        community?.cid as string,
        currentPostSorting,
        currentCategory,
        useStartSnap ? lastVisible : undefined,
        BATCHLENGHT
      );
    } catch (error: any) {
      toast.error(`Failed to retrieve posts: ${error.message}`);
    }
    return [[], undefined];
  }

  /// Updates post batch list optionally including or not including the
  /// pre-existing batch in the updated list.
  async function updatePostBatchList(includePreviousBatch: boolean) {
    if (community?.cid !== undefined) {
      setPostsLoading(true);
      const [qBatchResult, lastVisibleFetch] = await getPostPreviews(
        includePreviousBatch
      );

      setLastVisible(lastVisibleFetch);
      setHasMorePost(qBatchResult.length === BATCHLENGHT);
      setPostBatchList([
        ...(includePreviousBatch ? postBatchList : []),
        qBatchResult,
      ]);
      setPostsLoading(false);
    }
  }

  /// Adds a new batch of post retuned from post query to existing post
  /// batch list.
  async function addBatchToPostBatchList() {
    updatePostBatchList(true);
  }

  /// Restarts the post batch list with posts returned from post query.
  async function createNewPostBatchList() {
    updatePostBatchList(false);
  }

  useEffect(() => {
    createNewPostBatchList();
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
      <div className="flex mx-auto gap-5 my-2">
        <div className="items-center hidden md:block w-52">
          <CategoriesLarge
            community={community}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
        <div className="w-full">
          {!postId && (
            <PostDisplayList
              currentPostSorting={currentPostSorting}
              setCurrentPostSorting={setCurrentPostSorting}
              communityId={community?.cid}
              postBatchList={postBatchList}
              hasMorePost={hasMorePost}
              postsLoading={postsLoading}
              loadMorePosts={() => addBatchToPostBatchList()}
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
