import { DocumentData } from 'firebase/firestore';
import { IpostData } from '../../../types';

// Firestore data converter
export const postConverter = {
  toFirestore: (post: IpostData): DocumentData => {
    /// Note, we don't simply return post because post contains id field which we do not wish DocumentData to contain.
    return {
      postType: post.postType,
      accessTokenId: post.accessTokenId,
      accessMinimumTokenBalance: post.accessMinimumTokenBalance,
      authorUserId: post.authorUserId,
      authorUserName: post.authorUserName,
      authorPublicKey: post.authorPublicKey,
      authorProfileImageUrl: post.authorProfileImageUrl,
      title: post.title,
      contents: post.contents,
      creationDate: post.creationDate,
      upVoteUserIds: post.upVoteUserIds,
      downVoteUserIds: post.downVoteUserIds,
      numberOfComments: post.numberOfComments,
    };
  },
  fromFirestore: (snapshot: DocumentData): IpostData => {
    /// Note, we don't simply return data because IpostData requires id field which is missing from data.
    const data = snapshot.data();
    return {
      id: snapshot.id,
      postType: data.postType,
      accessTokenId: data.accessTokenId,
      accessMinimumTokenBalance: data.accessMinimumTokenBalance,
      authorUserId: data.authorUserId,
      authorUserName: data.authorUserName,
      authorPublicKey: data.authorPublicKey,
      authorProfileImageUrl: data.authorProfileImageUrl,
      title: data.title,
      contents: data.contents,
      creationDate: data.creationDate,
      upVoteUserIds: data.upVoteUserIds,
      downVoteUserIds: data.downVoteUserIds,
      numberOfComments: data.numberOfComments,
    } as IpostData;
  },
};
