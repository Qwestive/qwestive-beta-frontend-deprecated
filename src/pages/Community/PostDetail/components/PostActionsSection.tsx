import React from 'react';

type PostActionsSectioData = {
  upVotes: Array<string> | undefined;
  downVotes: Array<string> | undefined;
  numComments: number | undefined;
  tipReceivingPublicKey: string | undefined;
};

/// Component which allows upvoting/downvoting/tipping a post and viwing data
/// about a post.
///
/// TODO:
/// - Add styling and logic to handle up/downvote.
/// - Add logic to send tip
function PostActionsSection({
  upVotes,
  downVotes,
  numComments,
  tipReceivingPublicKey,
}: PostActionsSectioData): JSX.Element {
  return (
    <div className="flex">
      <div>{upVotes?.length ?? 0}</div>
      <div>{downVotes?.length ?? 0}</div>
      <div>{numComments ?? 0}</div>
      <div>Send a tip to: {tipReceivingPublicKey}</div>
    </div>
  );
}

export default PostActionsSection;
