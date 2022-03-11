import { httpsCallable } from 'firebase/functions';

import { FirebaseAuth, FirebaseFunctions } from '../FirebaseConfig';

export async function UpVote(postId: string): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const upVote = httpsCallable(FirebaseFunctions, 'postActions-upVote');
    upVote({ postId });
  } else {
    throw new Error('User must be signed in to cast a vote');
  }
}

export async function DownVote(postId: string): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const downVote = httpsCallable(FirebaseFunctions, 'postActions-downVote');
    downVote({ postId });
  } else {
    throw new Error('User must be signed in to cast a vote');
  }
}
