import { IpostPreview, IpostContentType } from 'types/types';

export default function PostSaveVerification(
  postPreview: IpostPreview,
  postContent: IpostContentType,
  MAXTITLELENGTH: number,
  MINTITLELENGTH: number,
  MAXARTICLELENGTH: number,
  MINARTICLELENGTH: number,
  MAXCATEGORYLENGTH: number
): void {
  // Preview verification
  if (postPreview.title.length > MAXTITLELENGTH) {
    throw new Error('Title too long');
  }
  if (postPreview.title.length < MINTITLELENGTH) {
    throw new Error(
      `The title should be at least ${MINTITLELENGTH} characters long`
    );
  }
  if (postPreview.category.length > MAXCATEGORYLENGTH) {
    throw new Error('Topic too long');
  }
  // Article verification
  if (postPreview.postType === 'article') {
    console.log(postContent);
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
  if (postPreview.postType === 'poll') {
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
