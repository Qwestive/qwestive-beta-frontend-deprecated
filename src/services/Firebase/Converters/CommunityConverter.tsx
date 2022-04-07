import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { IcommunityData } from 'types/types';

export const communityConverter = {
  toFirestore: (community: IcommunityData): DocumentData => {
    // Note, we don't simply return post because post contains id field which
    // we do not wish DocumentData to contain.
    return {
      categories: community.categories ?? [],
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): IcommunityData {
    // Note, we don't simply return data because Icomment data in FE is
    // different from data stored in BE.
    return {
      id: snapshot.id,
      isActive: true,
      categories: snapshot.data()?.categories ?? [],
    } as IcommunityData;
  },
};
