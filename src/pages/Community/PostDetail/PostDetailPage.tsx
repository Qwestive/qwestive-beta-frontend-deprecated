import React, { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RichTextContainer from './components/RichTextContainer';
import CommentSection from './components/CommentSection';
import { IpostArticle, IpostCommentSubmission } from '../../../common/types';
import PostActionsSection from './components/PostActionsSection';
import { getPostInfo } from '../../../common/services/Firebase/GetData/PostUtils';
import TipModal from './components/TipModal';
import { SendTipButton } from './components/SendTipButton';

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
  const [tipReceiverUserName, setTipReceiverUserName] = useState('');
  const [tipReceiverPublicKey, setTipReceiverPublicKey] = useState('');
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tipAmmountInput, setTipAmmountInput] = useState(0);
  const [tipSuccess, setTipSuccess] = useState(false);
  const [postComment, setPostComment] =
    useState<SetStateAction<IpostCommentSubmission | undefined>>();

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

  function handleSetTipAmmountInput(
    event: React.FormEvent<HTMLInputElement>
  ): void {
    setTipAmmountInput(event?.currentTarget.valueAsNumber);
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
          <TipModal open={isTipModalOpen} setOpen={setIsTipModalOpen}>
            <div className="flex flex-col text-center">
              {!tipSuccess && (
                <>
                  <h2>
                    🥳 This is great! <b>{tipReceiverUserName}</b> will be happy
                    to receive your tip!
                    <p className="text-xs text-color-secondary">
                      Receiver Public Key: {tipReceiverPublicKey}
                    </p>
                  </h2>
                  <div className="flex flex-row justify-center my-4 mx-auto">
                    <input
                      className="rounded-lg"
                      type="number"
                      value={tipAmmountInput}
                      onChange={handleSetTipAmmountInput}
                    />
                    <SendTipButton
                      toPublicKey={tipReceiverPublicKey}
                      solAmmount={tipAmmountInput}
                      transactionCompleteCallback={(result: boolean) =>
                        setTipSuccess(result)
                      }
                    />
                  </div>
                </>
              )}
              {tipSuccess && (
                <div>
                  <h1 className="text-green-500	text-3xl">
                    Transaction success!
                  </h1>
                </div>
              )}
            </div>
          </TipModal>
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
            // eslint-disable-next-line react/jsx-no-bind
            tipCallback={handleOpenTipModal}
          />
          <CommentSection postId={postId} />
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
