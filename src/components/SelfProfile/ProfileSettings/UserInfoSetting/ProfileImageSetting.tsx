import React, { useState, useRef } from 'react';
import { PencilAltIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { userInfoAtom } from 'services/recoil/userInfo';
import IsImageBelowMaxSize from 'functions/ImageProcessing/IsImageBelowMaxSize';
import SaveProfileImage from 'services/Firebase/UserSettings/SaveProfileImage';
import { grayImage, defaultUserProfileImage } from 'assets/userImages';

import ImageCropperModal from './ImageSettings/ImageCropperModal';
import ImageCropper from './ImageSettings/ImageCropper';

export default function ProfileImageSetting(): JSX.Element {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const [tempProfileImage, setTempProfileImage] = useState('');
  const [imageEditingmodalOpen, setImageEditingModalOpen] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);

  function changeImage(event: React.ChangeEvent<HTMLInputElement>): void {
    try {
      if (event.target.files && event.target.files[0]) {
        const imageFile = event.target.files[0];
        IsImageBelowMaxSize(imageFile, 10);
        setTempProfileImage(URL.createObjectURL(imageFile));
        setImageEditingModalOpen(true);
      } else {
        throw new Error('Your file was not found!');
      }
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  return (
    <div>
      <div className="max-w-5xl -mt-12 mx-auto px-4">
        <div className="flex relative">
          <input
            ref={inputFile}
            accept="image/*"
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={(e) => changeImage(e)}
            onClick={(e) => {
              const element = e.target as HTMLInputElement;
              element.value = '';
            }}
          />
          <img
            className="h-24 w-24 rounded-full ring-4 ring-white"
            src={userInfo?.profileImage ?? defaultUserProfileImage}
            alt=""
          />
          <img
            className="absolute opacity-50 h-24 w-24 
            rounded-full ring-4 ring-white"
            src={grayImage}
            alt=""
          />
          <div className="absolute w-full top-8 left-8 text-white text-xl ">
            <button
              type="button"
              className="text-white "
              onClick={() => {
                if (inputFile.current) inputFile.current.click();
              }}>
              <PencilAltIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
      <ImageCropperModal
        open={imageEditingmodalOpen}
        setOpen={setImageEditingModalOpen}>
        <ImageCropper
          setImageEditingModalOpen={setImageEditingModalOpen}
          image={tempProfileImage}
          setImage={(im: string) => {
            setUserInfo((prevState) =>
              prevState !== undefined
                ? { ...prevState, profileImage: im }
                : undefined
            );
          }}
          imageSaver={SaveProfileImage}
          cropShape="round"
          successMessage="Profile Image Updated!"
          cropperLgWidth={240}
          cropperLgHeight={240}
          cropperSmWidth={220}
          cropperSmHeight={220}
          maxZoom={6}
        />
      </ImageCropperModal>
    </div>
  );
}
