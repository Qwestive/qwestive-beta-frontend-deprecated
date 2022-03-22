import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { FirebaseAuth, FirebaseFunctions } from '../FirebaseConfig';

export async function UpVotePost(
  postId: string
): Promise<HttpsCallableResult<unknown>> {
  if (FirebaseAuth.currentUser != null) {
    const upVote = httpsCallable(FirebaseFunctions, 'postActions-upVote');
    return upVote({ postId });
  }
  throw new Error('User must be signed in to cast a vote');
}

export async function DownVotePost(
  postId: string
): Promise<HttpsCallableResult<unknown>> {
  if (FirebaseAuth.currentUser != null) {
    const downVote = httpsCallable(FirebaseFunctions, 'postActions-downVote');
    return downVote({ postId });
  }
  throw new Error('User must be signed in to cast a vote');
}
