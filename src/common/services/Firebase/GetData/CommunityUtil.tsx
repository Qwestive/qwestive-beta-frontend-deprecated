import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { Firestore } from '../FirebaseConfig';

export async function getCommunityInfo(
  mint: string
): Promise<DocumentData | undefined> {
  const communityRef = doc(Firestore, 'community', mint);
  const communityDoc = await getDoc(communityRef);
  return communityDoc.exists() ? communityDoc.data() : undefined;
}
