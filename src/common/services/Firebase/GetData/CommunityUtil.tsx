import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';
import { Icommunity } from '../../../types';

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
