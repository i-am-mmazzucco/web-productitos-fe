export const isImageUrl = (url: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
};