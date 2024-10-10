import { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const fetchData = await fetch(SummaryApi.getProductCategory.url, {
      //   method: SummaryApi.getProductCategory.method,
      //   credentials: 'include',
    });

    const dataResponse = await fetchData.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
    // console.log(categoryProduct);

    // if (dataResponse.success) {
    //   setCategoryProduct(dataResponse.data);
    //   console.log(categoryProduct);
    // }

    if (dataResponse.error) {
      toast.error(dataResponse?.message);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="my-6 flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  key={`categoryLoading${index}`}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                ></div>
              );
            })
          : categoryProduct?.map((item, i) => {
              return (
                <Link
                  to={`/product-category/${item?.category}`}
                  key={i}
                  className="cursor-pointer"
                >
                  <div className="w-20 h-20 md:w-20 md:h-20 bg-slate-200 flex items-center justify-center rounded-full overflow-hidden p-4">
                    <img
                      src={item?.productImage[0]}
                      alt={item?.category}
                      className="w-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {item?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

export default CategoryList;
