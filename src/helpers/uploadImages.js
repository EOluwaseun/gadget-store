// const url = `https://api.cloudinary.com/v1_1/:${
//   import.meta.env.REACT_APP_CLOUD_NAME_CLOUDINARY
// }/:image/upload`;
const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_API_URL_REACT_APP_CLOUD_NAME_CLOUDINARY
}/image/upload`;

const uploadImages = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'gadget-store');

  const dataResponse = await fetch(url, {
    method: 'post',
    body: formData,
  });

  return dataResponse.json();
};
export default uploadImages;
