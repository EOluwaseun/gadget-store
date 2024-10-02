import { useState } from 'react';
import { GrClose, GrCloudUpload } from 'react-icons/gr';
import ProductCategory from './ProductCategory';

// eslint-disable-next-line react/prop-types
function UploadedProducts({ onClose }) {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    selling: '',
  });

  const [uploadProductImageInput, setUploadProductImageInput] = useState('');

  const handleOnchange = (e) => {};

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setUploadProductImageInput(file.name);
    // console.log(file);
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
        <form className="grid p-4 gap-2 overflow-y-scroll h-full bg-white pb-5">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name={'productName'}
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded outline-none"
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
          />

          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
          >
            {ProductCategory.map((item, i) => {
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
            <img
              src=""
              width={100}
              height={100}
              className="bg-slate-100 border"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadedProducts;
