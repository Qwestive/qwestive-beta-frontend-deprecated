import {
  doc,
  getDoc,
  query,
  getDocs,
  collection,
  where,
} from 'firebase/firestore';
import { Icategory, ICustomCommunity } from 'types/types';
import { customCommunityConverter } from '../Converters/CustomCommunityConverter';
import { Firestore } from '../FirebaseConfig';
import { communityConverter } from '../Converters/CommunityConverter';

export async function getCommunityData(
  id: string
): Promise<Icategory[] | undefined> {
  const communityRef = doc(Firestore, 'communities', id).withConverter(
    communityConverter
  );
  const communityDoc = await getDoc(communityRef);
  if (communityDoc.exists()) {
    return communityDoc.data();
  }

  throw new Error(`Community with provided ID: ${id}, does not exist`);
}

export async function getPostCategories(
  cId: string
): Promise<Array<Icategory> | undefined> {
  const categorieRef = doc(Firestore, 'categories', cId);
  const communityDoc = await getDoc(categorieRef);

  if (communityDoc.exists()) {
    return communityDoc.data().categories;
  }
  return undefined;
}

export async function checkCommunityNameExist(
  communityName: string
): Promise<boolean> {
  const communityQuery = query(
    collection(Firestore, 'customCommunities'),
    where('name', '==', communityName)
  );
  const communitySnapshot = await getDocs(communityQuery);
  return communitySnapshot.docs.length !== 0;
}

export async function getCustomCommunities(
  tokenIdList: string[]
): Promise<ICustomCommunity[]> {
  const customCommunityList: ICustomCommunity[] = [];
  if (tokenIdList.length === 0) return customCommunityList;
  const communityQuery = query(
    collection(Firestore, 'customCommunities'),
    where('tokens', 'array-contains-any', tokenIdList)
  );
  const communitySnapshot = await getDocs(communityQuery);

  communitySnapshot.forEach((cDoc) => {
    customCommunityList.push(customCommunityConverter.fromFirestore(cDoc));
  });
  return customCommunityList;
}
