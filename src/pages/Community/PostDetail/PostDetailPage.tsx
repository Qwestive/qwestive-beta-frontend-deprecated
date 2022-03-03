import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RichTextContainer from './components/RichTextContainer';
import CommentSection from './components/CommentSection';
import { IpostData } from '../../../common/types';
import PostActionsSection from './components/PostActionsSection';
import { getPostInfo } from '../../../common/services/Firebase/GetData/PostUtils';

const comments = [
  {
    id: '1',
    authorUserName: 'metadiego',
    authorPublicKey: '123',
    authorProfileImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/qwestive-beta-prod.appspot.com/o/defaultImages%2FprofileImage%2FprofilePic.png?alt=media&token=c58be011-b854-43c5-9fee-3606f44184d0',
    body: 'This is a comment',
    numberOfSubComments: 2,
    comments: [],
  },
  {
    id: '2',
    authorUserName: 'metadiego',
    authorPublicKey: '123',
    authorProfileImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/qwestive-beta-prod.appspot.com/o/defaultImages%2FprofileImage%2FprofilePic.png?alt=media&token=c58be011-b854-43c5-9fee-3606f44184d0',
    body: 'This is a comment',
    numberOfSubComments: 2,
    comments: [],
  },
];

const otherComments = [
  {
    id: '1',
    authorUserName: 'metadiego',
    authorPublicKey: '123',
    authorProfileImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/qwestive-beta-prod.appspot.com/o/defaultImages%2FprofileImage%2FprofilePic.png?alt=media&token=c58be011-b854-43c5-9fee-3606f44184d0',
    body: 'This is a comment',
    numberOfSubComments: 2,
    comments: [],
  },
  {
    id: '2',
    authorUserName: 'metadiego',
    authorPublicKey: '123',
    authorProfileImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/qwestive-beta-prod.appspot.com/o/defaultImages%2FprofileImage%2FprofilePic.png?alt=media&token=c58be011-b854-43c5-9fee-3606f44184d0',
    body: 'This is a comment',
    numberOfSubComments: 2,
    comments,
  },
];

function PostDetailPage(): JSX.Element {
  const { postId } = useParams();
  const [postFailedToLoad, setPostFailedToLoad] = useState(false);
  const [postData, setPostData] = useState<IpostData | undefined>(undefined);

  async function fetchPostData(
    targetPostId: string | undefined
  ): Promise<void> {
    if (targetPostId === undefined || targetPostId === null) {
      throw new Error('Invalid post ID: null');
    }
    // setPostData({
    //   postId: '123',
    //   postType: 'article',
    //   accessTokenId: '123',
    //   accessMinimumTokenBalance: 0,
    //   authorUserName: 'metadiego',
    //   authorPublicKey: 'diego',
    //   authorProfileImageUrl: '',
    //   title: 'The impact of Russia-Ukraine war on the BTC Price',
    //   contents:
    //     '<h1>This are the contents of the post with some injected code:</h1> <img src=x onerror=alert(1)//>',
    //   numberOfComments: 10,
    //   upVoteUserIds: [],
    //   downVoteUserIds: [],
    //   creationDate: new Date(),
    // });
    setPostData(await getPostInfo(targetPostId));
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
      {postFailedToLoad && <h1>Post failed to load</h1>}
      {!postFailedToLoad && (
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
          <CommentSection comments={[]} />
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
