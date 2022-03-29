import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';

import {
  IpostArticle,
  IpostPoll,
  IpostContentType,
  IpostPreview,
  ARTICLE_TYPE,
  POLL_TYPE,
} from 'types/types';
import PostActionsSection from 'components/Posts/PostsReader/PostReaderAction/PostActionsSection';
import {
  getPostContent,
  getPostPreview,
} from 'services/Firebase/GetData/PostUtils';
import TipModalContainer from 'components/Posts/PostsReader/PostReaderAction/Tipping/TipModalContainer';
import PollContainer from 'components/Posts/PostsReader/PostReaderContent/PollContainer';
import RichTextContainer from 'components/Posts/PostsReader/PostReaderContent/RichTextContainer';
import CommentSection from 'components/Posts/PostsReader/PostComment/CommentSection';

/// Component which shows all of the information inside a post.
///
/// TODO:
/// - Add loading state.
/// - Add styling for "Post failed to load" message.

type TpostDetailPage = {
  postId: string;
};

export default function PostDetailPage({
  postId,
}: TpostDetailPage): JSX.Element {
  const [postContent, setPostContent] = useState<IpostContentType | undefined>(
    undefined
  );
  const [postPreview, setPostPreview] = useState<IpostPreview | undefined>(
    undefined
  );
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tipReceiverPublicKey, setTipReceiverPublicKey] = useState<string>();
  const [tipReceiverUserName, setTipReceiverUserName] = useState<string>();

  const [postFailedToLoad, setPostFailedToLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPostData(
    targetPostId: string | undefined
  ): Promise<void> {
    setIsLoading(true);
    try {
      if (targetPostId === undefined || targetPostId === null) {
        throw new Error('Invalid post ID: null');
      }
      const postPreviewFetched = await getPostPreview(targetPostId);
      if (postPreviewFetched === undefined) throw new Error('Post not found');
      setPostPreview(postPreviewFetched);
      const postContentFetched = await getPostContent(targetPostId);
      if (postContentFetched === undefined) throw new Error('Post not found');
      setPostContent(postContentFetched);
    } catch (error: any) {
      toast.error(error?.message);
      setPostFailedToLoad(true);
    }
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
    fetchPostData(postId);
  }, [postId]);

  return (
    <div className="flex flex-col w-full mx-auto py-10">
      <Link
        className="flex flex-row"
        to={postPreview?.accessId ? `/c/${postPreview?.accessId}` : '/'}>
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
            {postPreview?.postType === POLL_TYPE && (
              <PollContainer
                title={postPreview?.title}
                author={postPreview?.authorPublicKey}
                creationDate={postPreview?.creationDate}
                contents={postContent?.content}
                options={(postContent as IpostPoll)?.options}
              />
            )}
            {postPreview?.postType === ARTICLE_TYPE && (
              <RichTextContainer
                title={postPreview?.title}
                author={postPreview?.authorPublicKey}
                authorProfileImageUrl={postPreview?.authorProfileImageUrl}
                creationDate={postPreview?.creationDate}
                contents={(postContent as IpostArticle)?.content}
              />
            )}
            <PostActionsSection
              postId={postPreview?.id}
              upVotes={postPreview?.upVoteUserIds}
              downVotes={postPreview?.downVoteUserIds}
              numComments={postPreview?.numberOfComments ?? 0}
              authorUserName={postPreview?.authorUserName ?? ''}
              authorPublicKey={postPreview?.authorPublicKey ?? ''}
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
