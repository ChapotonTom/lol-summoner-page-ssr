export const getFileName = (url) => {
  const fileNameIndex = url.lastIndexOf("/");
  const fileName = url.substring(fileNameIndex + 1).replace(".png", "");
  return fileName;
};
