import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import { useEffect, useState } from 'react';
import VerticalCard from '../componets/VerticalCard';
import SummaryApi from '../common';

function CategoryProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Extract filters from URL params
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);

  // Extracting categories, brandNames, and other filters from URL
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

  // State for selected filters and sorted data
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('');

  // Fetch data based on filters
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
  };

  // Step 2: Handle filter selection (generic for any filter type)
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
  }, [selectedFilters]);

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
                      checked={
                        selectedFilters.category[categoryName?.value] || false
                      }
                      value={categoryName?.value}
                      id={categoryName?.value}
                      // onChange={handleSelectCategory}
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
        </div>

        {/* right side */}

        <div className="px-4">
          <p className="font-medium text-lg my-2 text-slate-800">
            Search Result:{data.length}
          </p>
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
