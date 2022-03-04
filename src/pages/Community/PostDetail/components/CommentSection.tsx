import React, { useState, useEffect } from 'react';
import { IpostComment } from '../../../../common/types';
import CommentContainer from './CommentContainer';
import CommentInputContainer from './CommentInputContainer';
import { getCommentsForPost } from '../../../../common/services/Firebase/GetData/CommentUtils';

type CommentSectionProps = {
  postId: string | undefined;
};

type Comment = {
  comment: IpostComment;
  childComments: Array<Comment>;
};

function CommentSection({ postId }: CommentSectionProps): JSX.Element {
  const [commentsFailedToLoad, setCommentsFailedToLoad] = useState(false);
  const [comments, setComments] = useState<Array<Comment>>([]);

  function buildCommentTree(postComments: Array<IpostComment>): Array<Comment> {
    const topLevelComments: Array<IpostComment> = [];
    const commentByParentMap = new Map<string, Array<IpostComment>>();

    postComments.forEach((element) => {
      console.log(element);
      if (element.depth === 0) {
        topLevelComments.push(element);
      }
      if (commentByParentMap.has(element.parentCommentId)) {
        commentByParentMap.get(element.parentCommentId)?.push(element);
      } else {
        commentByParentMap.set(element.parentCommentId, [element]);
      }
    });

    function buildCommentTreeHelper(element: IpostComment): Comment {
      const children = commentByParentMap.get(element.id) ?? [];
      if (children.length === 0) return { comment: element, childComments: [] };
      return {
        comment: element,
        childComments: children.map(buildCommentTreeHelper),
      };
    }

    return topLevelComments.map(buildCommentTreeHelper);
  }

  async function fetchCommentsForPost(
    targetPostId: string | undefined
  ): Promise<void> {
    if (targetPostId === undefined || targetPostId === null) {
      throw new Error('Invalid post ID: null');
    }
    setComments(buildCommentTree(await getCommentsForPost(targetPostId)));
  }

  useEffect(() => {
    try {
      fetchCommentsForPost(postId);
    } catch (exception) {
      setCommentsFailedToLoad(true);
    }
  }, [postId]);

  return (
    <div>
      <CommentInputContainer />
      {comments.map((item) => (
        <div key={item.comment.id}>
          <CommentContainer commentNode={item} />
        </div>
      ))}
      <button
        type="button"
        className="mt-2 ml-1 text-xs hover:text-qwestive-purple-hover">
        10 more replies
      </button>
    </div>
  );
}

export default CommentSection;
