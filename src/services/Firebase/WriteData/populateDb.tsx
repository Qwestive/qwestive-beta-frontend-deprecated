import { doc, setDoc } from 'firebase/firestore';

import { Firestore } from '../FirebaseConfig';
import {
  IpostPreviewSubmission,
  IpostArticleSubmission,
  IpostCommentSubmission,
  IpostPollSubmission,
} from '../../../types/types';

export interface IpostPreviewWrapper {
  id: string;
  contents: IpostPreviewSubmission;
}

export interface IpostArticleWrapper {
  id: string;
  contents: IpostArticleSubmission;
}
export interface IpostPollWrapper {
  id: string;
  contents: IpostPollSubmission;
}

export interface IpostCommentWrapper {
  id: string;
  contents: IpostCommentSubmission;
}

const ACCESS_TOKEN_ID = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
const AUTHORID = 'FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ';

const POST_PREVIEWS: Array<IpostPreviewWrapper> = [
  {
    id: '111',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 1,
      authorUserId: AUTHORID,
      authorUserName: 'metadiego',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      creationDate: 1234,
      category: 'category-1',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '222',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 10,
      authorUserId: AUTHORID,
      authorUserName: 'jisnpe',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      creationDate: 123,
      category: 'category-1',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '333',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 50,
      authorUserId: AUTHORID,
      authorUserName: 'seanHCode',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      creationDate: 1234,
      category: 'category-2',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '444',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 50,
      authorUserId: AUTHORID,
      authorUserName: 'jasonzhu',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      creationDate: 1234,
      category: 'category-3',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '555',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 100,
      authorUserId: AUTHORID,
      authorUserName: 'pauloalmeida',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      creationDate: 1234,
      category: 'category-3',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '666',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 100,
      authorUserId: AUTHORID,
      authorUserName: 'metadiego',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      creationDate: 1234,
      category: 'category-1',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '777',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 1000,
      authorUserId: AUTHORID,
      authorUserName: 'jinspe',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly behind',
      creationDate: 1234,
      category: 'category-2',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
];

const POSTS: Array<IpostArticleWrapper> = [
  {
    id: '111',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 1,
      authorUserId: AUTHORID,
      authorUserName: 'metadiego',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      content:
        '<h1>Heading</h2><h2>Subheading</h2><p>Some paragrap</p><li>' +
        '<ul>List Item 1</ul><ul>List item 2</ul></li>',
      creationDate: 1234,
      category: 'category-1',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '222',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 10,
      authorUserId: AUTHORID,
      authorUserName: 'jisnpe',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly behind',
      content:
        '<h1>Heading</h2><h2>Subheading</h2><p>Some paragrap</p><li>' +
        '<ul>List Item 1</ul><ul>List item 2</ul></li>',
      creationDate: 123,
      category: 'category-1',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '333',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 50,
      authorUserId: AUTHORID,
      authorUserName: 'seanHCode',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      content:
        '<h1>Heading</h2><h2>Subheading</h2><p>Some paragrap</p><li>' +
        '<ul>List Item 1</ul><ul>List item 2</ul></li>',
      creationDate: 1234,
      category: 'category-2',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '444',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 50,
      authorUserId: AUTHORID,
      authorUserName: 'jasonzhu',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      content:
        '<h1>Heading</h2><h2>Subheading</h2><p>Some paragrap</p><li>' +
        '<ul>List Item 1</ul><ul>List item 2</ul></li>',
      creationDate: 1234,
      category: 'category-3',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '555',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 100,
      authorUserId: AUTHORID,
      authorUserName: 'pauloalmeida',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      content:
        '<h1>Heading</h2><h2>Subheading</h2><p>Some paragrap</p><li>' +
        '<ul>List Item 1</ul><ul>List item 2</ul></li>',
      creationDate: 1234,
      category: 'category-3',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '666',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 100,
      authorUserId: AUTHORID,
      authorUserName: 'metadiego',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      content:
        '<h1>Heading</h2><h2>Subheading</h2><p>Some paragrap</p><li>' +
        '<ul>List Item 1</ul><ul>List item 2</ul></li>',
      creationDate: 1234,
      category: 'category-1',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
  {
    id: '777',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 1000,
      authorUserId: AUTHORID,
      authorUserName: 'jinspe',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      content:
        '<h1>Heading</h2><h2>Subheading</h2><p>Some paragrap</p><li>' +
        '<ul>List Item 1</ul><ul>List item 2</ul></li>',
      creationDate: 1234,
      category: 'category-2',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
];

const POLLS: Array<IpostPollWrapper> = [
  {
    id: '111',
    contents: {
      postType: 'article',
      accessTokenId: ACCESS_TOKEN_ID,
      accessMinimumTokenBalance: 1,
      authorUserId: AUTHORID,
      authorUserName: 'metadiego',
      authorPublicKey: AUTHORID,
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
      content: '<h1>What should we invest in?</h1>',
      options: [
        { id: '1', name: 'Bitcoin', voteUserIds: ['metadiego', 'john'] },
        { id: '2', name: 'Ethereum', voteUserIds: ['metadiego', 'john'] },
        { id: '3', name: 'Solana', voteUserIds: ['metadiego', 'john'] },
      ],
      creationDate: 1234,
      category: 'category-1',
      upVoteUserIds: [],
      downVoteUserIds: [],
      numberOfComments: 10,
    },
  },
];

const COMMENTS: Array<IpostCommentWrapper> = [];

export default async function populateDb(): Promise<void> {
  POSTS.forEach((item: IpostArticleWrapper) => {
    setDoc(doc(Firestore, 'posts', item.id), item.contents);
  });
  POLLS.forEach((item: IpostPollWrapper) => {
    setDoc(doc(Firestore, 'posts', item.id), item.contents);
  });
  POST_PREVIEWS.forEach((item: IpostPreviewWrapper) => {
    setDoc(doc(Firestore, 'postPreviews', item.id), item.contents);
  });
  COMMENTS.forEach((item: IpostCommentWrapper) => {
    setDoc(doc(Firestore, 'comments', item.id), item.contents);
  });
}
