import React from 'react';

type TpostCategorySection = {
  category: string;
  setCategory: (arg0: string) => void;
};

const MAXCATEGORYLENGTH = 20;

/// Component which allows selecting a cagory for a post.
function PostCategorySection({
  category,
  setCategory,
}: TpostCategorySection): JSX.Element {
  return (
    <div className="p-px border-t">
      <div className="flex justify-start gap-3 items-center px-3">
        <p className="text-color-primary text-base font-medium"># Topic</p>
        <input
          type="text"
          name="topic"
          id="topic"
          className="border border-transparent 
        block 
        focus:ring-0
        focus:border-transparent 
        text-color-primary
        text-base  px-3
        text-left
        "
          placeholder="example: infos"
          value={category}
          maxLength={MAXCATEGORYLENGTH}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
    </div>
  );
}

export default PostCategorySection;
