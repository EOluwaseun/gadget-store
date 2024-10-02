import { useState } from 'react';
import UploadedProducts from '../componets/UploadedProducts';

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  return (
    <div>
      <div className="bg-white py-2 px-4 justify-between flex items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-500 py-1 px-3 
        rounded-full text-red-600 hover:bg-red-600 hover:text-white"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* upload product */}
      {openUploadProduct && (
        <UploadedProducts onClose={() => setOpenUploadProduct(false)} />
      )}
    </div>
  );
}

export default AllProducts;
