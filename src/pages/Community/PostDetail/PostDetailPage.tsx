import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RichTextContainer from './components/RichTextContainer';
import CommentSection from './components/CommentSection';
import { IpostArticle } from '../../../common/types';
import PostActionsSection from './components/PostActionsSection';
import { getPostInfo } from '../../../common/services/Firebase/GetData/PostUtils';
import TipModalContainer from './components/TipModalContainer';

/// Component which shows all of the information inside a post.
///
/// TODO:
/// - Add loading state.
/// - Add styling for "Post failed to load" message.
function PostDetailPage(): JSX.Element {
  const { postId } = useParams();
  const [postFailedToLoad, setPostFailedToLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState<IpostArticle | undefined>(undefined);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tipReceiverPublicKey, setTipReceiverPublicKey] = useState<string>();
  const [tipReceiverUserName, setTipReceiverUserName] = useState<string>();

  async function fetchPostData(
    targetPostId: string | undefined
  ): Promise<void> {
    if (targetPostId === undefined || targetPostId === null) {
      throw new Error('Invalid post ID: null');
    }
    setPostData(await getPostInfo(targetPostId));
    setIsLoading(false);
  }

  function handleOpenTipModal(
    receiverPublicKey: string,
    receiverUserName: string
  ): void {
    setTipReceiverUserName(receiverUserName);
    setTipReceiverPublicKey(receiverPublicKey);
    setIsTipModalOpen(true);
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
          <TipModalContainer
            isOpen={isTipModalOpen}
            setIsOpen={setIsTipModalOpen}
            tipReceiverPublicKey={tipReceiverPublicKey ?? ''}
            tipReceiverUserName={tipReceiverUserName ?? ''}
          />
          <RichTextContainer
            title={postData?.title}
            author={postData?.authorPublicKey}
            creationDate={postData?.creationDate}
            contents={postData?.content}
          />
          <PostActionsSection
            postId={postData?.id}
            upVotes={postData?.upVoteUserIds}
            downVotes={postData?.downVoteUserIds}
            numComments={postData?.numberOfComments ?? 0}
            authorUserName={postData?.authorUserName ?? ''}
            authorPublicKey={postData?.authorPublicKey ?? ''}
            tipCallback={(arg1, arg2) => handleOpenTipModal(arg1, arg2)}
          />
          <CommentSection
            postId={postId}
            tipCallback={(arg1, arg2) => handleOpenTipModal(arg1, arg2)}
          />
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
