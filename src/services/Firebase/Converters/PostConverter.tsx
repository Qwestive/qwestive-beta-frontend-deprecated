import { DocumentData } from 'firebase/firestore';
import {
  IpostArticle,
  IpostPoll,
  IpostContentType,
  IpollOption,
} from 'types/types';

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
      content: data.content,
    };
    if (data.postType === 'poll') {
      const options: Array<IpollOption> = [];
      data.options.forEach((item: any) => {
        options.push({
          id: item.id,
          name: item.name,
          voteUserIds: data[item.id] ?? [],
        });
      });
      return {
        options,
        ...post,
      } as IpostPoll;
    }
    return post as IpostArticle;
  },
};
