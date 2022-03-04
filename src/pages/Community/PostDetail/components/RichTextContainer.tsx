/* eslint-disable react/no-danger */

import React from 'react';
import dompurify from 'dompurify';

type PostContents = {
  title: string | undefined;
  author: string | undefined;
  creationDate: Date | undefined;
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
  const createMarkup = () => {
    return {
      __html: dompurify.sanitize(contents ?? ''),
    };
  };

  return (
    <div>
      <div className="text-4xl font-bold">{title ?? ''}</div>
      <div className="text-color-secondary">{author ?? ''}</div>
      <div className="text-color-secondary">
        Created on: {creationDate?.toString() ?? ''}
      </div>
      <div dangerouslySetInnerHTML={createMarkup()} className="editor" />
    </div>
  );
}

export default RichTextContainer;
