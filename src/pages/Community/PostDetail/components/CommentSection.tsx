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

/// Section of post detail page which shows all of the comments for a post.
///
/// TODO:
/// - Add logic to paginate and sort comments.
/// - Add styling for the case when comments fail to load.
function CommentSection({ postId }: CommentSectionProps): JSX.Element {
  const [commentsFailedToLoad, setCommentsFailedToLoad] = useState(false);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [numHiddenComments] = useState<number>(0);

  // Builds a tree data structure of comments from an array of comments.
  //
  // There are no limits to the depth of the tree.
  function buildCommentTree(postComments: Array<IpostComment>): Array<Comment> {
    const topLevelComments: Array<IpostComment> = [];
    const commentByParentMap = new Map<string, Array<IpostComment>>();

    postComments.forEach((element) => {
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

  function showMoreComments() {
    // TODO: add logic to show more comments.
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
      {commentsFailedToLoad && <h1>Comments failed to load</h1>}
      {!commentsFailedToLoad && (
        <>
          <CommentInputContainer />
          {comments.map((item) => (
            <div key={item.comment.id}>
              <CommentContainer commentNode={item} />
            </div>
          ))}
          <button
            type="button"
            onClick={showMoreComments}
            className="mt-2 ml-1 text-xs hover:text-qwestive-purple-hover">
            {numHiddenComments} more comments
          </button>
        </>
      )}
    </div>
  );
}

export default CommentSection;
