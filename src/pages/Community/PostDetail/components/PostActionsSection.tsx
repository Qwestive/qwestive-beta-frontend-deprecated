import React, { useState } from 'react';

type PostActionsSectioData = {
  numVotes: number;
  numComments: number;
  numViews: number;
  tipReceivingPublicKey: string;
};

function PostActionsSection({
  numVotes,
  numComments,
  numViews,
  tipReceivingPublicKey,
}: PostActionsSectioData): JSX.Element {
  const [value] = useState('');

  return (
    <div className="flex">
      <div>{numVotes}</div>
      <div>{numComments}</div>
      <div>{numViews}</div>
    </div>
  );
}

export default PostActionsSection;
