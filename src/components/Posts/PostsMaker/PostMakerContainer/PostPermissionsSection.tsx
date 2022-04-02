import React, { useState, Dispatch, SetStateAction } from 'react';
import { EyeIcon } from '@heroicons/react/solid';
import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import { IpostPreviewSubmission } from 'types/types';

type TpostPermissionsSection = {
  postPreviewSubmission: IpostPreviewSubmission;
  setPostPreviewSubmission: Dispatch<SetStateAction<IpostPreviewSubmission>>;
};

/// Component which allows setting permissions for a post.
export default function PostPermissionsSection({
  postPreviewSubmission,
  setPostPreviewSubmission,
}: TpostPermissionsSection): JSX.Element {
  const [postPublic, setPostPublic] = useState(false);
  return (
    <div className="p-px border-t border-gray-200 dark:border-gray-700 py-2">
      <div className="flex justify-between">
        <div
          className="text-color-1 
            text-base font-medium flex items-center gap-2">
          <EyeIcon className="h-4" />
          Who can see this post ?
        </div>
        <div
          className="sm:flex justify-end gap-4 px-3
            text-color-1 text-sm  ">
          {/* Public Button */}
          <button type="button" onClick={() => setPostPublic(true)}>
            <div className="px-1 flex gap-1 items-center">
              <div className="transform scale-75">
                <div
                  className="rounded-full border-2 border-gray-900
                  dark:border-gray-100
                    p-0.5">
                  <div
                    className={ClassNamesLogic(
                      !postPublic ? 'bg-transparant' : 'bg-qwestive-purple',
                      ' rounded-full p-1.5 m-auto'
                    )}
                  />
                </div>
              </div>
              <p className="font-medium">Public</p>
            </div>
          </button>
          {/* Exclusive Button */}
          <button
            type="button"
            onClick={() => {
              setPostPublic(false);
              setPostPreviewSubmission((prevState) => ({
                ...prevState,
                accessMinimumTokenBalance: 0,
              }));
            }}>
            <div className="flex px-1 gap-1 items-center">
              <div className="transform scale-75">
                <div
                  className="rounded-full border-2 border-gray-900
                  dark:border-gray-100 p-0.5">
                  <div
                    className={ClassNamesLogic(
                      postPublic ? 'bg-transparant' : 'bg-qwestive-purple',
                      ' rounded-full p-1.5 m-auto'
                    )}
                  />
                </div>
              </div>
              <p className="font-medium">Exclusive</p>
            </div>
          </button>
        </div>
      </div>
      {!postPublic && (
        <div className="mt-3 px-3">
          <div className="flex items-center gap-3">
            <p
              className="text-color-1 
                text-base font-medium">
              Only to people who hold at least
            </p>
            <input
              type="number"
              name="tokenrequirement"
              id="tokenrequirement"
              className="text-field-input border 
               rounded-xl block text-color-primary text-sm px-3 text-left 
              w-28 h-8"
              value={postPreviewSubmission.minimumAccessBalance}
              min={0}
              step={0.0001}
              onChange={(e) =>
                setPostPreviewSubmission((prevState) => ({
                  ...prevState,
                  minimumAccessBalance: e.target.valueAsNumber,
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
