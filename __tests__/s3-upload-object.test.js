import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import {mockClient as _mockClient} from 'aws-sdk-client-mock';
import {storeImage} from '../handlers/utils/s3';

const validImageUrl =
  'https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY';
const s3Client = new S3Client({
  apiVersion: '2006-03-01',
  region: 'eu-west-2',
});

describe('Mock aws s3 upload Object', () => {
  const mockedS3Client = _mockClient(s3Client);

  beforeEach(() => {
    jest.resetAllMocks();
    mockedS3Client.reset();
  });

  describe('Upload File to s3', () => {
    test('Should upload the specified buffer to s3 bucket', async () => {
      //To mock @aws-sdk/lib-storage Upload you need to mock at least two commands: CreateMultipartUploadCommand and UploadPartCommand
      mockedS3Client.on(CreateMultipartUploadCommand).resolves({UploadId: '1'});
      mockedS3Client.on(UploadPartCommand).resolves({ETag: '1'});
      const buffer = new Buffer.from('testing');
      const configs = {
        key: 'Test',
        s3Client,
        bucket: 'Test',
      };
      const uploadedFile = await storeImage(buffer, validImageUrl, configs);
      expect(uploadedFile).toEqual(configs.key);
    });
  });
});
