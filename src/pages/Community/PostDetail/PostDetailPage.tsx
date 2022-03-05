import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RichTextContainer from './components/RichTextContainer';
import CommentSection from './components/CommentSection';
import { IpostData } from '../../../common/types';
import PostActionsSection from './components/PostActionsSection';
import { getPostInfo } from '../../../common/services/Firebase/GetData/PostUtils';

/// Component which shows all of the information inside a post.
///
/// TODO:
/// - Add loading state.
/// - Add styling for "Post failed to load" message.
function PostDetailPage(): JSX.Element {
  const { postId } = useParams();
  const [postFailedToLoad, setPostFailedToLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState<IpostData | undefined>(undefined);

  async function fetchPostData(
    targetPostId: string | undefined
  ): Promise<void> {
    if (targetPostId === undefined || targetPostId === null) {
      throw new Error('Invalid post ID: null');
    }
    setPostData(await getPostInfo(targetPostId));
    setIsLoading(false);
  }

  useEffect(() => {
    try {
      fetchPostData(postId);
    } catch (exception) {
      setIsLoading(false);
      setPostFailedToLoad(true);
    }
  }, [postId]);

  return (
    <div className="flex flex-col w-8/12 max-w-10/12 mx-auto py-10">
      {!isLoading && postFailedToLoad && <h1>Post failed to load</h1>}
      {!isLoading && !postFailedToLoad && (
        <>
          <RichTextContainer
            title={postData?.title}
            author={postData?.authorPublicKey}
            creationDate={postData?.creationDate}
            contents={postData?.contents}
          />
          <PostActionsSection
            upVotes={postData?.upVoteUserIds}
            downVotes={postData?.downVoteUserIds}
            numComments={postData?.numberOfComments ?? 0}
            tipReceivingPublicKey={postData?.authorPublicKey ?? ''}
          />
          <CommentSection postId={postId} />
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
