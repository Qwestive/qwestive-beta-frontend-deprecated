import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { IcommunityInfo } from '../../../types/types';

export const communityConverter = {
  toFirestore: (community: IcommunityInfo): DocumentData => {
    // Note, we don't simply return post because post contains id field which
    // we do not wish DocumentData to contain.
    return {
      categories: community.categories ?? [],
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): IcommunityInfo {
    // Note, we don't simply return data because Icomment data in FE is
    // different from data stored in BE.
    return {
      id: snapshot.id,
      isActive: (snapshot.data()?.categories?.length ?? 0) > 0,
      categories: snapshot.data()?.categories ?? [],
    } as IcommunityInfo;
  },
};
