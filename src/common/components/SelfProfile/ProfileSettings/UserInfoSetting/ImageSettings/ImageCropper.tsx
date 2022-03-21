import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { toast } from 'react-toastify';
import CreateCroppedImage from 'common/functions/ImageProcessing/CreateCroppedImage';
import { IimageCropper } from 'common/types';

/**
 * @param cropperLgWidth -Width of the cropper when the screen is larger than sm
 * @param cropperSmWidth -Width when the screen is smaller than sm
 * @param successMessage -Message to be toasted when the image has been saved
 */
export default function ImageCropper({
  setImageEditingModalOpen,
  image,
  setImage,
  imageSaver,
  cropShape,
  successMessage,
  cropperLgWidth,
  cropperLgHeight,
  cropperSmWidth,
  cropperSmHeight,
  maxZoom,
}: IimageCropper): JSX.Element {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const [cropperWidth, setCropWidth] = useState(cropperLgWidth);
  const [cropperHeight, setCropHeight] = useState(cropperLgHeight);

  useEffect(() => {
    const { innerWidth: width } = window;
    if (width < 640) {
      setCropWidth(cropperSmWidth);
      setCropHeight(cropperSmHeight);
    }
  }, []);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixelsIn: Area) => {
      setCroppedAreaPixels(croppedAreaPixelsIn);
    },
    []
  );
  async function handleSave() {
    setUploadLoading(true);
    try {
      if (croppedAreaPixels) {
        const bloo = await CreateCroppedImage(image, croppedAreaPixels);
        const fileToUpload = new File([bloo], 'image.jpeg', {
          type: 'image/jpeg',
        });
        setImage(await imageSaver(fileToUpload));
      } else {
        throw new Error('Unable to process your image!');
      }
      toast.success(successMessage);
      setUploadLoading(false);
      setImageEditingModalOpen(false);
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      setUploadLoading(false);
      toast.error(error?.message);
      setImageEditingModalOpen(false);
    }
  }

  return (
    <div className="relative ">
      <div className="relative mx-auto h-64 w-full sm:w-4/5  ">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape={cropShape}
          cropSize={{ width: cropperWidth, height: cropperHeight }}
          onMediaLoaded={(mediaSize) => {
            // Adapt zoom based on media size to fit max height
            if (
              mediaSize.height / mediaSize.width >
              cropperHeight / cropperWidth
            ) {
              const initZom =
                Math.floor((cropperWidth * 100) / mediaSize.width) / 100;
              setZoom(initZom);
              setMinZoom(initZom);
            } else {
              const initZom =
                Math.floor((cropperHeight * 100) / mediaSize.height) / 100;
              setZoom(initZom);
              setMinZoom(initZom);
            }
          }}
        />
      </div>
      <div className="mt-3">
        <div className="flex justify-center">
          <input
            type="range"
            min={minZoom}
            max={maxZoom}
            step="0.01"
            className="border
            relative form-range w-4/5 h-6 p-0
            bg-transparent
            focus:outline-none focus:ring-0 focus:shadow-none"
            id="customRange1"
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            value={zoom}
          />
        </div>
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            className="w-4/5 btn-filled"
            onClick={handleSave}>
            {uploadLoading ? 'Loading' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
