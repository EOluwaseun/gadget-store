import { useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayCurrency from './displayCurrency';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

// eslint-disable-next-line react/prop-types
function HorizontalCartProduct({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 100;
  };
  const scrollPrev = () => {
    scrollElement.current.scrollLeft -= 100;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-bold capitalize py-4">{heading}</h2>
      <div
        ref={scrollElement}
        className="flex items-center gap-2 md:gap-6 overflow-scroll scrollbar-none transition-all"
      >
        <div className="z-10">
          <button
            onClick={scrollPrev}
            className="text-grey-200 p-2 shadow-md rounded-full bg-white absolute left-0 hidden md:block"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={scrollRight}
            className="text-grey-200 p-2 shadow-md rounded-full bg-white absolute right-0 text-lg hidden md:block"
          >
            <FaArrowRight />
          </button>
        </div>
        {data.map((product, i) => {
          return (
            <div
              key={i}
              className="w-full min-w-[200px] md:min-w-[320px]  max-w-[200px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
            >
              <div className="bg-slate-200 h-full p-4 minw-[120px] md:min-w-[145px]">
                <img
                  src={product?.productImage[0]}
                  className="object-scale-down h-full hover:scale-[105%] transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 mix-blend-multiply">
                  {product?.productName}
                </h2>
                <p className="text-slate-500 capitalize">{product?.category}</p>

                <div className="flex gap-2">
                  <p className="text-red-600 font-medium">
                    {displayCurrency(product?.sellingPrice)}
                  </p>
                  <p className="line-through text-slate-600">
                    {displayCurrency(product?.price)}
                  </p>
                </div>
                <button className="text-sm bg-red-600 hover:bg-red-700 px-3 text-white py-0.5 rounded-full shadow">
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HorizontalCartProduct;
