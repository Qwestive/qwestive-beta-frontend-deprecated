import React from 'react';
import { EyeIcon } from '@heroicons/react/solid';
import ClassNamesLogic from '../../../common/components/Util/ClassNamesLogic';

type TpostPermissionsSection = {
  postPublic: boolean;
  setPostPublic: (arg0: boolean) => void;
  tokenRequirement: number;
  setTokenRequirement: (arg0: number) => void;
};

/// Component which allows setting permissions for a post.
function PostPermissionsSection({
  postPublic,
  setPostPublic,
  tokenRequirement,
  setTokenRequirement,
}: TpostPermissionsSection): JSX.Element {
  return (
    <div className="p-px border-t py-2">
      <div className="flex justify-between">
        <div
          className="px-3 text-color-primary 
            text-base font-medium flex items-center gap-2">
          <EyeIcon className="h-4" />
          Who can see this post ?
        </div>
        <div
          className="flex justify-end gap-4 px-3
            text-color-primary text-sm  ">
          {/* Public Button */}
          <button type="button" onClick={() => setPostPublic(true)}>
            <div className="flex gap-1 items-center">
              <div className="transform scale-75">
                <div
                  className="rounded-full border-2 border-gray-900
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
              setTokenRequirement(0);
            }}>
            <div className="flex gap-1 items-center">
              <div className="transform scale-75">
                <div
                  className="rounded-full border-2 border-gray-900
                    p-0.5">
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
              className="text-color-primary 
                text-base font-medium">
              Only to people who hold at least
            </p>
            <input
              type="number"
              name="tokenrequirement"
              id="tokenrequirement"
              className="border border-gray-300 rounded-md block 
              focus:ring-0 text-color-primary text-sm  px-3 text-left 
              w-28 h-8"
              value={tokenRequirement}
              min={0}
              step={0.0001}
              onChange={(e) => setTokenRequirement(e.target.valueAsNumber)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPermissionsSection;