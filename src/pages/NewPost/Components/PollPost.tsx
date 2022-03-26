import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import WritePost from 'services/Firebase/WriteData/WritePost';
import { userInfoAtom } from 'services/recoil/userInfo';
import {
  IpostPreviewSubmission,
  IpostPollSubmission,
  POLL_TYPE,
} from '../../../types/types';
import CKeditorMaker from '../../../components/Posts/CKeditor/CKeditorMaker';
import PostTitleSection from './PostTitleSection';
import PostPermissionsSection from './PostPermissionsSection';
import PostCategorySection from './PostCategorySection';
import ActionButtonSection from './ActionButtonSection';
import PollOption from './PollOption';

const MAXTITLELENGTH = 100;
const MINTITLELENGTH = 1;

const MAXARTICLELENGTH = 500000;
const MINARTICLELENGTH = 5;

const MAXCATEGORYLENGTH = 20;

type TpollPost = {
  cId: string;
};

type TpollOption = {
  id: string;
  name: string;
};

export default function PollPost({ cId }: TpollPost): JSX.Element {
  const navigate = useNavigate();
  const userPublicKey = useRecoilValue(userInfoAtom)?.publicKey;
  const userName = useRecoilValue(userInfoAtom)?.userName;
  const userProfileImage = useRecoilValue(userInfoAtom)?.profileImage;
  /// Creates a new empty option.
  const buildNewOption = (): TpollOption => ({
    id: Date.now().toString(),
    name: '',
  });

  const [title, setTitle] = useState('');
  const [articleText, setArticleText] = useState('');
  const [category, setCategory] = useState('');
  const [tokenRequirement, setTokenRequirement] = useState(0);
  const [postPublic, setPostPublic] = useState(true);
  const [publishDisabled, setPublishDisabled] = useState(false);
  const [pollOptions, setPollOptions] = useState<Array<TpollOption>>(() => [
    buildNewOption(),
  ]);

  function handleRemoveOption(id: string) {
    setPollOptions((currentPollOptions) => {
      const filteredOptions = currentPollOptions?.filter(
        (item) => item.id !== id
      );
      return filteredOptions;
    });
  }

  function handleAddOption() {
    const newOption = buildNewOption();
    setPollOptions([...pollOptions, newOption]);
  }

  const updateOption = (id: string, name: string) => {
    setPollOptions((currentPollOptions) => {
      const idx = currentPollOptions?.findIndex(
        (item: TpollOption) => item.id === id
      );

      const filteredOptions = currentPollOptions?.filter(
        (item) => item.id !== id
      );

      filteredOptions?.splice(idx, 0, {
        id,
        name,
      });
      return filteredOptions;
    });
  };

  /// TODO: add checks to prevent that empty options are sent to DB.
  async function handlePublish() {
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
          postType: POLL_TYPE,
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
        const post: IpostPollSubmission = {
          ...postPreview,
          content: articleText,
          options: pollOptions.map((item) => ({ ...item, voteUserIds: [] })),
        };
        const articleId = await WritePost(postPreview, post);

        toast.success('Post published!');
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
        {pollOptions.map((item: TpollOption) => (
          <PollOption
            key={item.id}
            optionId={item.id}
            setOptionName={(id: string, name: string) => updateOption(id, name)}
            removeOption={(id: string) => handleRemoveOption(id)}
          />
        ))}
        <button
          type="button"
          className="mx-4 mb-3 btn-link"
          onClick={() => handleAddOption()}>
          Add Option
        </button>
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
