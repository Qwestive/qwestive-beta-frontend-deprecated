import React from 'react';

import { IpostData } from '../../../../common/types';

type TpostPreviewCard = {
  post: IpostData;
};

export default function PostPreviewCard({
  post,
}: TpostPreviewCard): JSX.Element {
  return (
    <div>
      <p>{post.title}</p>
    </div>
  );
}
