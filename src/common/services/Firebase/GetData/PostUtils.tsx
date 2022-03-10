import {
  doc,
  getDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';
import { postConverter } from '../Converters/PostConverter';
import { postPreviewConverter } from '../Converters/PostPreviewConverter';

import { IpostData, TpostSorting, IpostPreview } from '../../../types';

export async function getPostInfo(postId: string): Promise<IpostData> {
  const docRef = doc(Firestore, 'posts', postId).withConverter(postConverter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error(`Post with provided ID: ${postId}, does not exist`);
}

/*
TODO: add top query type
*/
export async function queryPostPreviews(
  cId: string,
  sortingType: TpostSorting,
  category: string
): Promise<IpostPreview[]> {
  const postRef = collection(Firestore, 'postPreviews');

  let postQuery = query(
    postRef,
    where('accessTokenId', '==', cId),
    orderBy('creationDate', 'desc'),
    limit(10)
  );

  const sortingTypeQuery = sortingType.toLowerCase();

  if (!(category === 'All Topics')) {
    if (['poll', 'bounty'].includes(sortingTypeQuery)) {
      postQuery = query(
        postRef,
        where('accessTokenId', '==', cId),
        where('category', '==', category),
        where('postType', '==', sortingTypeQuery),
        orderBy('creationDate', 'desc'),
        limit(10)
      );
    } else {
      postQuery = query(
        postRef,
        where('accessTokenId', '==', cId),
        where('category', '==', category),
        orderBy('creationDate', 'desc'),
        limit(10)
      );
    }
  } else if (['poll', 'bounty'].includes(sortingTypeQuery)) {
    postQuery = query(
      postRef,
      where('accessTokenId', '==', cId),
      where('postType', '==', sortingTypeQuery),
      orderBy('creationDate', 'desc'),
      limit(10)
    );
  }

  const querySnapshot = await getDocs(
    postQuery.withConverter(postPreviewConverter)
  );
  const result: IpostPreview[] = [];

  querySnapshot.forEach((postDoc) => {
    result.push(postPreviewConverter.fromFirestore(postDoc));
  });

  return result;
}
