const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });
/**
 * @param imageUrl - Image File url
 * @param crop - pixelCrop Object provided by react-easy-crop
 */
export default async function CreateCroppedImage(
  imageUrl: string,
  crop: {
    width: number;
    height: number;
    x: number;
    y: number;
  }
): Promise<Blob> {
  const image = await createImage(imageUrl);
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to process your image!');
  }

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      return file
        ? resolve(file)
        : reject(new Error('Unable to process your image!'));
    }, 'image/jpeg');
  });
}
