import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import WriteComment from '../../../../common/services/Firebase/WriteData/WriteComment';
import { IpostCommentSubmission } from '../../../../common/types';
import {
  userNameAtom,
  userProfileImageAtom,
  userPublicKeyAtom,
} from '../../../../recoil/userInfo';

type TcommentInputContainer = {
  postId: string | undefined;
  addComment: (arg0: IpostCommentSubmission) => void;
};

/// Component which allows commenting on a post.
///
/// TODO: add logic to handle posting comments to the DB and including them in
/// the comments section.
function CommentInputContainer({
  postId,
  addComment,
}: TcommentInputContainer): JSX.Element {
  const [textAreaValue, setTextAreaValue] = useState('');
  const username = useRecoilValue(userNameAtom);
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userProfileImage = useRecoilValue(userProfileImageAtom);

  const handleTextAreaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setTextAreaValue(event.target.value);

  const handleSubmit = (): void => {
    if (postId != null) {
      const newComment = {
        postId,
        depth: 0,
        parentCommentId: '',
        authorUserId: userPublicKey ?? '',
        authorUserName: username ?? '',
        authorPublicKey: userPublicKey ?? '',
        authorProfileImageUrl: userProfileImage ?? '',
        body: textAreaValue,
        upVoteUserIds: [],
        downVoteUserIds: [],
      };
      WriteComment(newComment);
      addComment(newComment);
      setTextAreaValue('');
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
            className="btn-filled m-2"
            onClick={handleSubmit}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentInputContainer;
