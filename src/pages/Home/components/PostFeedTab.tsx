import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import { IpostPreview } from '../../../common/types';
import { userTokensOwnedAtom } from '../../../recoil/userInfo';
import { userFinishedLoadingAtom } from '../../../recoil/appState';
import { queryPostFeed } from '../../../common/services/Firebase/GetData/PostUtils';

export default function PostFeedTab(): JSX.Element {
  const ownedTokens = useRecoilValue(userTokensOwnedAtom);
  const userFinishedLoading = useRecoilValue(userFinishedLoadingAtom);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState<IpostPreview[]>([]);

  async function getPostFeed() {
    setLoading(true);
    try {
      const tokenOwnedSlice = Object.keys(ownedTokens).slice(0, 10);
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
    <div className="mx-auto">
      <p>postfeed</p>
    </div>
  );
}
