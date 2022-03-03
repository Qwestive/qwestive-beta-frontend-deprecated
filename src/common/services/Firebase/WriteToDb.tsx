import { collection, addDoc } from 'firebase/firestore';
import { Firestore } from './FirebaseConfig';

const post1 = {
  postType: 'article',
  accessTokenId: '111',
  accessMinimumTokenBalance: 1,
  authorUserName: 'metadiego',
  authorPublicKey: '0x1111',
  authorProfileImageUrl: '',
  title: 'XSS Sanitation is important for all user inputs',
  contents:
    '<h1>This are the contents of the post with some injected code:</h1> <img src=x onerror=alert(1)//><p>If the image above is not sanitized the it would cause an alert to be thrown by the browser.</p>',
  creationDate: new Date(),
  upVoteUserIds: [],
  downVoteUserIds: ['0x123', '0x333', '0x654', '0x134', '0x234'],
  numberOfComments: 69,
};

const post2 = {
  postType: 'article',
  accessTokenId: '111',
  accessMinimumTokenBalance: 10,
  authorUserName: 'jean',
  authorPublicKey: '0x2222',
  authorProfileImageUrl: '',
  title: 'Why is it so hard to authenticate the source of an NFT in a wallet',
  contents:
    '<h2>I always ask myself that question, and, my answer always is:?</h2><p>Because life is hard.</p>',
  creationDate: new Date(),
  upVoteUserIds: ['0x123', '0x333', '0x654', '0x222', '0x111', '0x891'],
  downVoteUserIds: [],
  numberOfComments: 1,
};

const post3 = {
  postType: 'article',
  accessTokenId: '222',
  accessMinimumTokenBalance: 5,
  authorUserName: 'jason',
  authorPublicKey: '0x3333',
  authorProfileImageUrl: '',
  title: 'UX in Web3 Sucks...Lets Make it better',
  contents:
    '<h1>This are the contents of the post with some injected code:</h1> <img src=x onerror=alert(1)//>',
  creationDate: new Date(),
  upVoteUserIds: ['0x123', '0x333', '0x654', '0x1111', '0x999'],
  downVoteUserIds: ['0x222'],
  numberOfComments: 20,
};

const post4 = {
  postType: 'article',
  accessTokenId: '222',
  accessMinimumTokenBalance: 100,
  authorUserName: 'sean',
  authorPublicKey: '0x4444',
  authorProfileImageUrl: '',
  title: 'A new way of on-chain voting for Web 2.5',
  contents:
    "<p>Weve all heard of Web3 and all it's potential, but let's be honest, it's 50% BS<p><p>I'd like to propose a new approach, Web2.5.</p>",
  creationDate: new Date(),
  upVoteUserIds: ['0x111', '0x222', '0x123', '0x333', '0x654'],
  downVoteUserIds: [],
  numberOfComments: 4,
};

const post5 = {
  postType: 'article',
  accessTokenId: '333',
  accessMinimumTokenBalance: 20,
  authorUserName: 'paulo',
  authorPublicKey: '0x12346',
  authorProfileImageUrl: '',
  title: 'Communities in the age of Web3',
  contents:
    '<h1>Imagine a place where every token holder has a voice and space to express themselves</h1><h3>That is what I came here to present to you today.</h3>',
  creationDate: new Date(),
  upVoteUserIds: ['0x123', '0x333', '0x654', '0x134', '0x234'],
  downVoteUserIds: ['0x222', '0x111'],
  numberOfComments: 20,
};

export interface PostData {
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
  comments: Array<PostComment>;
}

export interface PostComment {
  id: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  body: string;
  numberOfSubComments: number;
  comments: Array<PostComment>;
}

export async function writePostToDb(): Promise<void> {
  await addDoc(collection(Firestore, 'posts'), post1);
  await addDoc(collection(Firestore, 'posts'), post2);
  await addDoc(collection(Firestore, 'posts'), post3);
  await addDoc(collection(Firestore, 'posts'), post4);
  await addDoc(collection(Firestore, 'posts'), post5);
}
