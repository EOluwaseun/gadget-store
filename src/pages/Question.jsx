import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import { useEffect, useState } from 'react';
import VerticalCard from '../componets/VerticalCard';
import SummaryApi from '../common';

function Question() {
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
            {/* Sort by */}
            <h1 className="text-lg uppercase font-medium text-slate-500 border-b pb-2 border-slate-300">
              Sort By
            </h1>
            <form className="text-lg flex flex-col gap-2 p-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value="asc"
                  onChange={handleSort}
                  checked={sortBy === 'asc'}
                />


                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value="dsc"
                  onChange={handleSort}
                  checked={sortBy === 'dsc'}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div>
            <h1 className="text-lg uppercase font-medium text-slate-500 border-b pb-2 border-slate-300">
              Category
            </h1>
            <form className="text-lg flex flex-col gap-2 p-2">
              {productCategory.map((categoryName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={
                      selectedFilters.category[categoryName?.value] || false
                    }
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectFilter}
                  />
                  <label htmlFor={categoryName?.value}>
                    {categoryName?.label}
                  </label>
                </div>
              ))}
            </form>

            {/* Add Brand Filter */}
            <h1 className="text-lg uppercase font-medium text-slate-500 border-b pb-2 border-slate-300">
              Brand
            </h1>
            <form className="text-lg flex flex-col gap-2 p-2">
              {/* Assuming you have a list of brands */}
              {['BrandA', 'BrandB', 'BrandC'].map((brandName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="brandName"
                    checked={selectedFilters.brandName[brandName] || false}
                    value={brandName}
                    id={brandName}
                    onChange={handleSelectFilter}
                  />
                  <label htmlFor={brandName}>{brandName}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Display results */}
        <div className="px-4">
          <p className="font-medium text-lg my-2 text-slate-800">
            Search Result: {data.length}
          </p>
          <div className="h-calc[(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none">
            {data.length > 0 && <VerticalCard data={data} loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;














import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import { useEffect, useState } from 'react';
// import DisplayCategoryWise from '../componets/DisplayCategoryWise';
import VerticalCard from '../componets/VerticalCard';
import SummaryApi from '../common';

function CategoryProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // get category name from URL
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search); //this is from params, category is gotten first
  // get all url
  console.log(urlSearch);
  const urlCategoryListArray = urlSearch.getAll('category');
  const urlBrandListArray = urlSearch.getAll('brandName');
  console.log(urlCategoryListArray);
  console.log(urlBrandListArray);

  const urlCategoryListObject = {};
  urlCategoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true; //set each category in d array to true
  });
  console.log(urlCategoryListObject);

  // store values in array
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSorBy] = useState('');
  // console.log(selectCategory);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: filterCategoryList, //this is sent to the backend
      }),
    });

    const dataResponse = await response.json();

    setData(dataResponse?.data || []);

    // console.log(dataResponse);
  };
  console.log(data);

  // onclick for category
  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });

    // console.log(name, value, checked);
    // console.log('selectCategory', selectCategory);
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    // this convert category object into array
    const arrayCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el); //this removes d null
    setFilterCategoryList(arrayCategory);
    // console.log(arrayCategory);

    // format url change when checked
    const urlFormat = arrayCategory.map((el, index) => {
      //el gives mouse or camera or anything in d category list
      if (arrayCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    console.log(urlFormat);
    // console.log(urlFormat.join(''));
    //this joins url with no space in between

    navigate(`/product-category?${urlFormat.join('')}`);
  }, [selectCategory]);

  // console.log(filterCategoryList);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSort = (e) => {
    const { value } = e.target;
    setSorBy(value);
    // console.log(value);
    if (value === 'asc') {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === 'dsc') {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  // console.log(data);
  // the componet rerender whenever sortBy
  useEffect(() => {}, [sortBy]);