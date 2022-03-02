import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userPublicKeyAtom } from '../../../recoil/userInfo';
import RichTextContainer from './components/RichTextContainer';
import CommentSection from './components/CommentSection';
import { PostData } from './components/Types';
import PostActionsSection from './components/PostActionsSection';

const comments = [
  {
    id: '1',
    authorPublicKey: '123',
    body: 'This is a comment',
    numberOfSubComments: 2,
    comments: [],
  },
  {
    id: '2',
    authorPublicKey: '125',
    body: 'This is another comment',
    numberOfSubComments: 2,
    comments: [],
  },
];

function PostDetailPage(): JSX.Element {
  const { postId } = useParams();
  const [postFailedToLoad, setPostFailedToLoad] = useState(false);
  const [postData, setPostData] = useState<PostData | undefined>(undefined);

  async function fetchPostData(
    targetPostId: string | undefined
  ): Promise<void> {
    if (targetPostId === undefined || targetPostId === null) {
      throw new Error('Invalid post ID: null');
    }
    setPostData({
      postId: '123',
      postType: 'article',
      accessTokenId: '123',
      accessMinimumTokenBalance: 0,
      authorPublicKey: 'diego',
      title: 'The impact of Russia-Ukraine war on the BTC Price',
      contents:
        '<h1>This are the contents of the post with some injected code:</h1> <img src=x onerror=alert(1)//>',
      numberOfComments: 10,
      numberOfViews: 10,
      numberOfVotes: 10,
      creationDate: new Date(),
      comments: [
        {
          id: '1',
          authorPublicKey: '0x123',
          body: 'This is a comment',
          numberOfSubComments: 2,
          comments,
        },
        {
          id: '2',
          authorPublicKey: '0x125',
          body: 'This is another comment',
          numberOfSubComments: 2,
          comments,
        },
      ],
    });
  }

  useEffect(() => {
    try {
      fetchPostData(postId);
    } catch (exception) {
      setPostFailedToLoad(true);
    }
  }, [postId]);

  return (
    <div className="flex flex-col w-8/12 max-w-10/12 mx-auto py-10">
      {postFailedToLoad && <h1>Post could not be loaded</h1>}
      {!postFailedToLoad && (
        <>
          <RichTextContainer
            title={postData?.title}
            author={postData?.authorPublicKey}
            creationDate={postData?.creationDate}
            contents={postData?.contents}
          />
          <PostActionsSection
            numVotes={postData?.numberOfVotes ?? 0}
            numComments={postData?.numberOfComments ?? 0}
            numViews={postData?.numberOfViews ?? 0}
            tipReceivingPublicKey={postData?.authorPublicKey ?? ''}
          />
          <CommentSection comments={postData?.comments ?? []} />
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
