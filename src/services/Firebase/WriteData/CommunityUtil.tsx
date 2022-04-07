import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { ICustomCommunity } from 'types/types';
import UploadFile from '../UploadFile';
import { customCommunityConverter } from '../Converters/CustomCommunityConverter';
import { FirebaseAuth, Firestore } from '../FirebaseConfig';

export default async function CreateCustomCommunity(
  customCommunity: ICustomCommunity,
  imageFile: File | Blob | undefined
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const CommunityRef = await addDoc(
      collection(Firestore, 'customCommunities').withConverter(
        customCommunityConverter
      ),
      customCommunity
    );
    if (imageFile !== undefined) {
      // eslint-disable-next-line max-len
      const communityImagePath = `communities/${CommunityRef.id}/profileImage.jpeg`;

      const [imageUrl] = await UploadFile(communityImagePath, imageFile);
      await updateDoc(doc(Firestore, 'customCommunities', CommunityRef.id), {
        'info.image': imageUrl,
      });
    }
    return CommunityRef.id;
  }
  throw new Error('User can not be null to create a community');
}
