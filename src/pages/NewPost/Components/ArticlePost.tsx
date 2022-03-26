import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import WritePost from 'services/Firebase/WriteData/WritePost';
import { userInfoAtom } from 'services/recoil/userInfo';
import {
  IpostPreviewSubmission,
  IpostArticleSubmission,
  ARTICLE_TYPE,
} from '../../../types/types';
import CKeditorMaker from '../../../components/Posts/CKeditor/CKeditorMaker';
import PostTitleSection from './PostTitleSection';
import PostPermissionsSection from './PostPermissionsSection';
import PostCategorySection from './PostCategorySection';
import ActionButtonSection from './ActionButtonSection';

const MAXTITLELENGTH = 100;
const MINTITLELENGTH = 1;

const MAXARTICLELENGTH = 500000;
const MINARTICLELENGTH = 5;

const MAXCATEGORYLENGTH = 20;

type TarticlePost = {
  cId: string;
};

export default function ArticlePost({ cId }: TarticlePost): JSX.Element {
  const navigate = useNavigate();
  const userPublicKey = useRecoilValue(userInfoAtom)?.publicKey;
  const userName = useRecoilValue(userInfoAtom)?.userName;
  const userProfileImage = useRecoilValue(userInfoAtom)?.profileImage;

  const [title, setTitle] = useState('');
  const [articleText, setArticleText] = useState('');
  const [category, setCategory] = useState('');
  const [tokenRequirement, setTokenRequirement] = useState(0);
  const [postPublic, setPostPublic] = useState(true);
  const [publishDisabled, setPublishDisabled] = useState(false);

  async function handlePublish() {
    // check data is valid
    setPublishDisabled(true);
    try {
      if (title.length > MAXTITLELENGTH) {
        throw new Error('Title too long');
      }
      if (title.length < MINTITLELENGTH) {
        throw new Error(
          `The title should be at least ${MINTITLELENGTH} characters long`
        );
      }
      if (articleText.length > MAXARTICLELENGTH) {
        throw new Error('Article too long');
      }
      if (articleText.length < MINARTICLELENGTH) {
        throw new Error(
          `The post should be at least ${MINARTICLELENGTH} characters long`
        );
      }
      if (category.length > MAXCATEGORYLENGTH) {
        throw new Error('Topic too long');
      }

      if (userPublicKey !== undefined) {
        const postPreview: IpostPreviewSubmission = {
          postType: ARTICLE_TYPE,
          accessTokenId: cId,
          accessMinimumTokenBalance: tokenRequirement,
          authorUserId: userPublicKey,
          authorUserName: userName ?? '',
          authorPublicKey: userPublicKey,
          authorProfileImageUrl: userProfileImage ?? '',
          title,
          creationDate: new Date().getTime(),
          category,
          upVoteUserIds: [],
          downVoteUserIds: [],
          numberOfComments: 0,
        };
        const postArticle: IpostArticleSubmission = {
          ...postPreview,
          content: articleText,
        };
        const articleId = await WritePost(postPreview, postArticle);

        toast.success('post published');
        navigate(`/post/${articleId}`);
      } else {
        navigate('/');
      }
      /* eslint-disable-next-line */
    } catch (error: any) {
      toast.error(error?.message);
      setPublishDisabled(false);
    }
  }

  return (
    <div className="mb-5">
      <div className="p-4">
        {/* Title */}
        <PostTitleSection title={title} setTitle={setTitle} />
        {/* Content */}
        <CKeditorMaker
          maxLength={MAXARTICLELENGTH}
          text={articleText}
          setText={setArticleText}
        />
      </div>
      {/* Topic */}
      <PostCategorySection category={category} setCategory={setCategory} />
      {/* Exclusive Toggle */}
      <PostPermissionsSection
        postPublic={postPublic}
        setPostPublic={setPostPublic}
        tokenRequirement={tokenRequirement}
        setTokenRequirement={setTokenRequirement}
      />
      {/* Action Buttons */}
      <ActionButtonSection
        publishDisabled={publishDisabled}
        handlePublish={() => handlePublish()}
      />
    </div>
  );
}
