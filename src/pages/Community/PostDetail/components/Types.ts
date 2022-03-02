export interface PostData {
  postId: string;
  postType: string;
  accessTokenId: string;
  accessMinimumTokenBalance: number;
  authorPublicKey: string;
  title: string;
  contents: string;
  creationDate: Date;
  comments: Array<PostComment>;
  numberOfComments: number;
  numberOfVotes: number;
  numberOfViews: number;
}

export interface PostComment {
  id: string;
  authorPublicKey: string;
  body: string;
  numberOfSubComments: number;
  comments: Array<PostComment>;
}
