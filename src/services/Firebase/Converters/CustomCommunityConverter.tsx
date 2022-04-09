import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ICustomCommunity } from 'types/types';

export const customCommunityConverter = {
  toFirestore: (community: ICustomCommunity): DocumentData => {
    return {
      name: community.name,
      info: community.info,
      tokens: community.tokens, // for query
      // maybe not allow undefined
      requirements: community.requirements,
      managers: community.managers,
      categories: [],
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ICustomCommunity {
    return {
      id: snapshot.id,
      name: snapshot.data()?.name,
      info: snapshot.data()?.info,
      tokens: snapshot.data()?.tokens, // for query
      // maybe not allow undefined
      requirements: snapshot.data()?.requirements,
      categories: snapshot.data()?.categories ?? [],
      managers: snapshot.data()?.managers,
    } as ICustomCommunity;
  },
};
