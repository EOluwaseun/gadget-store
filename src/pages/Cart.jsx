import { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayCurrency from '../componets/displayCurrency';
import { MdDelete } from 'react-icons/md';
import { loadStripe } from '@stripe/stripe-js';

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.addToCartView.url, {
      method: SummaryApi.addToCartView.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });
    setLoading(false);
    const dataResponse = await response.json();

    if (dataResponse.success) {
      setData(dataResponse?.data);
    }
  };

  const increaseCartProductQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        quantity: qty + 1,
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseCartProductQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          quantity: qty - 1,
          _id: id,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      //   this update the countAddToCartProduct, as it delete
      context.fetchUserAddToCart();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue.quantity * currentValue?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    // public key
    // eslint-disable-next-line no-undef
    const stripePromise = await loadStripe(
      import.meta.env.VITE_API_URL_REACT_APP_STRIPE_PUBLIC_KEY
    );

    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const responseData = await response.json();
    // console.log(responseData);
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mx-auto text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">no data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="max-w-3xl w-full">
          {/* && data.length === 0 */}
          {loading && data.length === 0
            ? loadingCart?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="w-full bg-slate-200 h-32 my-2 border-slate-300 border animate-pulse"
                  ></div>
                );
              })
            : data?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="w-full bg-white h-32 my-2 border-slate-300 border grid grid-cols-[128px,1fr] rounded"
                  >
                    <div className="w-32 h-full bg-slate-200 relative">
                      <img
                        src={item?.productId?.productImage[0]}
                        className="absolute w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      <div
                        onClick={() => deleteCartProduct(item?._id)}
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1 max-w-[90%]">
                        {item?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {item?.productId?.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-red-600 font-medium text-lg">
                          {displayCurrency(item?.productId?.sellingPrice)}
                        </p>

                        <p className="text-slate-600 font-semibold text-lg">
                          {displayCurrency(
                            item?.productId?.sellingPrice * item?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            decreaseCartProductQty(item?._id, item?.quantity)
                          }
                          className="hover:bg-red-600 hover:text-white border border-red-500 text-red-600 w-6 h-6 flex justify-center rounded"
                        >
                          -
                        </button>
                        <span>{item?.quantity}</span>
                        <button
                          onClick={() =>
                            increaseCartProductQty(item?._id, item?.quantity)
                          }
                          className="hover:bg-red-600 hover:text-white border border-red-500 text-red-600 w-6 h-6 flex justify-center rounded"
                        >
                          +
                        </button>
                        {/* {console.log(item?._id)} */}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* total */}
        {data[0] && (
          <div className="mt-5 lg:mt-3 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border-slate-300 border animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>

                <div className="flex items-center justify-between px-4 gap-2 text-lg font-medium text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 text-lg font-medium text-slate-600">
                  <p>Total Price</p>
                  <p>{displayCurrency(totalPrice)}</p>
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-blue-600 p-2 text-lg text-white w-full"
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
