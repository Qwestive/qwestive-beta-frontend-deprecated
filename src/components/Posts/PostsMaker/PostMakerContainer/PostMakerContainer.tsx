import React, {
  ReactChildren,
  ReactChild,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

  async function handleSave() {
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
      navigate(`/post/${postId}`);
    } catch (error: any) {
      toast.error(error?.message);
      setDisableEdit(false);
    }
  }

  return (
    <div>
      {/* Title */}
      <div className="p-px">
        <input
          type="text"
          name="title"
          id="title"
          className="border border-transparent focus:border-qwestive-purple
         block w-full text-2xl font-semibold px-3"
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
      <div>{children}</div>
      {/* Category */}
      <div className="p-px border-t">
        <div className="flex justify-start gap-3 items-center px-3">
          <p className="text-color-primary text-base font-medium"># Topic</p>
          <input
            type="text"
            name="topic"
            id="topic"
            className="border border-transparent block 
                focus:ring-0 focus:border-transparent 
                text-color-primary text-base px-3 text-left"
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
      <div
        className="flex justify-between pt-4 text-xs 
      sm:text-base bg-gray-100">
        <ActionButtonSection
          disableEdit={disableEdit}
          handleSave={() => handleSave()}
        />
      </div>
    </div>
  );
}
