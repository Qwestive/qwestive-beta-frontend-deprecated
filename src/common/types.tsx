import { PublicKey } from '@solana/web3.js';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
import { DocumentData } from 'firebase/firestore';

export interface ItokenOwned {
  mint: string;
  amountHeld: number;
  name: string | undefined;
  imageUrl: string | undefined;
  communityData: DocumentData | undefined;
}

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
