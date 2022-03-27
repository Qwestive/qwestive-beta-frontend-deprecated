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

export async function queryPostFeed(
  communityList: string[]
): Promise<IpostPreview[]> {
  const result: IpostPreview[] = [];
  if (communityList.length === 0) {
    return result;
  }
  const postRef = collection(Firestore, 'postPreviews');

  const postQuery = query(
    postRef,
    where('accessTokenId', 'in', communityList),
    orderBy('creationDate', 'desc'),
    limit(10)
  ).withConverter(postPreviewConverter);

  const querySnapshot = await getDocs(
    postQuery.withConverter(postPreviewConverter)
  );

  querySnapshot.forEach((postDoc) => {
    result.push(postPreviewConverter.fromFirestore(postDoc));
  });

  return result;
}
