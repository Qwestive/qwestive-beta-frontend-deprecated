import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import RichTextContainer from './components/RichTextContainer';
import CommentSection from './components/CommentSection';
import {
  IpostArticle,
  IpostPoll,
  ARTICLE_TYPE,
  POLL_TYPE,
} from '../../../types/types';
import PostActionsSection from './components/PostActionsSection';
import { getPostInfo } from '../../../services/Firebase/GetData/PostUtils';
import TipModalContainer from './components/TipModalContainer';
import PollContainer from './components/PollContainer';

/// Component which shows all of the information inside a post.
///
/// TODO:
/// - Add loading state.
/// - Add styling for "Post failed to load" message.
function PostDetailPage(): JSX.Element {
  const { postId } = useParams();
  const [postFailedToLoad, setPostFailedToLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState<
    IpostArticle | IpostPoll | undefined
  >(undefined);
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
      <Link
        className="flex flex-row"
        to={
          postData?.accessTokenId !== null &&
          postData?.accessTokenId !== undefined
            ? `/c/${postData?.accessTokenId}`
            : '/'
        }>
        <ArrowLeftIcon className="h-4 my-auto mx-1" /> Back
      </Link>
      {!isLoading && postFailedToLoad && <h1>Post failed to load</h1>}
      {!isLoading && !postFailedToLoad && (
        <>
          <TipModalContainer
            isOpen={isTipModalOpen}
            setIsOpen={setIsTipModalOpen}
            tipReceiverPublicKey={tipReceiverPublicKey ?? ''}
            tipReceiverUserName={tipReceiverUserName ?? ''}
          />
          <div className="bg-white rounded-md my-6 pt-6 px-6">
            {postData?.postType === POLL_TYPE && (
              <PollContainer
                title={postData?.title}
                author={postData?.authorPublicKey}
                creationDate={postData?.creationDate}
                contents={postData?.content}
                options={(postData as IpostPoll)?.options}
              />
            )}
            {postData?.postType === ARTICLE_TYPE && (
              <RichTextContainer
                title={postData?.title}
                author={postData?.authorPublicKey}
                authorProfileImageUrl={postData?.authorProfileImageUrl}
                creationDate={postData?.creationDate}
                contents={(postData as IpostArticle)?.content}
              />
            )}
            <PostActionsSection
              postId={postData?.id}
              upVotes={postData?.upVoteUserIds}
              downVotes={postData?.downVoteUserIds}
              numComments={postData?.numberOfComments ?? 0}
              authorUserName={postData?.authorUserName ?? ''}
              authorPublicKey={postData?.authorPublicKey ?? ''}
              tipCallback={(arg1, arg2) => handleOpenTipModal(arg1, arg2)}
            />
          </div>
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
