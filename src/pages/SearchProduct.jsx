import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import { useEffect, useState } from 'react';
import VerticalCard from '../componets/VerticalCard';

function SearchProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //get query from params
  const query = useLocation();
  console.log(query);

  const fetchSearchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search, {
      method: SummaryApi.searchProduct.method,
    });

    const dataResponse = await response.json();
    setLoading(false);

    setData(dataResponse.data);

    console.log(dataResponse);
  };

  useEffect(() => {
    fetchSearchData();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading...</p>}
      <p className="text-lg font-semibold my-2">
        Search Results:{data?.length}
      </p>
      {data.length === 0 && (
        <p className="bg-white text-lg text-center p-4">No Data found....</p>
      )}

      {data.length != 0 && <VerticalCard loading={loading} data={data} />}
    </div>
  );
}

export default SearchProduct;
