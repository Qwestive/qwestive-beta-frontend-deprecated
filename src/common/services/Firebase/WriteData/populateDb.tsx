import { doc, setDoc } from 'firebase/firestore';

import { Firestore } from '../FirebaseConfig';
import {
  IpostPreviewSubmission,
  IpostArticleSubmission,
  IpostCommentSubmission,
} from '../../../types';

export interface IpostArticleWrapper {
  id: string;
  contents: IpostArticleSubmission;
}

export interface IpostPreviewWrapper {
  id: string;
  contents: IpostPreviewSubmission;
}

export interface IpostCommentWrapper {
  id: string;
  contents: IpostCommentSubmission;
}
const POST_PREVIEWS: Array<IpostPreviewWrapper> = [
  {
    id: '111',
    contents: {
      postType: 'article',
      accessTokenId: '1',
      accessMinimumTokenBalance: 1,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'metadiego',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '1',
      accessMinimumTokenBalance: 10,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'jisnpe',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '2',
      accessMinimumTokenBalance: 50,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'seanHCode',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '2',
      accessMinimumTokenBalance: 50,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'jasonzhu',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '2',
      accessMinimumTokenBalance: 100,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'pauloalmeida',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '3',
      accessMinimumTokenBalance: 100,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'metadiego',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '3',
      accessMinimumTokenBalance: 1000,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'jinspe',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
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
      accessTokenId: '1',
      accessMinimumTokenBalance: 1,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'metadiego',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '1',
      accessMinimumTokenBalance: 10,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'jisnpe',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorProfileImageUrl: '',
      title: 'Web 2.5: Where we are truly headed',
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
      accessTokenId: '2',
      accessMinimumTokenBalance: 50,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'seanHCode',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '2',
      accessMinimumTokenBalance: 50,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'jasonzhu',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '2',
      accessMinimumTokenBalance: 100,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'pauloalmeida',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '3',
      accessMinimumTokenBalance: 100,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'metadiego',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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
      accessTokenId: '3',
      accessMinimumTokenBalance: 1000,
      authorUserId: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
      authorUserName: 'jinspe',
      authorPublicKey: '3oabmiVFubrBn2hJoRcP8Ko2LvCGb2Z3vB58rgoBFgUV',
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

const COMMENTS: Array<IpostCommentWrapper> = [];

export default async function populateDb(): Promise<void> {
  POSTS.forEach((item: IpostArticleWrapper) => {
    setDoc(doc(Firestore, 'posts', item.id), item.contents);
  });
  POST_PREVIEWS.forEach((item: IpostPreviewWrapper) => {
    setDoc(doc(Firestore, 'postPreviews', item.id), item.contents);
  });
  COMMENTS.forEach((item: IpostCommentWrapper) => {
    setDoc(doc(Firestore, 'comments', item.id), item.contents);
  });
}
