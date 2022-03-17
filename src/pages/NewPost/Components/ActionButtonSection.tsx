import React from 'react';
import { useNavigate } from 'react-router-dom';

type TpostTitleSection = {
  publishDisabled: boolean;
  handlePublish: () => void;
};

/// Component with buttons to publish or cancel publish of a post.
function ActionButtonSection({
  publishDisabled,
  handlePublish,
}: TpostTitleSection): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 ">
      <div className="flex justify-start gap-3 pr-2 pt-4">
        <button
          type="button"
          className="btn-filled rounded-3xl px-6 py-2"
          onClick={() => handlePublish()}
          disabled={publishDisabled}>
          {publishDisabled ? <p>Loading ...</p> : <p>Publish</p>}
        </button>
        <button
          type="button"
          className="btn-transparent px-6 rounded-3xl py-2"
          onClick={() => navigate(-1)}
          disabled={publishDisabled}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ActionButtonSection;
