import { PublicKey } from '@solana/web3.js';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';

/* 
  Community types
*/

export interface Icommunity {
  cId: string;
  memberCount: string;
}

export interface ItokenOwned {
  mint: string;
  amountHeld: number;
  name: string | undefined;
  imageUrl: string | undefined;
  communityData: Icommunity | undefined;
}

/* 
  User setting types
*/

export interface IimageCropper {
  setImageEditingModalOpen: Dispatch<SetStateAction<boolean>>;
  image: string;
  setImage: SetterOrUpdater<string | undefined>;
  imageSaver(fileToUpload: File): Promise<string>;
  cropShape: 'rect' | 'round' | undefined;
  successMessage: string;
  cropperLgWidth: number;
  cropperLgHeight: number;
  cropperSmWidth: number;
  cropperSmHeight: number;
  maxZoom: number;
}

export interface IimageEditing {
  setImageEditingModalOpen: Dispatch<SetStateAction<boolean>>;
  image: string;
  setImage: SetterOrUpdater<string | undefined>;
}

export interface IimageEditingModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

/* 
  Auth types
*/

export interface IsignoutWithWallet {
  disconnect: () => Promise<void>;
  connected: boolean;
}

export interface IwalletPropForSignin {
  uid: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

export interface ImessageToSign {
  uid: string;
  message: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

export interface IsignedMessage {
  uid: string;
  encodedMessage: Uint8Array;
  signature: Uint8Array | undefined;
  publicKeyBytes: Uint8Array | undefined;
}

/* 
  Post types
*/

export type TpostSorting = 'New' | 'Top' | 'Poll' | 'Bounty';

export type TpostType = 'article' | 'poll' | 'bounty' | 'vote';

export interface Icategories {
  name: string;
  count: number;
}

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
  creationDate: Date;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
  numberOfComments: number;
}

export interface IpostArticle extends IpostPreview {
  content: string;
}

export interface IpostData {
  id: string;
  postType: string;
  accessTokenId: string;
  accessMinimumTokenBalance: number;
  authorUserId: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  title: string;
  contents: string;
  creationDate: Date;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
  numberOfComments: number;
}

export interface IpostComment {
  id: string;
  postId: string;
  parentCommentId: string;
  depth: number;
  authorUserId: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  body: string;
  upVoteUserIds: Array<string>;
  downVoteUserIds: Array<string>;
}
