import {
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { IpostPoll } from 'types/types';
import { postConverter } from '../Converters/PostConverter';

import { FirebaseAuth, Firestore } from '../FirebaseConfig';

/// Adds provided uid to the list of votes for the provided
/// option id in the post id.
export async function AddPollVote(
  uid: string,
  postId: string,
  optionId: string
): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const postRef = doc(Firestore, 'posts', postId);

    await updateDoc(postRef, {
      [optionId]: arrayUnion(uid),
    });
  } else {
    throw new Error('User can not be null to cast a vote');
  }
}

/// Removes the vote of the provided uid from the provided post.
///
/// To do so, it first finds the option on which the ID is present
/// and simultaneously removes it.
export async function RemovePollVote(
  uid: string,
  postId: string
): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    // const postRef = doc(Firestore, 'posts', postId);
    const postRef = doc(Firestore, 'posts', postId).withConverter(
      postConverter
    );
    const postDoc = await getDoc(postRef);
    let postData = postDoc.data();
    if (postData?.postType !== 'poll') {
      throw new Error('Invalid post type, a vote can only be casted on a poll');
    }
    postData = postData as IpostPoll;
    const votedOption = postData.options.find(
      (element) => element.voteUserIds.indexOf(uid) !== -1
    )?.id;
    if (votedOption) {
      await updateDoc(postRef, {
        [votedOption]: arrayRemove(uid),
      });
    }
  } else {
    throw new Error('User can not be null to cast a vote');
  }
}
