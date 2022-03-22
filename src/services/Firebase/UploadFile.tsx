import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FirebaseAuth, FirebaseStorage } from './FirebaseConfig';

export default async function UploadFile(
  filePath: string,
  file: File
): Promise<[string, string]> {
  if (FirebaseAuth.currentUser != null) {
    const newImageRef = ref(FirebaseStorage, filePath);
    const fileSnapshot = await uploadBytesResumable(newImageRef, file);
    const fileUrl = await getDownloadURL(newImageRef);
    return [fileUrl, fileSnapshot.metadata.fullPath];
  }
  throw new Error('User can not be null to upload a file');
}
