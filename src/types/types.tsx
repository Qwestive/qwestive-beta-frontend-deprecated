/* eslint-disable @typescript-eslint/no-explicit-any */
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
  accountTokens: AccountTokensByMintOrCollection; // not editable frontend
}

/**
 * Types of token.
 */

export interface Itoken {
  isFungible: boolean;
  mint: string;
  ammountOwned: number;
}

export interface IfungibleToken extends Itoken {
  isFungible: true;
}

export interface InonFungibleToken extends Itoken {
  isFungible: false;
  ammountOwned: 1;
}

export interface InonFungibleTokenMetadata {
  name: string;
  symbol: string;
  creators: Array<string>;
  uri: string;
}

export interface InonFungibleTokenCollection {
  id: string;
  metadata: InonFungibleTokenCollectionMetadata;
  tokensOwned: Array<InonFungibleToken>;
}

export interface InonFungibleTokenCollectionMetadata {
  symbol: string;
  creators: Array<string>;
}

export function areTokensEqual(objA: Itoken, objB: Itoken): boolean {
  return (
    objA.isFungible === objB.isFungible &&
    objA.mint === objB.mint &&
    objA.ammountOwned === objB.ammountOwned
  );
}

/**
 * Types of user owned tokens in a wallet.
 */

export interface AccountTokens {
  fungibleAccountTokens: Map<string, IfungibleToken>;
  nonFungibleAccountTokens: Map<string, InonFungibleToken>;
}

export interface AccountTokensByMintOrCollection {
  fungibleAccountTokensByMint: Map<string, IfungibleToken>;
  nonFungibleAccountTokensByCollection: Map<
    string,
    InonFungibleTokenCollection
  >;
}

/**
 * Types of community. The data of a community for a fungible token
 * is different from the data of a community for a non-fungible token.
 */

export enum EcommunityType {
  fungible = 'fungible',
  nonfungible = 'nonfungible',
}

export type TtokenCommunity =
  | IfungibleTokenCommunity
  | InonFungibleTokenCommunity;

export interface ItokenCommunity {
  cid: string;
  type: EcommunityType;
  name: string;
  imageUrl: string | undefined;
  communityData: IcommunityData | undefined;
}

export interface IfungibleTokenCommunity extends ItokenCommunity {
  symbol: string;
  tokenData: IfungibleToken;
}

export interface InonFungibleTokenCommunity extends ItokenCommunity {
  collectionData: InonFungibleTokenCollection;
}

/* Data about a community stored in Qwestive DB. */

export interface Icategory {
  name: string;
  count: number;
}

export interface IcommunityData {
  isActive: boolean;
  categories: Icategory[];
}

/*
 * Auth types
 */
export type TlogInState = '' | 'receive' | 'sign' | 'verify' | 'authed';

export interface ImessageToSign {
  uid: string;
  message: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

/*
 *  Post types
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
  accessId: string;
  minimumAccessBalance: number;
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

export interface IpostPreview extends IpostPreviewSubmission {
  id: string;
}

/*
 * An article that is submitted to the DB as a new post for a community.
 */
export interface IpostArticleSubmission extends IpostPreviewSubmission {
  content: string;
}

/*
 * A poll that is submitted to the DB as a new post for a community.
 */
export interface IpostPollSubmission extends IpostPreviewSubmission {
  content: string;
  options: Array<IpollOption>;
}

/*
 * A comment that is submitted to the DB as a new comment for a post.
 */
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

/*
 * A comment that is submitted to the DB as a new comment for a post. It
 * differs from IpostCommentSubmission in that it has an ID since it was
 * already added to DB.
 */
export interface IpostComment extends IpostCommentSubmission {
  id: string;
}
