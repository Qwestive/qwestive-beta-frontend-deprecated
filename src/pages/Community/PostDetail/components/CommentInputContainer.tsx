import React from 'react';

/// Component which allows commenting on a post.
///
/// TODO: add logic to handle posting comments to the DB and including them in
/// the comments section.
function CommentInputContainer(): JSX.Element {
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700">
        Comment
        <div className="mt-1">
          <textarea
            rows={4}
            name="comment"
            id="comment"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500
            block w-full sm:text-sm border-gray-300 rounded-md"
            defaultValue=""
          />
        </div>
      </label>
    </div>
  );
}

export default CommentInputContainer;
