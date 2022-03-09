import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';
import { Icommunity, Icategories } from '../../../types';

export async function getCommunityInfo(
  mint: string
): Promise<Icommunity | undefined> {
  const communityRef = doc(Firestore, 'community', mint);
  const communityDoc = await getDoc(communityRef);

  if (communityDoc.exists()) {
    return {
      cId: mint,
      memberCount: communityDoc.data().memberCount,
    };
  }
  return undefined;
}

export async function getPostCategories(
  cId: string
): Promise<Array<Icategories> | undefined> {
  const categorieRef = doc(Firestore, 'categories', cId);
  const communityDoc = await getDoc(categorieRef);

  if (communityDoc.exists()) {
    return communityDoc.data().categories;
  }
  return undefined;
}
