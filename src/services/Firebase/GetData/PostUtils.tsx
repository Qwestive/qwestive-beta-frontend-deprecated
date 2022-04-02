import {
  doc,
  getDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
  orderBy,
  QueryDocumentSnapshot,
  startAt,
} from 'firebase/firestore';
import { TpostSorting, IpostPreview, IpostContentType } from 'types/types';

import { Firestore } from '../FirebaseConfig';
import { postConverter } from '../Converters/PostConverter';
import { postPreviewConverter } from '../Converters/PostPreviewConverter';

export async function getPostPreview(
  postId: string
): Promise<IpostPreview | undefined> {
  const postPreviewRef = doc(Firestore, 'postPreviews', postId).withConverter(
    postPreviewConverter
  );
  const postPreviewDoc = await getDoc(postPreviewRef);
  if (postPreviewDoc.exists()) {
    return postPreviewDoc.data();
  }
  return undefined;
}

export async function getPostContent(
  postId: string
): Promise<IpostContentType | undefined> {
  const postContentRef = doc(Firestore, 'posts', postId).withConverter(
    postConverter
  );
  const postContentDoc = await getDoc(postContentRef);
  if (postContentDoc.exists()) {
    return postContentDoc.data();
  }
  return undefined;
}

/*
TODO: add top query type
*/
export async function queryPostPreviews(
  cId: string,
  sortingType: TpostSorting,
  category: string,
  startSnap: QueryDocumentSnapshot<IpostPreview> | undefined,
  quantity: number
): Promise<[IpostPreview[], QueryDocumentSnapshot<IpostPreview>]> {
  const postRef = collection(Firestore, 'postPreviews');
  const queryConstraints = [
    where('accessId', '==', cId),
    orderBy('creationDate', 'desc'),
    limit(quantity),
  ];

  const sortingTypeQuery = sortingType.toLowerCase();

  if (!(category === 'All Topics')) {
    queryConstraints.push(where('category', '==', category));
  }

  if (['poll', 'bounty'].includes(sortingTypeQuery)) {
    queryConstraints.push(where('postType', '==', sortingTypeQuery));
  }

  if (startSnap !== undefined) queryConstraints.push(startAt(startSnap));

  const postQuery = query(postRef, ...queryConstraints);

  const querySnapshot = await getDocs(
    postQuery.withConverter(postPreviewConverter)
  );
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const result: IpostPreview[] = [];
  querySnapshot.forEach((postDoc) => {
    result.push(postPreviewConverter.fromFirestore(postDoc));
  });

  return [result, lastVisible];
}

export async function queryPostFeed(
  tokenIds: string[]
): Promise<IpostPreview[]> {
  const result: IpostPreview[] = [];
  if (tokenIds.length === 0) {
    return result;
  }
  const postRef = collection(Firestore, 'postPreviews');

  const postQuery = query(
    postRef,
    where('accessId', 'in', tokenIds),
    orderBy('creationDate', 'desc'),
    limit(10)
  ).withConverter(postPreviewConverter);

  const querySnapshot = await getDocs(postQuery);

  querySnapshot.forEach((postDoc) => {
    result.push(postDoc.data());
  });
  return result;
}
