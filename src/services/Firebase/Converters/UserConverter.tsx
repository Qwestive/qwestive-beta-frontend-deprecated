import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { IuserInfo } from 'types/types';
import { objectToMap } from 'functions/Util';

export const userConverter = {
  toFirestore(userInfo: IuserInfo): DocumentData {
    return {
      displayName: userInfo.displayName,
      profileImage: userInfo.profileImage,
      coverImage: userInfo.coverImage,
      bio: userInfo.bio,
      personalLink: userInfo.personalLink,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): IuserInfo {
    const data = snapshot.data();
    return {
      uid: snapshot.id,
      publicKey: snapshot.id,
      userName: data.userName,
      displayName: data.displayName,
      profileImage: data.profileImage,
      coverImage: data.coverImage,
      bio: data.bio,
      personalLink: data.personalLink,
      tokensOwned: objectToMap(data.tokensOwned ?? {}),
    } as IuserInfo;
  },
};
