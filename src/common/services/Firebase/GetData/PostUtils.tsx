import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';
import { postConverter } from '../Converters/PostConverter';
import { IpostData, TpostSorting } from '../../../types';

export async function getPostInfo(postId: string): Promise<IpostData> {
  const docRef = doc(Firestore, 'posts', postId).withConverter(postConverter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error(`Post with provided ID: ${postId}, does not exist`);
}

// Do a better query once we have samples of posts
export async function queryPosts(
  cId: string,
  sortingType: TpostSorting,
  categorie: string
): Promise<IpostData[]> {
  const postRef = collection(Firestore, 'posts');

  let postQuery = query(
    postRef,
    where('cId', '==', cId),
    where('categorie', '==', categorie),
    orderBy('creationDate', 'desc'),
    limit(10)
  );
  if (sortingType === 'Top') {
    postQuery = query(
      postRef,
      where('cId', '==', cId),
      where('categorie', '==', categorie),
      orderBy('numberOfComments', 'desc'),
      limit(10)
    );
  } else if (sortingType === 'Poll') {
    postQuery = query(
      postRef,
      where('cId', '==', cId),
      where('postType', '==', 'poll'),
      orderBy('creationDate', 'desc'),
      limit(10)
    );
  } else if (sortingType === 'Bounty') {
    postQuery = query(
      postRef,
      where('cId', '==', cId),
      where('postType', '==', 'bounty'),
      orderBy('creationDate', 'desc'),
      limit(10)
    );
  }

  const querySnapshot = await getDocs(postQuery);
  const result: IpostData[] = [];

  querySnapshot.forEach((postDoc) => {
    result.push(postConverter.fromFirestore(postDoc.data()));
  });

  return result;
}
