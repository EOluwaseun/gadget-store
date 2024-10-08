import { useEffect, useState } from 'react';
import UploadedProducts from '../componets/UploadedProducts';
import SummaryApi from '../common';
import AdminProductCard from '../componets/AdminProductCard';

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi?.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

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

      {/* all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((item, index) => {
          return (
            <AdminProductCard
              data={item}
              index={index + 'allProduct'}
              key={index}
              fetchData={fetchAllProduct}
            />
          );
        })}
      </div>

      {/* upload product */}
      {openUploadProduct && (
        <UploadedProducts
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
}

export default AllProducts;
