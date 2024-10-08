import { useState } from 'react';
import { GrEdit } from 'react-icons/gr';
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from './displayCurrency';

/* eslint-disable react/prop-types */
const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            height={120}
            width={120}
            className="w-fit mx-auto object-fit h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>
        <div className="font-semibold">
          {displayCurrency(data.sellingPrice)}
        </div>

        <div
          className="w-fit cursor-pointer ml-auto p-2 hover:bg-green-600 
      rounded-full hover:text-white"
          onClick={() => setEditProduct(true)}
        >
          <GrEdit />
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
