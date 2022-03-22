import React, { useState, useRef } from 'react';
import { PencilAltIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import grayImage from 'assets/grayImage.png';

import { userCoverImageAtom } from '../../../../services/recoil/userInfo';
import IsImageBelowMaxSize from '../../../../functions/ImageProcessing/IsImageBelowMaxSize';
import ImageCropperModal from './ImageSettings/ImageCropperModal';
import ImageCropper from './ImageSettings/ImageCropper';
import SaveCoverImage from '../../../../services/Firebase/UserSettings/SaveCoverImage';

export default function CoverImageSetting(): JSX.Element {
  const [recoilCoverImage, setRecoilCoverImage] =
    useRecoilState(userCoverImageAtom);

  const [tempCoverImage, setTempCoverImage] = useState('');
  const [imageEditingmodalOpen, setImageEditingModalOpen] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);

  function changeImage(event: React.ChangeEvent<HTMLInputElement>): void {
    try {
      if (event.target.files && event.target.files[0]) {
        const imageFile = event.target.files[0];
        IsImageBelowMaxSize(imageFile, 10);
        setTempCoverImage(URL.createObjectURL(imageFile));
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
      <div className="relative content-center max-w-5xl mx-auto -z-50">
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
          className="h-32 w-full mx-auto object-cover lg:h-48"
          src={recoilCoverImage}
          alt=""
        />
        <img
          className="absolute opacity-50 h-32 w-full top-0 max-w-5xl 
          mx-auto object-cover lg:h-48"
          src={grayImage}
          alt=""
        />
        <div
          className="absolute w-full flex justify-center top-12 
        text-white text-xl lg:top-20">
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
      <ImageCropperModal
        open={imageEditingmodalOpen}
        setOpen={setImageEditingModalOpen}>
        <ImageCropper
          setImageEditingModalOpen={setImageEditingModalOpen}
          image={tempCoverImage}
          setImage={setRecoilCoverImage}
          imageSaver={SaveCoverImage}
          cropShape="rect"
          successMessage="Cover Image Updated!"
          cropperLgWidth={480}
          cropperLgHeight={120}
          cropperSmWidth={300}
          cropperSmHeight={75}
          maxZoom={6}
        />
      </ImageCropperModal>
    </div>
  );
}
