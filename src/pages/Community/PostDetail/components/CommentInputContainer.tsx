import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { IpostCommentSubmission } from '../../../../types/types';
import {
  userIdAtom,
  userNameAtom,
  userProfileImageAtom,
  userPublicKeyAtom,
} from '../../../../services/recoil/userInfo';

type TcommentInputContainer = {
  postId: string | undefined;
  parentCommentId: string | undefined;
  depth: number | undefined;
  addComment: (arg0: IpostCommentSubmission) => void;
};

/// Component which allows commenting on a post.
///
/// TODO:
/// - Add loading state logic.
function CommentInputContainer({
  postId,
  parentCommentId,
  depth,
  addComment,
}: TcommentInputContainer): JSX.Element {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [, setIsLoading] = useState(false);
  const userId = useRecoilValue(userIdAtom);
  const username = useRecoilValue(userNameAtom);
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userProfileImage = useRecoilValue(userProfileImageAtom);

  const handleTextAreaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setTextAreaValue(event.target.value);

  const handleSubmit = async (): Promise<void> => {
    if (postId != null) {
      setIsLoading(true);
      const newComment = {
        postId,
        depth: depth ?? 0,
        parentCommentId: parentCommentId ?? '',
        authorUserId: userId ?? '',
        authorUserName: username ?? '',
        authorPublicKey: userPublicKey ?? '',
        authorProfileImageUrl: userProfileImage ?? '',
        body: textAreaValue,
        upVoteUserIds: [],
        downVoteUserIds: [],
      };
      try {
        addComment(newComment);
        setTextAreaValue('');
        setIsLoading(false);
      } catch (exception) {
        setIsLoading(false);
        toast.error('Failed to add comment.');
        throw exception;
      }
    }
  };

  return (
    <div>
      <div
        className="border border-gray-300 rounded-lg shadow-sm overflow-hidden
        focus-within:border-indigo-500 focus-within:ring-1
        focus-within:ring-indigo-500 bg-white">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full py-3 border-0 resize-none focus:ring-0
          sm:text-sm"
          placeholder="Add your comment"
          value={textAreaValue}
          onChange={handleTextAreaInput}
        />
        <div className="flex-shrink-0">
          <button
            type="submit"
            className={
              textAreaValue === ''
                ? 'btn-filled-disabled m-2'
                : 'btn-filled m-2'
            }
            onClick={handleSubmit}
            disabled={textAreaValue === ''}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentInputContainer;
