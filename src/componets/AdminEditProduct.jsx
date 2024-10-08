/* eslint-disable react/prop-types */
import { useState } from 'react';
import { GrClose, GrCloudUpload, GrTrash } from 'react-icons/gr';
import { toast } from 'react-toastify';
import uploadImages from '../helpers/uploadImages';
import SummaryApi from '../common';
import productCategory from '../helpers/ProductCategory';
import DisplayImage from './DisplayImage';

function AdminEditProduct({ onClose, productData, fetchData }) {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const [openFullScreenImage, setOpenFullscreenImage] = useState(false);
  const [fullScreenImage, setFullscreenImage] = useState('');

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDeleteProduct = async (index) => {
    // console.log(index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    // setUploadProductImageInput(file.name);

    const uploadImageCloudinary = await uploadImages(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
    // console.log('upload image', uploadImageCloudinary.url);
  };

  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);*

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },

      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    // console.log(responseData);
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed flex h-full w-full justify-center items-center bg-slate-200/30 top-0 left-0 right-0 bottom-0">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center py-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer">
            <GrClose onClick={onClose} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid p-4 gap-2 overflow-y-scroll h-full bg-white pb-5"
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name={'productName'}
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded outline-none"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded outline-none"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            value={data.category}
            onChange={handleOnchange}
            name="category"
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={''}>Select Category</option>
            {productCategory.map((item, i) => {
              return (
                <option key={i} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="ProductImage" className="mt-3">
            Product Image:
          </label>
          <div className="flex justify-center items-center p-2 bg-slate-100 border rounded h-full h-40">
            <label htmlFor="uploadImageInput">
              <div className="cursor-pointer text-slate-500 flex gap-y-2 justify-center items-center flex-col">
                <span className="text-2xl">
                  <GrCloudUpload />
                </span>
                <p className="text-sm">Upload Product image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            </label>
          </div>

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((item, i) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div key={i} className="relative group">
                      {
                        <img
                          key={i}
                          src={item}
                          alt={item}
                          width={100}
                          height={100}
                          className="bg-slate-100 border cursor-pointer"
                          onClick={() => {
                            setOpenFullscreenImage(true);
                            setFullscreenImage(item);
                          }}
                        />
                      }
                      <div
                        onClick={() => handleDeleteProduct(i)}
                        className=" cursor-pointer mb-4 absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block"
                      >
                        <GrTrash />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">upload image</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded outline-none"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="enter selling price"
            value={data.sellingPrice}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded outline-none"
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Description:
          </label>
          <textarea
            className="h-28 bg-slate-100 outline-none border border-grey rounded resize-none"
            rows={3}
            // value={data.description}
            name="description"
            onChange={handleOnchange}
            id="description"
            placeholder="Enter Product description"
            value={data.description}
          ></textarea>

          <button
            type="submit"
            className="px-3 py-2 bg-red-600 text-white mb-4 hover:bg-red-700"
          >
            Update Product
          </button>
        </form>
      </div>
      {/* display */}
      {openFullScreenImage && (
        <DisplayImage
          imageUrl={fullScreenImage}
          onClose={() => setOpenFullscreenImage(false)}
        />
      )}
    </div>
  );
}

export default AdminEditProduct;
