import React, { useState } from 'react';

type PostActionsSectioData = {
  upVotes: Array<string> | undefined;
  downVotes: Array<string> | undefined;
  numComments: number | undefined;
  tipReceivingPublicKey: string | undefined;
};

function PostActionsSection({
  upVotes,
  downVotes,
  numComments,
  tipReceivingPublicKey,
}: PostActionsSectioData): JSX.Element {
  const [value] = useState('');

  return (
    <div className="flex">
      <div>{upVotes?.length ?? 0}</div>
      <div>{downVotes?.length ?? 0}</div>
      <div>{numComments ?? 0}</div>
    </div>
  );
}

export default PostActionsSection;
