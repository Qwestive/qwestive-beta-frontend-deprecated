import React, {
  ReactChildren,
  ReactChild,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toggleReloadCommunityAtom } from 'services/recoil/appState';
import WritePost from 'services/Firebase/WriteData/WritePost';
import PostSaveVerification from 'functions/InputVerification/PostSaveVerification';
import { IpostPreviewSubmission, IpostContentType } from 'types/types';
import PostPermissionsSection from './PostPermissionsSection';
import ActionButtonSection from './ActionButtonSection';

const MAXTITLELENGTH = 100;
const MINTITLELENGTH = 1;

export const MAXARTICLELENGTH = 500000;
const MINARTICLELENGTH = 0;

const MAXCATEGORYLENGTH = 20;

type TpostContainer = {
  children: ReactChildren | ReactChild;
  postPreviewSubmission: IpostPreviewSubmission;
  setPostPreviewSubmission: Dispatch<SetStateAction<IpostPreviewSubmission>>;
  getPostContent: () => IpostContentType;
};

export default function PostMakerContainer({
  children,
  postPreviewSubmission,
  setPostPreviewSubmission,
  getPostContent,
}: TpostContainer): JSX.Element {
  const navigate = useNavigate();
  const [disableEdit, setDisableEdit] = useState(false);
  const [, setToggleReloadCommunity] = useRecoilState(
    toggleReloadCommunityAtom
  );

  async function handlePublish() {
    setDisableEdit(true);
    try {
      const postContent = getPostContent();
      PostSaveVerification(
        postPreviewSubmission,
        postContent,
        MAXTITLELENGTH,
        MINTITLELENGTH,
        MAXARTICLELENGTH,
        MINARTICLELENGTH,
        MAXCATEGORYLENGTH
      );
      const savedPreview = {
        ...postPreviewSubmission,
        timeCreation: new Date().getTime(),
      };
      setPostPreviewSubmission(savedPreview);
      const postId = await WritePost(savedPreview, postContent);
      toast.success('Post saved');
      setToggleReloadCommunity((prev) => !prev);
      navigate(`/c/${postPreviewSubmission.accessId}?post=${postId}`);
    } catch (error: any) {
      toast.error(error?.message);
      setDisableEdit(false);
    }
  }

  return (
    <div className="pb-2">
      {/* Title */}
      <div className="mt-2">
        <input
          type="text"
          name="title"
          id="title"
          className="text-field-input
          rounded-xl border py-1 w-full text-xl font-bold px-3"
          placeholder="Title"
          value={postPreviewSubmission.title}
          maxLength={MAXTITLELENGTH}
          onChange={(e) =>
            setPostPreviewSubmission((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
      </div>

      {/* Content */}
      <div className="my-4">{children}</div>
      {/* Category */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-start gap-3 items-center ">
          <p className="text-color-1 text-base font-medium whitespace-nowrap">
            # Topic
          </p>
          <input
            type="text"
            name="topic"
            id="topic"
            className="min-w-0 border border-transparent 
            text-field-input rounded-xl py-1 my-1
               focus:border-transparent 
                 text-base text-left"
            placeholder="example: infos"
            value={postPreviewSubmission.category}
            maxLength={MAXCATEGORYLENGTH}
            onChange={(e) =>
              setPostPreviewSubmission((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          />
        </div>
      </div>
      {/* Post permissions */}
      <PostPermissionsSection
        postPreviewSubmission={postPreviewSubmission}
        setPostPreviewSubmission={setPostPreviewSubmission}
      />
      {/* Action Buttons */}
      <div className="mt-5">
        <ActionButtonSection
          disableEdit={disableEdit}
          handlePublish={() => handlePublish()}
        />
      </div>
    </div>
  );
}
