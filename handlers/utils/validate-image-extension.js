const isValidImageExtension = extension => {
  const supportedMimeTypes = /jpg|jpeg|png|tiff|gif/i;
  return supportedMimeTypes.test(extension);
};
const mimeType = url => {
  const extension = url.split(/[#?]/)[0].split('.').pop().trim();
  return extension;
}
export default {
  isValidImageExtension,
  mimeType
}
