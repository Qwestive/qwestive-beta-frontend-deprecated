import React, { useState, useEffect } from 'react';
import { IpostComment, IpostCommentSubmission } from '../../../../common/types';
import CommentContainer from './CommentContainer';
import CommentInputContainer from './CommentInputContainer';
import { getCommentsForPost } from '../../../../common/services/Firebase/GetData/CommentUtils';
import WriteComment from '../../../../common/services/Firebase/WriteData/WriteComment';

type CommentSectionProps = {
  postId: string | undefined;
  tipCallback: (arg0: string, arg1: string) => void;
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
function CommentSection({
  postId,
  tipCallback,
}: CommentSectionProps): JSX.Element {
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
      const parentCommentId = element?.parentCommentId ?? '';
      if (parentCommentId !== '') {
        if (commentByParentMap.has(parentCommentId)) {
          commentByParentMap.get(parentCommentId)?.push(element);
        } else {
          commentByParentMap.set(parentCommentId, [element]);
        }
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

  const handleAddComment = async (
    comment: IpostCommentSubmission
  ): Promise<void> => {
    const id = await WriteComment(comment);
    const newComment = {
      comment: {
        id,
        ...comment,
      },
      childComments: [],
    };
    setComments([newComment, ...comments]);
  };

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
          <CommentInputContainer
            postId={postId}
            parentCommentId=""
            depth={0}
            addComment={(comment) => handleAddComment(comment)}
          />
          {comments.map((item) => (
            <div key={item.comment.id}>
              <CommentContainer commentNode={item} tipCallback={tipCallback} />
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
