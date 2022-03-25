import { PublicKey } from '@solana/web3.js';

export interface IuserInfo {
  uid: string;
  publicKey: string;
  userName: string; // not editable frontend
  displayName: string;
  profileImage: string;
  coverImage: string;
  bio: string;
  personalLink: string;
  tokensOwned: Map<string, number>; // not editable frontend
}

/* 
  Community types
*/
export interface Icategory {
  name: string;
  count: number;
}

export interface Icommunity {
  cId: string;
  categories: Icategory[];
}

export interface IcommunityTokenInfo {
  name: string | undefined;
  symbol: string | undefined;
  logoUrl: string | undefined;
  address: string | undefined;
}

export interface ItokenOwnedCommunity {
  mint: string;
  amountHeld: number;
  name: string | undefined;
  imageUrl: string | undefined;
  communityData: Icommunity | undefined;
}

/* 
  Auth types
*/

export interface ImessageToSign {
  uid: string;
  message: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

/* 
  Post types
*/

export type TpostSorting = 'New' | 'Top' | 'Poll' | 'Bounty';

export type TpostType = 'article' | 'poll' | 'bounty' | 'vote';

export const ARTICLE_TYPE: TpostType = 'article';
export const POLL_TYPE: TpostType = 'poll';
export const BOUNTY_TYPE: TpostType = 'bounty';
export const VOTE_TYPE: TpostType = 'vote';

export interface Icategories {
  name: string;
  count: number;
}

/// The preview of a post that is submitted to the DB as a new post for a
/// community.

export interface IpostPreview {
  id: string;
  postType: TpostType;
  accessTokenId: string;
  accessMinimumTokenBalance: number;
  authorUserId: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  title: string;
  creationDate: number;
  category: string;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
  numberOfComments: number;
}

export interface IpostArticle {
  postType: 'article';
  content: string;
}

export interface IpollOption {
  id: string;
  name: string;
  voteUserIds: Array<string>;
}

export interface IpostPoll {
  postType: 'poll';
  content: string;
  options: Array<IpollOption>;
}

export type IpostContentType = IpostPoll | IpostArticle;

export interface IpostPreviewSubmission {
  postType: TpostType;
  accessTokenId: string;
  accessMinimumTokenBalance: number;
  authorUserId: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  title: string;
  creationDate: number;
  category: string;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
  numberOfComments: number;
}

/// An article that is submitted to the DB as a new post for a community.
export interface IpostArticleSubmission extends IpostPreviewSubmission {
  content: string;
}

/// A poll that is submitted to the DB as a new post for a community.
export interface IpostPollSubmission extends IpostPreviewSubmission {
  content: string;
  options: Array<IpollOption>;
}

/// A comment that is submitted to the DB as a new comment for a post.
export interface IpostCommentSubmission {
  postId: string;
  depth: number;
  parentCommentId: string;
  authorUserId: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  body: string;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
}

/// A comment that is submitted to the DB as a new comment for a post. It
///  differs from IpostCommentSubmission in that it has an ID since it was
/// already added to DB.
export interface IpostComment extends IpostCommentSubmission {
  id: string;
}
