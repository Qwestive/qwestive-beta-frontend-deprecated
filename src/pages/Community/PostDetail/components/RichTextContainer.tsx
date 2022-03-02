import React from 'react';
import dompurify from 'dompurify';

type PostContents = {
  title: string | undefined;
  author: string | undefined;
  creationDate: Date | undefined;
  contents: string | undefined;
};

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
      <div dangerouslySetInnerHTML={createMarkup()} className="editor" />
    </div>
  );
}

export default RichTextContainer;
