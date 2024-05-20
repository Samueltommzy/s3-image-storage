import {S3Client} from '@aws-sdk/client-s3';
import getUrlExtension from './validate-file';
import {Upload} from '@aws-sdk/lib-storage';
const s3Client = new S3Client({
  apiVersion: '2006-03-01',
  region: process.env.REGION,
});
/**
 * This method stores the buffer from a valid image into S3 Bucket using the lib storage Upload
 * @param {*} buffer
 * @param {*} url
 */
export const storeImage = async (buffer, url) => {
  try {
    const supportedMimeTypes = /'jpg'|'jpeg'|'png'|'tiff'|'gif'/i;
    const mimeType = getUrlExtension(url);
    const imageKey = `sessions-image-${Date.now()}.${mimeType}`;
    if (supportedMimeTypes) {
      const parallelUpload = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.S3_IMAGE_BUCKET,
          Key: imageKey,
          Body: buffer,
        },
      });
      parallelUpload.on('httpUploadProgress', progress => {
        console.log({progress});
      });
      await parallelUpload.done();
      return imageKey;
    } else {
      throw new Error('Unsupported image type');
    }
  } catch (e) {
    throw e;
  }
};
