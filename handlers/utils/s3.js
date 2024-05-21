import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3';
import isValidImageExtension from './validate-image-extension';
import {Upload} from '@aws-sdk/lib-storage';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
const s3Client = new S3Client({
  apiVersion: '2006-03-01',
  region: process.env.region,
});
/**
 * This method stores the buffer from a valid image into S3 Bucket using the lib storage Upload
 * @param {*} buffer
 * @param {*} url
 */
export const storeImage = async (buffer, url, config) => {
  try {
    const imageKey = config ? config.key : `sessions-image-${Date.now()}`;
    if (isValidImageExtension(url)) {
      const parallelUpload = new Upload({
        client: config ? config.s3Client : s3Client,
        params: {
          Bucket: config ? config.bucket : process.env.S3_IMAGE_BUCKET,
          Key: imageKey,
          Body: buffer,
        },
      });
      parallelUpload.on('httpUploadProgress', progress => {
        //do  nothing
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
/**
 * Get a presigned url for image from S3
 * @param {*} key
 * @param {*} bucket
 * @param {*} config
 * @returns
 */
export const getImage = async (Key, config) => {
  try {
    const input = {
      Bucket: config ? config.bucket : process.env.S3_IMAGE_BUCKET,
      Key,
    };
    const client = config ? config.s3Client : s3Client;
    const command = new GetObjectCommand(input);
    const url = await getSignedUrl(client, command, {expiresIn: 100000});
    return url;
  } catch (e) {
    throw e;
  }
};
