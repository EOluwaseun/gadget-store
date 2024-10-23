import { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayCurrency from '../componets/displayCurrency';

function OrderPage() {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include',
    });

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData?.data);
    }
    // setData(responseData?.data);

    console.log(responseData);
    console.log(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div>
      {!data[0] && <p>No Oder found</p>}

      <div className="p-4 w-full">
        {data?.map((item, i) => {
          return (
            <div key={item.userId + i}>
              <p className="font-medium text-lg">
                {moment(item.createdAt).format('LL')}
              </p>
              <div className="border rounded">
                <div className="flex justify-between flex-col lg:flex-row">
                  <div className="grid gap-1">
                    {item?.productDetails.map((product, i) => {
                      return (
                        <div
                          key={product.productId + i}
                          className="flex gap-2 bg-slate-100"
                        >
                          <img
                            src={product.image[0]}
                            className="w-24 h-24 bg-slate-200 object-scale-down p-2 mix-blend-multiply"
                          />
                          <div>
                            <div className="font-medium text-ellipsis line-clamp-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="text-lg text-red-500">
                                {displayCurrency(product.price)}
                              </div>
                              <p>Quantity:{product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-2 flex-col p-2 min-w-[320px]">
                    <div>
                      <div className="font-medium text-lg">Payment Details</div>
                      <p className="ml-1">
                        Payment Method:
                        {item.paymentDetails.payment_method_type[0]}
                      </p>
                      <p className="ml-1">
                        Payment Status:{item.paymentDetails.payment_status}
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-lg">
                        {' '}
                        Shipping Details
                      </div>
                      {item?.shipping_options.map((shipping, i) => {
                        return (
                          <div key={shipping.shipping_rate + i}>
                            <p className="ml-1">
                              Shipping Fee: {shipping.shipping_amount}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="font-semibold ml-auto w-fit lg:text-lg">
                  Total Amount: {item.totalAmount}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderPage;
