import { IpostPreviewSubmission, IpostContentType } from 'types/types';

export default function PostSaveVerification(
  postPreviewSubmission: IpostPreviewSubmission,
  postContent: IpostContentType,
  MAXTITLELENGTH: number,
  MINTITLELENGTH: number,
  MAXARTICLELENGTH: number,
  MINARTICLELENGTH: number,
  MAXCATEGORYLENGTH: number
): void {
  // Preview verification
  if (postPreviewSubmission.title.length > MAXTITLELENGTH) {
    throw new Error('Title too long');
  }
  if (postPreviewSubmission.title.length < MINTITLELENGTH) {
    throw new Error(
      `The title should be at least ${MINTITLELENGTH} characters long`
    );
  }
  if (postPreviewSubmission.category.length > MAXCATEGORYLENGTH) {
    throw new Error('Topic too long');
  }
  // Article verification
  if (postPreviewSubmission.postType === 'article') {
    if (postContent.postType !== 'article') {
      throw new Error('This post is not an article');
    }
    if (postContent.content.length > MAXARTICLELENGTH) {
      throw new Error('Article too long');
    }
    if (postContent.content.length < MINARTICLELENGTH) {
      throw new Error(
        `The post should be at least ${MINARTICLELENGTH} characters long`
      );
    }
  }
  // Poll verification
  if (postPreviewSubmission.postType === 'poll') {
    if (postContent.postType !== 'poll') {
      throw new Error('This post is not an poll');
    }
    if (postContent.content.length > MAXARTICLELENGTH) {
      throw new Error('Article too long');
    }
    if (postContent.content.length < MINARTICLELENGTH) {
      throw new Error(
        `The post should be at least ${MINARTICLELENGTH} characters long`
      );
    }
  }
}
