import React from 'react';
import { useNavigate } from 'react-router-dom';

type TpostTitleSection = {
  disableEdit: boolean;
  handlePublish: () => void;
};

/// Component with buttons to publish or cancel publish of a post.
export default function ActionButtonSection({
  disableEdit,
  handlePublish,
}: TpostTitleSection): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="flex justify-start gap-3 pr-2 pt-4">
      <button
        type="button"
        className="btn-filled rounded-3xl px-6 py-2"
        onClick={() => handlePublish()}
        disabled={disableEdit}>
        {disableEdit ? <p>Loading ...</p> : <p>Publish</p>}
      </button>
      <button
        type="button"
        className="btn-transparent px-6 rounded-3xl py-2"
        onClick={() => navigate(-1)}
        disabled={disableEdit}>
        Cancel
      </button>
    </div>
  );
}
