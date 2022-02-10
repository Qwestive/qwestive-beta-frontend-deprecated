/**
 * @param maxSize - maximum file size in Mib
 */
export default function IsImageBelowMaxSize(file: File, maxSize: number): void {
  if (file.type.toString().indexOf('image/') !== 0) {
    throw new Error('Input file is not an image');
  }
  if (file.size > maxSize * 1024 * 1024) {
    throw new Error(`Input image needs to be smaller than ${maxSize} Mb!`);
  }
}
