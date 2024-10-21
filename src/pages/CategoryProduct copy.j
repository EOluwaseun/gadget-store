import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import { useEffect, useState } from 'react';
import VerticalCard from '../componets/VerticalCard';
import SummaryApi from '../common';

function CategoryProduct() {
  /*const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);

  const urlCategoryListArray = urlSearch.getAll('category');
  const urlBrandListArray = urlSearch.getAll('brandName');

  const initialFilters = {
    category: urlCategoryListArray.reduce(
      (acc, el) => ({ ...acc, [el]: true }),
      {}
    ),
    brandName: urlBrandListArray.reduce(
      (acc, el) => ({ ...acc, [el]: true }),
      {}
    ),
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);*/

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname.split('/')[1];

  console.log(url);

  // Initial empty filters state
  const initialFilters = {
    category: [],
    brandName: [],
    color: [],
  };

  // Temporary state for filters
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const [sortBy, setSortBy] = useState('');

  /*
  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: Object.keys(selectedFilters.category).filter(
          (key) => selectedFilters.category[key]
        ),
        brandName: Object.keys(selectedFilters.brandName).filter(
          (key) => selectedFilters.brandName[key]
        ),
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };*/

  // Function to handle selections (category, brand, color)
  const handleSelectFilter = (e) => {
    const { name, value, checked } = e.target;
    setSelectedFilters((prevFilters) => {
      return {
        ...prevFilters,
        [name]: checked
          ? [...prevFilters[name], value] // Add selected filter
          : prevFilters[name].filter((filter) => filter !== value), // Remove unselected filter
      };
    });
  };

  // Function to apply filters (only when button is clicked)
  const applyFilters = () => {
    const urlParams = new URLSearchParams();

    // Add each filter to URL parameters
    Object.keys(selectedFilters).forEach((key) => {
      selectedFilters[key].forEach((value) => {
        urlParams.append(key, value);
      });
    });

    // Navigate to the updated URL with filters
    // navigate(`/product-category?${urlParams.toString()}`);
    navigate(`/${url}?${urlParams.toString()}`);
  };

  // Function to clear all filters
  const clearFilters = () => {
    // Reset selected filters to the initial state
    setSelectedFilters(initialFilters);
    // price: { min: 0, max: Infinity },

    // Navigate to the base URL without any query parameters
    // navigate(`/product-category`);
    navigate(`/${url}`);
  };

  // Fetch filtered data when URL parameters change
  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const category = urlSearch.getAll('category');
    const brandName = urlSearch.getAll('brandName');
    const color = urlSearch.getAll('color');

    //this will make it chech automatically
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      category: category.length ? category : prevFilters.category,
      brandName: brandName.length ? brandName : prevFilters.brandName,
      color: color.length ? color : prevFilters.color,
    }));

    const fetchData = async () => {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          category,
          brandName,
          color,
        }),
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    };

    fetchData();
  }, [location.search]);

  /*
  const handleSelectFilter = (e) => {
    const { name, value, checked } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [value]: checked,
      },
    }));
  };

  // Step 3: Update URL and fetch data whenever filters change
  useEffect(() => {
    const activeCategories = Object.keys(selectedFilters.category).filter(
      (key) => selectedFilters.category[key]
    );
    const activeBrands = Object.keys(selectedFilters.brandName).filter(
      (key) => selectedFilters.brandName[key]
    );

    const queryString = [
      ...activeCategories.map((el) => `category=${el}`),
      ...activeBrands.map((el) => `brandName=${el}`),
    ].join('&');

    navigate(`/product-category?${queryString}`);
    fetchData();
  }, [selectedFilters]);*/

  // Handle sorting
  const handleSort = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === 'asc') {
      setData((prev) =>
        [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice)
      );
    }
    if (value === 'dsc') {
      setData((prev) =>
        [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice)
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        <div className="bg-white min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none">
          <div>
            {/* sort by */}
            <h1 className="text-lg uppercase font-medium text-slate-500 border-b pb-2 border-slate-300">
              Sort By
            </h1>
            <form className="text-lg flex flex-col gap-2 p-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={'asc'}
                  onChange={handleSort}
                  checked={sortBy === 'asc'}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={'dsc'}
                  onChange={handleSort}
                  checked={sortBy === 'dsc'}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          <div>
            {/* filter by */}
            <h1 className="text-lg uppercase font-medium text-slate-500 border-b pb-2 border-slate-300">
              Category
            </h1>
            <form className="text-lg flex flex-col gap-2 p-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={'category'}
                      // checked={selectCategory[categoryName?.value]}
                      // checked={
                      //   selectedFilters.category[categoryName?.value] || false
                      // }
                      value={categoryName?.value}
                      id={categoryName?.value}
                      // onChange={handleSelectCategory}
                      // onChange={handleSelectFilter}

                      checked={selectedFilters.category.includes(
                        categoryName?.value
                      )}
                      onChange={handleSelectFilter}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>

          <div>
            {/* Filter by Brand */}
            <h1 className="text-lg uppercase font-medium text-slate-500 border-b pb-2 border-slate-300">
              Brand
            </h1>
            <form className="text-lg flex flex-col gap-2 p-2">
              {/* Add your brand options here */}
              {['oraimo', 'boat', 'canon', 'realme', 'dell', 'asus'].map(
                (brandName, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="brandName"
                      value={brandName}
                      // checked={selectedFilters.brandName.includes(brandName)}
                      // onChange={handleSelectFilter}
                      checked={selectedFilters.brandName.includes(brandName)}
                      onChange={handleSelectFilter}
                    />
                    <label htmlFor={brandName}>{brandName}</label>
                  </div>
                )
              )}
            </form>
          </div>
        </div>

        {/* right side */}

        <div className="px-4">
          <p className="font-medium text-lg my-2 text-slate-800">
            Search Result:{data.length}
          </p>

          {/* Apply Filters Button */}
          <div className="flex gap-4 mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={applyFilters}
            >
              Apply Filters
            </button>

            {/* Clear Filters Button */}
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

          <div className="h-calc[(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none">
            {data?.length !== 0 && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
