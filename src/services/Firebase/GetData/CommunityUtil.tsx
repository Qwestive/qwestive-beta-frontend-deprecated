import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';
import { Icommunity, Icategory } from '../../../types/types';

export async function getCommunityInfo(
  mint: string
): Promise<Icommunity | undefined> {
  const communityRef = doc(Firestore, 'communities', mint);
  const communityDoc = await getDoc(communityRef);

  if (communityDoc.exists()) {
    return {
      cId: mint,
      categories: communityDoc.data().categories,
    };
  }
  return undefined;
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
