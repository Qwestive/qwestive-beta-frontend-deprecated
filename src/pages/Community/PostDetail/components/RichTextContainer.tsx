/* eslint-disable react/no-danger */

import React, { useState, useEffect } from 'react';
import CKeditorReader from '../../../../common/components/Posts/CKeditor/CKeditorReader';

type PostContents = {
  title: string | undefined;
  author: string | undefined;
  creationDate: number | undefined;
  contents: string | undefined;
};

/// Components which displays the rich text contents of a post.
///
/// TODO:
/// - Since Tailwind clears all default styles, rich text is
/// completely unstyled, this needs to be fixed.
/// - Add styling.
/// - Add better date formatting.
function RichTextContainer({
  title,
  author,
  creationDate,
  contents,
}: PostContents): JSX.Element {
  const [formattedDate, setFormattedDate] = useState('Unknown');

  useEffect(() => {
    if (creationDate !== undefined) {
      setFormattedDate(new Date(creationDate ?? 0).toLocaleDateString());
    }
  });

  return (
    <div>
      <div className="text-4xl font-bold">{title ?? ''}</div>
      <div className="text-color-secondary text-xs mt-2">
        Author: {author ?? ''}
      </div>
      <div className="text-color-secondary text-xs">
        Created on: {formattedDate}
      </div>
      <div className="my-6">
        <CKeditorReader content={contents} />
      </div>
    </div>
  );
}

export default RichTextContainer;
