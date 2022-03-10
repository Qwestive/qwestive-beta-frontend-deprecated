import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PublicKey,
  Connection,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
} from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import RichTextContainer from './components/RichTextContainer';
import CommentSection from './components/CommentSection';
import { IpostArticle } from '../../../common/types';
import PostActionsSection from './components/PostActionsSection';
import { getPostInfo } from '../../../common/services/Firebase/GetData/PostUtils';
import TipModal from './components/TipModal';

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
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tipAmmountInput, setTipAmmountInput] = useState('');

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  async function fetchPostData(
    targetPostId: string | undefined
  ): Promise<void> {
    if (targetPostId === undefined || targetPostId === null) {
      throw new Error('Invalid post ID: null');
    }
    setPostData(await getPostInfo(targetPostId));
    setIsLoading(false);
  }

  function handleOpenTipModal(receiver: string): void {
    setTipReceiverUserName(receiver);
    setIsTipModalOpen(true);
  }

  function handleSetTipAmmountInput(
    event: React.FormEvent<HTMLInputElement>
  ): void {
    setTipAmmountInput(event?.currentTarget.value);
  }

  const handleSendTip = async () => {
    const parsedTipAmmount = parseFloat(tipAmmountInput);
    if (!Number.isNaN(parsedTipAmmount)) {
      if (!publicKey) throw new WalletNotConnectedError();

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV'
          ),
          lamports: LAMPORTS_PER_SOL * parsedTipAmmount,
        })
      );

      const signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, 'processed');
      return true;
    }
    return false;
  };

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
              <h2>
                🥳 This is great! <b>{tipReceiverUserName}</b> will be happy to
                receive your tip!
              </h2>
              <div className="flex flex-row justify-center my-4 mx-auto">
                <input
                  className="rounded-lg"
                  type="text"
                  value={tipAmmountInput}
                  onChange={handleSetTipAmmountInput}
                />
                <button
                  type="submit"
                  className="btn-filled m-2"
                  onClick={() => handleSendTip()}>
                  Send!
                </button>
              </div>
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
            tipReceivingPublicKey={postData?.authorPublicKey ?? ''}
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
