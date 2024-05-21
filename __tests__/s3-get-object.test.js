import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {mockClient as _mockClient} from 'aws-sdk-client-mock';
import {getImage} from '../handlers/utils/s3';

const s3Client = new S3Client({
  apiVersion: '2006-03-01',
  region: 'eu-west-2',
});

describe('Mock aws s3 get Object', () => {
  const mockedS3Client = _mockClient(s3Client);

  beforeEach(() => {
    jest.resetAllMocks();
    mockedS3Client.reset();
  });

  describe('get File from S3', () => {
    test('Should get object with the specified key from S3 bucket', async () => {
      mockedS3Client.on(GetObjectCommand).resolves({Body: 'hello'});

      const config = {
        Key: 'Test',
        s3Client,
        bucket: 'Test',
      };
      const fileUrl = await getImage(config.Key, config);
      expect(fileUrl).toBeTruthy();
    });
  });
});
