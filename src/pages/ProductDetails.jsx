import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from 'react-icons/fa6';
import displayCurrency from '../componets/displayCurrency';
import DisplayCategoryWise from '../componets/DisplayCategoryWise';

function ProductDetails() {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  });
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [imageZoomCordinate, setImageZoomCordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const productImageList = new Array(4).fill(null);

  const params = useParams();
  const { id } = params;

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetail.url, {
      method: SummaryApi.productDetail.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data.productImage[0]);
  };

  // console.log(data.category);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleMouseHover = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  //   const handleMouseHoverLeave = (imageUrl) => {
  //     setActiveImage(imageUrl);
  //   };

  const hadleZoomImage = useCallback(
    (e) => {
      // get cordinate
      setZoomImage(true); //set zoom to true
      const { left, top, height, width } = e.target.getBoundingClientRect();
      // console.log(left, top, height, width);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setImageZoomCordinate({ x, y });
    },

    [imageZoomCordinate]
  );

  const handleImageZoomOut = () => {
    setZoomImage(false);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row lg:gap-4">
        <div className="h-96 flex flex-col items-center lg:flex-row-reverse gap-4">
          <div className="relative h-[300px] w-[350px] lg:h-96 lg:w-96 bg-slate-200 p-2">
            <img
              src={activeImage}
              onMouseMove={hadleZoomImage}
              onMouseLeave={handleImageZoomOut}
              className="mix-blend-multiply cursor-pointer cover lg:object-scale-down w-full h-full"
            />

            {/* zoom image */}
            {zoomImage ? (
              <div className="absolute hidden lg:block min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 top-0 -right-[510px]">
                <div
                  className="w-full h-full min-h-[400px] min-w-[400px] scale-150 mix-blend-multiply"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${imageZoomCordinate.x * 100}% ${
                      imageZoomCordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageList.map((el, i) => {
                  return (
                    <div
                      key={i}
                      className="h-20 bg-slate-200 w-20 animate-pulse rounded"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((image, i) => {
                  return (
                    <div key={i} className="h-20 bg-slate-200 w-20 rounded p-1">
                      <img
                        src={image}
                        onMouseEnter={() => handleMouseHover(image)}
                        // onMouseLeave={() =>
                        //   handleMouseHoverLeave(data?.productImage[0])
                        // }
                        className="cursor-pointer h-full w-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-1 mt-6 lg:mt-0 w-full">
            <p className="w-full text-red-600 bg-slate-200 animate-pulse text-bold rounded-full h-4 w-full">
              {/* {data?.brandName} */}
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold h-6 bg-slate-200 animate-pulse">
              {/* {data?.productName} */}
            </h2>
            <p className="capitalize bg-slate-200 min-w-[100px] h-6 animate-pulse"></p>

            <div className="bg-slate-200 h-6 animate-pulse flex items-center gap-1"></div>
            <div className="flex item-center gap-2 text-2xl lg:text-3xl font-medium my-2 h-6 animate-pulse">
              <p className="bg-slate-200 h-6  px-3 py-2 min-w-[50%]">
                {/* {displayCurrency(data?.sellingPrice)} */}
              </p>
              <p className="text-slate-400 line-through bg-slate-200 h-6  px-3 py-2 min-w-[50%]">
                {/* {displayCurrency(data?.price)} */}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="h-6 bg-slate-200 animate-pulse rounded px-3 py-2 min-w-[50%]"></button>
              <button className="h-6 bg-slate-200 animate-pulse rounded px-3 py-2 min-w-[50%]"></button>
            </div>
            <div className="">
              <p className="text-slate-600 font-medium my-1 h-10 bg-slate-200 animate-pulse rounded"></p>
              <p className="text-slate-600 font-medium my-1 h-10 bg-slate-200 animate-pulse rounded"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 mt-6 lg:mt-0">
            <p className="text-red-600 bg-red-200 text-bold rounded-full px-2 inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex item-center gap-2 text-2xl lg:text-3xl font-medium my-2">
              <p className="text-red-600">
                {displayCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayCurrency(data?.price)}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="border-2 border-red-600 rounded px-3 py-2 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-2 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                Add to Cart
              </button>
            </div>
            <div className="">
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>

      {data?.category && (
        <DisplayCategoryWise
          category={data?.category}
          heading={'Reccomeded Product'}
        />
      )}
    </div>
  );
}

export default ProductDetails;
