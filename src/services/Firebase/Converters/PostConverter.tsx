import { DocumentData } from 'firebase/firestore';
import { IpostArticle, IpostPoll, IpostContentType } from 'types/types';

// Firestore data converter
export const postConverter = {
  // toFirestore not used yet
  toFirestore: (post: IpostArticle): DocumentData => {
    // Note, we don't simply return post because post contains id field which
    // we do not wish DocumentData to contain.
    return {
      postType: post.postType,
    };
  },
  fromFirestore: (snapshot: DocumentData): IpostContentType => {
    // Note, we don't simply return data because IpostData requires id field
    // which is missing from snapshot data.
    const data = snapshot.data();
    const post = {
      postType: data.postType,
    };
    if (data.postType === 'poll') {
      return {
        options: data.options,
        ...post,
      } as IpostPoll;
    }
    return post as IpostArticle;
  },
};
