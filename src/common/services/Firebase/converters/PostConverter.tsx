import { DocumentData } from 'firebase/firestore';
import { IpostData } from '../../../types';

export default class Post implements IpostData {
  postId: string;

  postType: string;

  accessTokenId: string;

  accessMinimumTokenBalance: number;

  authorUserName: string;

  authorPublicKey: string;

  authorProfileImageUrl: string;

  title: string;

  contents: string;

  creationDate: Date;

  upVoteUserIds: [];

  downVoteUserIds: [];

  numberOfComments: number;

  constructor(
    postId: string,
    postType: string,
    accessTokenId: string,
    accessMinimumTokenBalance: number,
    authorUserName: string,
    authorPublicKey: string,
    authorProfileImageUrl: string,
    title: string,
    contents: string,
    creationDate: Date,
    upVoteUserIds: [],
    downVoteUserIds: [],
    numberOfComments: number
  ) {
    this.postId = postId;
    this.postType = postType;
    this.accessTokenId = accessTokenId;
    this.accessMinimumTokenBalance = accessMinimumTokenBalance;
    this.authorUserName = authorUserName;
    this.authorPublicKey = authorPublicKey;
    this.authorProfileImageUrl = authorProfileImageUrl;
    this.title = title;
    this.contents = contents;
    this.creationDate = creationDate;
    this.upVoteUserIds = upVoteUserIds;
    this.downVoteUserIds = downVoteUserIds;
    this.numberOfComments = numberOfComments;
  }

  toString(): string {
    return `Post {
            ID: ${this.postId}
            postType: ${this.postType}
            accessTokenId: ${this.accessTokenId}
            accessMinimumTokenBalance: ${this.accessMinimumTokenBalance},
            authorUserName: ${this.authorUserName},
            authorPublicKey: ${this.authorPublicKey},
            authorProfileImageUrl: ${this.authorProfileImageUrl},
            title: ${this.title},
            contents: ${this.contents},
            creationDate: ${this.creationDate},
            upVoteUserIds: ${this.upVoteUserIds},
            downVoteUserIds: ${this.downVoteUserIds},
            numberOfComments: ${this.numberOfComments}
        }`;
  }
}

// Firestore data converter
export const postConverter = {
  toFirestore: (post: IpostData): DocumentData => {
    return {
      ID: post.postId,
      postType: post.postType,
      accessTokenId: post.accessTokenId,
      accessMinimumTokenBalance: post.accessMinimumTokenBalance,
      authorUserName: post.authorUserName,
      authorPublicKey: post.authorPublicKey,
      authorProfileImageUrl: post.authorProfileImageUrl,
      title: post.title,
      contents: post.contents,
      creationDate: post.creationDate,
      upVoteUserIds: post.upVoteUserIds,
      downVoteUserIds: post.downVoteUserIds,
      numberOfComments: post.numberOfComments,
    };
  },
  fromFirestore: (snapshot: DocumentData): IpostData => {
    const data = snapshot.data();
    return new Post(
      data.postId,
      data.postType,
      data.accessTokenId,
      data.accessMinimumTokenBalance,
      data.authorUserName,
      data.authorPublicKey,
      data.authorProfileImageUrl,
      data.title,
      data.contents,
      data.creationDate,
      data.upVoteUserIds,
      data.downVoteUserIds,
      data.numberOfComments
    );
  },
};
