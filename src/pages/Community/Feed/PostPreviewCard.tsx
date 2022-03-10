import React from 'react';

import { IpostArticle } from '../../../common/types';

type TpostPreviewCard = {
  post: IpostArticle;
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
