import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Spinner from 'components/Util/Spinner';
import IsImageBelowMaxSize from 'functions/ImageProcessing/IsImageBelowMaxSize';
import Compressor from 'compressorjs';
import {
  MAXDISPLAYNAMELENGTH,
  COMMUNITYNAMEMAXLENGTH,
} from 'functions/InputVerification/CommunityVerfication';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/outline';
import { ICustomCommunity } from 'types/types';

type TInfoForm = {
  community: ICustomCommunity;
  setCommunity: React.Dispatch<React.SetStateAction<ICustomCommunity>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | Blob | undefined>>;
  availabilityMessage: JSX.Element;
  checkCommunityName: (userNameBeingChecked: string) => Promise<boolean>;
  loadingCheckCommunityName: boolean;
};

export default function CommunityDetails({
  community,
  setCommunity,
  setImageFile,
  availabilityMessage,
  checkCommunityName,
  loadingCheckCommunityName,
}: TInfoForm): JSX.Element {
  const inputProfileImButton = useRef<HTMLInputElement>(null);
  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [tempImage, setTempImage] = useState('');

  function updateImageFile(file: File | Blob) {
    setImageFile(file);
    setTempImage(URL.createObjectURL(file));
  }

  async function changeProfileImFile(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      setProfileImageLoading(true);
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        IsImageBelowMaxSize(file, 10);
        await new Promise((resolve, reject) => {
          /* eslint-disable no-new */
          new Compressor(file, {
            convertTypes: ['image/png'],
            quality: 0.8,
            maxWidth: 500,
            maxHeight: 500,
            success: (compressedResult) => {
              resolve(updateImageFile(compressedResult));
            },
            error: (e) => {
              reject(e);
            },
          });
        });
        setProfileImageLoading(false);
      } else {
        throw new Error('Your file was not found!');
      }
    } catch (error: any) {
      toast.error(error?.message);
      setProfileImageLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="text-color-1 text-lg font-bold">Community details</h2>
      {/* Community name */}
      <div className="">
        <p className="block text-sm font-medium text-color-0">Community Name</p>
        <p className="block text-xs font-medium text-color-secondary">
          needs to be unique. Only letters, numbers, - and _ are allowed. ( max
          {` ${COMMUNITYNAMEMAXLENGTH}`} characters)
        </p>
        <div className="mt-1 flex max-w-sm rounded-xl shadow-md">
          <span
            className="inline-flex items-center 
                  px-3 rounded-l-xl border border-r-0 
                  border-gray-400 
                  dark:border-gray-600
                  bg-gray-50 dark:bg-gray-900
                  dark:text-gray-400 
                  text-gray-600 text-sm">
            /c/
          </span>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="text-field-input
                    rounded-none rounded-r-xl
                    block w-full text-sm"
            maxLength={44}
            value={community.name}
            onChange={(e) =>
              setCommunity((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <button
          type="button"
          className="flex mt-1 text-base font-medium 
          text-action text-center hover:underline items-center"
          onClick={() => checkCommunityName(community.name)}
          disabled={loadingCheckCommunityName}>
          Check if available{' '}
          {loadingCheckCommunityName && <Spinner classExtend=" ml-2 h-3 w-3" />}
        </button>
        <div className="text-sm text-color-1">{availabilityMessage}</div>
      </div>
      {/* Display name */}
      <div>
        <p className="block text-sm font-medium text-color-1">Display name</p>
        <div className="mt-2">
          <input
            type="text"
            name="username"
            id="displayname"
            autoComplete="off"
            className="text-field-input shadow-md rounded-xl w-full max-w-sm"
            maxLength={MAXDISPLAYNAMELENGTH}
            value={community.info.displayName}
            onChange={(e) =>
              setCommunity((prev) => ({
                ...prev,
                info: { ...prev.info, displayName: e.target.value },
              }))
            }
          />
        </div>
      </div>
      {/* Profile Image */}
      <div>
        <div
          className="items-baseline flex text-sm font-medium 
                  text-color-1">
          Community profile image{' '}
          <p className="text-xs ml-2 text-color-secondary font-medium">
            {' '}
            (500x500)
          </p>
        </div>
        <div className="mt-1 flex items-center space-x-5">
          {tempImage === '' || tempImage === undefined ? (
            <QuestionMarkCircleIcon className="text-color-1 h-14 w-14" />
          ) : (
            <img
              className="h-14 w-14 rounded-full 
                        border border-gray-400
                        dark:border-gray-600"
              src={tempImage}
              alt=""
            />
          )}
          <input
            ref={inputProfileImButton}
            accept="image/*"
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={(e) => changeProfileImFile(e)}
            onClick={(e) => {
              const element = e.target as HTMLInputElement;
              element.value = '';
            }}
          />
          <button
            type="button"
            className="button-neutral px-2 h-9"
            onClick={() => {
              if (inputProfileImButton.current)
                inputProfileImButton.current.click();
            }}
            disabled={profileImageLoading}>
            {profileImageLoading ? (
              <div className="flex items-center gap-2">
                Processing
                <Spinner classExtend="h-4 w-4" />
              </div>
            ) : (
              <div className="flex items-center gap-1 pl-1">
                Change
                <PencilIcon className="h-4 w-4" aria-hidden="true" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
