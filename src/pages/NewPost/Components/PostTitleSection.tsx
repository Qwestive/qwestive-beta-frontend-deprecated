import React from 'react';

type TpostTitleSection = {
  title: string;
  setTitle: (arg0: string) => void;
};

const MAXTITLELENGTH = 100;

/// Component which displays the title input box for post creation.
function PostTitleSection({ title, setTitle }: TpostTitleSection): JSX.Element {
  return (
    <div className="p-px">
      <input
        type="text"
        name="title"
        id="title"
        className="border border-transparent focus:border-qwestive-purple
         block w-full text-2xl font-semibold px-3"
        placeholder="Title"
        value={title}
        maxLength={MAXTITLELENGTH}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

export default PostTitleSection;
