import React, { useState, useEffect } from 'react';
import CKeditorReader from './CKeditorReader';
import defaultUserProfileImage from '../../../../assets/defaultUserProfileImage.png';

type PostContents = {
  title: string | undefined;
  author: string | undefined;
  authorProfileImageUrl: string | undefined;
  creationDate: number | undefined;
  contents: string | undefined;
};

/// Components which displays the rich text contents of a post.
///
/// TODO:
/// - Add better styling.
function RichTextContainer({
  title,
  author,
  authorProfileImageUrl,
  creationDate,
  contents,
}: PostContents): JSX.Element {
  const [formattedDate, setFormattedDate] = useState('Unknown');

  useEffect(() => {
    if (creationDate !== undefined) {
      setFormattedDate(new Date(creationDate ?? 0).toLocaleDateString());
    }
  }, []);

  return (
    <div>
      <div className="text-4xl font-bold">{title ?? ''}</div>
      <div className="flex justify-start mt-4">
        {/* Check value is truthy - i.e not null/undefined/blank */}
        <img
          className="ml-2 h-6 w-6 rounded-full my-auto"
          src={authorProfileImageUrl || defaultUserProfileImage}
          alt=""
        />
        <div className="flex flex-col mx-2 my-auto">
          <div className="text-xs text-color-secondary my-auto truncate">
            Author: {author}
          </div>
          <div className="text-color-secondary text-xs">
            Created on: {formattedDate}
          </div>
        </div>
      </div>
      <div className="my-6">
        <CKeditorReader content={contents} />
      </div>
    </div>
  );
}

export default RichTextContainer;
