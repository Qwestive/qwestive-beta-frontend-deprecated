import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { IpostComment } from '../../../types';

export const commentConverter = {
  toFirestore(comment: IpostComment): DocumentData {
    // Note, we don't simply return comment because comment contains id field
    // which we do not wish DocumentData to contain.
    return {
      postId: comment.postId,
      parentCommentId: comment.parentCommentId,
      depth: comment.depth,
      authorUserId: comment.authorUserId,
      authorUserName: comment.authorUserName,
      authorPublicKey: comment.authorPublicKey,
      authorProfileImageUrl: comment.authorProfileImageUrl,
      body: comment.body,
      upVoteUserIds: comment.upVoteUserIds,
      downVoteUserIds: comment.downVoteUserIds,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): IpostComment {
    // Note, we don't simply return data because IpostComment requires id field
    // which is missing from snapshot data.
    const data = snapshot.data();
    return {
      id: snapshot.id,
      postId: data.postId,
      parentCommentId: data.parentCommentId,
      depth: data.depth,
      authorUserId: data.authorUserId,
      authorUserName: data.authorUserName,
      authorPublicKey: data.authorPublicKey,
      authorProfileImageUrl: data.authorProfileImageUrl,
      body: data.body,
      upVoteUserIds: data.upVoteUserIds,
      downVoteUserIds: data.downVoteUserIds,
    } as IpostComment;
  },
};
