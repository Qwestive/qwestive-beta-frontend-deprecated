import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ICustomCommunity, EcommunityType } from 'types/types';

export const customCommunityConverter = {
  toFirestore: (community: ICustomCommunity): DocumentData => {
    return {
      name: community.name,
      displayName: community.displayName,
      imageUrl: community.imageUrl,
      tokens: community.tokens, // for query
      // maybe not allow undefined
      managers: community.managers,
      categories: [],
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ICustomCommunity {
    return {
      cid: snapshot.id,
      type: EcommunityType.custom,
      name: snapshot.data()?.name,
      displayName: snapshot.data()?.displayName,
      imageUrl: snapshot.data()?.imageUrl,
      tokens: snapshot.data()?.tokens, // for query
      // maybe not allow undefined
      categories: snapshot.data()?.categories ?? [],
      managers: snapshot.data()?.managers,
    } as ICustomCommunity;
  },
};
