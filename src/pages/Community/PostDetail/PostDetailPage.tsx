import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userPublicKeyAtom } from '../../../recoil/userInfo';

function PostDetailPage(): JSX.Element {
  const { postId } = useParams();
  const [postFailedToLoad, setPostFailedToLoad] = useState(false);
  const [postData, setPostData] = useState('');

  async function fetchPostData(targetPostId: string): Promise<void> {
    setPostData(targetPostId);
  }

  useEffect(() => {
    try {
      fetchPostData(postId as string);
    } catch (exception) {
      setPostFailedToLoad(true);
    }
  }, [postId]);

  return (
    <div>
      {postFailedToLoad && <h1>Post could not be loaded</h1>}
      {!postFailedToLoad && <h1>Welcome to the post detail page</h1>}
    </div>
  );
}

export default PostDetailPage;
