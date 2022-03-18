import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import PostPreviewCard from '../../Community/Feed/PostPreviewCard';
import { IpostPreview } from '../../../common/types';
import { userTokensOwnedAtom } from '../../../recoil/userInfo';
import { userFinishedLoadingAtom } from '../../../recoil/appState';
import { queryPostFeed } from '../../../common/services/Firebase/GetData/PostUtils';
import LoadingDots from '../../../common/components/Util/LoadingDots';

export default function PostFeedTab(): JSX.Element {
  const ownedTokens = useRecoilValue(userTokensOwnedAtom);
  const userFinishedLoading = useRecoilValue(userFinishedLoadingAtom);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState<IpostPreview[]>([]);

  async function getPostFeed() {
    setLoading(true);
    try {
      const tokenOwnedSlice = Object.keys(ownedTokens).slice(0, 10);
      // Array.from(ownedTokens.keys()).slice(0, 10);
      const queryPosts = await queryPostFeed(tokenOwnedSlice);
      setPostList(queryPosts);
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      toast.error(error?.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (userFinishedLoading) {
      getPostFeed();
    }
  }, [ownedTokens, userFinishedLoading]);

  return (
    <div>
      {loading && (
        <div>
          <div
            className="text-primary gap-2 items-baseline 
          flex justify-center mt-10">
            <div className="text-center text-2xl font-semibold ">
              Scanning your wallet
            </div>
            <LoadingDots classNameExtend="h-2 w-2" />
          </div>
        </div>
      )}
      {!loading && postList.length > 0 && (
        <div>
          <div className="p-3 flex justify-between">
            <p className="text-sm">Posts</p>
            <div className=" w-24 grid grid-cols-2 text-center">
              <p className="text-sm">Replies</p>
              <p className="text-sm">Likes</p>
            </div>
          </div>
          <div className="space-y-3">
            {postList?.map((post) => (
              <div key={post.creationDate}>
                <PostPreviewCard post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!loading && postList.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-xl font-bold text-color-primary">
            Your feed is empty
          </p>
          <p className="text-lg font-semibold text-color-primary">
            Create new communities or buy new tokens
          </p>
        </div>
      )}
    </div>
  );
}
