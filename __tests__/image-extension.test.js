import isValidImageExtension from '../handlers/utils/validate-image-extension.js';
const invalidImageUrl =
  'https://fastly.picsum.photos/id/17/2500/1667.abc?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY';
const validImageUrl =
  'https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY';

describe('Validate Image Extension', () => {
  test('Check image url validity', () => {
    expect(isValidImageExtension(invalidImageUrl)).toBe(false);
    expect(isValidImageExtension(validImageUrl)).toBe(true);
  });
});
