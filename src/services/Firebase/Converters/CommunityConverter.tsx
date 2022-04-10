import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Icategory } from 'types/types';

export const communityConverter = {
  toFirestore: (categories: Icategory[]): DocumentData => {
    // Note, we don't simply return post because post contains id field which
    // we do not wish DocumentData to contain.
    return {
      categories: categories ?? [],
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Icategory[] {
    // Note, we don't simply return data because Icomment data in FE is
    // different from data stored in BE.
    return snapshot.data()?.categories ?? [];
  },
};
