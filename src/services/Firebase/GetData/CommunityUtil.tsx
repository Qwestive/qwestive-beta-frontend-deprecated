import { doc, getDoc } from 'firebase/firestore';
import { Icategory, IcommunityData } from 'types/types';
import { Firestore } from '../FirebaseConfig';
import { communityConverter } from '../Converters/CommunityConverter';

export async function getCommunityData(
  id: string
): Promise<IcommunityData | undefined> {
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
