export interface PostComment {
  id: string;
  authorUserName: string;
  authorPublicKey: string;
  authorProfileImageUrl: string;
  body: string;
  numberOfSubComments: number;
  comments: Array<PostComment>;
}
