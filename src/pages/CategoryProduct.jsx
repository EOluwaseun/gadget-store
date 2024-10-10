import { useParams } from 'react-router-dom';

function CategoryProduct() {
  const params = useParams();

  const { categoryName } = params;

  //   console.log(categoryName);
  return <div>{categoryName}</div>;
}

export default CategoryProduct;
