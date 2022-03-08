/* eslint-disable react/no-danger */

import React from 'react';
import dompurify from 'dompurify';
import '../../../../style/CKeditor/ckeditorwriter.css';
import '../../../../style/CKeditor/ckeditorbase.css';

type TcKeditorReader = {
  content: string | undefined;
};

/// Components which displays the rich text contents of a post.
///
/// TODO:
/// - Since Tailwind clears all default styles, rich text is
/// completely unstyled, this needs to be fixed.
/// - Add styling.
/// - Add better date formatting.
export default function CKeditorReader({
  content,
}: TcKeditorReader): JSX.Element {
  const createMarkup = () => {
    return {
      __html: dompurify.sanitize(content ?? ''),
    };
  };

  return (
    <div dangerouslySetInnerHTML={createMarkup()} className="ck-content" />
  );
}
