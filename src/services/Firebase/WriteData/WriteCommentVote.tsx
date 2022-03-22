import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { FirebaseAuth, FirebaseFunctions } from '../FirebaseConfig';

export async function UpVoteComment(
  commentId: string
): Promise<HttpsCallableResult<unknown>> {
  if (FirebaseAuth.currentUser != null) {
    const upVote = httpsCallable(FirebaseFunctions, 'commentActions-upVote');
    return upVote({ commentId });
  }
  throw new Error('User must be signed in to cast a vote');
}

export async function DownVoteComment(
  commentId: string
): Promise<HttpsCallableResult<unknown>> {
  if (FirebaseAuth.currentUser != null) {
    const downVote = httpsCallable(
      FirebaseFunctions,
      'commentActions-downVote'
    );
    return downVote({ commentId });
  }
  throw new Error('User must be signed in to cast a vote');
}
