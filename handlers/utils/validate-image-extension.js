const isValidImageExtension = url => {
  const supportedMimeTypes = /jpg|jpeg|png|tiff|gif/i;
  const extension = url.split(/[#?]/)[0].split('.').pop().trim();
  return supportedMimeTypes.test(extension);
};
export default isValidImageExtension;
